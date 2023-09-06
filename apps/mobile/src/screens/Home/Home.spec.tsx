import { renderWithAllProviders, screen } from '~/utils/test/test-utils'
import { Home } from '.'
import * as UseFetchGroupsModule from '~/hooks/useFetchGroupsQuery'
import * as UseFetchExercisesModule from '~/hooks/useFetchExercisesByGroupQuery'

import {
  MockedExercises,
  MockedGroups,
  MockedUser,
  useAuthContextSpy,
} from '~/utils/test'

describe('Home Component', () => {
  it('should render correctly', async () => {
    jest
      .spyOn(UseFetchGroupsModule, 'useFetchGroupsQuery')
      .mockReturnValue({ groups: MockedGroups, isLoadingGroups: false } as any)
    jest
      .spyOn(UseFetchExercisesModule, 'useFetchExercisesByGroupQuery')
      .mockReturnValue({
        exercises: MockedExercises,
        isLoadingExercises: false,
      } as any)
    useAuthContextSpy({ user: MockedUser })
    renderWithAllProviders(<Home />)

    await screen.findByTestId('home-container')
  })
})
