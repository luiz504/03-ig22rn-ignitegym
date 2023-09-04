import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_TOKEN_STORAGE } from '../config'

export async function storageAuthTokenSave(token: string) {
  return AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
}

export async function storageAuthTokenGet() {
  return AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
}

export async function storageAuthTokenRemove() {
  return AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
