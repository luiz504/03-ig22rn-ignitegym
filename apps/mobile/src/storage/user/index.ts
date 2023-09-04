import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserDTO, userDTOSchema } from '~/dtos/UserDTO'
import { USER_STORAGE } from '../config'

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
  const user = await AsyncStorage.getItem(USER_STORAGE)

  if (!user) return null

  const parsedUser = JSON.parse(user)
  const validation = userDTOSchema.safeParse(parsedUser)

  if (validation.success) {
    return validation.data
  } else {
    return null
  }
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE)
}
