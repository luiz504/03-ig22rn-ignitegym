import { View } from 'react-native'

import { renderWithAllProviders, screen } from '~/utils/test/test-utils'

import { AuthRoutes } from './auth.routes'
import { useAuthContextSpy } from '~/utils/test'

const SignIn = () => <View testID="signIn-container" />
jest.mock('~/screens/SignIn', () => {
  return {
    SignIn,
  }
})
describe('Auth Router', () => {
  it('should render the default screen "SignIn"', async () => {
    useAuthContextSpy()

    renderWithAllProviders(<AuthRoutes />)

    expect(screen.getByTestId('signIn-container')).toBeTruthy()
  })
})
