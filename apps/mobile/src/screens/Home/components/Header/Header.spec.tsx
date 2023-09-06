import {
  fireEvent,
  renderWithAllProviders,
  screen,
} from '~/utils/test/test-utils'

import DefaultPhoto from '~/assets/images/userPhotoDefault.png'
import { Header } from '.'
import { MockedUser, useAuthContextSpy } from '~/utils/test'

describe('Header Component', () => {
  it('should render correctly the user avatar and name', async () => {
    useAuthContextSpy({ user: MockedUser })

    renderWithAllProviders(<Header />)

    expect(await screen.findByText(MockedUser.name)).toBeTruthy()
    expect(screen.getByTestId('user-avatar').props).toEqual(
      expect.objectContaining({ source: { uri: MockedUser.avatar } }),
    )
  })

  it('should render correctly the default avatar when the user does not have it', async () => {
    useAuthContextSpy({
      user: { ...MockedUser, avatar: null },
    })

    renderWithAllProviders(<Header />)

    const avatar = await screen.findByTestId('user-avatar')

    expect(avatar.props).toEqual(
      expect.objectContaining({ source: DefaultPhoto }),
    )
  })
  it('should Sign Out correctly', async () => {
    const { signOutMock } = useAuthContextSpy({
      user: MockedUser,
    })
    renderWithAllProviders(<Header />)

    fireEvent.press(screen.getByTestId('btn-sign-out'))

    expect(signOutMock).toBeCalledTimes(1)
  })
})
