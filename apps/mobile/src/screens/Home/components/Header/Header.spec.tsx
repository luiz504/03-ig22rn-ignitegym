import {
  fireEvent,
  renderWithAllProviders,
  screen,
  waitFor,
} from '~/utils/test-utils'
import { Header } from '.'
import { MockedUser, useAuthSpy } from '~/utils/test-hooks'

describe('Header Component', () => {
  it('should render correctly', async () => {
    const { signOutMock } = useAuthSpy(MockedUser)
    const three = renderWithAllProviders(<Header />).toJSON()

    await waitFor(() => expect(three).toBeTruthy())

    fireEvent.press(screen.getByTestId('btn-sign-out'))

    expect(signOutMock).toBeCalledTimes(1)
  })
})
