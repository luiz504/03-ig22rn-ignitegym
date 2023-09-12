import { RefreshQueue } from '.'

describe('RefreshQueue Class', () => {
  it('should be add to add new item to the queue', () => {
    const refreshQueue = new RefreshQueue()

    refreshQueue.addItem({
      onSuccess: () => {},
      onFailure: () => {},
    })

    expect(refreshQueue.failedQueue).toHaveLength(1)
  })

  it('should be able to change the queue isRunning status', () => {
    const refreshQueue = new RefreshQueue()

    expect(refreshQueue.isRunning).toBe(false)

    // Act
    refreshQueue.setIsRunning(true)
    // Assert
    expect(refreshQueue.isRunning).toBe(true)

    // Act
    refreshQueue.setIsRunning(false)
    // Assert
    expect(refreshQueue.isRunning).toBe(false)
  })

  it('should be able to reset the Queue', () => {
    // Prepare
    const refreshQueue = new RefreshQueue()

    refreshQueue.addItem({
      onSuccess: () => {},
      onFailure: () => {},
    })
    refreshQueue.setIsRunning(true)

    // Act
    refreshQueue.reset()

    // Assert
    expect(refreshQueue.failedQueue).toEqual([])
    expect(refreshQueue.isRunning).toBe(false)
  })
})
