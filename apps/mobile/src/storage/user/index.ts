import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserDTO } from '~/dtos/UserDTO'
import { USER_STORAGE } from '../config'

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
  const user = await AsyncStorage.getItem(USER_STORAGE)
  if (!user) return null

  return JSON.parse(user) as UserDTO
}
