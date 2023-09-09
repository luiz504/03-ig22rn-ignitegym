import { AppError, resolveErrorMessage } from '.'

describe('App Error Module', () => {
  const errorMessage = 'This is an error message'
  it('should set the message correctly when creating an instance of AppError with a message', () => {
    const error = new AppError(errorMessage)

    expect(error.message).toBe(errorMessage)
  })

  it('should return the message of an AppError instance when err is an instance of AppError', () => {
    const appError = new AppError(errorMessage)

    const result = resolveErrorMessage(appError, 'Something went wrong')

    expect(result).toBe(errorMessage)
  })
  it('should return the fallback message  when err is a Generic Error', () => {
    const appError = new Error('Some Generic Error')
    const fallbackMessage = 'Something went wrong'
    const result = resolveErrorMessage(appError, fallbackMessage)

    expect(result).toBe(fallbackMessage)
  })
})
