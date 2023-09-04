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
import { useAuthSpy } from '~/utils/test/test-hooks'
import { AppError } from '~/utils/AppError'

import { SignIn } from '.'

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
}))

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}))

jest.mock('native-base/src/components/composites/Toast', () => ({
  ...jest.requireActual('native-base/src/components/composites/Toast'),
  useToast: jest.fn(),
}))

describe('SignIn Component', () => {
  const elementsIDs = {
    inputEmail: 'input-email',
    inputPassword: 'input-password',

    btnSubmit: 'btn-submit',
  }
  const useNavigationMock = () => {
    const navigate = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate } as any)
    return { navigate }
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
    useAuthSpy()
    useNavigationMock()
    jest.clearAllMocks()
  })
  it('should call Keyboard.dismiss when click on the screen background', async () => {
    const keyboardSpy = jest.spyOn(Keyboard, 'dismiss')

    const three = renderWithAllProviders(<SignIn />).toJSON()
    await waitFor(() => expect(three).toBeTruthy())

    const backgroundView = screen.getByTestId('background-view')

    fireEvent.press(backgroundView)

    await waitFor(() => expect(keyboardSpy).toBeCalledTimes(1))
  })

  it('should handle click btn "signUp" screen correctly', async () => {
    const { navigate } = useNavigationMock()
    const { keyboardSpy } = useKeyboardSpy()

    const three = renderWithAllProviders(<SignIn />).toJSON()
    await waitFor(() => expect(three).toBeTruthy())

    const signUpBtn = screen.getByTestId('btn-sign-up')

    fireEvent.press(signUpBtn)

    await waitFor(() => expect(navigate).toBeCalledWith('signUp'))
    await waitFor(() => expect(keyboardSpy).toBeCalledTimes(1))
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

    const three = renderWithAllProviders(<SignIn />).toJSON()
    await waitFor(() => expect(three).toBeTruthy())

    // Name Act
    const inputNameElem = screen.getByTestId(elementsIDs.inputEmail)

    fireEvent(inputNameElem, 'onSubmitEditing')

    await waitFor(() => expect(setFocusMock).toBeCalledWith('password'))

    userFormMock.mockRestore()
  })

  describe('handleClickSignIn', () => {
    const credentials = {
      email: 'john@example.com',
      password: '123456',
    }
    const fillFormAndSubmit = () => {
      fireEvent.changeText(screen.getByTestId('input-email'), credentials.email)
      fireEvent.changeText(
        screen.getByTestId('input-password'),
        credentials.password,
      )
      fireEvent.press(screen.getByTestId('btn-submit'))
    }
    it('should handle signIn correctly', async () => {
      const { signInMock } = useAuthSpy()
      const { show } = useToastShowSpy()

      renderWithAllProviders(<SignIn />)

      // Act
      fillFormAndSubmit()

      await waitFor(() => expect(signInMock).toBeCalledTimes(1))
      await waitFor(() => expect(show).not.toBeCalled())
    })

    it('should trigger an toast error if occur an AppError', async () => {
      const { signInMock } = useAuthSpy()
      const errorMSG = 'Some Error Message'
      signInMock.mockRejectedValue(new AppError(errorMSG))

      const { show } = useToastShowSpy()

      renderWithAllProviders(<SignIn />)

      // Act
      fillFormAndSubmit()

      await waitFor(() => expect(signInMock).toBeCalledTimes(1))
      await waitFor(() => expect(show).toBeCalledTimes(1))
      await waitFor(() =>
        expect(show).toHaveBeenCalledWith(
          expect.objectContaining({ title: errorMSG }),
        ),
      )
    })
    it('should trigger an toast error if occur a Generic Error', async () => {
      const { signInMock } = useAuthSpy()

      signInMock.mockRejectedValue(new Error('some generic error'))

      const { show } = useToastShowSpy()

      renderWithAllProviders(<SignIn />)

      // Act
      fillFormAndSubmit()

      await waitFor(() => expect(signInMock).toBeCalledTimes(1))
      await waitFor(() => expect(show).toBeCalledTimes(1))
      await waitFor(() =>
        expect(show).toHaveBeenCalledWith(
          expect.objectContaining({ title: 'Fail to login, try again later.' }),
        ),
      )
    })
  })
})
