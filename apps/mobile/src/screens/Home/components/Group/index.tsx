import { HStack, IPressableProps, Pressable, Text } from 'native-base'
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack'
import { FC } from 'react'
import { Skeleton } from '~/components/Skeleton'

interface GroupProps extends IPressableProps {
  label: string
}
export const Group: FC<GroupProps> = ({
  label,
  'aria-selected': isActive,
  ...rest
}) => {
  return (
    <Pressable
      bg="gray.600"
      minW={24}
      justifyContent="center"
      alignItems="center"
      alignSelf="flex-start"
      rounded="md"
      borderWidth={1.5}
      borderColor={isActive ? 'green.500' : 'gray.600'}
      p={3}
      _pressed={{
        borderColor: 'green.500',
      }}
      aria-selected={isActive}
      {...rest}
    >
      <Text
        color={isActive ? 'green.500' : 'gray.200'}
        textTransform="uppercase"
        fontSize="xs"
        fontFamily="heading"
      >
        {label}
      </Text>
    </Pressable>
  )
}

export const GroupSkeleton: FC<IHStackProps> = (props) => (
  <HStack
    bg="gray.600"
    ml={8}
    rounded="md"
    w={100}
    p={3}
    borderWidth={1.5}
    borderColor="gray.600"
    {...props}
  >
    <Skeleton.SM h="19.2px" />
  </HStack>
)
