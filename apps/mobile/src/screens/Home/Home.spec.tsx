import {
  fireEvent,
  renderWithAllProviders,
  screen,
  waitFor,
} from '~/utils/test/test-utils'
import { Home } from '.'
import * as UseFetchGroupsModule from '~/hooks/useFetchGroupsQuery'
import * as UseFetchExercisesModule from '~/hooks/useFetchExercisesByGroupQuery'

import {
  MockedExercises,
  MockedGroups,
  MockedUser,
  useAuthContextSpy,
} from '~/utils/test'
import { useNavigation } from '@react-navigation/native'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}))

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useAuthContextSpy({ user: MockedUser })
  })
  const useFetchGroupsQuerySpy = () =>
    jest.spyOn(UseFetchGroupsModule, 'useFetchGroupsQuery')

  const useFetchExercisesByGroupQuerySpy = () =>
    jest.spyOn(UseFetchExercisesModule, 'useFetchExercisesByGroupQuery')
  it('should render correctly when loaded', async () => {
    useFetchGroupsQuerySpy().mockReturnValue({
      groups: MockedGroups,
      isLoadingGroups: false,
    } as any)

    useFetchExercisesByGroupQuerySpy().mockReturnValue({
      exercises: MockedExercises,
      isLoadingExercises: false,
    } as any)

    renderWithAllProviders(<Home />)

    await screen.findByTestId('home-container')

    expect(screen.getAllByTestId(/group-card-.*/)).toHaveLength(
      MockedGroups.length,
    )
    expect(screen.getAllByTestId(/exercise-card-.*/)).toHaveLength(
      MockedExercises.length,
    )
  })

  it('should render the groups and exercise skeletons when loading', async () => {
    jest.useFakeTimers()
    useFetchGroupsQuerySpy().mockReturnValue({
      groups: [],
      isLoadingGroups: true,
    } as any)

    useFetchExercisesByGroupQuerySpy().mockReturnValue({
      exercises: [],
      isLoadingExercises: true,
    } as any)

    renderWithAllProviders(<Home />)

    expect(screen.getByTestId('group-skeleton')).toBeTruthy()
    expect(screen.getByTestId('exercises-skeleton')).toBeTruthy()
    jest.clearAllTimers()
  })

  it('should navigate to the Exercise screen correctly', async () => {
    const navigate = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate } as any)

    useFetchGroupsQuerySpy().mockReturnValue({
      groups: MockedGroups,
      isLoadingGroups: false,
    } as any)

    useFetchExercisesByGroupQuerySpy().mockReturnValue({
      exercises: MockedExercises,
      isLoadingExercises: false,
    } as any)

    renderWithAllProviders(<Home />)
    const firstExerciseId = MockedExercises[0].id
    const firstExerciseCard = screen.getByTestId(
      `exercise-card-${firstExerciseId}`,
    )

    fireEvent.press(firstExerciseCard)

    await waitFor(() => expect(navigate).toBeCalledTimes(1))
    await waitFor(() =>
      expect(navigate).toBeCalledWith('exercise', {
        exerciseId: firstExerciseId,
      }),
    )
  })

  it('should select groups and show its exercises', async () => {
    useFetchGroupsQuerySpy().mockReturnValue({
      groups: MockedGroups,
      isLoadingGroups: false,
    } as any)

    const exercisesQuery = useFetchExercisesByGroupQuerySpy().mockReturnValue({
      exercises: MockedExercises,
      isLoadingExercises: false,
    } as any)

    renderWithAllProviders(<Home />)

    const firstGroupName = MockedGroups[0]
    const secondGroupName = MockedGroups[1]
    const firstGroupCard = screen.getByTestId(`group-card-${firstGroupName}`)
    const secondGroupCard = screen.getByTestId(`group-card-${secondGroupName}`)

    expect(firstGroupCard.props.accessibilityState.selected).toBe(true)
    expect(secondGroupCard.props.accessibilityState.selected).toBe(false)

    expect(exercisesQuery).toHaveBeenCalledWith(
      expect.objectContaining({ groupName: firstGroupName }),
    )

    fireEvent.press(secondGroupCard)

    await waitFor(() =>
      expect(secondGroupCard.props.accessibilityState.selected).toBe(true),
    )

    expect(firstGroupCard.props.accessibilityState.selected).toBe(false)
    expect(exercisesQuery).toHaveBeenCalledWith(
      expect.objectContaining({ groupName: secondGroupName }),
    )
    expect(exercisesQuery).toHaveBeenCalledTimes(2)
  })
})
