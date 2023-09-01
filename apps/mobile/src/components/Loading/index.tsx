import { Center, Spinner } from 'native-base'
import { ComponentProps, FC } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

interface LoadingProps extends ComponentProps<typeof Spinner> {
  containerStyle?: StyleProp<ViewStyle>
}
export const Loading: FC<LoadingProps> = ({
  containerStyle,
  testID = 'loading-spinner',
  size = 60,

  ...rest
}) => {
  return (
    <Center flex={1} testID={testID} style={containerStyle}>
      <Spinner size={size} testID="spinner-icon" color="green.500" {...rest} />
    </Center>
  )
}
