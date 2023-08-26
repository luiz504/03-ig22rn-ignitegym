import { render, screen } from '~/utils/test-utils'
import { Input } from '.'

describe('Input Component', () => {
  it('should render Correctly', async () => {
    render(<Input testID="input" />)

    // Initial Assert
    const inputComponent = screen.getByTestId('input')
    expect(inputComponent.props.placeholderTextColor).toEqual('#7C7C8A')

    expect(inputComponent.props.style).toMatchSnapshot(
      'initial-input-non-focused',
    )
  })
})
