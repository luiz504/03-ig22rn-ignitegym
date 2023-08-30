import { FC } from 'react'
import { Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Center, Heading, Image, Text, VStack } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import LogoSvg from '~/assets/icons/logo.svg'
import BGImg from '~/assets/images/background.png'

import { formErrorMessages } from '~/constants/formErrors'

import { Button } from '~/components/Button'
import { Input } from '~/components/Input'

import { AuthNavigatorRouteProps } from '~/routes/auth.routes'

const formSignInSchema = z.object({
  email: z
    .string({ required_error: formErrorMessages.emailRequired })
    .email(formErrorMessages.invalidEmail),
  password: z.string({ required_error: formErrorMessages.passwordRequired }),
})

type FormSignInType = z.infer<typeof formSignInSchema>
export const SignIn: FC = () => {
  const { navigate } = useNavigation<AuthNavigatorRouteProps>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignInType>({
    resolver: zodResolver(formSignInSchema),
  })

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

            <Text color="gray.100" fontSize="sm" lineHeight="sm-160">
              Train your mind and your body.
            </Text>
          </Center>

          <VStack flex={1}>
            <Center mt={24} mb={24}>
              <Heading
                color="gray.100"
                fontSize="xl"
                lineHeight="xl-160"
                fontFamily="heading"
                mb="18px"
              >
                Sign in with your account
              </Heading>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange } }) => (
                  <Input
                    keyboardType="email-address"
                    placeholder="E-mail"
                    autoCapitalize="none"
                    onChangeText={(value) => onChange(value)}
                    errorMsg={errors.email?.message}
                    _container={{ mb: 4 }}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(value) => onChange(value)}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(handleClickSignIn)}
                    errorMsg={errors.password?.message}
                    _container={{ mb: 4 }}
                  />
                )}
              />

              <Button
                label={'Sign in'}
                onPress={handleSubmit(handleClickSignIn)}
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
