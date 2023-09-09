import { useMutation } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'
import { UserDTO } from '~/dtos/UserDTO'
import { useAppToast } from '~/hooks/useAppToast'

import { api } from '~/libs/axios'

import { resolveErrorMessage } from '~/utils/AppError'

export const usePatchUserProfileAvatar = () => {
  const toast = useAppToast()

  const abortControllerRef = useRef<AbortController | null>(null)

  const mutation = useMutation({
    mutationFn: async (data: { name: string; uri: string; type: string }) => {
      abortControllerRef.current = new AbortController()

      const formData = new FormData()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.append('avatar', data as any)

      const response = await api.patch('/users/avatar', formData, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
        signal: abortControllerRef.current.signal,
      })
      return response.data as UserDTO
    },
    onSuccess: () => {
      toast.showSuccess({ title: 'Profile updated successfully.' })
    },
    onError: (error) => {
      const title = resolveErrorMessage(error, 'Fail to update profile.')
      toast.showError({ title })
    },
    retry: false,
  })

  const reset = useCallback(() => {
    abortControllerRef?.current?.abort()
    mutation.reset()
  }, [mutation])

  return { ...mutation, reset }
}
