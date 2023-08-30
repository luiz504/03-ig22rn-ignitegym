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

const formSignUpSchema = z
  .object({
    name: z
      .string({ required_error: formErrorMessages.nameRequired })
      .nonempty(),
    email: z
      .string({ required_error: formErrorMessages.emailRequired })
      .email(formErrorMessages.invalidEmail),
    password: z
      .string({ required_error: formErrorMessages.passwordRequired })
      .min(6, formErrorMessages.passwordMin6),
    confirmPassword: z
      .string({ required_error: formErrorMessages.confirmPasswordRequired })
      .min(6, formErrorMessages.passwordMin6),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password && confirmPassword && password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: formErrorMessages.passwordDoesNotMatch,
        path: ['confirmPassword'],
      })
    }
  })

type FormSignUpType = z.infer<typeof formSignUpSchema>
export const SignUp: FC = () => {
  const navigator = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignUpType>({
    resolver: zodResolver(formSignUpSchema),
  })

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
            position="absolute"
          />

          <Center my={24}>
            <LogoSvg />

            <Text color="gray.100" fontSize="sm" lineHeight="sm-160">
              Train your mind and your body.
            </Text>
          </Center>

          <VStack flex={1}>
            <Center mb={24}>
              <Heading
                color="gray.100"
                fontSize="xl"
                lineHeight="xl-160"
                fontFamily="heading"
                mb="18px"
              >
                Create your account.
              </Heading>

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Name"
                    value={value}
                    onChangeText={onChange}
                    errorMsg={errors.name?.message}
                    _container={{ mb: 4 }}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    keyboardType="email-address"
                    placeholder="E-mail"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    errorMsg={errors.email?.message}
                    _container={{ mb: 4 }}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Password"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    errorMsg={errors.password?.message}
                    _container={{ mb: 4 }}
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Confirm password"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(handleClickSignUp)}
                    errorMsg={errors.confirmPassword?.message}
                    _container={{ mb: 4 }}
                  />
                )}
              />

              <Button
                label={'Sign up'}
                onPress={handleSubmit(handleClickSignUp)}
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
