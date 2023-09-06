import { renderWithNBProviders, screen } from '~/utils/test/test-utils'
import { Header } from '.'

describe('Header Component', () => {
  it('should render correctly', () => {
    const title = 'Title'
    renderWithNBProviders(<Header title={title} />)

    const titleElement = screen.getByText(title)

    expect(titleElement).toBeVisible()
    expect(titleElement.props.style).toMatchSnapshot('title-element')
  })
})
