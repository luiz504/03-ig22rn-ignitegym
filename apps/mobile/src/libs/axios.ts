/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios'
import { onFulfilled, onRejected } from '~/middlewares/api.interceptors'
import { RefreshQueue } from '~/utils/RefreshQueue'

type SignOut = () => void

export interface APIInstanceCustom extends AxiosInstance {
  registerInterceptorTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
}) as APIInstanceCustom

const refreshQueue = new RefreshQueue()
api.registerInterceptorTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    onFulfilled,
    (err) => onRejected(err, signOut, refreshQueue, api),
  )
  //
  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

// api.interceptors.request.use(
//   (config) => {
//     console.log('Interceptor Req config', config)
//     return config
//   },
//   (err) => {
//     console.log('Interceptor Req error', err)
//     return Promise.reject(err)
//   },
// )

export { api }
