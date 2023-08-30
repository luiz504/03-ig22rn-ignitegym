import { FC } from 'react'
import { Box, HStack, Image, ScrollView, Text, VStack } from 'native-base'

import RepetitionIcon from '~/assets/icons/repetitions.svg'
import SeriesIcon from '~/assets/icons/series.svg'

import { Header } from './components/Header'
import { Button } from '~/components/Button'

export const Exercise: FC = () => {
  return (
    <VStack flex={1}>
      <Header />

      <ScrollView>
        <VStack p={8}>
          <Image
            w={'full'}
            h={80}
            mb={3}
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
            alt="Exercise image"
            rounded="lg"
            resizeMode="cover"
          />
          <Box bg="gray.600" p={4} pt={5} rounded="md">
            <HStack justifyContent="center" space={10} mb={6}>
              <HStack alignItems="center" space={2}>
                <SeriesIcon />
                <Text color="gray.200" fontSize="lg" lineHeight="lg-160">
                  x Sets
                </Text>
              </HStack>

              <HStack alignItems="center" space={2}>
                <RepetitionIcon />
                <Text color="gray.200" fontSize="lg" lineHeight="lg-160">
                  x Repetitions
                </Text>
              </HStack>
            </HStack>

            <Button label="Check as done" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
