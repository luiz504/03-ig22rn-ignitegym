import { IPressableProps, Pressable, Text } from 'native-base'
import { FC } from 'react'

interface GroupProps extends IPressableProps {
  label: string
  isActive?: boolean
}
export const Group: FC<GroupProps> = ({ label, isActive = false, ...rest }) => {
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
      {...rest}
    >
      <Text
        color={isActive ? 'green.500' : 'gray.200'}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
      >
        {label}
      </Text>
    </Pressable>
  )
}