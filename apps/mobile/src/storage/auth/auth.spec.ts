import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '.'
import { AUTH_TOKEN_STORAGE } from '../config'

describe('auth storage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  const tokenValue = 'someTokenValue'
  describe('storageAuthTokenSave', () => {
    it('should save the token correctly', async () => {
      const setItemSpy = jest.spyOn(AsyncStorage, 'setItem')
      await storageAuthTokenSave(tokenValue)

      expect(setItemSpy).toBeCalledTimes(1)
      expect(setItemSpy).toBeCalledWith(AUTH_TOKEN_STORAGE, tokenValue)
    })
  })
  describe('storageAuthTokenGet', () => {
    it('should retrieve the token correctly', async () => {
      const getItemSpy = jest.spyOn(AsyncStorage, 'getItem')
      await storageAuthTokenGet()

      expect(getItemSpy).toBeCalledTimes(1)
      expect(getItemSpy).toBeCalledWith(AUTH_TOKEN_STORAGE)
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
