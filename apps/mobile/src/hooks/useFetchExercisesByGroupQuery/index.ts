import { useQuery } from '@tanstack/react-query'
import { useToast } from 'native-base'
import { ExerciseDTO } from '~/dtos/ExerciseDTO'
import { api } from '~/libs/axios'
import { AppError } from '~/utils/AppError'
import { useRefreshOnFocus } from '../useRefreshOnFocus'

export const useFetchExercisesByGroup = ({
  enabled,
  groupName,
}: {
  enabled: boolean
  groupName?: string
}) => {
  const toast = useToast()

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
        const isAppError = err instanceof AppError
        const title = isAppError
          ? err.message
          : 'Fail to load Exercises from Group.'

        toast.show({ placement: 'top', bg: 'red.500', title })

        throw err
      }
    },
    enabled,
    refetchOnWindowFocus: true,
  })

  useRefreshOnFocus(refetch)

  return { exercises, isLoadingExercises, ...rest }
}
