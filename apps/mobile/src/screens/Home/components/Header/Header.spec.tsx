import {
  fireEvent,
  renderWithAllProviders,
  screen,
  waitFor,
} from '~/utils/test/test-utils'
import { MockedToken, MockedUser, useAuthSpy } from '~/utils/test/test-hooks'
import DefaultPhoto from '~/assets/images/userPhotoDefault.png'
import { Header } from '.'

describe('Header Component', () => {
  it('should render correctly the user avatar and name', async () => {
    useAuthSpy({ user: MockedUser, token: MockedToken })

    renderWithAllProviders(<Header />)

    expect(await screen.findByText(MockedUser.name)).toBeTruthy()
    expect(screen.getByTestId('user-avatar').props).toEqual(
      expect.objectContaining({ source: { uri: MockedUser.avatar } }),
    )
  })

  it('should render correctly the default avatar when the user does not have it', async () => {
    useAuthSpy({ user: { ...MockedUser, avatar: null }, token: MockedToken })

    renderWithAllProviders(<Header />)

    const avatar = await screen.findByTestId('user-avatar')

    expect(avatar.props).toEqual(
      expect.objectContaining({ source: DefaultPhoto }),
    )
  })
  it('should Sign Out correctly', async () => {
    const { signOutMock } = useAuthSpy({ user: MockedUser, token: MockedToken })
    const three = renderWithAllProviders(<Header />).toJSON()

    await waitFor(() => expect(three).toBeTruthy())

    fireEvent.press(screen.getByTestId('btn-sign-out'))

    expect(signOutMock).toBeCalledTimes(1)
  })
})
