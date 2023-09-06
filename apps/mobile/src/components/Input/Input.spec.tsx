import { renderWithNBProviders, screen } from '~/utils/test/test-utils'
import { Input } from '.'
import { Input as NBInput } from 'native-base'

describe('Input Component', () => {
  const inputID = 'input'
  const textErrorID = `${inputID}-error-text`
  it('should render Correctly', async () => {
    renderWithNBProviders(<Input testID={inputID} />)

    // Initial Assert
    const inputElement = screen.getByTestId(inputID)
    expect(inputElement.props.placeholderTextColor).toEqual('#7C7C8A')

    expect(inputElement.props.style).toMatchSnapshot(
      'initial-input-non-focused',
    )
    expect(screen.queryByTestId(textErrorID)).toBeNull()
  })

  it('should render correctly the errors and it layout effects', async () => {
    const textError = 'This is an error'
    renderWithNBProviders(<Input testID={inputID} errorMsg={textError} />)

    const inputElement = screen.UNSAFE_getByType(NBInput)
    const errorTextElement = screen.getByTestId(textErrorID)

    expect(inputElement.props.isInvalid).toBe(true)
    expect(errorTextElement).toHaveTextContent(textError)
  })
})
