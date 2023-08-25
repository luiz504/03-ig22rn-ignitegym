import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  })

  if (!fontsLoaded) return null

  return (
    <>
      <StatusBar style="auto" />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{ color: 'red', fontSize: 50, fontFamily: 'Roboto-Regular' }}
        >
          Hello 2 word
        </Text>
      </View>
    </>
  )
}
