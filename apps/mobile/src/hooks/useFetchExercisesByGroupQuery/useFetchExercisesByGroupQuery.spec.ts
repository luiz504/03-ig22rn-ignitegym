import { renderHook, waitFor } from '@testing-library/react-native'

import { NBQueryNavProviders } from '~/utils/test/test-utils'
import { MockedExercises } from '~/utils/test'

import { api } from '~/libs/axios'

import * as ModUseAppToast from '~/hooks/useAppToast'

import { useFetchExercisesByGroupQuery } from '.'

describe('useFetchExercisesByGroupQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const groupsName = MockedExercises[0].group
  it('should fetch successfully', async () => {
    const apiGetSpy = jest
      .spyOn(api, 'get')
      .mockResolvedValue({ data: MockedExercises })

    const { result } = renderHook(
      () =>
        useFetchExercisesByGroupQuery({
          groupName: groupsName,
          enabled: true,
        }),
      {
        wrapper: NBQueryNavProviders,
      },
    )

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledTimes(1)
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(apiGetSpy).toHaveBeenCalledWith(`/exercises/byGroup/${groupsName}`)
    })
    await waitFor(() =>
      expect(result.current.exercises).toEqual(MockedExercises),
    )
  })
  it('should toast a error message', async () => {
    const apiGetSpy = jest
      .spyOn(api, 'get')
      .mockRejectedValue(new Error('Some Error'))

    const showError = jest.fn()
    jest.spyOn(ModUseAppToast, 'useAppToast').mockReturnValue({ showError })

    const { result } = renderHook(
      () =>
        useFetchExercisesByGroupQuery({
          groupName: groupsName,
          enabled: true,
        }),
      {
        wrapper: NBQueryNavProviders,
      },
    )

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledTimes(1)
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(apiGetSpy).toHaveBeenCalledWith(`/exercises/byGroup/${groupsName}`)
    })
    await waitFor(() => expect(result.current.error).toBeTruthy())
    expect(showError).toBeCalledTimes(1)
    expect(showError).toHaveBeenCalledWith({
      title: 'Fail to load Exercises from Group.',
    })
  })
})
