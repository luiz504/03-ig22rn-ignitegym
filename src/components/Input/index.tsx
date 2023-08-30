import {
  FormControl,
  IInputProps,
  Input as NBInput,
  useTheme,
  IFormControlProps,
} from 'native-base'

import { FC } from 'react'

interface InputProps extends IInputProps {
  errorMsg?: string
  _container?: IFormControlProps
}

export const Input: FC<InputProps> = ({
  errorMsg,
  isInvalid,
  _container,
  ...rest
}) => {
  const theme = useTheme()
  const _isInvalid = !!errorMsg || isInvalid
  return (
    <FormControl isInvalid={_isInvalid} {..._container}>
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
        isInvalid={isInvalid}
        _focus={{
          bg: 'gray.700',
          borderColor: 'green.500',
          cursorColor: theme.colors.gray[100],
        }}
        _disabled={{ opacity: 0.5 }}
        _invalid={{
          borderColor: 'red.500',
        }}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMsg}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
