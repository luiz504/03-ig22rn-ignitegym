import { AxiosError, AxiosResponse } from 'axios'
import { onFulfilled, onRejected } from './api.interceptors'
import { AppError } from '~/utils/AppError'
import { RefreshQueue } from '~/utils/RefreshQueue'
import * as StorageAuthMod from '~/storage/auth'
import * as refreshTokenRequestMod from '~/http/refreshToken'

import * as APIMod from '~/libs/axios'
import MockAdapter from 'axios-mock-adapter'
const { api } = APIMod

describe('api.interceptor module', () => {
  const refreshQueue = new RefreshQueue()
  beforeEach(() => {
    refreshQueue.reset()
    jest.clearAllMocks()
  })
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
    const signOut = jest.fn()
    beforeEach(() => {
      jest.clearAllMocks()
      delete api.defaults.headers.common.Authorization
    })
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
        await onRejected(errorResponse, signOut, refreshQueue, api)
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
        await onRejected(someGenericError, signOut, refreshQueue, api)
      } catch (err) {
        expect(err).toEqual(someGenericError)
      }
    })

    describe('refreshToken', () => {
      const signOut = jest.fn()
      const expiredTokenError = {
        response: { data: { message: 'token.expired' }, status: 401 },
      } as AxiosError

      const newTokens = {
        token: 'newToken',
        refresh_token: 'newRefreshToken',
      }

      const useStoredAuth = () => {
        const oldTokens = {
          token: 'someToken',
          refresh_token: 'someRefreshToken',
        }

        const storageAuthTokenGetSpy = jest
          .spyOn(StorageAuthMod, 'storageAuthTokenGet')
          .mockResolvedValue(oldTokens)
        return { ...oldTokens, storageAuthTokenGetSpy }
      }

      it('should call signOut when the error response is not covered in the if statement', async () => {
        try {
          await onRejected(
            { response: { data: { message: 'some message' }, status: 401 } },
            signOut,
            refreshQueue,
            api,
          )
        } catch {
          expect(signOut).toHaveBeenCalled()
        }
      })
      it('should signOut when there is no stored refresh token', async () => {
        const invalidTokenError = {
          response: { data: { message: 'token.invalid' }, status: 401 },
        }
        jest
          .spyOn(StorageAuthMod, 'storageAuthTokenGet')
          .mockResolvedValue(null)

        try {
          await onRejected(invalidTokenError, signOut, refreshQueue, api)
        } catch (err) {
          expect(err).toBe(invalidTokenError)
        }
      })
      it('should call refreshToken when the error message is token.expired or token.invalid', async () => {
        useStoredAuth()

        jest
          .spyOn(refreshTokenRequestMod, 'refreshTokenRequest')
          .mockResolvedValue({ data: newTokens } as any)

        const mockAdapter = new MockAdapter(api)
        mockAdapter.onGet().reply(200)

        const configData = { some: 'config' }
        const localError = {
          ...JSON.parse(JSON.stringify(expiredTokenError)),
          config: {
            data: JSON.stringify(configData),
          },
        }

        await onRejected(localError, signOut, refreshQueue, api)

        const lastGetCall = mockAdapter.history.get[0]
        expect(lastGetCall.data).toEqual(JSON.stringify(configData))
        expect(lastGetCall.headers).toEqual(
          expect.objectContaining({
            Authorization: 'Bearer ' + newTokens.token,
          }),
        )
        mockAdapter.restore()
      })
      it('should add the Promises to the Queue when it is refreshing and resolve all after success on refresh', async () => {
        useStoredAuth()
        const addItemToQueueSpu = jest.spyOn(refreshQueue, 'addItem')
        jest
          .spyOn(refreshTokenRequestMod, 'refreshTokenRequest')
          .mockResolvedValue(
            new Promise((resolve) =>
              setTimeout(() => resolve({ data: newTokens } as any), 1000),
            ),
          )
        const mockAdapter = new MockAdapter(api)
        mockAdapter.onGet().reply(200)

        const localError = {
          ...JSON.parse(JSON.stringify(expiredTokenError)),
          config: {},
        }

        // Act
        await Promise.all([
          onRejected(localError, signOut, refreshQueue, api),
          onRejected(localError, signOut, refreshQueue, api),
          onRejected(localError, signOut, refreshQueue, api),
          onRejected(localError, signOut, refreshQueue, api),
        ])

        // Assert
        expect(addItemToQueueSpu).toBeCalledTimes(3)
        expect(api.defaults.headers.common.Authorization).toBe(
          'Bearer ' + newTokens.token,
        )
      })
      it('should add the Promises to the Queue when it is refreshing and reject all after success on refresh', async () => {
        useStoredAuth()
        const addItemToQueueSpu = jest.spyOn(refreshQueue, 'addItem')
        jest
          .spyOn(refreshTokenRequestMod, 'refreshTokenRequest')
          .mockResolvedValue(
            new Promise((resolve, reject) =>
              setTimeout(() => reject(new Error('some reason')), 1000),
            ),
          )

        const localError = {
          ...JSON.parse(JSON.stringify(expiredTokenError)),
          config: {},
        }

        try {
          await Promise.all([
            onRejected(localError, signOut, refreshQueue, api),
            onRejected(localError, signOut, refreshQueue, api),
            onRejected(localError, signOut, refreshQueue, api),
            onRejected(localError, signOut, refreshQueue, api),
          ])
        } catch (error) {
          expect(addItemToQueueSpu).toBeCalledTimes(3)
          expect(api.defaults.headers.common.Authorization).toBeUndefined()
        }
      })
    })
  })
})
