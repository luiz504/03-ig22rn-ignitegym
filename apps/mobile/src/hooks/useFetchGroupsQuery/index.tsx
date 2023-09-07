import { useQuery } from '@tanstack/react-query'

import { api } from '~/libs/axios'

import { resolveErrorMessage } from '~/utils/AppError'

import { useAppToast } from '../useAppToast'

export const useFetchGroupsQuery = () => {
  const toast = useAppToast()

  const {
    data: groups = [],
    isLoading: isLoadingGroups,
    ...rest
  } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      try {
        const response = await api.get('/groups')

        return response.data as string[]
      } catch (err) {
        toast.showError({
          title: resolveErrorMessage(err, 'Fail to load Groups.'),
        })

        throw err
      }
    },
  })
  return { groups, isLoadingGroups, ...rest }
}
