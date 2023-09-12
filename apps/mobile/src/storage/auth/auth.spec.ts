import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '.'
import { AUTH_TOKEN_STORAGE } from '../config'

describe('auth storage', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
    await AsyncStorage.clear()
  })

  const tokenValue = 'someTokenValue'
  const refreshTokenValue = 'someRefreshTokenValue'
  describe('storageAuthTokenSave', () => {
    it('should save the token correctly', async () => {
      const setItemSpy = jest.spyOn(AsyncStorage, 'setItem')
      await storageAuthTokenSave({
        token: tokenValue,
        refresh_token: refreshTokenValue,
      })

      expect(setItemSpy).toBeCalledTimes(1)
      expect(setItemSpy).toBeCalledWith(
        AUTH_TOKEN_STORAGE,
        JSON.stringify({ token: tokenValue, refresh_token: refreshTokenValue }),
      )
    })
  })
  describe('storageAuthTokenGet', () => {
    it('should retrieve the token correctly', async () => {
      await storageAuthTokenSave({
        token: tokenValue,
        refresh_token: refreshTokenValue,
      })
      const getItemSpy = jest.spyOn(AsyncStorage, 'getItem')
      const response = await storageAuthTokenGet()

      expect(getItemSpy).toBeCalledTimes(1)
      expect(getItemSpy).toBeCalledWith(AUTH_TOKEN_STORAGE)
      expect(response).toEqual({
        token: tokenValue,
        refresh_token: refreshTokenValue,
      })
    })
    it('should return null when there is no token stored correctly', async () => {
      const getItemSpy = jest.spyOn(AsyncStorage, 'getItem')
      const response = await storageAuthTokenGet()

      expect(getItemSpy).toBeCalledTimes(1)
      expect(getItemSpy).toBeCalledWith(AUTH_TOKEN_STORAGE)
      expect(response).toBeNull()
    })
  })
  describe('storageAuthTokenRemove', () => {
    it('should retrieve the token correctly', async () => {
      const removeItemSpy = jest.spyOn(AsyncStorage, 'removeItem')
      await storageAuthTokenRemove()

      expect(removeItemSpy).toBeCalledTimes(1)
      expect(removeItemSpy).toBeCalledWith(AUTH_TOKEN_STORAGE)
    })
  })
})
