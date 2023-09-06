import { FC } from 'react'
import { HStack, Heading, Text, VStack } from 'native-base'
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'

export const HistoryCard: FC<IHStackProps> = ({ ...rest }) => {
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
          Back
        </Heading>
        <Text
          color="gray.100"
          fontSize="lg"
          lineHeight="lg-160"
          numberOfLines={2}
        >
          High Stack
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md" lineHeight="md-160">
        08:30
      </Text>
    </HStack>
  )
}
