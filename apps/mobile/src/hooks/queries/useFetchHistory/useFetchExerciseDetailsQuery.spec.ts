import { renderHook, waitFor } from '@testing-library/react-native'

import { NBQueryNavProviders } from '~/utils/test/test-utils'
import { MockedHistoriesByDay } from '~/utils/test'

import { api } from '~/libs/axios'

import * as ModUseAppToast from '~/hooks/useAppToast'

import { useFetchHistory } from '.'

describe('useFetchExercisesDetailsQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should fetch successfully', async () => {
    const apiGetSpy = jest
      .spyOn(api, 'get')
      .mockResolvedValue({ data: MockedHistoriesByDay })

    const { result } = renderHook(() => useFetchHistory(), {
      wrapper: NBQueryNavProviders,
    })

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledTimes(1)
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(apiGetSpy).toHaveBeenCalledWith(`/history`)
    })
    await waitFor(() =>
      expect(result.current.histories).toEqual(MockedHistoriesByDay),
    )
  })
  it('should toast a error message', async () => {
    const apiGetSpy = jest
      .spyOn(api, 'get')
      .mockRejectedValue(new Error('Some Error'))

    const showError = jest.fn()
    jest
      .spyOn(ModUseAppToast, 'useAppToast')
      .mockReturnValue({ showError } as any)

    const { result } = renderHook(() => useFetchHistory(), {
      wrapper: NBQueryNavProviders,
    })

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledTimes(1)
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(apiGetSpy).toHaveBeenCalledWith(`/history`)
    })
    await waitFor(() => expect(result.current.error).toBeTruthy())
    await waitFor(() => {
      expect(showError).toBeCalledTimes(1)
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(showError).toHaveBeenCalledWith({
        title: 'Fail to load History.',
      })
    })
  })
})
