import { renderWithNBProviders, screen } from '~/utils/test/test-utils'
import { HistoryCard, HistoryCardSkeleton } from '.'
import { MockedHistory } from '~/utils/test'

describe('HistoryCard Module', () => {
  describe('HistoryCard Component', () => {
    it('should render correctly', () => {
      renderWithNBProviders(<HistoryCard data={MockedHistory} />)

      expect(screen.getByText(MockedHistory.name)).toBeTruthy()
      expect(screen.getByText(MockedHistory.group)).toBeTruthy()
      expect(screen.getByText(MockedHistory.hour)).toBeTruthy()
    })
  })
  describe('HistoryCardSkeleton Component', () => {
    it('should render correctly', () => {
      jest.useFakeTimers()

      renderWithNBProviders(<HistoryCardSkeleton testID="skeleton" />)

      expect(screen.getByTestId('skeleton')).toBeTruthy()
      jest.clearAllTimers()
    })
  })
})
