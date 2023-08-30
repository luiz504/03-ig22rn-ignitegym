import { useNavigation } from '@react-navigation/native'
import { HStack, Heading, Text, VStack } from 'native-base'
import { FC } from 'react'
import { TouchableOpacity } from 'react-native'

import ArrowLeft from '~/assets/icons/arrow-left.svg'
import BodyIcon from '~/assets/icons/body.svg'

import { AppNavigatorRouteProps } from '~/routes/app.routes'

export const Header: FC = () => {
  const navigation = useNavigation<AppNavigatorRouteProps>()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <VStack p={8} pt={12} bg="gray.600">
      <TouchableOpacity onPress={handleGoBack} testID="btn-go-back">
        <ArrowLeft />
      </TouchableOpacity>

      <HStack mt={3} alignItems="center" justifyContent="space-between">
        <Heading
          color="gray.100"
          fontSize="lg"
          lineHeight="lg-160"
          fontFamily="heading"
          flexShrink={1}
        >
          Front Row
        </Heading>

        <HStack alignItems="center">
          <BodyIcon />

          <Text
            color="gray.200"
            fontSize="md"
            lineHeight="md-160"
            ml={1}
            textTransform={'capitalize'}
          >
            Back
          </Text>
        </HStack>
      </HStack>
    </VStack>
  )
}
