export class AppError {
  message: string

  constructor(message: string) {
    this.message = message
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleErrorMessage(err: any, fallbackMessage: string) {
  const isAppError = err instanceof AppError
  return isAppError ? err.message : fallbackMessage
}
