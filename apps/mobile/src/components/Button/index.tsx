import { FC } from 'react'
import { IButtonProps, Button as NBButton, Text } from 'native-base'

interface ButtonProps extends Omit<IButtonProps, 'children'> {
  label: string
  variant?: 'solid' | 'outline'
}

export const Button: FC<ButtonProps> = ({
  label,
  variant = 'solid',
  ...rest
}) => {
  const isOutline = variant === 'outline'

  return (
    <NBButton
      w="full"
      h={14}
      rounded="sm"
      bg={isOutline ? 'transparent' : 'green.700'}
      borderWidth={1.5}
      borderColor={isOutline ? 'green.500' : 'green.700'}
      _pressed={{ bg: isOutline ? 'gray.500' : 'green.500' }}
      android_ripple={{ color: 'rgba(255,255,255, 0.3)' }}
      {...rest}
    >
      <Text
        color={isOutline ? 'green.500' : 'white'}
        fontFamily="heading"
        fontSize="md"
      >
        {label}
      </Text>
    </NBButton>
  )
}
