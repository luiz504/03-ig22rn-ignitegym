import { api } from '~/libs/axios'
import {
  NBQueryNavProviders,
  act,
  renderHook,
  waitFor,
} from '~/utils/test/test-utils'

import { useExerciseHistoryMutation } from '.'

import * as ModUseAppToast from '~/hooks/useAppToast'

describe('useExerciseHistoryMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should mutate successfully', async () => {
    const showSuccess = jest.fn()
    jest
      .spyOn(ModUseAppToast, 'useAppToast')
      .mockReturnValue({ showSuccess } as any)
    jest.useFakeTimers()
    const apiPostSpy = jest
      .spyOn(api, 'post')
      .mockResolvedValue({ success: 200 })
    const { result } = renderHook(() => useExerciseHistoryMutation(), {
      wrapper: NBQueryNavProviders,
    })

    const exerciseId = 13
    act(() => {
      result.current.mutate({ exerciseId })
    })
    jest.clearAllTimers()

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(apiPostSpy).toHaveBeenCalledTimes(1)
    expect(apiPostSpy).toHaveBeenCalledWith('/history', {
      exercise_id: exerciseId,
    })

    await waitFor(() => expect(showSuccess).toHaveBeenCalledTimes(1))
    expect(showSuccess).toHaveBeenCalledWith({
      title: 'Exercise registered successfully.',
    })
  })
  it('should fetch unsuccessfully', async () => {
    const showError = jest.fn()
    jest
      .spyOn(ModUseAppToast, 'useAppToast')
      .mockReturnValue({ showError } as any)
    jest.useFakeTimers()
    const apiPostSpy = jest
      .spyOn(api, 'post')
      .mockRejectedValue({ success: 400 })
    const { result } = renderHook(() => useExerciseHistoryMutation(), {
      wrapper: NBQueryNavProviders,
    })

    const exerciseId = 13
    act(() => {
      result.current.mutate({ exerciseId })
    })
    jest.clearAllTimers()

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(apiPostSpy).toHaveBeenCalledTimes(1)
    expect(apiPostSpy).toHaveBeenCalledWith('/history', {
      exercise_id: exerciseId,
    })

    await waitFor(() => expect(showError).toHaveBeenCalledTimes(1))
    expect(showError).toHaveBeenCalledWith({
      title: 'Exercise registration failed.',
    })
  })
})
