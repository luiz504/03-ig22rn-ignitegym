import { renderWithNBProviders, screen } from '~/utils/test/test-utils'
import { Button } from '.'
describe('Button Component', () => {
  const btnId = 'btn'
  const labelText = 'label'
  it('should render correctly default variant "solid"', () => {
    renderWithNBProviders(<Button label={labelText} testID={btnId} />)

    const btnElement = screen.getByTestId(btnId)
    const labelElement = screen.getByText(labelText)

    expect(btnElement.props.style).toMatchSnapshot('btn-solid-style')
    expect(labelElement.props.style).toMatchSnapshot('btn-solid-label-style')
  })

  it('should render correctly default variant "outline"', () => {
    renderWithNBProviders(
      <Button variant="outline" label={labelText} testID={btnId} />,
    )

    const btnElement = screen.getByTestId(btnId)
    const labelElement = screen.getByText(labelText)

    expect(btnElement.props.style).toMatchSnapshot('btn-outline-style')
    expect(labelElement.props.style).toMatchSnapshot('btn-outline-label-style')
  })
})
