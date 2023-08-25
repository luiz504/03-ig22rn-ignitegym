import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { ThemeProvider } from 'styled-components'

export default function App() {
  return (
    <ThemeProvider theme={{}}>
      <StatusBar style="auto" />

      <View>
        <Text>Hello word</Text>
      </View>
    </ThemeProvider>
  )
}
