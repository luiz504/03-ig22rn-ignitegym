import { render } from '~/utils/test-utils'
import { UserPhoto } from '.'

describe('UserPhoto Component', () => {
  it('should render correctly', () => {
    render(<UserPhoto size={64} alt={'user photo'} />)
  })
})
