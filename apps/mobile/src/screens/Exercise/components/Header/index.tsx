import { useNavigation } from '@react-navigation/native'
import { HStack, Heading, Text, VStack } from 'native-base'
import { FC } from 'react'
import { TouchableOpacity } from 'react-native'

import ArrowLeft from '~/assets/icons/arrow-left.svg'
import BodyIcon from '~/assets/icons/body.svg'
import { Skeleton } from '~/components/Skeleton'

import { AppNavigatorRouteProps } from '~/routes/app.routes'

type IHeaderProps = {
  name: string
  group: string
}

export const Header: FC<IHeaderProps> = ({ name, group }) => {
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
          {name}
        </Heading>

        <HStack space={1} alignItems="center">
          <BodyIcon />

          <Text
            color="gray.200"
            fontSize="md"
            lineHeight="md-160"
            textTransform={'capitalize'}
          >
            {group}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  )
}

export const HeaderSkeleton: FC = () => {
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
        <Skeleton.SM h="28.8px" w={40} />

        <HStack space={1} alignItems="center">
          <BodyIcon />

          <Skeleton.SM h={'25.4px'} w={20} />
        </HStack>
      </HStack>
    </VStack>
  )
}
