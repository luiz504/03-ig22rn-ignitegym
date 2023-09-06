import { render, screen, waitFor } from '@testing-library/react-native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import { MockComponent } from '~/utils/test'

import App from './App'

jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
}))
jest.mock('expo-splash-screen')

jest.mock('~/routes', () => {
  return {
    Routes: (props: any) => MockComponent({ ...props, testID: 'app-routes' }),
  }
})

jest.mock('~/contexts/AuthContext', () => {
  return {
    AuthContextProvider: (props: any) =>
      MockComponent({ ...props, testID: 'auth-provider' }),
  }
})
describe('App init file', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should loadFonts correctly', async () => {
    const hideAsyncSpy = jest.spyOn(SplashScreen, 'hideAsync')
    const { toJSON } = render(<App />)
    expect(toJSON()).toBeNull()

    await waitFor(() => expect(hideAsyncSpy).toBeCalledTimes(1))
    await waitFor(() => {
      const statusbar = screen.UNSAFE_getByType(StatusBar)

      expect(statusbar.props).toEqual({
        style: 'light',
        backgroundColor: 'transparent',
        translucent: true,
      })
    })

    const rootView = await screen.findByTestId('root-view')
    expect(rootView).toBeTruthy()
  })
})
