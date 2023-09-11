/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import {
  fireEvent,
  renderWithAllProviders,
  screen,
  waitFor,
} from '~/utils/test/test-utils'
import { Profile } from '.'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { MockedUser, useAuthContextSpy } from '~/utils/test'
import * as AppToastModule from '~/hooks/useAppToast'
import DefaultPhoto from '~/assets/images/userPhotoDefault.png'

import * as PatchUserProfileModule from '~/hooks/mutations/usePatchUserProfileAvatar'
import * as PutUserProfileModule from '~/hooks/mutations/usePutUserProfileMutation'

import RHF, { useForm } from 'react-hook-form'

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
}))

describe('Profile Component', () => {
  const elements = {
    btnChangePhotoID: 'btn-change-photo',
    imgUserPhotoID: 'img-user-photo',
    inputName: 'input-name',
    inputCurrentPW: 'input-current-password',
    inputNewPW: 'input-new-password',
    inputConfirmPW: 'input-confirm-password',
    btnSubmit: 'btn-submit',
  }

  const useFileSystemSpy = () => ({
    getInfoAsync: jest.spyOn(FileSystem, 'getInfoAsync'),
  })
  const useToastShowSpy = () => {
    const showError = jest.fn()

    jest
      .spyOn(AppToastModule, 'useAppToast')
      .mockReturnValue({ showError } as any)
    return { showError }
  }
  const usePutUserProfileMutationSpy = (
    {
      isLoading,
    }: {
      isLoading: false
    } = { isLoading: false },
  ) => {
    const mutateAsync = jest.fn()
    jest
      .spyOn(PutUserProfileModule, 'usePutUserProfileMutation')
      .mockReturnValue({ mutateAsync, isLoading } as any)
    return { mutateAsync }
  }

  beforeEach(() => {
    useAuthContextSpy({ user: MockedUser, isLoadingData: false })
    jest.clearAllMocks()
    usePutUserProfileMutationSpy().mutateAsync.mockClear()
  })

  describe('Change Photo', () => {
    describe('avatarSource', () => {
      it('should render default avatar source when there is not user.avatar or userPhoto', () => {
        useAuthContextSpy({
          user: { ...MockedUser, avatar: null },
          isLoadingData: false,
        })

        renderWithAllProviders(<Profile />)

        const userPhotoComponent = screen.getByTestId(elements.imgUserPhotoID)
        expect(userPhotoComponent.props.source).toEqual(DefaultPhoto)
      })
      it('should render user.avatar when it is truthy and there is no userPhoto selected', () => {
        const avatarUrl = 'https://someurl.com'
        useAuthContextSpy({
          user: { ...MockedUser, avatar: avatarUrl },
        })

        renderWithAllProviders(<Profile />)

        const userPhotoComponent = screen.getByTestId(elements.imgUserPhotoID)
        expect(userPhotoComponent.props.source).toEqual({
          uri: `undefined/avatar/${avatarUrl}`,
        })
      })
      it('should render userPhoto when picked and patched successfully', async () => {
        const { updateUserProfileMock } = useAuthContextSpy({
          user: MockedUser,
        })

        const uri = 'local-photo-uri'

        jest.spyOn(ImagePicker, 'launchImageLibraryAsync').mockResolvedValue({
          canceled: false,
          assets: [{ uri } as any],
        })

        jest.spyOn(FileSystem, 'getInfoAsync').mockResolvedValue({
          exists: true,
          isDirectory: false,
          size: 3 * 1024 * 1024,
        } as any)

        const newAvatarUrl = 'external_stored_avatar_url'
        const mutateAvatar = jest
          .fn()
          .mockResolvedValue({ avatar: newAvatarUrl })
        jest
          .spyOn(PatchUserProfileModule, 'usePatchUserProfileAvatar')
          .mockReturnValue({
            mutateAsync: mutateAvatar,
            isLoading: true,
          } as any)

        renderWithAllProviders(<Profile />)

        const changePhotoBtn = screen.getByTestId(elements.btnChangePhotoID)

        fireEvent.press(changePhotoBtn)

        // Assert
        expect(changePhotoBtn.props.disabled).toBe(true)

        await waitFor(() =>
          expect(updateUserProfileMock).toBeCalledWith({
            ...MockedUser,
            avatar: newAvatarUrl,
          }),
        )
        await waitFor(() => {
          expect(
            screen.getByTestId(elements.imgUserPhotoID).props.source.uri,
          ).toEqual(uri)
        })
        await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(false))
      })
    })
    it('should abort the process correctly when the user close/abort the ImagePicker', async () => {
      const imagePickerSpy = jest
        .spyOn(ImagePicker, 'launchImageLibraryAsync')
        .mockResolvedValue({ canceled: true, assets: null })

      const { getInfoAsync } = useFileSystemSpy()

      renderWithAllProviders(<Profile />)

      const changePhotoBtn = screen.getByTestId(elements.btnChangePhotoID)

      fireEvent.press(changePhotoBtn)

      // Assert
      await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(true))
      expect(imagePickerSpy).toHaveBeenCalledTimes(1)
      expect(imagePickerSpy).toBeCalledWith({
        allowsEditing: true,
        allowsMultipleSelection: false,
        aspect: [4, 4],
        mediaTypes: 'Images',
        quality: 1,
      })
      expect(getInfoAsync).not.toBeCalled()

      await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(false))
    })

    it('should trigger an Error Toast if some generic Error occurs', async () => {
      const { showError } = useToastShowSpy()

      const imagePickerSpy = jest
        .spyOn(ImagePicker, 'launchImageLibraryAsync')
        .mockRejectedValue(true)

      renderWithAllProviders(<Profile />)

      const changePhotoBtn = screen.getByTestId(elements.btnChangePhotoID)

      fireEvent.press(changePhotoBtn)

      await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(true))
      expect(imagePickerSpy).toHaveBeenCalledTimes(1)
      expect(showError).toHaveBeenCalledTimes(1)

      await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(false))
    })

    it('should abort the process if the selected photo URI does not exist', async () => {
      const imagePickerSpy = jest
        .spyOn(ImagePicker, 'launchImageLibraryAsync')
        .mockResolvedValue({
          canceled: false,
          assets: [{ uri: '' } as any],
        })
      const { getInfoAsync } = useFileSystemSpy()

      renderWithAllProviders(<Profile />)

      const changePhotoBtn = screen.getByTestId(elements.btnChangePhotoID)

      fireEvent.press(changePhotoBtn)

      // Assert
      await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(true))

      await waitFor(() => {
        expect(imagePickerSpy).toHaveBeenCalledTimes(1)
        expect(imagePickerSpy).toBeCalledWith({
          allowsEditing: true,
          allowsMultipleSelection: false,
          aspect: [4, 4],
          mediaTypes: 'Images',
          quality: 1,
        })
      })

      expect(getInfoAsync).not.toBeCalled()

      await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(false))
    })

    it('should abort the process if the selected photo URI does not exist', async () => {
      const imagePickerSpy = jest
        .spyOn(ImagePicker, 'launchImageLibraryAsync')
        .mockResolvedValue({
          canceled: false,
          assets: [{ uri: '' } as any],
        })
      const { getInfoAsync } = useFileSystemSpy()

      renderWithAllProviders(<Profile />)

      const changePhotoBtn = screen.getByTestId(elements.btnChangePhotoID)

      fireEvent.press(changePhotoBtn)

      // Assert
      await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(true))

      await waitFor(() => {
        expect(imagePickerSpy).toHaveBeenCalledTimes(1)
      })

      expect(getInfoAsync).not.toBeCalled()

      await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(false))
    })

    it('should abort the process if the `photoInfo` does not exist', async () => {
      const uri = 'some-photo-uri'
      const imagePickerSpy = jest
        .spyOn(ImagePicker, 'launchImageLibraryAsync')
        .mockResolvedValue({
          canceled: false,
          assets: [{ uri } as any],
        })

      const getInfoAsyncSpy = jest
        .spyOn(FileSystem, 'getInfoAsync')
        .mockResolvedValue({ exists: false } as any)

      renderWithAllProviders(<Profile />)

      const previousPhotoURI = screen.getByTestId(elements.imgUserPhotoID).props
        .source.uri

      const changePhotoBtn = screen.getByTestId(elements.btnChangePhotoID)

      fireEvent.press(changePhotoBtn)

      // Assert
      await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(true))
      await waitFor(() => {
        expect(imagePickerSpy).toHaveBeenCalledTimes(1)
      })

      await waitFor(() => {
        expect(getInfoAsyncSpy).toHaveBeenCalledTimes(1)
        expect(getInfoAsyncSpy).toHaveBeenCalledWith(uri)
      })

      await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(false))
      expect(
        screen.getByTestId(elements.imgUserPhotoID).props.source.uri,
      ).toEqual(previousPhotoURI)
    })

    it('should abort the process if the image > 5mb, and Toast the user', async () => {
      const { showError } = useToastShowSpy()

      const uri = 'some-photo-uri'
      jest.spyOn(ImagePicker, 'launchImageLibraryAsync').mockResolvedValue({
        canceled: false,
        assets: [{ uri } as any],
      })

      jest.spyOn(FileSystem, 'getInfoAsync').mockResolvedValue({
        exists: true,
        isDirectory: false,
        size: 5.1 * 1024 * 1024,
      } as any)

      renderWithAllProviders(<Profile />)

      const previousPhotoURI = screen.getByTestId(elements.imgUserPhotoID).props
        .source.uri

      const changePhotoBtn = screen.getByTestId(elements.btnChangePhotoID)

      fireEvent.press(changePhotoBtn)

      // Assert
      await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(true))
      await waitFor(() => {
        expect(showError).toHaveBeenCalledTimes(1)
      })

      await waitFor(() => expect(changePhotoBtn.props.disabled).toBe(false))
      expect(
        screen.getByTestId(elements.imgUserPhotoID).props.source.uri,
      ).toEqual(previousPhotoURI)
    })
  })

  describe('handleNameInputBlur', () => {
    it('should handle the name value trimming it', async () => {
      renderWithAllProviders(<Profile />)

      const inputName = screen.getByTestId(elements.inputName)
      fireEvent.changeText(inputName, '  Some Name  ')
      fireEvent(inputName, 'blur')

      await waitFor(() =>
        expect(screen.getByTestId(elements.inputName).props.value).toBe(
          'Some Name',
        ),
      )
    })
    it('should refill with the initial value, when blur the inputName field empty', async () => {
      renderWithAllProviders(<Profile />)

      const inputName = screen.getByTestId(elements.inputName)
      fireEvent.changeText(inputName, '    ')
      fireEvent(inputName, 'blur')

      await waitFor(() =>
        expect(screen.getByTestId(elements.inputName).props.value).toBe(
          MockedUser.name,
        ),
      )
    })
  })

  describe('handlePWFieldBlur', () => {
    it('should force clear errors when clean PWs and blue the inputs after a failed submit', async () => {
      renderWithAllProviders(<Profile />)

      const inputCurrentPW = screen.getByTestId(elements.inputCurrentPW)
      fireEvent.changeText(inputCurrentPW, 'AnyPw')

      fireEvent.press(screen.getByTestId(elements.btnSubmit))

      const formErrors = await screen.findAllByTestId(/-error-text$/)
      expect(formErrors).toHaveLength(1)

      fireEvent.changeText(inputCurrentPW, '')
      fireEvent(inputCurrentPW, 'blur')

      await waitFor(() =>
        expect(screen.queryAllByTestId(/-error-text$/)).toHaveLength(0),
      )
    })
    it('should do nothing if any pwField still filled', async () => {
      renderWithAllProviders(<Profile />)

      const inputCurrentPW = screen.getByTestId(elements.inputCurrentPW)
      fireEvent.changeText(inputCurrentPW, 'AnyPw')

      fireEvent.press(screen.getByTestId(elements.btnSubmit))

      const formErrors = await screen.findAllByTestId(/-error-text$/)
      expect(formErrors).toHaveLength(1)

      fireEvent(inputCurrentPW, 'blur')

      expect(formErrors).toHaveLength(1)
    })
  })

  describe('onSubmitEditing', () => {
    it('should focus newPW field from  currentPW field', async () => {
      const setFocusMock = jest.fn()

      const mockUseForm = jest.fn(() => {
        const hook = useForm()
        return {
          ...hook,
          setFocus: setFocusMock,
        } as ReturnType<typeof useForm>
      })

      const userFormMock = jest
        .spyOn(RHF, 'useForm')
        .mockImplementation(mockUseForm)

      renderWithAllProviders(<Profile />)

      fireEvent(screen.getByTestId(elements.inputCurrentPW), 'onSubmitEditing')

      await waitFor(() =>
        expect(setFocusMock).toHaveBeenCalledWith('newPassword'),
      )

      userFormMock.mockRestore()
    })
    it('should focus newPW field from  newPW field', async () => {
      const setFocusMock = jest.fn()

      const mockUseForm = jest.fn(() => {
        const hook = useForm()
        return {
          ...hook,
          setFocus: setFocusMock,
        } as ReturnType<typeof useForm>
      })

      const userFormMock = jest
        .spyOn(RHF, 'useForm')
        .mockImplementation(mockUseForm)

      renderWithAllProviders(<Profile />)

      fireEvent(screen.getByTestId(elements.inputNewPW), 'onSubmitEditing')

      await waitFor(() =>
        expect(setFocusMock).toHaveBeenCalledWith('confirmPassword'),
      )

      userFormMock.mockRestore()
    })
    it('should submit the form from confirmPW field', async () => {
      const handleSubmitMock = jest.fn()

      const mockUseForm = jest.fn(() => {
        const hook = useForm()
        return {
          ...hook,
          handleSubmit: handleSubmitMock,
        } as ReturnType<typeof useForm>
      })

      const userFormMock = jest
        .spyOn(RHF, 'useForm')
        .mockImplementation(mockUseForm)

      renderWithAllProviders(<Profile />)

      fireEvent(screen.getByTestId(elements.inputConfirmPW), 'onSubmitEditing')

      await waitFor(() => expect(handleSubmitMock).toHaveBeenCalled())

      userFormMock.mockRestore()
    })
  })

  describe('handleUpdateProfile', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
    it('should do nothing if there is no changes', async () => {
      const { mutateAsync } = usePutUserProfileMutationSpy()
      const { showError } = useToastShowSpy()
      renderWithAllProviders(<Profile />)
      const btnSubmit = screen.getByTestId(elements.btnSubmit)

      // Act
      fireEvent.press(btnSubmit)

      // Assert
      await waitFor(() =>
        expect(btnSubmit.props.accessibilityState.disabled).toBe(true),
      )
      expect(mutateAsync).not.toHaveBeenCalled()
      expect(showError).not.toHaveBeenCalled()
      await waitFor(() =>
        expect(btnSubmit.props.accessibilityState.disabled).toBe(undefined),
      )
    })
    it('should trigger an toast error when the newPw is the same as the currentPW', async () => {
      const { mutateAsync } = usePutUserProfileMutationSpy()
      const { showError } = useToastShowSpy()
      renderWithAllProviders(<Profile />)

      const pwValue = 'samePw'
      fireEvent.changeText(screen.getByTestId(elements.inputCurrentPW), pwValue)
      fireEvent.changeText(screen.getByTestId(elements.inputNewPW), pwValue)
      fireEvent.changeText(screen.getByTestId(elements.inputConfirmPW), pwValue)
      fireEvent.press(screen.getByTestId(elements.btnSubmit))

      await waitFor(() =>
        expect(showError).toBeCalledWith({
          title: 'Old password provided equals new password.',
        }),
      )
      expect(mutateAsync).not.toHaveBeenCalled()
    })

    it('should update only name', async () => {
      const { updateUserProfileMock } = useAuthContextSpy({ user: MockedUser })
      const { mutateAsync } = usePutUserProfileMutationSpy()
      const newName = 'John Snow'
      mutateAsync.mockResolvedValue({ ...MockedUser, name: newName })

      renderWithAllProviders(<Profile />)

      fireEvent.changeText(screen.getByTestId(elements.inputName), newName)
      fireEvent.press(screen.getByTestId(elements.btnSubmit))

      await waitFor(() => expect(mutateAsync).toHaveBeenCalledTimes(1))
      expect(mutateAsync).toHaveBeenLastCalledWith({ name: newName })

      await waitFor(() =>
        expect(updateUserProfileMock).toHaveBeenCalledTimes(1),
      )
      expect(updateUserProfileMock).toHaveBeenLastCalledWith({
        ...MockedUser,
        name: newName,
      })
    })
    it('should update only PW', async () => {
      useAuthContextSpy({ user: MockedUser })
      const { mutateAsync } = usePutUserProfileMutationSpy()
      const setValueMock = jest.fn()

      const mockUseForm = jest.fn(() => {
        const hook = useForm({ defaultValues: { name: MockedUser.name } })
        return {
          ...hook,
          setValue: setValueMock,
        } as any
      })

      const userFormMock = jest
        .spyOn(RHF, 'useForm')
        .mockImplementation(mockUseForm)
      renderWithAllProviders(<Profile />)

      const oldPW = 'samePw'
      const newPW = 'newPWa'
      fireEvent.changeText(screen.getByTestId(elements.inputCurrentPW), oldPW)
      fireEvent.changeText(screen.getByTestId(elements.inputNewPW), newPW)
      fireEvent.changeText(screen.getByTestId(elements.inputConfirmPW), newPW)
      fireEvent.press(screen.getByTestId(elements.btnSubmit))

      await waitFor(() => expect(mutateAsync).toHaveBeenCalledTimes(1))
      expect(mutateAsync.mock.calls[0][0]).toEqual({
        old_password: oldPW,
        password: newPW,
      })
      await waitFor(() => expect(setValueMock).toHaveBeenCalledTimes(3))
      expect(setValueMock.mock.calls[0]).toEqual(['currentPassword', ''])
      expect(setValueMock.mock.calls[1]).toEqual(['newPassword', ''])
      expect(setValueMock.mock.calls[2]).toEqual(['confirmPassword', ''])

      userFormMock.mockRestore()
    })
    it('should update name and PW', async () => {
      const { updateUserProfileMock } = useAuthContextSpy({ user: MockedUser })
      const { mutateAsync } = usePutUserProfileMutationSpy()

      const newName = 'John 1 Snow'
      mutateAsync.mockResolvedValue({ ...MockedUser, name: newName })

      const setValueMock = jest.fn()

      const mockUseForm = jest.fn(() => {
        const hook = useForm({ defaultValues: { name: MockedUser.name } })
        return {
          ...hook,
          setValue: setValueMock,
        } as any
      })

      const userFormMock = jest
        .spyOn(RHF, 'useForm')
        .mockImplementation(mockUseForm)
      renderWithAllProviders(<Profile />)

      const oldPW = 'oldPw'
      const newPW = 'newPWa'
      fireEvent.changeText(screen.getByTestId(elements.inputCurrentPW), oldPW)
      fireEvent.changeText(screen.getByTestId(elements.inputNewPW), newPW)
      fireEvent.changeText(screen.getByTestId(elements.inputConfirmPW), newPW)

      fireEvent.changeText(screen.getByTestId(elements.inputName), newName)
      fireEvent.press(screen.getByTestId(elements.btnSubmit))

      await waitFor(() => expect(mutateAsync).toHaveBeenCalledTimes(1))

      expect(mutateAsync.mock.calls[0][0]).toEqual({
        name: newName,
        old_password: oldPW,
        password: newPW,
      })

      await waitFor(() =>
        expect(updateUserProfileMock).toHaveBeenCalledTimes(1),
      )
      expect(updateUserProfileMock).toHaveBeenLastCalledWith({
        ...MockedUser,
        name: newName,
      })
      await waitFor(() => expect(setValueMock).toHaveBeenCalledTimes(3))
      expect(setValueMock.mock.calls[0]).toEqual(['currentPassword', ''])
      expect(setValueMock.mock.calls[1]).toEqual(['newPassword', ''])
      expect(setValueMock.mock.calls[2]).toEqual(['confirmPassword', ''])

      userFormMock.mockRestore()
    })
  })
})
