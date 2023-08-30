import { fireEvent, render, screen, waitFor } from '~/utils/test-utils'
import { SignUp } from '.'
import { Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}))

describe('SignUp Component', () => {
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

  // it('should handle SignUp correctly', async () => {
  //   const { keyboardSpy } = useKeyboardSpy()

  //   render(<SignUp />)
  //   const signInBtn = screen.getByTestId('btn-sign-up')

  //   fireEvent.press(signInBtn)

  //   await waitFor(() => expect(keyboardSpy).toBeCalledTimes(1))
  // })
})
