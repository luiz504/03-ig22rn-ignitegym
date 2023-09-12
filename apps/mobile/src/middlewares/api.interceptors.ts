/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosResponse } from 'axios'

import { storageAuthTokenGet, storageAuthTokenSave } from '~/storage/auth'

import { RefreshQueue } from '~/utils/RefreshQueue'
import { AppError } from '~/utils/AppError'
import { APIInstanceCustom } from '~/libs/axios'

export async function onRejected(
  error: any,
  signOut: () => void,
  queue: RefreshQueue,
  api: APIInstanceCustom,
) {
  if (error?.response?.status === 401) {
    if (
      error.response.data?.message === 'token.expired' ||
      error.response.data?.message === 'token.invalid'
    ) {
      const response = await storageAuthTokenGet()

      if (!response) {
        signOut()
        return Promise.reject(error)
      }

      const originalRequestConfig = error.config

      if (queue.isRunning) {
        return new Promise((resolve, reject) => {
          queue.addItem({
            onSuccess: (token: string) => {
              originalRequestConfig.headers = {
                Authorization: `Bearer ${token}`,
              }
              resolve(api(originalRequestConfig))
            },
            onFailure: (error: AxiosError) => {
              reject(error)
            },
          })
        })
      }
      queue.setIsRunning(true)

      const refreshToken = async (
        resolve: (value: unknown) => void,
        reject: (error: any) => void,
      ) => {
        try {
          const { data } = await api.post('/sessions/refresh-token', {
            refresh_token: response.refresh_token,
          })

          await storageAuthTokenSave({
            token: data.token,
            refresh_token: data.refresh_token,
          })

          if (originalRequestConfig.data) {
            originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
          }
          originalRequestConfig.headers = {
            Authorization: 'Bearer ' + data.token,
          }

          api.defaults.headers.common.Authorization = 'Bearer ' + data.token

          queue.failedQueue.forEach((request) => {
            request.onSuccess(data.token)
          })

          resolve(api(originalRequestConfig))
        } catch (error: any) {
          queue.failedQueue.forEach((request) => {
            request.onFailure(error)
          })
          signOut()
          reject(error)
        } finally {
          queue.reset()
        }
      }

      return new Promise(refreshToken)
    }
    signOut()
  }

  if (error?.response?.data?.message) {
    return Promise.reject(new AppError(error.response.data.message))
  } else {
    return Promise.reject(error)
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function onFulfilled(response: AxiosResponse<any, any>) {
  return response
}
