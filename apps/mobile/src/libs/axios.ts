import axios, { AxiosResponse } from 'axios'
import { AppError } from '~/utils/AppError'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
})

api.interceptors.response.use(onFulfilled, onRejected)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function onRejected(error: any) {
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
