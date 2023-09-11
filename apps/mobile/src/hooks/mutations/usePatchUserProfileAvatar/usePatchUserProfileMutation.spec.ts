import { api } from '~/libs/axios'
import {
  NBQueryNavProviders,
  act,
  renderHook,
  waitFor,
} from '~/utils/test/test-utils'

import { usePatchUserProfileAvatar } from '.'

import * as ModUseAppToast from '~/hooks/useAppToast'
import * as RQ from '@tanstack/react-query'

describe('usePatchUserProfileMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const data = {
    name: 'fileName',
    uri: 'someFileURI',
    type: 'some/type',
  }

  const response = new FormData()
  response.append('avatar', data as any)

  it('should mutate when passing only the name successfully', async () => {
    const showSuccess = jest.fn()
    jest
      .spyOn(ModUseAppToast, 'useAppToast')
      .mockReturnValue({ showSuccess } as any)
    jest.useFakeTimers()
    const apiPostSpy = jest
      .spyOn(api, 'patch')
      .mockResolvedValue({ success: 200 })
    const { result } = renderHook(() => usePatchUserProfileAvatar(), {
      wrapper: NBQueryNavProviders,
    })

    act(() => {
      result.current.mutate(data)
    })
    jest.clearAllTimers()

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(apiPostSpy).toHaveBeenCalledTimes(1)
    expect(apiPostSpy).toHaveBeenCalledWith(
      '/users/avatar',
      response,
      expect.any(Object),
    )

    await waitFor(() => expect(showSuccess).toHaveBeenCalledTimes(1))
    expect(showSuccess).toHaveBeenCalledWith({
      title: 'Profile updated successfully.',
    })
  })

  it('should fetch unsuccessfully', async () => {
    const showError = jest.fn()
    jest
      .spyOn(ModUseAppToast, 'useAppToast')
      .mockReturnValue({ showError } as any)
    jest.useFakeTimers()
    const apiPostSpy = jest
      .spyOn(api, 'patch')
      .mockRejectedValue({ success: 400 })
    const { result } = renderHook(() => usePatchUserProfileAvatar(), {
      wrapper: NBQueryNavProviders,
    })

    act(() => {
      result.current.mutate(data)
    })
    jest.clearAllTimers()

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(apiPostSpy).toHaveBeenCalledTimes(1)
    expect(apiPostSpy).toHaveBeenCalledWith(
      '/users/avatar',
      response,
      expect.any(Object),
    )

    await waitFor(() => expect(showError).toHaveBeenCalledTimes(1))
    expect(showError).toHaveBeenCalledWith({
      title: 'Fail to update profile.',
    })
  })

  it('should trigger reset mutation', async () => {
    const showError = jest.fn()
    jest
      .spyOn(ModUseAppToast, 'useAppToast')
      .mockReturnValue({ showError } as any)
    jest.useFakeTimers()
    const resetSpy = jest.fn()
    jest.spyOn(RQ, 'useMutation').mockReturnValue({ reset: resetSpy } as any)
    const { result } = renderHook(() => usePatchUserProfileAvatar(), {
      wrapper: NBQueryNavProviders,
    })

    act(() => {
      result.current.reset()
    })
    jest.clearAllTimers()

    await waitFor(() => expect(resetSpy).toHaveBeenCalled())
  })
})
