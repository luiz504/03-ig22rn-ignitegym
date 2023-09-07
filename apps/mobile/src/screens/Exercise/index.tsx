import { FC } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, HStack, Image, ScrollView, Text, VStack } from 'native-base'

import RepetitionIcon from '~/assets/icons/repetitions.svg'
import SeriesIcon from '~/assets/icons/series.svg'

import { useFetchExerciseDetailsQuery } from '~/hooks/useFetchExerciseDetailsQuery'

import { api } from '~/libs/axios'

import { Header, HeaderSkeleton } from './components/Header'
import { Button } from '~/components/Button'
import { Skeleton } from '~/components/Skeleton'
import { AppNavigatorRouteProps } from '~/routes/app.routes'
import { useExerciseHistoryMutation } from '~/hooks/useExerciseHistoryMutation'

type RouteParams = {
  exerciseId: number
}

export const Exercise: FC = () => {
  const { exerciseId } = useRoute().params as RouteParams
  const navigator = useNavigation<AppNavigatorRouteProps>()

  const { exercise, isLoading } = useFetchExerciseDetailsQuery({ exerciseId })

  const showSkeleton = !exercise || isLoading

  const { mutateAsync, isLoading: isRegistering } = useExerciseHistoryMutation()

  const handleExerciseHistoryRegister = async () => {
    await mutateAsync({ exerciseId }).then(() => {
      navigator.navigate('history')
    })
  }

  return (
    <VStack flex={1}>
      {showSkeleton ? (
        <HeaderSkeleton />
      ) : (
        <Header name={exercise.name} group={exercise.group} />
      )}

      <ScrollView>
        <VStack p={8}>
          {showSkeleton ? (
            <Skeleton.LG w={'full'} h={80} testID="demo-skeleton" />
          ) : (
            <Box rounded="lg" overflow="hidden">
              <Image
                w={'full'}
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="Exercise image"
                resizeMode="cover"
                testID="demo-image"
              />
            </Box>
          )}
          <Box bg="gray.600" p={4} pt={5} mt={3} rounded="md">
            <HStack justifyContent="center" space={10} mb={6}>
              <HStack alignItems="center" space={2}>
                <SeriesIcon />
                {showSkeleton ? (
                  <Skeleton.SM h={'28.8px'} w={10} testID="series-skeleton" />
                ) : (
                  <Text color="gray.200" fontSize="lg" lineHeight="lg-160">
                    {exercise.series} sets
                  </Text>
                )}
              </HStack>

              <HStack alignItems="center" space={2}>
                <RepetitionIcon />
                {showSkeleton ? (
                  <Skeleton.SM
                    h={'28.8px'}
                    w={10}
                    testID="repetitions-skeleton"
                  />
                ) : (
                  <Text color="gray.200" fontSize="lg" lineHeight="lg-160">
                    {exercise.repetitions} repetitions
                  </Text>
                )}
              </HStack>
            </HStack>

            <Button
              label="Check as done"
              isLoading={isLoading || isRegistering}
              onPress={handleExerciseHistoryRegister}
              testID="btn-register"
            />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
