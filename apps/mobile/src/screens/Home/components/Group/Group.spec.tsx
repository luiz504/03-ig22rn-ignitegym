import {
  fireEvent,
  renderWithNBNavProviders,
  renderWithNBProviders,
  screen,
} from '~/utils/test/test-utils'
import { Group, GroupSkeleton } from '.'
import { THEME } from '~/theme'

describe('Group Component', () => {
  const btnGroupID = 'btn-group'
  it('should render correctly isActive=true', () => {
    const label = 'Hello Word'
    renderWithNBNavProviders(<Group label={label} testID={btnGroupID} />)

    const btnGroupElement = screen.getByTestId(btnGroupID)
    const textElement = screen.getByText(label)

    // Assert Initial
    expect(btnGroupElement.props.style).toMatchSnapshot('btn-not-active:style')
    expect(textElement.props.style).toMatchSnapshot('btn-not-active-text:style')

    // Act Press
    fireEvent(btnGroupElement, 'pressIn')

    expect(btnGroupElement).toHaveStyle({
      borderColor: THEME.colors.green[500],
    })
  })
  it('should render correctly isActive=true', () => {
    const label = 'Btn Non Selected'
    renderWithNBNavProviders(
      <Group label={label} testID={btnGroupID} aria-selected />,
    )

    const btnGroupElement = screen.getByTestId(btnGroupID)
    const textElement = screen.getByText(label)

    expect(btnGroupElement.props.style).toMatchSnapshot('btn-active:style')
    expect(textElement.props.style).toMatchSnapshot('btn-active-text:style')
  })
})

describe('Group Skeleton Component', () => {
  it('should render correctly', () => {
    jest.useFakeTimers()
    renderWithNBProviders(<GroupSkeleton testID="skeleton-container" />)
    expect(screen.getByTestId('skeleton-container')).toBeTruthy()

    jest.clearAllTimers()
  })
})
