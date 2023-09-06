import { FC, ReactNode } from 'react'
import { View } from 'react-native'

export const MockComponent: FC<{ children?: ReactNode; testID?: string }> = ({
  children,
  testID,
}) => <View testID={testID}>{children}</View>
