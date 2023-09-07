import { useQuery } from '@tanstack/react-query'

import { api } from '~/libs/axios'

import { resolveErrorMessage } from '~/utils/AppError'

import { useRefreshOnFocus } from '../useRefreshOnFocus'
import { useAppToast } from '../useAppToast'

import { ExerciseDTO } from '~/dtos/ExerciseDTO'
export const useFetchExerciseDetailsQuery = ({
  exerciseId,
}: {
  exerciseId: number
}) => {
  const toast = useAppToast()

  const {
    data: exercise,
    refetch,
    ...rest
  } = useQuery({
    queryKey: ['exercise-details', { exerciseId }],
    queryFn: async () => {
      try {
        const response = await api.get(`/exercises/${exerciseId}`)
        return response.data as ExerciseDTO
      } catch (err) {
        toast.showError({
          title: resolveErrorMessage(err, 'Fail to load Exercise Details.'),
        })

        throw err
      }
    },
    refetchOnWindowFocus: true,
  })

  useRefreshOnFocus(refetch)

  return { exercise, ...rest }
}
