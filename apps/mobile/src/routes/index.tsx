import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useTheme } from 'native-base'

import { useAuth } from '~/hooks/useAuth'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { Loading } from '~/components/Loading'

export function Routes() {
  const { colors } = useTheme()
  const theme = DefaultTheme

  const { user, isLoadingStorageData } = useAuth()

  theme.colors.background = colors.gray[700]

  if (isLoadingStorageData) {
    return <Loading testID="loading-spinner" />
  }

  return (
    <NavigationContainer theme={theme}>
      {user?.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
