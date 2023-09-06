import { View } from 'react-native'

import { renderWithNBAuthProviders, screen } from '~/utils/test/test-utils'

import { MockedUser, useAuthContextSpy } from '~/utils/test'

import { Routes } from '.'

const AppRoutes = () => <View testID="app-routes" />
jest.mock('./app.routes', () => {
  return {
    AppRoutes,
  }
})
const AuthRoutes = () => <View testID="auth-routes" />
jest.mock('./auth.routes', () => {
  return {
    AuthRoutes,
  }
})
describe('Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render AppRoutes when user is authenticated', async () => {
    useAuthContextSpy({
      user: MockedUser,

      isLoadingData: false,
    })

    renderWithNBAuthProviders(<Routes />)

    expect(screen.getByTestId('app-routes')).toBeTruthy()
  })
  it('should render AuthRoutes when user is not authenticated', async () => {
    useAuthContextSpy({ user: null, isLoadingData: false })

    renderWithNBAuthProviders(<Routes />)

    expect(screen.getByTestId('auth-routes')).toBeTruthy()
  })

  it('should render a LoadingSpinner when the userData is being loaded', async () => {
    useAuthContextSpy({ isLoadingData: true })

    renderWithNBAuthProviders(<Routes />)

    expect(screen.getByTestId('loading-spinner')).toBeTruthy()
    expect(screen.queryByTestId('auth-routes')).toBeNull()
    expect(screen.queryByTestId('app-routes')).toBeNull()
  })
})
