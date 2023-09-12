import { api } from '~/libs/axios'

export function refreshTokenRequest({
  refresh_token,
}: {
  refresh_token: string
}) {
  return api.post('/sessions/refresh-token', { refresh_token })
}
