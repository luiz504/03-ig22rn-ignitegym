import { AxiosResponse } from 'axios'
import { onFulfilled, onRejected } from './axios'
import { AppError } from '~/utils/AppError'

describe('axios api response interceptor', () => {
  describe('onFulfilled', () => {
    it('should pass the response directly', async () => {
      const response = {
        data: 'response data',
      }

      const result = onFulfilled(response as AxiosResponse)

      expect(result).toEqual(response)
    })
  })
  describe('onRejected', () => {
    it('should wrap the error with new AppError when error message exists', async () => {
      const message = 'error message'
      const errorResponse = {
        response: {
          data: {
            message,
          },
        },
      }
      try {
        await onRejected(errorResponse)
      } catch (err) {
        expect(err).toBeInstanceOf(AppError)
        expect((err as AppError).message).toEqual(message)
      }
    })
    it('should pass the error through when no error message exists', async () => {
      const someGenericError = {
        code: 500,
      }
      try {
        await onRejected(someGenericError)
      } catch (err) {
        expect(err).toEqual(someGenericError)
      }
    })
  })
})
