import { FC, useState } from 'react'
import { Box, Center, Heading, Text, VStack } from 'native-base'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { zodResolver } from '@hookform/resolvers/zod'

import { Header } from '~/components/Header'
import { UserPhoto } from '~/components/UserPhoto'
import { Input } from '~/components/Input'
import { Button } from '~/components/Button'

import { useAuth } from '~/hooks/useAuth'

import { FormProfileType, formProfileSchema } from './formSchema'
import { usePutUserProfileMutation } from '~/hooks/mutations/usePutUserProfileMutation'
import { useAppToast } from '~/hooks/useAppToast'

const PHOTO_SIZE = 33

export const Profile: FC = () => {
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/luiz504.png')

  const { user, updateUserProfile } = useAuth()

  const {
    control,
    handleSubmit,
    getValues,
    clearErrors,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<FormProfileType>({
    resolver: zodResolver(formProfileSchema),
    resetOptions: { keepDirty: false, keepErrors: false },
    defaultValues: {
      name: user?.name,
    },
  })

  //* Inputs Blur handlers
  const handlePwFieldBlur = () => {
    const { confirmPassword, currentPassword, newPassword } = getValues()

    if (!confirmPassword && !currentPassword && !newPassword) {
      clearErrors(['currentPassword', 'newPassword', 'confirmPassword'])
    }
  }

  const handleNameInputBlur = (value: string) => {
    const trimmedValue = value.trim()

    if (!trimmedValue) {
      setValue('name', user?.name as string)
      clearErrors(['name'])
    } else {
      setValue('name', trimmedValue)
    }
  }
  //* Submit handlers
  const handleUserPhotoSelect = async () => {
    try {
      setIsLoadingPhoto(true)
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        allowsMultipleSelection: false,
      })

      if (photoSelected.canceled || !photoSelected.assets[0].uri) {
        return
      }

      const photoInfo = await FileSystem.getInfoAsync(
        photoSelected.assets[0].uri,
      )

      if (photoInfo.exists && !photoInfo.isDirectory) {
        if (photoInfo.size / 1024 / 1024 > 5) {
          return toast.showError({
            title: 'Change Photo Error',
            description:
              'This photo is too large. Please select one with max size of 5mb.',
          })
        }
        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (err) {
      toast.showError({
        title: 'Change Photo Error',
        description: 'Something went wrong, try again later',
      })
    } finally {
      setIsLoadingPhoto(false)
    }
  }
  const { mutateAsync, isLoading: isUpdating } = usePutUserProfileMutation()
  const toast = useAppToast()

  const handleUpdateProfile = async (data: FormProfileType) => {
    if (!user) return // Compiler Gisnastics

    const nameHasChanged = data.name !== user?.name
    const pwHasChanged = data.newPassword !== data.currentPassword
    const pwExistsAndIsTheSame = !!data.newPassword && pwHasChanged

    if (nameHasChanged || pwHasChanged) {
      await mutateAsync({
        name: data.name,
        old_password: data.currentPassword,
        password: data.newPassword,
      })
      if (pwHasChanged) {
        setValue('currentPassword', '')
        setValue('newPassword', '')
        setValue('confirmPassword', '')
      }
      if (nameHasChanged) {
        const userUpdated = user
        userUpdated.name = data.name
        await updateUserProfile(userUpdated)
      }
    }
    if (pwExistsAndIsTheSame) {
      toast.showError({ title: 'Old password provided equals new password.' })
      setFocus('currentPassword')
    }
  }

  return (
    <VStack flex={1}>
      <Header title="Profile" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center alignItems={'center'} mt={6} px={10}>
          <Box position={'relative'}>
            <UserPhoto
              size={PHOTO_SIZE}
              source={{ uri: userPhoto }}
              alt="User Photo"
              testID="img-user-photo"
            />
          </Box>

          <TouchableOpacity>
            <Text
              color="green.500"
              fontFamily="heading"
              mt={3}
              onPress={handleUserPhotoSelect}
              disabled={isLoadingPhoto}
              testID="btn-change-photo"
            >
              Change Photo
            </Text>
          </TouchableOpacity>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, ref, value } }) => (
              <Input
                ref={ref}
                placeholder="Name"
                value={value}
                onChangeText={onChange}
                onBlur={() => handleNameInputBlur(value)}
                errorMsg={errors.name?.message}
                _container={{ mt: 8 }}
                bg="gray.600"
                testID="input-name"
              />
            )}
          />

          <Input
            mt={4}
            placeholder="E-mail"
            bg="gray.600"
            defaultValue={user?.email}
            isDisabled
          />

          <Heading
            color="gray.200"
            fontSize="md"
            lineHeight="md-160"
            fontFamily="heading"
            mt={12}
            alignSelf={'flex-start'}
          >
            Change Password
          </Heading>

          <Controller
            control={control}
            name="currentPassword"
            render={({ field: { onChange, ref, value } }) => (
              <Input
                ref={ref}
                placeholder="Current password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={handlePwFieldBlur}
                onSubmitEditing={() => setFocus('newPassword')}
                errorMsg={errors.currentPassword?.message}
                _container={{ mt: 2 }}
                bg="gray.600"
                testID="input-current-password"
              />
            )}
          />

          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, ref, value } }) => (
              <Input
                ref={ref}
                placeholder="New Password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={handlePwFieldBlur}
                onSubmitEditing={() => setFocus('confirmPassword')}
                errorMsg={errors.newPassword?.message}
                _container={{ mt: 4 }}
                bg="gray.600"
                testID="input-new-password"
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, ref, value } }) => (
              <Input
                ref={ref}
                placeholder="Confirm New Password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={handlePwFieldBlur}
                onSubmitEditing={handleSubmit(handleUpdateProfile)}
                errorMsg={errors.confirmPassword?.message}
                _container={{ mt: 4 }}
                bg="gray.600"
                testID="input-confirm-password"
              />
            )}
          />

          <Button
            mt={8}
            label="Update"
            onPress={handleSubmit(handleUpdateProfile)}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
