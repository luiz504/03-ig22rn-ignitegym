import { renderHook, waitFor } from '@testing-library/react-native'

import { MockedGroups } from '~/utils/test'
import { NBQueryNavProviders } from '~/utils/test/test-utils'

import { api } from '~/libs/axios'

import * as ModUseAppToast from '~/hooks/useAppToast'

import { useFetchGroupsQuery } from '.'

describe('useFetchGroupsQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch successfully', async () => {
    const apiGetSpy = jest
      .spyOn(api, 'get')
      .mockResolvedValue({ data: MockedGroups })

    const { result } = renderHook(() => useFetchGroupsQuery(), {
      wrapper: NBQueryNavProviders,
    })

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledTimes(1)
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(apiGetSpy).toHaveBeenCalledWith(`/groups`)
    })
    await waitFor(() => expect(result.current.groups).toEqual(MockedGroups))
  })
  it('should toast a error message', async () => {
    const apiGetSpy = jest
      .spyOn(api, 'get')
      .mockRejectedValue(new Error('Some Error'))

    const showError = jest.fn()
    jest.spyOn(ModUseAppToast, 'useAppToast').mockReturnValue({ showError })

    const { result } = renderHook(() => useFetchGroupsQuery(), {
      wrapper: NBQueryNavProviders,
    })

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledTimes(1)
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(apiGetSpy).toHaveBeenCalledWith(`/groups`)
    })
    await waitFor(() => expect(result.current.error).toBeTruthy())
    expect(showError).toBeCalledTimes(1)
    expect(showError).toHaveBeenCalledWith({
      title: 'Fail to load Groups.',
    })
  })
})
