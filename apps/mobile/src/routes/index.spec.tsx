import {
  act,
  renderWithNBAuthProviders,
  screen,
  waitForElementToBeRemoved,
} from '~/utils/test/test-utils'
import { Routes } from '.'
import {
  MockedToken,
  MockedUser,
  useAuthSpyShallow,
} from '~/utils/test/test-hooks'

describe('Routes', () => {
  it('should render AppRoutes when user is authenticated', async () => {
    jest.useFakeTimers()
    useAuthSpyShallow({ user: MockedUser, token: MockedToken })

    renderWithNBAuthProviders(<Routes />)

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('loading-spinner'),
    )

    act(() => {
      // Avoid warning errors due AuthContext state changes
      jest.advanceTimersByTime(1000)
    })

    expect(await screen.findByTestId('home-container')).toBeTruthy()
  })
  it('should render AuthRoutes when user is not authenticated', async () => {
    jest.useFakeTimers()
    useAuthSpyShallow({ user: null, token: null })

    renderWithNBAuthProviders(<Routes />)

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('loading-spinner'),
    )

    act(() => {
      // Avoid warning errors due AuthContext state changes
      jest.advanceTimersByTime(1000)
    })

    expect(await screen.findByTestId('signIn-container')).toBeTruthy()
  })
})
