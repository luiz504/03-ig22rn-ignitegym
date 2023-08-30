import { fireEvent, render, screen, waitFor } from '~/utils/test-utils'
import { SignIn } from '.'
import { Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RHF, { useForm } from 'react-hook-form'

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
}))

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
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

  beforeEach(() => {
    useNavigationMock()
    jest.clearAllMocks()
  })
  it('should call Keyboard.dismiss when click on the screen background', async () => {
    const keyboardSpy = jest.spyOn(Keyboard, 'dismiss')

    render(<SignIn />)
    const backgroundView = screen.getByTestId('background-view')

    fireEvent.press(backgroundView)

    await waitFor(() => expect(keyboardSpy).toBeCalledTimes(1))
  })

  it('should handle click btn "signUp" screen correctly', () => {
    const { navigate } = useNavigationMock()
    const { keyboardSpy } = useKeyboardSpy()

    render(<SignIn />)
    const signUpBtn = screen.getByTestId('btn-sign-up')

    fireEvent.press(signUpBtn)

    expect(navigate).toBeCalledWith('signUp')
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

    render(<SignIn />)

    // Name Act
    const inputNameElem = screen.getByTestId(elementsIDs.inputEmail)

    fireEvent(inputNameElem, 'onSubmitEditing')

    await waitFor(() => expect(setFocusMock).toBeCalledWith('password'))

    userFormMock.mockRestore()
  })

  // it('should handle signIn correctly', async () => {
  //   const { keyboardSpy } = useKeyboardSpy()

  //   render(<SignIn />)
  //   const signInBtn = screen.getByTestId('btn-sign-in')

  //   fireEvent.press(signInBtn)

  //   await waitFor(() => expect(keyboardSpy).toBeCalledTimes(1))
  // })
})
