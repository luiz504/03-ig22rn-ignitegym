import { UserDTO } from '~/dtos/UserDTO'
import * as useAuthHookModule from '~/hooks/useAuth'
import * as StorageUserModule from '~/storage/user'
import * as StorageAuthModule from '~/storage/auth'

const MockedUser: UserDTO = {
  id: 300,
  email: 'john@example.com',
  name: 'John Doe',
  avatar: 'avatar:url',
} as const
const MockedToken = 'SomeTokenMocked'

type UserAndToken =
  | { user?: null; token?: null }
  | { user: UserDTO; token: string }

type UseAuthSpy = {
  isLoadingData?: boolean
} & UserAndToken

const useAuthSpy = ({ user, token, isLoadingData }: UseAuthSpy = {}) => {
  const signInMock = jest.fn()
  const signOutMock = jest.fn()
  jest.spyOn(useAuthHookModule, 'useAuth').mockReturnValue({
    user: user || null,
    isLoadingStorageData: isLoadingData || false,
    signIn: signInMock,
    signOut: signOutMock,
  })
  const mock1 = jest
    .spyOn(StorageUserModule, 'storageUserGet')
    .mockImplementation(() => Promise.resolve(user || null))
  const mock2 = jest
    .spyOn(StorageAuthModule, 'storageAuthTokenGet')
    .mockImplementation(() => Promise.resolve(token || null))

  const mockRestore = () => {
    mock1.mockRestore()
    mock2.mockRestore()
  }
  return { signInMock, signOutMock, mockRestore }
}
const useAuthSpyShallow = ({ user, token }: UserAndToken) => {
  const mock1 = jest
    .spyOn(StorageUserModule, 'storageUserGet')
    .mockImplementation(() => Promise.resolve(user || null))
  const mock2 = jest
    .spyOn(StorageAuthModule, 'storageAuthTokenGet')
    .mockImplementation(() => Promise.resolve(token || null))

  const mockRestore = () => {
    mock1.mockRestore()
    mock2.mockRestore()
  }

  return { mockRestore }
}

export { useAuthSpy, useAuthSpyShallow, MockedUser, MockedToken }
