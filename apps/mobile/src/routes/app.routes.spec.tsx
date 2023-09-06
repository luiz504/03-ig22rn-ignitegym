import { View } from 'react-native'

import {
  cleanup,
  renderWithAllProviders,
  screen,
} from '~/utils/test/test-utils'
import { MockedUser, useAuthContextSpy } from '~/utils/test'

import { THEME } from '~/theme'
import { AppRoutes } from './app.routes'

const Home = () => <View testID="home2-container" />
jest.mock('~/screens/Home', () => {
  return {
    Home,
  }
})
describe('App Router', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render the Navigation Tabs correctly, and the correct initial Screen', async () => {
    useAuthContextSpy({ user: MockedUser })

    renderWithAllProviders(<AppRoutes />)

    expect(screen.getByTestId('home2-container')).toBeTruthy()

    const baseProps = {
      height: 24,
      width: 24,
    }
    const iconPropsDict = {
      0: { ...baseProps, fill: THEME.colors.green[500] },
      1: { ...baseProps, fill: THEME.colors.gray[200] },
    }

    const homeIcons = screen.getAllByTestId('home-icon')

    homeIcons.forEach(async (item, index) =>
      expect(item.props).toEqual(
        expect.objectContaining(
          iconPropsDict[index as keyof typeof iconPropsDict],
        ),
      ),
    )
    const historyIcons = screen.getAllByTestId('history-icon')

    historyIcons.forEach((item, index) =>
      expect(item.props).toEqual(
        expect.objectContaining(
          iconPropsDict[index as keyof typeof iconPropsDict],
        ),
      ),
    )

    const profileIcons = screen.getAllByTestId('profile-icon')

    profileIcons.forEach((item, index) =>
      expect(item.props).toEqual(
        expect.objectContaining(
          iconPropsDict[index as keyof typeof iconPropsDict],
        ),
      ),
    )

    cleanup()
  })
})
