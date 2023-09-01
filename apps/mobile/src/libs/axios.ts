import axios from 'axios'
import { AppError } from '~/utils/AppError'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(error)
    }
  },
)

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
