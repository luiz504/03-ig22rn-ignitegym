import { FC } from 'react'
import { Button, HStack, Heading, Text, VStack, useTheme } from 'native-base'

import ExitIcon from '~/assets/icons/exit.svg'

import { UserPhoto } from '~/components/UserPhoto'

export const Header: FC = () => {
  const theme = useTheme()

  return (
    <HStack pt={16} pb={5} px={8} alignItems="center" bg="gray.600">
      <UserPhoto
        size={16}
        source={{ uri: 'https://github.com/luiz504.png' }}
        alt="User photo"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize={'md'}>
          Header
        </Text>

        <Heading color="gray.100" fontSize={'md'}>
          Luiz Bueno
        </Heading>
      </VStack>

      <Button
        _pressed={{ bg: theme.colors.gray[500], opacity: 0.5 }}
        rounded={'md'}
        android_ripple={{ color: 'rgba(255,255,255, 0.1)' }}
        bg="transparent"
      >
        <ExitIcon fill={theme.colors.gray[200]} />
      </Button>
    </HStack>
  )
}
