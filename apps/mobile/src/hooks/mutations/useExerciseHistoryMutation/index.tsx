import { useMutation } from '@tanstack/react-query'
import { useAppToast } from '~/hooks/useAppToast'

import { api } from '~/libs/axios'

import { resolveErrorMessage } from '~/utils/AppError'

type MutationParams = {
  exerciseId: number
}

export const useExerciseHistoryMutation = () => {
  const toast = useAppToast()
  return useMutation({
    mutationFn: async ({ exerciseId }: MutationParams) => {
      await api.post('/history', { exercise_id: exerciseId })
    },
    onSuccess: () => {
      toast.showSuccess({ title: 'Exercise registered successfully.' })
    },
    onError: (error) => {
      const title = resolveErrorMessage(error, 'Exercise registration failed.')
      toast.showError({ title })
    },
  })
}
