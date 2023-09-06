import { renderHook, waitFor } from '@testing-library/react-native'

import { NBQueryNavProviders } from '~/utils/test/test-utils'
import { MockedExercise } from '~/utils/test'

import { api } from '~/libs/axios'

import * as ModUseAppToast from '~/hooks/useAppToast'

import { useFetchExerciseDetailsQuery } from '.'

describe('useFetchExercisesDetailsQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should fetch successfully', async () => {
    const apiGetSpy = jest
      .spyOn(api, 'get')
      .mockResolvedValue({ data: MockedExercise })

    const { result } = renderHook(
      () => useFetchExerciseDetailsQuery({ exerciseId: MockedExercise.id }),
      {
        wrapper: NBQueryNavProviders,
      },
    )

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledTimes(1)
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(apiGetSpy).toHaveBeenCalledWith(`/exercises/${MockedExercise.id}`)
    })
    await waitFor(() => expect(result.current.exercise).toEqual(MockedExercise))
  })
  it('should toast a error message', async () => {
    const apiGetSpy = jest
      .spyOn(api, 'get')
      .mockRejectedValue(new Error('Some Error'))

    const showError = jest.fn()
    jest.spyOn(ModUseAppToast, 'useAppToast').mockReturnValue({ showError })

    const { result } = renderHook(
      () => useFetchExerciseDetailsQuery({ exerciseId: MockedExercise.id }),
      {
        wrapper: NBQueryNavProviders,
      },
    )

    await waitFor(() => {
      expect(apiGetSpy).toHaveBeenCalledTimes(1)
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(apiGetSpy).toHaveBeenCalledWith(`/exercises/${MockedExercise.id}`)
    })
    await waitFor(() => expect(result.current.error).toBeTruthy())
    await waitFor(() => {
      expect(showError).toBeCalledTimes(1)
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(showError).toHaveBeenCalledWith({
        title: 'Fail to load Exercise Details.',
      })
    })
  })
})
