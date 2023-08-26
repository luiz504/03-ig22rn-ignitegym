import { render } from '@testing-library/react-native'
import { NativeBaseProvider } from 'native-base'
import { FC, ReactNode } from 'react'
import { THEME } from '~/theme'

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return <NativeBaseProvider theme={THEME}>{children}</NativeBaseProvider>
}

const customRender: typeof render = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react-native'

export { customRender as render }
