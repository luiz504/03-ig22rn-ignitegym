import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native'
import App from './App'

import { StatusBar } from 'expo-status-bar'

jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
}))
describe('App init file', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const loadingSpinnerID = 'loading-spinner'

  it('should loadFonts correctly', async () => {
    render(<App />)
    expect(screen.getByTestId(loadingSpinnerID)).toBeVisible()

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId(loadingSpinnerID),
    )
  })

  it('should render the Statusbar correctly', async () => {
    render(<App />)

    const statusbar = screen.UNSAFE_getByType(StatusBar)

    await waitFor(() =>
      expect(statusbar.props).toEqual({
        style: 'light',
        backgroundColor: 'transparent',
        translucent: true,
      }),
    )
  })
})
