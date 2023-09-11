import { UserDTO } from '~/dtos/UserDTO'

import * as AuthContextModule from '~/contexts/AuthContext'

type UseAuthSpy = {
  user?: null | UserDTO
  isLoadingData?: boolean
}

const useAuthContextSpy = ({ user, isLoadingData }: UseAuthSpy = {}) => {
  const signInMock = jest.fn()
  const signOutMock = jest.fn()
  const updateUserProfileMock = jest.fn()

  const mock0 = jest
    .spyOn(AuthContextModule, 'AuthContextProvider')
    .mockImplementation(({ children }) => (
      <AuthContextModule.AuthContext.Provider
        value={{
          signIn: signInMock,
          signOut: signOutMock,
          updateUserProfile: updateUserProfileMock,
          user: user || null,
          isLoadingStorageData: isLoadingData || false,
        }}
      >
        {children}
      </AuthContextModule.AuthContext.Provider>
    ))

  const mockRestore = () => {
    mock0.mockRestore()
  }
  return { signInMock, signOutMock, updateUserProfileMock, mockRestore }
}

export { useAuthContextSpy }
