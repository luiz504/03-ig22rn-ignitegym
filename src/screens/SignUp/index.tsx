import { FC } from 'react'
import { Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Center, Heading, Image, Text, VStack } from 'native-base'

import LogoSvg from '~/assets/icons/logo.svg'
import BGImg from '~/assets/images/background.png'

import { Button } from '~/components/Button'
import { Input } from '~/components/Input'

export const SignUp: FC = () => {
  const navigator = useNavigation()

  const handleClickSignUp = () => {
    Keyboard.dismiss()
  }

  const handleClickGoBack = () => {
    Keyboard.dismiss()
    navigator.goBack()
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
            <Center mb={24}>
              <Heading
                color="gray.100"
                fontSize={'xl'}
                fontFamily={'heading'}
                lineHeight={32}
                mb={'18px'}
              >
                Create your account.
              </Heading>

              <Input mb={4} placeholder="Name" />

              <Input
                mb={4}
                keyboardType="email-address"
                placeholder="E-mail"
                autoCapitalize="none"
              />

              <Input mb={4} placeholder="Password" secureTextEntry />

              <Input mb={4} placeholder="Confirm password" secureTextEntry />

              <Button
                label={'Sign up'}
                onPress={handleClickSignUp}
                testID="btn-sign-up"
              />
            </Center>

            <Center mt="auto">
              <Button
                label={'Go back to Sign in'}
                variant={'outline'}
                onPress={handleClickGoBack}
                testID="btn-go-back-sign-in"
              />
            </Center>
          </VStack>
        </VStack>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
