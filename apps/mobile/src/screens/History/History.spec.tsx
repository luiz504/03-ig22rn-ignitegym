import { renderWithAllProviders, screen } from '~/utils/test/test-utils'
import {
  MockedHistoriesByDay,
  MockedUser,
  useAuthContextSpy,
} from '~/utils/test'
import * as FetchHistoryModule from '~/hooks/queries/useFetchHistory'

import { History } from '.'

describe('History Component', () => {
  beforeEach(() => {
    useAuthContextSpy({ user: MockedUser })
  })
  it('should render correctly when loaded with items', () => {
    jest.spyOn(FetchHistoryModule, 'useFetchHistory').mockReturnValue({
      histories: MockedHistoriesByDay,
      isLoading: false,
    } as any)
    renderWithAllProviders(<History />)

    for (const historySection of MockedHistoriesByDay) {
      expect(screen.getByText(historySection.title))

      expect(
        screen.getAllByTestId(`history-card-${historySection.title}`),
      ).toHaveLength(historySection.data.length)
    }
  })

  it('should render correctly when loaded no items', () => {
    jest.spyOn(FetchHistoryModule, 'useFetchHistory').mockReturnValue({
      histories: [],
      isLoading: false,
    } as any)

    renderWithAllProviders(<History />)
    expect(screen.getByTestId('empty-feedback')).toBeTruthy()
  })

  it('should render correctly when when loading', () => {
    jest.useFakeTimers()
    jest.spyOn(FetchHistoryModule, 'useFetchHistory').mockReturnValue({
      histories: [],
      isLoading: true,
    } as any)

    renderWithAllProviders(<History />)
    expect(screen.getByTestId('skeleton-container')).toBeTruthy()

    jest.clearAllTimers()
  })
})
