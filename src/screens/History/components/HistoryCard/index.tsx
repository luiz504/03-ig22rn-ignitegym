import { HStack, Heading, Text, VStack } from 'native-base'
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'
import { FC } from 'react'

export const HistoryCard: FC<IHStackProps> = ({ ...rest }) => {
  return (
    <HStack
      bg="gray.600"
      rounded="md"
      px={5}
      py={4}
      alignItems="center"
      justifyContent={'space-between'}
      {...rest}
    >
      <VStack mr={5}>
        <Heading
          color="white"
          fontSize={'md'}
          lineHeight={'md-160'}
          textTransform={'capitalize'}
        >
          Back
        </Heading>
        <Text
          color="gray.100"
          fontSize="lg"
          lineHeight={'lg-160'}
          numberOfLines={1}
        >
          High Stack
        </Text>
      </VStack>

      <Text color="gray.300" fontSize={'md'} lineHeight="md-160">
        08:30
      </Text>
    </HStack>
  )
}
