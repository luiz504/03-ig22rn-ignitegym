import { useNavigation, useRoute } from '@react-navigation/native'

import {
  screen,
  renderWithAllProviders,
  fireEvent,
  waitFor,
} from '~/utils/test/test-utils'
import { MockedExercise, MockedUser, useAuthContextSpy } from '~/utils/test'

import * as FetchExerciseModule from '~/hooks/queries/useFetchExerciseDetailsQuery'

import { Exercise } from '.'
import { api } from '~/libs/axios'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
}))
describe('Exercise Component', () => {
  const exerciseID = 'someID'

  beforeEach(() => {
    jest.clearAllMocks()
    useAuthContextSpy({ user: MockedUser })
    jest.mocked(useRoute).mockReturnValue({ params: { exerciseID } } as any)
  })

  it('should render correctly', () => {
    jest
      .spyOn(FetchExerciseModule, 'useFetchExerciseDetailsQuery')
      .mockReturnValue({ isLoading: false, exercise: MockedExercise } as any)

    renderWithAllProviders(<Exercise />)

    expect(screen.getByText(MockedExercise.name)).toBeTruthy()
    expect(screen.getByText(MockedExercise.group)).toBeTruthy()
    expect(screen.getByText(`${MockedExercise.series} sets`)).toBeTruthy()
    expect(
      screen.getByText(`${MockedExercise.repetitions} repetitions`),
    ).toBeTruthy()
    expect(screen.getByTestId('demo-image').props.source).toEqual({
      uri: 'undefined/exercise/demo/fake-demo-url',
    })
  })

  it('should show the skeletons when loading', async () => {
    jest.useFakeTimers()

    jest
      .spyOn(FetchExerciseModule, 'useFetchExerciseDetailsQuery')
      .mockReturnValue({ isLoading: true, exercise: null } as any)

    renderWithAllProviders(<Exercise />)

    expect(screen.getByTestId('demo-skeleton')).toBeTruthy()
    expect(screen.getByTestId('series-skeleton')).toBeTruthy()
    expect(screen.getByTestId('repetitions-skeleton')).toBeTruthy()

    // Clean up skeleton animations
    jest.clearAllTimers()
  })

  it('should redirect to history screen on success exercise history registration', async () => {
    jest.useFakeTimers()
    const navigate = jest.fn()

    jest.mocked(useNavigation).mockReturnValue({ navigate } as any)
    jest.spyOn(api, 'post').mockResolvedValue({ success: 200 })
    jest
      .spyOn(FetchExerciseModule, 'useFetchExerciseDetailsQuery')
      .mockReturnValue({ isLoading: false, exercise: MockedExercise } as any)

    renderWithAllProviders(<Exercise />)
    const btnRegister = screen.getByTestId('btn-register')

    fireEvent.press(btnRegister)

    // Act
    await waitFor(() =>
      expect(btnRegister.props.accessibilityState.disabled).toBe(true),
    )
    await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1))
    expect(navigate).toHaveBeenCalledWith('history')
    jest.clearAllTimers()
  })
})
