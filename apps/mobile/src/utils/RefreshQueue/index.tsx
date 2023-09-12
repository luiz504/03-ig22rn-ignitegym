import { AxiosError } from 'axios'

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (token: AxiosError) => void
}
export class RefreshQueue {
  failedQueue: PromiseType[] = []
  isRunning = false

  addItem(promise: PromiseType) {
    this.failedQueue.push(promise)
  }

  setIsRunning(status: boolean) {
    this.isRunning = status
  }

  reset() {
    this.failedQueue = []
    this.isRunning = false
  }
}
