import { renderWithNBProviders, screen } from '~/utils/test/test-utils'
import { Loading } from '.'

describe('Loading Component', () => {
  it('should render the component default props correctly', () => {
    renderWithNBProviders(<Loading />)

    expect(screen.getByTestId('loading-spinner')).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    })
    const { color, size } = screen.getByTestId('spinner-icon').props
    expect({ color, size }).toEqual({ color: '#00B37E', size: 60 })
  })

  it('should be able to style the container correctly', () => {
    renderWithNBProviders(<Loading containerStyle={{ padding: 24 }} />)

    expect(screen.getByTestId('loading-spinner')).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      padding: 24,
    })
  })
})
