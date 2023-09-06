import {
  fireEvent,
  renderWithNBNavProviders,
  screen,
} from '~/utils/test/test-utils'
import { Header, HeaderSkeleton } from '.'
import { useNavigation } from '@react-navigation/native'
import { MockedExercise } from '~/utils/test'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}))

describe('Header Exercise Screen', () => {
  const useNavigationMock = () => {
    const goBack = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ goBack } as any)
    return { goBack }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('Header Component', () => {
    const props = {
      name: MockedExercise.name,
      group: MockedExercise.group,
      isLoading: false,
    }
    it('should navigate to previous screen correctly ', async () => {
      const { goBack } = useNavigationMock()
      renderWithNBNavProviders(<Header {...props} />)

      fireEvent.press(screen.getByTestId('btn-go-back'))

      expect(goBack).toHaveBeenCalledTimes(1)
    })

    it('should render the exercise name and group correctly', () => {
      renderWithNBNavProviders(<Header {...props} />)

      expect(screen.getByText(props.name)).toBeTruthy()
      expect(screen.getByText(props.group)).toBeTruthy()
    })
  })

  describe('Header Skeleton Component', () => {
    it('should navigate to previous screen correctly ', async () => {
      jest.useFakeTimers()
      const { goBack } = useNavigationMock()
      renderWithNBNavProviders(<HeaderSkeleton />)

      fireEvent.press(screen.getByTestId('btn-go-back'))

      expect(goBack).toHaveBeenCalledTimes(1)

      // cleanup Skeleton timers
      jest.clearAllTimers()
    })
  })
})
