import {
  MockedToken,
  MockedUser,
  useAuthSpyShallow,
} from '~/utils/test/test-hooks'
import {
  cleanup,
  renderWithAllProviders,
  screen,
} from '~/utils/test/test-utils'

import { THEME } from '~/theme'
import { AppRoutes } from './app.routes'

jest.mock('../screens/Home', () => require('__mocks__/Home'))
describe('App Router', () => {
  it('should render correctly', async () => {
    useAuthSpyShallow({ user: MockedUser, token: MockedToken })

    renderWithAllProviders(<AppRoutes />)

    const baseProps = {
      height: 24,
      width: 24,
    }
    const iconPropsDict = {
      0: { ...baseProps, fill: THEME.colors.green[500] },
      1: { ...baseProps, fill: THEME.colors.gray[200] },
    }

    const homeIcon = screen.getAllByTestId('home-icon')

    homeIcon.forEach((item, index) =>
      expect(item.props).toEqual(
        expect.objectContaining(
          iconPropsDict[index as keyof typeof iconPropsDict],
        ),
      ),
    )
    const historyIcon = screen.getAllByTestId('history-icon')

    historyIcon.forEach((item, index) =>
      expect(item.props).toEqual(
        expect.objectContaining(
          iconPropsDict[index as keyof typeof iconPropsDict],
        ),
      ),
    )

    const profileIcon = screen.getAllByTestId('profile-icon')

    profileIcon.forEach((item, index) =>
      expect(item.props).toEqual(
        expect.objectContaining(
          iconPropsDict[index as keyof typeof iconPropsDict],
        ),
      ),
    )
    cleanup()
  })
})
