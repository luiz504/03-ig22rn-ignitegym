import { FC } from 'react'
import { Button, HStack, Heading, Text, VStack, useTheme } from 'native-base'

import DefaultPhoto from '~/assets/images/userPhotoDefault.png'
import ExitIcon from '~/assets/icons/exit.svg'

import { UserPhoto } from '~/components/UserPhoto'
import { useAuth } from '~/hooks/useAuth'
import { api } from '~/libs/axios'

export const Header: FC = () => {
  const theme = useTheme()

  const { signOut, user } = useAuth()

  const handleSignOut = () => {
    signOut()
  }

  const avatarSource = user?.avatar
    ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
    : DefaultPhoto

  return (
    <HStack pt={16} pb={5} px={8} alignItems="center" bg="gray.600">
      <UserPhoto
        size={16}
        source={avatarSource}
        alt="User photo"
        mr={4}
        testID="user-avatar"
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md" lineHeight="md-160">
          Hi,
        </Text>

        <Heading
          color="gray.100"
          fontSize="md"
          lineHeight="md-160"
          fontFamily="heading"
        >
          {user?.name}
        </Heading>
      </VStack>

      <Button
        _pressed={{ bg: theme.colors.gray[500], opacity: 0.5 }}
        rounded={'md'}
        android_ripple={{ color: 'rgba(255,255,255, 0.1)' }}
        bg="transparent"
        onPress={handleSignOut}
        testID="btn-sign-out"
      >
        <ExitIcon fill={theme.colors.gray[200]} />
      </Button>
    </HStack>
  )
}
