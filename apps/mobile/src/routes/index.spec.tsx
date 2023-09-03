import {
  act,
  renderWithNBAuthProviders,
  screen,
  waitForElementToBeRemoved,
} from '~/utils/test-utils'
import { Routes } from '.'
import { MockedUser, useAuthSpyShallow } from '~/utils/test-hooks'

describe('Routes', () => {
  it('should render AppRoutes when user is authenticated', async () => {
    jest.useFakeTimers()
    useAuthSpyShallow(MockedUser)

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
    useAuthSpyShallow()

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
