import 'react-native-gesture-handler'
import { useCallback, useLayoutEffect } from 'react'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { Box, NativeBaseProvider } from 'native-base'
import * as SplashScreen from 'expo-splash-screen'

import { Routes } from '~/routes'

import { AuthContextProvider } from '~/contexts/AuthContext'

import { THEME } from '~/theme'

SplashScreen.preventAutoHideAsync()
export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  useLayoutEffect(() => {
    onLayoutRootView()
  }, [onLayoutRootView])

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <NativeBaseProvider theme={THEME}>
        <AuthContextProvider>
          <Box bg={'gray.800'} flex={1} testID="root-view">
            <Routes />
          </Box>
        </AuthContextProvider>
      </NativeBaseProvider>
    </>
  )
}
