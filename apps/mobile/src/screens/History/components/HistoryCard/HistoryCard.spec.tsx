import { renderWithNBProviders } from '~/utils/test/test-utils'
import { HistoryCard } from '.'

describe('HistoryCard Component', () => {
  it('should render correctly', () => {
    renderWithNBProviders(<HistoryCard />)
  })
})
