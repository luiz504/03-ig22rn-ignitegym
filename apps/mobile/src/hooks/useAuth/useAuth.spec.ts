import { renderHook, waitFor } from '@testing-library/react-native'

import { AuthContextProvider } from '~/contexts/AuthContext'

import { useAuth } from '.'

describe('useAuth hook', () => {
  it('should trigger an error when not wrapped by its context', () => {
    // eslint-disable-next-line no-console
    const originalError = console.error
    // eslint-disable-next-line no-console
    console.error = jest.fn()

    try {
      renderHook(() => useAuth())
      fail('Should have thrown an error')
    } catch (err) {
      expect((err as Error).message.length).toBeGreaterThan(0)
    }

    // Restore the original console.error function
    // eslint-disable-next-line no-console
    console.error = originalError
  })

  it('should return the context value correctly', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthContextProvider,
    })

    expect(result.current).toEqual({
      isLoadingStorageData: true,
      signIn: expect.any(Function),
      signOut: expect.any(Function),
      updateUserProfile: expect.any(Function),
      user: null,
    })

    await waitFor(() => expect(result.current.isLoadingStorageData).toBe(false))
  })
})
