import { Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RHF, { useForm } from 'react-hook-form'
import * as NativeBaseToast from 'native-base/src/components/composites/Toast'

import {
  fireEvent,
  renderWithAllProviders,
  screen,
  waitFor,
} from '~/utils/test/test-utils'

import { SignUp } from '.'

import { api } from '~/libs/axios'
import { AppError } from '~/utils/AppError'
import { useAuthContextSpy } from '~/utils/test'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}))

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
}))

jest.mock('native-base/src/components/composites/Toast', () => ({
  ...jest.requireActual('native-base/src/components/composites/Toast'),
  useToast: jest.fn(),
}))

describe('SignUp Component', () => {
  const elementsIDs = {
    inputName: 'input-name',
    inputEmail: 'input-email',
    inputPassword: 'input-password',
    inputConfirmPW: 'input-confirm-pw',
    btnSubmit: 'btn-submit',
  }

  const formData = {
    name: 'Luiz Renato',
    email: 'luiz@email.com',
    password: '123456',
    confirmPassword: '123456',
  }

  const useNavigationMock = () => {
    const navigate = jest.fn()
    const goBack = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate, goBack })
    return { navigate, goBack }
  }
  const useKeyboardSpy = () => {
    const keyboardSpy = jest.spyOn(Keyboard, 'dismiss')
    return { keyboardSpy }
  }

  const useToastShowSpy = () => {
    const show = jest.fn()
    jest.mocked(NativeBaseToast.useToast).mockReturnValue({ show } as any)
    return { show }
  }

  beforeEach(() => {
    useAuthContextSpy()
    useNavigationMock()
    jest.clearAllMocks()
  })
  describe('Form validations and side effects', () => {
    it('should call Keyboard.dismiss when click on the screen background', async () => {
      const { keyboardSpy } = useKeyboardSpy()

      renderWithAllProviders(<SignUp />)
      const backgroundView = screen.getByTestId('background-view')

      fireEvent.press(backgroundView)

      await waitFor(() => expect(keyboardSpy).toBeCalledTimes(1))
    })

    it('should handle click btn "Go back to sign in" screen correctly', async () => {
      const { goBack } = useNavigationMock()
      const { keyboardSpy } = useKeyboardSpy()

      const three = renderWithAllProviders(<SignUp />).toJSON()
      await waitFor(() => expect(three).toBeTruthy())

      const signUpBtn = screen.getByTestId('btn-go-back-sign-in')
      fireEvent.press(signUpBtn)

      expect(goBack).toBeCalledTimes(1)
      expect(keyboardSpy).toBeCalledTimes(1)
    })

    it('should trigger setFocus to next input until trigger submit', async () => {
      const setFocusMock = jest.fn()
      const handleSubmitMock = jest.fn()

      const mockUseForm = jest.fn(() => {
        const hook = useForm()
        return {
          ...hook,
          setFocus: setFocusMock,
          handleSubmit: handleSubmitMock,
        } as ReturnType<typeof useForm>
      })

      const userFormMock = jest
        .spyOn(RHF, 'useForm')
        .mockImplementation(mockUseForm)

      renderWithAllProviders(<SignUp />)

      // Name Act
      const inputNameElem = screen.getByTestId(elementsIDs.inputName)

      fireEvent(inputNameElem, 'onSubmitEditing')

      await waitFor(() => expect(setFocusMock).toBeCalledWith('email'))
      setFocusMock.mockClear()

      // Email Act
      const inputEmailElem = screen.getByTestId(elementsIDs.inputEmail)
      fireEvent(inputEmailElem, 'onSubmitEditing')

      await waitFor(() => expect(setFocusMock).toBeCalledWith('password'))
      setFocusMock.mockClear()

      // Password Act
      const inputPwElem = screen.getByTestId(elementsIDs.inputPassword)
      fireEvent(inputPwElem, 'onSubmitEditing')

      await waitFor(() =>
        expect(setFocusMock).toBeCalledWith('confirmPassword'),
      )
      setFocusMock.mockClear()
      userFormMock.mockRestore()
    })

    it('should trigger a custom error message when the passwords does not match', async () => {
      renderWithAllProviders(<SignUp />)
      fireEvent.changeText(
        screen.getByTestId(elementsIDs.inputName),
        formData.name,
      )
      fireEvent.changeText(
        screen.getByTestId(elementsIDs.inputEmail),
        formData.email,
      )
      fireEvent.changeText(
        screen.getByTestId(elementsIDs.inputPassword),
        formData.password,
      )
      fireEvent.changeText(
        screen.getByTestId(elementsIDs.inputConfirmPW),
        formData.password + '123',
      )
      fireEvent.press(screen.getByTestId(elementsIDs.btnSubmit))

      expect(await screen.findByText('Passwords does not match.')).toBeVisible()
    })
  })

  describe('handleSignUp', () => {
    const fillAndSubmitForm = () => {
      fireEvent.changeText(
        screen.getByTestId(elementsIDs.inputName),
        formData.name,
      )
      fireEvent.changeText(
        screen.getByTestId(elementsIDs.inputEmail),
        formData.email,
      )
      fireEvent.changeText(
        screen.getByTestId(elementsIDs.inputPassword),
        formData.confirmPassword,
      )
      fireEvent.changeText(
        screen.getByTestId(elementsIDs.inputConfirmPW),
        formData.confirmPassword,
      )
      fireEvent.press(screen.getByTestId('btn-submit'))
    }
    it('should handle SignUp correctly', async () => {
      const { signInMock } = useAuthContextSpy()
      signInMock.mockResolvedValue(undefined)

      const registerApiSpy = jest
        .spyOn(api, 'post')
        .mockResolvedValue(undefined)
      const { show } = useToastShowSpy()
      renderWithAllProviders(<SignUp />)

      // Act
      fillAndSubmitForm()

      await waitFor(() => {
        expect(registerApiSpy).toBeCalledTimes(1)
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(registerApiSpy).toBeCalledWith('/users', {
          email: formData.email,
          name: formData.name,
          password: formData.password,
        })
      })
      await waitFor(() => {
        expect(signInMock).toBeCalledTimes(1)

        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(signInMock).toBeCalledWith({
          email: formData.email,
          password: formData.password,
        })
      })

      await waitFor(() => expect(show).not.toBeCalled())
    })

    it('should redirect to SignIn screen if the signIn fails', async () => {
      const { signInMock } = useAuthContextSpy()
      signInMock.mockRejectedValue('dd')
      const { navigate } = useNavigationMock()
      const registerApiSpy = jest
        .spyOn(api, 'post')
        .mockResolvedValue(undefined)
      const { show } = useToastShowSpy()
      renderWithAllProviders(<SignUp />)

      // Act
      fillAndSubmitForm()

      await waitFor(() => {
        expect(registerApiSpy).toBeCalledTimes(1)
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(registerApiSpy).toBeCalledWith('/users', {
          email: formData.email,
          name: formData.name,
          password: formData.password,
        })
      })
      await waitFor(() => {
        expect(signInMock).toBeCalledTimes(1)

        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(signInMock).toBeCalledWith({
          email: formData.email,
          password: formData.password,
        })
      })
      await waitFor(() => expect(navigate).toBeCalledWith('signIn'))

      await waitFor(() => expect(show).not.toBeCalled())
    })

    it('should trigger an toast error if occur an AppError', async () => {
      const errorMSG = 'Some Error Message'
      const registerApiSpy = jest
        .spyOn(api, 'post')
        .mockRejectedValue(new AppError(errorMSG))
      const { show } = useToastShowSpy()
      renderWithAllProviders(<SignUp />)

      // Act
      fillAndSubmitForm()

      await waitFor(() => {
        expect(registerApiSpy).toBeCalledTimes(1)
      })

      await waitFor(() => expect(show).toHaveBeenCalledTimes(1))
      await waitFor(() =>
        expect(show).toHaveBeenCalledWith(
          expect.objectContaining({ title: errorMSG }),
        ),
      )
    })

    it('should trigger an toast error if occur a Generic Error', async () => {
      const registerApiSpy = jest
        .spyOn(api, 'post')
        .mockRejectedValue(new Error('some generic error'))
      const { show } = useToastShowSpy()
      renderWithAllProviders(<SignUp />)

      // Act
      fillAndSubmitForm()

      await waitFor(() => {
        expect(registerApiSpy).toBeCalledTimes(1)
      })

      await waitFor(() => expect(show).toHaveBeenCalledTimes(1))
      await waitFor(() =>
        expect(show).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Fail to create account, try again later.',
          }),
        ),
      )
    })
  })
})
