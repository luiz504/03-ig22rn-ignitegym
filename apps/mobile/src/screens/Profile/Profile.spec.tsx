/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { fireEvent, render, screen, waitFor } from '~/utils/test/test-utils'
import { Profile } from '.'
import * as ImagePicker from 'expo-image-picker'
import * as NativeBaseToast from 'native-base/src/components/composites/Toast'
import * as FileSystem from 'expo-file-system'

jest.mock('native-base/src/components/composites/Toast', () => ({
  ...jest.requireActual('native-base/src/components/composites/Toast'),
  useToast: jest.fn(),
}))

describe('Profile Component', () => {
  const btnChangePhotoID = 'btn-change-photo'
  const imgUserPhotoID = 'img-user-photo'

  const useFileSystemSpy = () => ({
    getInfoAsync: jest.spyOn(FileSystem, 'getInfoAsync'),
  })
  const useToastShowSpy = () => {
    const show = jest.fn()
    jest.mocked(NativeBaseToast.useToast).mockReturnValue({ show } as any)
    return { show }
  }

  beforeEach(() => {
    jest.clearAllMocks()

    // jest.mocked(useToast).mockReturnValue(toastMock as any)
  })
  it('should render correctly', () => {
    render(<Profile />)
  })

  describe('Change Photo', () => {
    it('should abort the process correctly when the user close/abort the ImagePicker', async () => {
      const imagePickerSpy = jest
        .spyOn(ImagePicker, 'launchImageLibraryAsync')
        .mockResolvedValue({ canceled: true, assets: null })

      const { getInfoAsync } = useFileSystemSpy()

      render(<Profile />)

      const changePhotoBtn = screen.getByTestId(btnChangePhotoID)

      fireEvent.press(changePhotoBtn)

      // Assert
      expect(changePhotoBtn).toBeDisabled()
      expect(imagePickerSpy).toHaveBeenCalledTimes(1)
      expect(imagePickerSpy).toBeCalledWith({
        allowsEditing: true,
        allowsMultipleSelection: false,
        aspect: [4, 4],
        mediaTypes: 'Images',
        quality: 1,
      })
      expect(getInfoAsync).not.toBeCalled()

      await waitFor(() => expect(changePhotoBtn).not.toBeDisabled())
    })

    it('should trigger an Error Toast if some generic Error occurs', async () => {
      const { show } = useToastShowSpy()

      const imagePickerSpy = jest
        .spyOn(ImagePicker, 'launchImageLibraryAsync')
        .mockRejectedValue(true)

      render(<Profile />)

      const changePhotoBtn = screen.getByTestId(btnChangePhotoID)

      fireEvent.press(changePhotoBtn)
      await waitFor(() => expect(changePhotoBtn).toBeDisabled())

      expect(imagePickerSpy).toHaveBeenCalledTimes(1)
      expect(show).toHaveBeenCalledTimes(1)

      await waitFor(() => expect(changePhotoBtn).not.toBeDisabled())
    })

    it('should abort the process if the selected photo URI does not exist', async () => {
      const imagePickerSpy = jest
        .spyOn(ImagePicker, 'launchImageLibraryAsync')
        .mockResolvedValue({
          canceled: false,
          assets: [{ uri: '' } as any],
        })
      const { getInfoAsync } = useFileSystemSpy()

      render(<Profile />)

      const changePhotoBtn = screen.getByTestId(btnChangePhotoID)

      fireEvent.press(changePhotoBtn)

      // Assert
      expect(changePhotoBtn).toBeDisabled()

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

      await waitFor(() => expect(changePhotoBtn).not.toBeDisabled())
    })

    it('should abort the process if the selected photo URI does not exist', async () => {
      const imagePickerSpy = jest
        .spyOn(ImagePicker, 'launchImageLibraryAsync')
        .mockResolvedValue({
          canceled: false,
          assets: [{ uri: '' } as any],
        })
      const { getInfoAsync } = useFileSystemSpy()

      render(<Profile />)

      const changePhotoBtn = screen.getByTestId(btnChangePhotoID)

      fireEvent.press(changePhotoBtn)

      // Assert
      expect(changePhotoBtn).toBeDisabled()

      await waitFor(() => {
        expect(imagePickerSpy).toHaveBeenCalledTimes(1)
      })

      expect(getInfoAsync).not.toBeCalled()

      await waitFor(() => expect(changePhotoBtn).not.toBeDisabled())
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

      render(<Profile />)

      const previousPhotoURI =
        screen.getByTestId(imgUserPhotoID).props.source.uri

      const changePhotoBtn = screen.getByTestId(btnChangePhotoID)

      fireEvent.press(changePhotoBtn)

      // Assert
      expect(changePhotoBtn).toBeDisabled()
      await waitFor(() => {
        expect(imagePickerSpy).toHaveBeenCalledTimes(1)
      })

      await waitFor(() => {
        expect(getInfoAsyncSpy).toHaveBeenCalledTimes(1)
        expect(getInfoAsyncSpy).toHaveBeenCalledWith(uri)
      })

      await waitFor(() => expect(changePhotoBtn).not.toBeDisabled())
      expect(screen.getByTestId(imgUserPhotoID).props.source.uri).toEqual(
        previousPhotoURI,
      )
    })

    it('should abort the process if the image > 5mb, and Toast the user', async () => {
      const { show } = useToastShowSpy()

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

      render(<Profile />)

      const previousPhotoURI =
        screen.getByTestId(imgUserPhotoID).props.source.uri

      const changePhotoBtn = screen.getByTestId(btnChangePhotoID)

      fireEvent.press(changePhotoBtn)

      // Assert
      await waitFor(() => {
        expect(show).toHaveBeenCalledTimes(1)
      })

      await waitFor(() => expect(changePhotoBtn).not.toBeDisabled())
      expect(screen.getByTestId(imgUserPhotoID).props.source.uri).toEqual(
        previousPhotoURI,
      )
    })

    it('should set the new file uri on the userImage', async () => {
      const uri = 'some-photo-uri'
      jest.spyOn(ImagePicker, 'launchImageLibraryAsync').mockResolvedValue({
        canceled: false,
        assets: [{ uri } as any],
      })

      jest.spyOn(FileSystem, 'getInfoAsync').mockResolvedValue({
        exists: true,
        isDirectory: false,
        size: 3 * 1024 * 1024,
      } as any)

      render(<Profile />)

      const changePhotoBtn = screen.getByTestId(btnChangePhotoID)

      fireEvent.press(changePhotoBtn)

      // Assert

      await waitFor(() => expect(changePhotoBtn).not.toBeDisabled())
      await waitFor(() => {
        expect(screen.getByTestId(imgUserPhotoID).props.source.uri).toEqual(uri)
      })
    })
  })
})
