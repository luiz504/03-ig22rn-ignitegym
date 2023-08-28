import { fireEvent, render, screen } from '~/utils/test-utils'
import { Header } from '.'
import { useNavigation } from '@react-navigation/native'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}))

describe('Header Component', () => {
  const useNavigationMock = () => {
    const goBack = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ goBack } as any)
    return { goBack }
  }
  it('should navigate to previous screen correctly ', () => {
    const { goBack } = useNavigationMock()
    render(<Header />)

    fireEvent.press(screen.getByTestId('btn-go-back'))

    expect(goBack).toHaveBeenCalledTimes(1)
  })
})
