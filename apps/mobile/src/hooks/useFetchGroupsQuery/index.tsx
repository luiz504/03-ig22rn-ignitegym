import { useQuery } from '@tanstack/react-query'
import { useToast } from 'native-base'
import { api } from '~/libs/axios'
import { AppError } from '~/utils/AppError'

export const useFetchGroupsQuery = () => {
  const toast = useToast()

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
        const isAppError = err instanceof AppError
        const title = isAppError ? err.message : 'Fail to load Groups.'

        toast.show({ placement: 'top', bg: 'red.500', title })

        throw err
      }
    },
  })
  return { groups, isLoadingGroups, ...rest }
}
