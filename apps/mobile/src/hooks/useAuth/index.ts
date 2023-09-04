import { useContext } from 'react'
import { AuthContext } from '~/contexts/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)

  if (!Object.keys(context).length) {
    throw new Error('You must use this hook under AuthContextProvider')
  }
  return context
}
