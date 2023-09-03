import { renderWithAllProviders, waitFor } from '~/utils/test-utils'
import { Header } from '.'
import { MockedUser, useAuthSpy } from '~/utils/test-hooks'

describe('Header Component', () => {
  it('should render correctly', async () => {
    useAuthSpy(MockedUser)
    const three = renderWithAllProviders(<Header />).toJSON()

    await waitFor(() => expect(three).toBeTruthy())
  })
})
