/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react'

import {
  FormControl,
  IInputProps,
  Input as NBInput,
  useTheme,
  IFormControlProps,
} from 'native-base'

interface InputProps extends IInputProps {
  errorMsg?: string
  _container?: IFormControlProps
}

export const Input = forwardRef<any, InputProps>(
  ({ errorMsg, isInvalid, _container, testID, ...rest }, ref) => {
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
          isInvalid={_isInvalid}
          _focus={{
            bg: 'gray.700',
            borderColor: 'green.500',
            cursorColor: theme.colors.gray[100],
          }}
          _disabled={{ opacity: 0.5 }}
          _invalid={{
            borderColor: 'red.500',
          }}
          testID={testID}
          {...rest}
          ref={ref as any}
        />

        <FormControl.ErrorMessage
          _text={{ color: 'red.500' }}
          testID={`${testID}-error-text`}
        >
          {errorMsg}
        </FormControl.ErrorMessage>
      </FormControl>
    )
  },
)

Input.displayName = 'Input'
