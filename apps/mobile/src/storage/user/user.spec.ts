import AsyncStorage from '@react-native-async-storage/async-storage'

import { storageUserGet, storageUserRemove, storageUserSave } from '.'
import { USER_STORAGE } from '../config'
import { MockedUser } from '~/utils/test'

describe('user storage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  describe('storageUserSave', () => {
    it('should save correctly the user data', async () => {
      const response = await storageUserSave(MockedUser)
      expect(response).toBeUndefined()

      const storedUser = await AsyncStorage.getItem(USER_STORAGE)
      expect(storedUser).toEqual(JSON.stringify(MockedUser))
    })
  })

  describe('storageUserGet', () => {
    it('should return null when there is no user data stored', async () => {
      const response = await storageUserGet()

      expect(response).toBeNull()
    })

    it('should return the user object retrieve from storage', async () => {
      // Prepare storage
      await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(MockedUser))

      // Act
      const response = await storageUserGet()
      expect(response).toEqual(MockedUser)
    })
    it('should return null when the user data does not match its expected interface', async () => {
      // Prepare storage
      await AsyncStorage.setItem(
        USER_STORAGE,
        JSON.stringify({ name: 'Hello' }),
      )

      // Act
      const response = await storageUserGet()
      expect(response).toBeNull()
    })
  })

  describe('storageUserRemove', () => {
    it('should remove the user from storage', async () => {
      const removeItemSpy = jest.spyOn(AsyncStorage, 'removeItem')
      await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(MockedUser))

      const response = await storageUserRemove()

      expect(response).toBeUndefined()
      expect(removeItemSpy).toBeCalledTimes(1)
      expect(removeItemSpy).toBeCalledWith(USER_STORAGE)
      expect(await AsyncStorage.getItem(USER_STORAGE)).toBeNull()
    })
  })
})
