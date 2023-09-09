import { useMutation } from '@tanstack/react-query'
import { useAppToast } from '~/hooks/useAppToast'

import { api } from '~/libs/axios'

import { resolveErrorMessage } from '~/utils/AppError'

type MutationParams = {
  name?: string
  password?: string
  old_password?: string
}

export const usePutUserProfileMutation = () => {
  const toast = useAppToast()

  return useMutation({
    mutationFn: async (data: MutationParams) => {
      await api.put('/users', data)
    },
    onSuccess: () => {
      toast.showSuccess({ title: 'Profile updated successfully.' })
    },
    onError: (error) => {
      const title = resolveErrorMessage(error, 'Fail to update profile.')
      toast.showError({ title })
    },
  })
}
