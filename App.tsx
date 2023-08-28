import 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { Box, NativeBaseProvider } from 'native-base'

import { THEME } from '~/theme'

import { Loading } from '~/components/Loading'

import { Routes } from '~/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <Box bg={'gray.800'} flex={1}>
        {!fontsLoaded && <Loading />}

        {fontsLoaded && <Routes />}
      </Box>
    </NativeBaseProvider>
  )
}
