import { renderHook, waitFor } from '@testing-library/react-native'
import { useContext } from 'react'
import { act } from 'react-test-renderer'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AuthContext, AuthContextProvider } from '.'
import { AppError } from '~/utils/AppError'
import { api } from '~/libs/axios'
import { MockedUser } from '~/utils/test-hooks'
import * as StoreUserModule from '~/storage/user'

describe('AuthContext', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  describe('loadUserStoredData effect', () => {
    it('should load the stored userData and handle the loading state', async () => {
      jest
        .spyOn(StoreUserModule, 'storageUserGet')
        .mockResolvedValue(MockedUser)
      const { result } = renderHook(() => useContext(AuthContext), {
        wrapper: AuthContextProvider,
      })

      // Assert Initial values
      expect(result.current.isLoadingStorageData).toBe(true)
      expect(result.current.user).toBeNull()

      await waitFor(() =>
        expect(result.current.isLoadingStorageData).toBe(false),
      )
      await waitFor(() => expect(result.current.user).toBe(MockedUser))
    })
  })

  describe('signIn', () => {
    it('should throw an error if either email or password is undefined', async () => {
      const { result } = renderHook(() => useContext(AuthContext), {
        wrapper: AuthContextProvider,
      })
      await waitFor(() =>
        expect(result.current.isLoadingStorageData).toBe(false),
      )

      try {
        await result.current.signIn({
          password: 'qweqw',
        } as any)
      } catch (err) {
        expect(err).toBeInstanceOf(AppError)
      }

      try {
        await result.current.signIn({
          email: '12312',
        } as any)
      } catch (err) {
        expect(err).toBeInstanceOf(AppError)
      }
    })

    it('should throw an error if the API response is invalid', async () => {
      jest
        .spyOn(api, 'post')
        .mockResolvedValue({ data: 'some invalid response schema' })
      const { result } = renderHook(() => useContext(AuthContext), {
        wrapper: AuthContextProvider,
      })
      await waitFor(() =>
        expect(result.current.isLoadingStorageData).toBe(false),
      )

      // Act
      try {
        await result.current.signIn({
          email: 'some@example.com',
          password: '123456',
        })
      } catch (err) {
        expect(err).toBeInstanceOf(AppError)
        expect((err as AppError).message).toBe('Invalid API response data')
      }
    })

    it('should throw an error if the API response is invalid', async () => {
      jest.spyOn(api, 'post').mockResolvedValue({ data: { user: MockedUser } })
      const storeSaveUserSpy = jest.spyOn(StoreUserModule, 'storageUserSave')
      const { result } = renderHook(() => useContext(AuthContext), {
        wrapper: AuthContextProvider,
      })
      await waitFor(() =>
        expect(result.current.isLoadingStorageData).toBe(false),
      )

      // Act
      await act(async () => {
        await result.current.signIn({
          email: 'some@example.com',
          password: '123456',
        })
      })

      await waitFor(() =>
        expect(storeSaveUserSpy).toHaveBeenCalledWith(MockedUser),
      )
      await waitFor(() => expect(result.current.user).toEqual(MockedUser))
    })
  })

  describe('signOut', () => {
    beforeEach(async () => {
      await StoreUserModule.storageUserSave(MockedUser)
    })

    it('should clear the user state and the stored user entry', async () => {
      const storeSaveRemoveSpy = jest.spyOn(
        StoreUserModule,
        'storageUserRemove',
      )

      const { result } = renderHook(() => useContext(AuthContext), {
        wrapper: AuthContextProvider,
      })

      await waitFor(() =>
        expect(result.current.isLoadingStorageData).toBe(false),
      )

      // Act
      await act(async () => {
        await result.current.signOut()
      })

      await waitFor(() => expect(result.current.user).toEqual(null))
      await waitFor(() => expect(storeSaveRemoveSpy).toHaveBeenCalledTimes(1))
    })
  })
})
