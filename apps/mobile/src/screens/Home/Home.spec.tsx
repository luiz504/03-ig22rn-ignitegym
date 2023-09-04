import { renderWithAllProviders, screen } from '~/utils/test/test-utils'
import { Home } from '.'
import { useAuthSpy, MockedUser, MockedToken } from '~/utils/test/test-hooks'

describe('Home Component', () => {
  it('should render correctly', async () => {
    useAuthSpy({ user: MockedUser, token: MockedToken })
    renderWithAllProviders(<Home />)

    await screen.findByTestId('home-container')
  })
})
