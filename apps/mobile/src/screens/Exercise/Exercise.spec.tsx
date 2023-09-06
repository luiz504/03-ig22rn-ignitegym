import { useRoute } from '@react-navigation/native'

import { screen, renderWithAllProviders } from '~/utils/test/test-utils'
import { MockedExercise, MockedUser, useAuthContextSpy } from '~/utils/test'

import * as FetchExerciseModule from '~/hooks/useFetchExerciseDetailsQuery'

import { Exercise } from '.'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn(),
}))
describe('Exercise Component', () => {
  const exerciseID = 'someID'

  beforeEach(() => {
    jest.clearAllMocks()
    useAuthContextSpy({ user: MockedUser })
    jest.mocked(useRoute).mockReturnValue({ params: { exerciseID } } as any)
  })

  it('should render correctly', () => {
    useAuthContextSpy({ user: MockedUser, isLoadingData: false })
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
    useAuthContextSpy({ user: MockedUser, isLoadingData: false })
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
})
