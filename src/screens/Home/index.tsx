import { FC } from 'react'
import { Text, VStack } from 'native-base'
import { Header } from './components/Header'

export const Home: FC = () => {
  return (
    <VStack flex={1}>
      <Header />
      <Text color="amber.200"> Home </Text>
    </VStack>
  )
}
