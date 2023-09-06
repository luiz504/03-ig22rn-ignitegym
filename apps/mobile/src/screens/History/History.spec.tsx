import { renderWithAllProviders } from '~/utils/test/test-utils'
import { MockedUser, useAuthContextSpy } from '~/utils/test'

import { History } from '.'

describe('History Component', () => {
  beforeEach(() => {
    useAuthContextSpy({ user: MockedUser })
  })
  it('should render correctly', () => {
    renderWithAllProviders(<History />)
  })
})
