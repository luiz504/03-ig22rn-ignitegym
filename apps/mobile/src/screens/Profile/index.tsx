import { FC, useMemo, useState } from 'react'
import { Box, Center, Heading, Text, VStack } from 'native-base'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { zodResolver } from '@hookform/resolvers/zod'

import DefaultPhoto from '~/assets/images/userPhotoDefault.png'

import { useAuth } from '~/hooks/useAuth'
import { usePutUserProfileMutation } from '~/hooks/mutations/usePutUserProfileMutation'
import { useAppToast } from '~/hooks/useAppToast'
import { usePatchUserProfileAvatar } from '~/hooks/mutations/usePatchUserProfileAvatar'

import { api } from '~/libs/axios'

import { Header } from '~/components/Header'
import { UserPhoto } from '~/components/UserPhoto'
import { Input } from '~/components/Input'
import { Button } from '~/components/Button'

import { FormProfileType, formProfileSchema } from './formSchema'
import { UserDTO } from '~/dtos/UserDTO'

const PHOTO_SIZE = 33

export const Profile: FC = () => {
  const { user, updateUserProfile } = useAuth()
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)
  const [userPhoto, setUserPhoto] = useState<string | null>(null)

  const avatarSource = useMemo(() => {
    if (userPhoto) {
      return { uri: userPhoto }
    }
    if (user?.avatar) {
      return { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
    }
    return DefaultPhoto
  }, [user, userPhoto])

  const {
    control,
    handleSubmit,
    getValues,
    clearErrors,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormProfileType>({
    resolver: zodResolver(formProfileSchema),
    resetOptions: { keepDirty: false, keepErrors: false },
    defaultValues: {
      name: user?.name,
    },
  })
  const { mutateAsync: mutateAvatar, isLoading: isUploading } =
    usePatchUserProfileAvatar()
  //* Image Handlers
  const handleUserPhotoSelect = async () => {
    const currentUser = user as UserDTO

    try {
      setIsLoadingPhoto(true)
      const photosSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        allowsMultipleSelection: false,
      })

      if (photosSelected.canceled || !photosSelected.assets[0].uri) {
        return
      }
      const photoSelected = photosSelected.assets[0]

      const photoInfo = await FileSystem.getInfoAsync(photoSelected.uri)

      if (photoInfo.exists && !photoInfo.isDirectory) {
        if (photoInfo.size / 1024 / 1024 > 5) {
          return toast.showError({
            title: 'Change Photo Error',
            description:
              'This photo is too large. Please select one with max size of 5mb.',
          })
        }

        const fileExtension = photoSelected.uri.split('.').pop()

        const photoFile = {
          name: `${user?.name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.uri,
          type: `${photoSelected.type}/${fileExtension}`,
        }

        setUserPhoto(photoSelected.uri)

        const response = await mutateAvatar(photoFile)

        const updatedUser = currentUser
        updatedUser.avatar = response.avatar

        await updateUserProfile(updatedUser)
      }
    } catch (err) {
      setUserPhoto(currentUser.avatar)
      toast.showError({
        title: 'Change Photo Error',
        description: 'Something went wrong, try again later',
      })
    } finally {
      setIsLoadingPhoto(false)
    }
  }

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
  const { mutateAsync, isLoading: isUpdating } = usePutUserProfileMutation()
  const toast = useAppToast()

  const handleUpdateProfile = async (data: FormProfileType) => {
    const currentUser = user as UserDTO

    const nameHasChanged = data.name !== currentUser.name

    const hasCurrentAndNewPassword =
      !!data.newPassword && !!data.currentPassword
    const pwHasChanged =
      hasCurrentAndNewPassword && data.newPassword !== data.currentPassword
    const pwExistsAndIsTheSame = hasCurrentAndNewPassword && !pwHasChanged

    if (pwExistsAndIsTheSame) {
      toast.showError({ title: 'Old password provided equals new password.' })
      setFocus('currentPassword')
      return
    }

    if (nameHasChanged || pwHasChanged) {
      const dto: Partial<{
        name: string
        old_password: string
        password: string
      }> = {}
      nameHasChanged && (dto.name = data.name)
      pwHasChanged &&
        Object.assign(dto, {
          old_password: data.currentPassword,
          password: data.newPassword,
        })

      await mutateAsync(dto)

      if (nameHasChanged) {
        const userUpdated = currentUser
        userUpdated.name = data.name
        await updateUserProfile(userUpdated)
      }

      if (pwHasChanged) {
        setValue('currentPassword', '')
        setValue('newPassword', '')
        setValue('confirmPassword', '')
      }
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
              source={avatarSource}
              alt="User Photo"
              testID="img-user-photo"
            />
          </Box>

          <TouchableOpacity disabled={isUploading}>
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
            isLoading={isUpdating || isSubmitting}
            testID="btn-submit"
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
