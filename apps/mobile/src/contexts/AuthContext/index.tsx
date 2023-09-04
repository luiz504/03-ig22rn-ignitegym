import { FC, createContext, useEffect, useState } from 'react'
import { UserDTO, userDTOSchema } from '~/dtos/UserDTO'
import { api } from '~/libs/axios'
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

  const signIn = async ({ email, password }: SignInDTO) => {
    if (!email || !password) {
      throw new AppError('Email and password required.')
    }

    const { data } = await api.post('/sessions', { email, password })

    const result = userDTOSchema.safeParse(data?.user)

    if (result.success) {
      const _user: UserDTO = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar,
      }
      setUser(_user)
      await storageUserSave(_user)
      return
    }

    throw new AppError('Invalid API response data')
  }

  const signOut = async () => {
    setUser(null)
    await storageUserRemove()
  }

  const [isLoadingStorageData, setIsLoadingStorageData] = useState(true)

  const loadUserStoredData = async () => {
    try {
      setIsLoadingStorageData(true)
      const data = await storageUserGet()

      setUser(data)
    } finally {
      setIsLoadingStorageData(false)
    }
  }

  useEffect(() => {
    loadUserStoredData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isLoadingStorageData }}
    >
      {children}
    </AuthContext.Provider>
  )
}
