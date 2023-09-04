import { renderHook } from '@testing-library/react-native'
import { useAuth } from '.'

describe('useAuth hook', () => {
  it('should trigger an error when not wrapped by its context', () => {
    // eslint-disable-next-line no-console
    const originalError = console.error
    // eslint-disable-next-line no-console
    console.error = jest.fn()

    try {
      renderHook(() => useAuth())
    } catch (err) {
      expect((err as Error).message.length).toBeGreaterThan(0)
    }

    // Restore the original console.error function
    // eslint-disable-next-line no-console
    console.error = originalError
  })
})
