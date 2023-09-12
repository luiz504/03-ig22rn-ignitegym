/* eslint-disable camelcase */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_TOKEN_STORAGE } from '../config'

type StorageAuthTokenDTO = {
  token: string
  refresh_token: string
}

export async function storageAuthTokenSave({
  token,
  refresh_token,
}: StorageAuthTokenDTO) {
  return AsyncStorage.setItem(
    AUTH_TOKEN_STORAGE,
    JSON.stringify({ token, refresh_token }),
  )
}

export async function storageAuthTokenGet() {
  const stored = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

  if (!stored) {
    return null
  }

  return JSON.parse(stored) as StorageAuthTokenDTO
}

export async function storageAuthTokenRemove() {
  return AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
