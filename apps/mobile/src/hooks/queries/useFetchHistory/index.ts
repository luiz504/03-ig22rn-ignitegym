import { useQuery } from '@tanstack/react-query'

import { api } from '~/libs/axios'

import { resolveErrorMessage } from '~/utils/AppError'

import { useAppToast } from '~/hooks/useAppToast'
import { useRefreshOnFocus } from '~/hooks/useRefreshOnFocus'
import { HistoryByDayDTO } from '~/dtos/HistoryByDayDTO'

export const useFetchHistory = () => {
  const toast = useAppToast()

  const {
    data: histories = [],
    refetch,
    ...rest
  } = useQuery({
    queryKey: ['exercise-history'],
    queryFn: async () => {
      try {
        const response = await api.get(`/history`)
        return response.data as HistoryByDayDTO[]
      } catch (err) {
        toast.showError({
          title: resolveErrorMessage(err, 'Fail to load History.'),
        })

        throw err
      }
    },
    refetchOnWindowFocus: true,
  })

  useRefreshOnFocus(refetch)

  return { histories, ...rest }
}
