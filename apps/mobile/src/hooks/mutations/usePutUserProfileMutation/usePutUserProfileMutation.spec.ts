import { api } from '~/libs/axios'
import {
  NBQueryNavProviders,
  act,
  renderHook,
  waitFor,
} from '~/utils/test/test-utils'

import { usePutUserProfileMutation } from '.'

import * as ModUseAppToast from '~/hooks/useAppToast'

describe('usePutUserProfileMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should mutate when passing only the name successfully', async () => {
    const showSuccess = jest.fn()
    jest
      .spyOn(ModUseAppToast, 'useAppToast')
      .mockReturnValue({ showSuccess } as any)
    jest.useFakeTimers()
    const apiPostSpy = jest
      .spyOn(api, 'put')
      .mockResolvedValue({ success: 200 })
    const { result } = renderHook(() => usePutUserProfileMutation(), {
      wrapper: NBQueryNavProviders,
    })

    const data = {
      name: 'John Doe',
    }
    act(() => {
      result.current.mutate(data)
    })
    jest.clearAllTimers()

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(apiPostSpy).toHaveBeenCalledTimes(1)
    expect(apiPostSpy).toHaveBeenCalledWith('/users', {
      name: data.name,
    })

    await waitFor(() => expect(showSuccess).toHaveBeenCalledTimes(1))
    expect(showSuccess).toHaveBeenCalledWith({
      title: 'Profile updated successfully.',
    })
  })
  it('should mutate when passing only the Pws successfully', async () => {
    const showSuccess = jest.fn()
    jest
      .spyOn(ModUseAppToast, 'useAppToast')
      .mockReturnValue({ showSuccess } as any)
    jest.useFakeTimers()
    const apiPostSpy = jest
      .spyOn(api, 'put')
      .mockResolvedValue({ success: 200 })
    const { result } = renderHook(() => usePutUserProfileMutation(), {
      wrapper: NBQueryNavProviders,
    })

    const data = {
      password: '123456',
      old_password: '123456',
    }
    act(() => {
      result.current.mutate(data)
    })
    jest.clearAllTimers()

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(apiPostSpy).toHaveBeenCalledTimes(1)
    expect(apiPostSpy).toHaveBeenCalledWith('/users', {
      password: data.password,
      old_password: data.old_password,
    })

    await waitFor(() => expect(showSuccess).toHaveBeenCalledTimes(1))
    expect(showSuccess).toHaveBeenCalledWith({
      title: 'Profile updated successfully.',
    })
  })
  it('should mutate when passing name and Pws successfully', async () => {
    const showSuccess = jest.fn()
    jest
      .spyOn(ModUseAppToast, 'useAppToast')
      .mockReturnValue({ showSuccess } as any)
    jest.useFakeTimers()
    const apiPostSpy = jest
      .spyOn(api, 'put')
      .mockResolvedValue({ success: 200 })
    const { result } = renderHook(() => usePutUserProfileMutation(), {
      wrapper: NBQueryNavProviders,
    })

    const data = {
      name: 'John Smith',
      password: '123456',
      old_password: '123456',
    }
    act(() => {
      result.current.mutate(data)
    })
    jest.clearAllTimers()

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(apiPostSpy).toHaveBeenCalledTimes(1)
    expect(apiPostSpy).toHaveBeenCalledWith('/users', {
      name: data.name,
      password: data.password,
      old_password: data.old_password,
    })

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
      .spyOn(api, 'put')
      .mockRejectedValue({ success: 400 })
    const { result } = renderHook(() => usePutUserProfileMutation(), {
      wrapper: NBQueryNavProviders,
    })

    const data = { name: 'SomeName' }
    act(() => {
      result.current.mutate(data)
    })
    jest.clearAllTimers()

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(apiPostSpy).toHaveBeenCalledTimes(1)
    expect(apiPostSpy).toHaveBeenCalledWith('/users', {
      name: data.name,
    })

    await waitFor(() => expect(showError).toHaveBeenCalledTimes(1))
    expect(showError).toHaveBeenCalledWith({
      title: 'Fail to update profile.',
    })
  })
})
