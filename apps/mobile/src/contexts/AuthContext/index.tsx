import { FC, createContext, useCallback, useEffect, useState } from 'react'
import { UserDTO, userDTOSchema } from '~/dtos/UserDTO'
import { api } from '~/libs/axios'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '~/storage/auth'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '~/storage/user'
import { AppError } from '~/utils/AppError'

type SignInDTO = {
  email: string
  password: string
}

type AuthContextType = {
  user: UserDTO | null
  signIn: (params: SignInDTO) => Promise<void>
  signOut: () => Promise<void>
  isLoadingStorageData: boolean
}
export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDTO | null>(null)

  const userAndTokenUpdate = async (userData: UserDTO, token: string) => {
    setUser(userData)

    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  const signIn = async ({ email, password }: SignInDTO) => {
    if (!email || !password) {
      throw new AppError('Email and password required.')
    }

    const { data } = await api.post('/sessions', { email, password })

    const result = userDTOSchema.safeParse(data?.user)

    if (result.success && data.token) {
      const userData: UserDTO = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar,
      }

      await Promise.all([
        storageUserSave(userData),
        storageAuthTokenSave(data.token),
        userAndTokenUpdate(userData, data.token),
      ])

      return
    }

    throw new AppError('Invalid API response data')
  }

  const signOut = async () => {
    await Promise.all([storageUserRemove(), storageAuthTokenRemove()])
    setUser(null)
    delete api.defaults.headers.common.Authorization
  }

  const [isLoadingStorageData, setIsLoadingStorageData] = useState(true)

  const loadUserStoredData = useCallback(async () => {
    try {
      setIsLoadingStorageData(true)

      const [userData, token] = await Promise.all([
        storageUserGet(),
        storageAuthTokenGet(),
      ])

      if (userData && token) {
        await userAndTokenUpdate(userData, token)
      }
    } finally {
      setIsLoadingStorageData(false)
    }
  }, [])

  useEffect(() => {
    loadUserStoredData()
  }, [loadUserStoredData])

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isLoadingStorageData }}
    >
      {children}
    </AuthContext.Provider>
  )
}
