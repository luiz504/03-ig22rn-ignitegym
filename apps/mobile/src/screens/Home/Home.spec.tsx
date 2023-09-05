import {
  cleanup,
  renderWithAllProviders,
  screen,
} from '~/utils/test/test-utils'
import { Home } from '.'
import { useAuthSpy, MockedUser, MockedToken } from '~/utils/test/test-hooks'
import * as UseFetchGroupsModule from '~/hooks/useFetchGroupsQuery'
import * as UseFetchExercisesModule from '~/hooks/useFetchExercisesByGroupQuery'
import { ExerciseDTO } from '~/dtos/ExerciseDTO'

describe('Home Component', () => {
  const mockGroups = ['Batata']
  const mockExercises: ExerciseDTO[] = []
  it('should render correctly', async () => {
    jest
      .spyOn(UseFetchGroupsModule, 'useFetchGroupsQuery')
      .mockReturnValue({ groups: mockGroups, isLoadingGroups: false } as any)
    jest
      .spyOn(UseFetchExercisesModule, 'useFetchExercisesByGroup')
      .mockReturnValue({
        exercises: mockExercises,
        isLoadingExercises: false,
      } as any)
    useAuthSpy({ user: MockedUser, token: MockedToken })
    renderWithAllProviders(<Home />)

    await screen.findByTestId('home-container')
    cleanup()
  })
})
