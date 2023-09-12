import { api } from '~/libs/axios'
import { refreshTokenRequest } from './refreshToken'

describe('refreshTokenRequest', () => {
  it('should return an promise with the correct parameters', () => {
    const apiSpy = jest.spyOn(api, 'post').mockResolvedValue(true)
    const refreshToken = 'someToken'

    expect(
      refreshTokenRequest({ refresh_token: refreshToken }),
    ).resolves.toBeTruthy()

    expect(apiSpy).toBeCalledTimes(1)
    expect(apiSpy).toBeCalledWith('/sessions/refresh-token', {
      refresh_token: 'someToken',
    })
  })
})
