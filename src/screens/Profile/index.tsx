import { FC, useState } from 'react'
import { Center, Heading, Skeleton, Text, VStack } from 'native-base'

import { Header } from '~/components/Header'
import { ScrollView, TouchableOpacity } from 'react-native'
import { UserPhoto } from '~/components/UserPhoto'
import { Input } from '~/components/Input'
import { Button } from '~/components/Button'

const PHOTO_SIZE = 33

export const Profile: FC = () => {
  const [
    isLoadingPhoto,
    // setIsLoadingPhoto
  ] = useState(false)
  return (
    <VStack flex={1}>
      <Header title="Profile" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center alignItems={'center'} mt={6} px={10}>
          {isLoadingPhoto ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={'full'}
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              size={PHOTO_SIZE}
              source={{ uri: 'https://github.com/luiz504.png' }}
              alt="User Photo"
            />
          )}

          <TouchableOpacity>
            <Text color="green.500" fontWeight="bold" mt={3}>
              Change Photo
            </Text>
          </TouchableOpacity>

          <Input mt={8} placeholder="Name" bg="gray.600" />
          <Input mt={4} placeholder="E-mail" bg="gray.600" isDisabled />

          <Heading
            color="gray.200"
            fontSize="md"
            lineHeight="md-160"
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
