import { Center, Heading, Image, Text, VStack } from 'native-base'
import { FC } from 'react'

import LogoSvg from '~/assets/icons/logo.svg'
import BGImg from '~/assets/images/background.png'
import { Input } from '~/components/Input'

export const SignIn: FC = () => {
  return (
    <VStack flex={1} bg="gray.700" px={10}>
      <Image
        source={BGImg}
        alt="People working out"
        resizeMode="cover"
        position={'absolute'}
      />

      <Center my={24}>
        <LogoSvg />

        <Text color="gray.100" fontSize={'sm'} lineHeight={22.4}>
          Train your mind and your body.
        </Text>
      </Center>

      <Center>
        <Heading
          color="gray.100"
          fontSize={'xl'}
          fontFamily={'heading'}
          lineHeight={32}
          mb={'18px'}
        >
          Sign In
        </Heading>

        <Input
          mb={4}
          keyboardType="email-address"
          placeholder="E-mail"
          autoCapitalize="none"
        />
        <Input placeholder="Password" secureTextEntry />
      </Center>
    </VStack>
  )
}
