import { FC } from 'react'
import { HStack, Heading, Image, Text, VStack, useTheme } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import ChevronRight from '~/assets/icons/chevron-right.svg'

import { ExerciseDTO } from '~/dtos/ExerciseDTO'
import { api } from '~/libs/axios'
import { Skeleton } from '~/components/Skeleton'

interface ExerciseCardProps extends TouchableOpacityProps {
  exercise: ExerciseDTO
}

export const ExerciseCard: FC<ExerciseCardProps> = ({ exercise, ...rest }) => {
  const theme = useTheme()

  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems={'center'} rounded="md" p={2} pr={4}>
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${exercise.thumb}`,
          }}
          alt="Exercise image"
          w={16}
          h={16}
          rounded="md"
          resizeMode="cover"
          testID="exercise-thumb"
        />

        <VStack flex={1} ml={4}>
          <Heading
            color="white"
            fontSize="lg"
            lineHeight="lg-160"
            fontFamily="heading"
            testID="exercise-name"
          >
            {exercise.name}
          </Heading>
          <Text
            color="gray.200"
            fontSize={'sm'}
            lineHeight="sm-160"
            numberOfLines={2}
            mt={'0.5'}
            testID="exercise-instructions"
          >
            {exercise.series} sets x {exercise.repetitions} reps
          </Text>
        </VStack>

        <ChevronRight fill={theme.colors.gray[300]} />
      </HStack>
    </TouchableOpacity>
  )
}

export const ExerciseCardSkeleton = () => (
  <HStack
    bg="gray.500"
    p={2}
    pr={4}
    alignItems={'center'}
    rounded={'md'}
    space={4}
  >
    <Skeleton.MD h={16} w={16} />

    <VStack flex={1}>
      <Skeleton.SM h="28.8px" w="1/2" />
      <Skeleton.SM h="22.4px" w="3/4" mt={0.5} />
    </VStack>
  </HStack>
)
