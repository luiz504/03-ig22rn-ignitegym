import { FC } from 'react'
import { Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Center, Heading, Image, Text, VStack } from 'native-base'

import LogoSvg from '~/assets/icons/logo.svg'
import BGImg from '~/assets/images/background.png'

import { Button } from '~/components/Button'
import { Input } from '~/components/Input'
import { AuthNavigatorRouteProps } from '~/routes/auth.routes'

export const SignIn: FC = () => {
  const { navigate } = useNavigation<AuthNavigatorRouteProps>()

  const handleClickSignIn = () => {
    Keyboard.dismiss()
  }

  const handleClickSignUp = () => {
    Keyboard.dismiss()
    navigate('signUp')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        testID="background-view"
      >
        <VStack flex={1} px={10} pb={8}>
          <Image
            source={BGImg}
            defaultSource={BGImg}
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

          <VStack flex={1}>
            <Center mt={24} mb={24}>
              <Heading
                color="gray.100"
                fontSize={'xl'}
                fontFamily={'heading'}
                lineHeight={32}
                mb={'18px'}
              >
                Sign in with your account
              </Heading>

              <Input
                mb={4}
                keyboardType="email-address"
                placeholder="E-mail"
                autoCapitalize="none"
              />

              <Input mb={4} placeholder="Password" secureTextEntry />

              <Button
                label={'Sign in'}
                onPress={handleClickSignIn}
                testID="btn-sign-in"
              />
            </Center>

            <Center mt="auto">
              <Text color="gray.100" fontSize="md" lineHeight={25.6} mb={3}>
                Don&apos;t have access yet?
              </Text>

              <Button
                label={'Create Account'}
                variant={'outline'}
                onPress={handleClickSignUp}
                testID="btn-sign-up"
              />
            </Center>
          </VStack>
        </VStack>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
