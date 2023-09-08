import { FC } from 'react'
import { HStack, Heading, Text, VStack } from 'native-base'
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'

import { Skeleton } from '~/components/Skeleton'

import { HistoryDTO } from '~/dtos/HistoryDTO'
interface HistoryCardProps extends IHStackProps {
  data: HistoryDTO
}

export const HistoryCard: FC<HistoryCardProps> = ({ data, ...rest }) => {
  return (
    <HStack
      bg="gray.600"
      rounded="md"
      px={5}
      py={4}
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <VStack mr={5} flex={1}>
        <Heading
          color="white"
          fontSize="md"
          lineHeight="md-160"
          fontFamily="heading"
          textTransform="capitalize"
          numberOfLines={2}
        >
          {data.group}
        </Heading>
        <Text
          color="gray.100"
          fontSize="lg"
          lineHeight="lg-160"
          numberOfLines={2}
        >
          {data.name}
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md" lineHeight="md-160">
        {data.hour}
      </Text>
    </HStack>
  )
}

export const HistoryCardSkeleton: FC<IHStackProps> = (props) => {
  return (
    <HStack
      bg="gray.600"
      rounded="md"
      px={5}
      py={4}
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <VStack mr={5} flex={1}>
        <Skeleton.SM h="md-160" w={20} mb={1} />
        <Skeleton.SM h="md-160" w={40} />
      </VStack>

      <Skeleton.SM h="md-160" w={12} />
    </HStack>
  )
}
