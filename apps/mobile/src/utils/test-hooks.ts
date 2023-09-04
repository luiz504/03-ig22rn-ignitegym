import { UserDTO } from '~/dtos/UserDTO'
import * as useAuthHookModule from '~/hooks/useAuth'
import * as StorageUserModule from '~/storage/user'

const MockedUser: UserDTO = {
  id: 300,
  email: 'john@example.com',
  name: 'John Doe',
  avatar: 'avatar:url',
} as const
const useAuthSpy = (
  user: UserDTO | null = null,
  isLoadingStorageData = false,
) => {
  const signInMock = jest.fn()
  const signOutMock = jest.fn()
  jest.spyOn(useAuthHookModule, 'useAuth').mockReturnValue({
    user,
    isLoadingStorageData,
    signIn: signInMock,
    signOut: signOutMock,
  })
  jest.spyOn(StorageUserModule, 'storageUserGet').mockResolvedValue(user)

  return { signInMock, signOutMock }
}
const useAuthSpyShallow = (user: UserDTO | null = null) => {
  jest.spyOn(StorageUserModule, 'storageUserGet').mockResolvedValue(user)
}

export { useAuthSpy, useAuthSpyShallow, MockedUser }
