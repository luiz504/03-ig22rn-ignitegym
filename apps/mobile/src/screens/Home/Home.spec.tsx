import { renderWithAllProviders, screen } from '~/utils/test-utils'
import { Home } from '.'
import { useAuthSpy, MockedUser } from '~/utils/test-hooks'

describe('Home Component', () => {
  it('should render correctly', async () => {
    useAuthSpy(MockedUser)
    renderWithAllProviders(<Home />)

    await screen.findByTestId('home-container')
  })
})
