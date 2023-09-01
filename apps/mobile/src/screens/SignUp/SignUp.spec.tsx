import { fireEvent, render, screen, waitFor } from '~/utils/test-utils'
import { SignUp } from '.'
import { Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RHF, { useForm } from 'react-hook-form'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}))

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
}))

describe('SignUp Component', () => {
  const elementsIDs = {
    inputName: 'input-name',
    inputEmail: 'input-email',
    inputPassword: 'input-password',
    inputConfirmPW: 'input-confirm-pw',
    btnSubmit: 'btn-submit',
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

  beforeEach(() => {
    useNavigationMock()
    jest.clearAllMocks()
  })
  it('should call Keyboard.dismiss when click on the screen background', async () => {
    const keyboardSpy = jest.spyOn(Keyboard, 'dismiss')

    render(<SignUp />)
    const backgroundView = screen.getByTestId('background-view')

    fireEvent.press(backgroundView)

    await waitFor(() => expect(keyboardSpy).toBeCalledTimes(1))
  })

  it('should handle click btn "Go back to sign in" screen correctly', () => {
    const { goBack } = useNavigationMock()
    const { keyboardSpy } = useKeyboardSpy()

    render(<SignUp />)
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

    render(<SignUp />)

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

    await waitFor(() => expect(setFocusMock).toBeCalledWith('confirmPassword'))
    setFocusMock.mockClear()
    userFormMock.mockRestore()
  })

  it('should trigger a custom error message when the passwords does not match', async () => {
    render(<SignUp />)
    fireEvent.changeText(screen.getByTestId(elementsIDs.inputName), 'John Doe')
    fireEvent.changeText(
      screen.getByTestId(elementsIDs.inputEmail),
      'JohnDoe@email.com',
    )
    fireEvent.changeText(
      screen.getByTestId(elementsIDs.inputPassword),
      '123456',
    )
    fireEvent.changeText(
      screen.getByTestId(elementsIDs.inputConfirmPW),
      '1234566',
    )
    fireEvent.press(screen.getByTestId(elementsIDs.btnSubmit))

    expect(await screen.findByText('Passwords does not match.')).toBeVisible()
  })

  // it('should handle SignUp correctly', async () => {
  //   const { keyboardSpy } = useKeyboardSpy()

  //   render(<SignUp />)
  //   const signInBtn = screen.getByTestId('btn-sign-up')

  //   fireEvent.press(signInBtn)

  //   await waitFor(() => expect(keyboardSpy).toBeCalledTimes(1))
  // })
})
