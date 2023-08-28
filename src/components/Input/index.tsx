import { IInputProps, Input as NBInput, useTheme } from 'native-base'
import { FC } from 'react'

export const Input: FC<IInputProps> = (props) => {
  const theme = useTheme()

  return (
    <NBInput
      bg="gray.700"
      h={14}
      px={4}
      borderWidth={1.5}
      borderColor={'gray.700'}
      fontSize={'md'}
      color={'white'}
      fontFamily={'body'}
      placeholderTextColor={'gray.300'}
      _focus={{
        bg: 'gray.700',
        borderColor: 'green.500',
        cursorColor: theme.colors.gray[100],
      }}
      _disabled={{ opacity: 0.5 }}
      {...props}
    />
  )
}
