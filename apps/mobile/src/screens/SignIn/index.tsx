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
import { useAuth } from '~/hooks/useAuth'
import { AppError } from '~/utils/AppError'
import { useToast } from 'native-base/src/components/composites'

const formSignInSchema = z.object({
  email: z
    .string({ required_error: formErrorMessages.emailRequired })
    .email(formErrorMessages.invalidEmail),
  password: z.string({ required_error: formErrorMessages.passwordRequired }),
})

type FormSignInType = z.infer<typeof formSignInSchema>
export const SignIn: FC = () => {
  const { navigate } = useNavigation<AuthNavigatorRouteProps>()
  const { signIn } = useAuth()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<FormSignInType>({
    resolver: zodResolver(formSignInSchema),
  })

  const handleClickSignIn = async ({ email, password }: FormSignInType) => {
    try {
      await signIn({ email, password })
    } catch (err) {
      const isAppError = err instanceof AppError
      const title = isAppError ? err.message : 'Fail to login, try again later.'

      toast.show({ placement: 'top', bgColor: 'red.500', title })
    }
  }

  const handleClickSignUp = () => {
    Keyboard.dismiss()
    navigate('signUp')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      testID="signIn-container"
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
                render={({ field: { onChange, ref, value } }) => (
                  <Input
                    ref={ref}
                    keyboardType="email-address"
                    placeholder="E-mail"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onSubmitEditing={() => setFocus('password')}
                    isDisabled={isSubmitting}
                    errorMsg={errors.email?.message}
                    _container={{ mb: 4 }}
                    testID="input-email"
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, ref, value } }) => (
                  <Input
                    ref={ref}
                    placeholder="Password"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(handleClickSignIn)}
                    isDisabled={isSubmitting}
                    errorMsg={errors.password?.message}
                    _container={{ mb: 4 }}
                    testID="input-password"
                  />
                )}
              />

              <Button
                label={'Sign in'}
                onPress={handleSubmit(handleClickSignIn)}
                isLoading={isSubmitting}
                testID="btn-submit"
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
