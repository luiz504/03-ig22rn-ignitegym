import { FC, useState } from 'react'
import { Box, Center, Heading, Text, VStack } from 'native-base'
import { useToast } from 'native-base/src/components/composites/Toast'
import { ScrollView, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { Header } from '~/components/Header'
import { UserPhoto } from '~/components/UserPhoto'
import { Input } from '~/components/Input'
import { Button } from '~/components/Button'

const PHOTO_SIZE = 33

export const Profile: FC = () => {
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/luiz504.png')

  const toast = useToast()

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
          return toast.show({
            placement: 'top',
            bg: 'red.500',
            title: 'Change Photo Error',
            description:
              'This photo is too large. Please select one with max size of 5mb.',
          })
        }
        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (err) {
      toast.show({
        placement: 'top',
        bg: 'red.500',
        title: 'Change Photo Error',
        description: 'Something went wrong, try again later',
      })
    } finally {
      setIsLoadingPhoto(false)
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

          <Input mt={8} placeholder="Name" bg="gray.600" />
          <Input mt={4} placeholder="E-mail" bg="gray.600" isDisabled />

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

          <Input
            mt={2}
            placeholder="Current Password"
            bg="gray.600"
            secureTextEntry
          />

          <Input
            mt={4}
            placeholder="New Password"
            bg="gray.600"
            secureTextEntry
          />
          <Input
            mt={4}
            placeholder="Confirm New Password"
            bg="gray.600"
            secureTextEntry
          />

          <Button mt={8} label="Update" />
        </Center>
      </ScrollView>
    </VStack>
  )
}
