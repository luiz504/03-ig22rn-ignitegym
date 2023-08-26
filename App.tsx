import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { Box, NativeBaseProvider } from 'native-base'
import { Loading } from '~/components/Loading'
import { SignIn } from '~/screens/SignIn'
import { THEME } from '~/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <Box bg={'gray.800'} flex={1}>
        {fontsLoaded ? <SignIn /> : <Loading />}
      </Box>
    </NativeBaseProvider>
  )
}
