import { useQuery } from '@tanstack/react-query'

import { api } from '~/libs/axios'

import { resolveErrorMessage } from '~/utils/AppError'

import { useRefreshOnFocus } from '../useRefreshOnFocus'
import { useAppToast } from '../useAppToast'

import { ExerciseDTO } from '~/dtos/ExerciseDTO'
export const useFetchExercisesByGroupQuery = ({
  enabled,
  groupName,
}: {
  enabled: boolean
  groupName?: string
}) => {
  const toast = useAppToast()

  const {
    data: exercises = [],
    isLoading: isLoadingExercises,
    refetch,
    ...rest
  } = useQuery({
    queryKey: ['exercises', { groupName }],
    queryFn: async () => {
      try {
        const response = await api.get(`/exercises/byGroup/${groupName}`)
        return response.data as ExerciseDTO[]
      } catch (err) {
        toast.showError({
          title: resolveErrorMessage(err, 'Fail to load Exercises from Group.'),
        })

        throw err
      }
    },
    enabled,
    refetchOnWindowFocus: true,
  })

  useRefreshOnFocus(refetch)

  return { exercises, isLoadingExercises, ...rest }
}
