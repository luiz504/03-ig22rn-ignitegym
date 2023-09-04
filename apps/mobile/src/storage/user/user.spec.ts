import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserDTO } from '~/dtos/UserDTO'
import { storageUserGet, storageUserRemove, storageUserSave } from '.'
import { USER_STORAGE } from '../config'

describe('user storage', () => {
  const mockedUser: UserDTO = {
    id: 'some-id',
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: 'http://url.com',
  }

  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  describe('storageUserSave', () => {
    it('should save correctly the user data', async () => {
      const response = await storageUserSave(mockedUser)
      expect(response).toBeUndefined()

      const storedUser = await AsyncStorage.getItem(USER_STORAGE)
      expect(storedUser).toEqual(JSON.stringify(mockedUser))
    })
  })

  describe('storageUserGet', () => {
    it('should return null when there is no user data stored', async () => {
      const response = await storageUserGet()

      expect(response).toBeNull()
    })

    it('should return the user object retrieve from storage', async () => {
      // Prepare storage
      await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(mockedUser))

      // Act
      const response = await storageUserGet()
      expect(response).toEqual(mockedUser)
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
      await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(mockedUser))

      const response = await storageUserRemove()

      expect(response).toBeUndefined()
      expect(removeItemSpy).toBeCalledTimes(1)
      expect(removeItemSpy).toBeCalledWith(USER_STORAGE)
      expect(await AsyncStorage.getItem(USER_STORAGE)).toBeNull()
    })
  })
})
