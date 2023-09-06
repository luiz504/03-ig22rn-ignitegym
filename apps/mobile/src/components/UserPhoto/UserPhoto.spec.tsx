import { renderWithNBProviders, screen } from '~/utils/test/test-utils'
import { UserPhoto } from '.'

describe('UserPhoto Component', () => {
  it('should render correctly', () => {
    const size = 66
    renderWithNBProviders(
      <UserPhoto size={size} alt={'user photo'} testID="user-photo" />,
    )

    const imgUserPhoto = screen.getByTestId('user-photo')

    expect(imgUserPhoto).toHaveStyle({ width: size, height: size })
  })
})
