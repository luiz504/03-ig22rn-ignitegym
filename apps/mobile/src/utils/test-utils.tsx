import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { NativeBaseProvider } from 'native-base'
import { FC, ReactNode } from 'react'
import { AuthContextProvider } from '~/contexts/AuthContext'
import { THEME } from '~/theme'

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  }
  return (
    <NativeBaseProvider theme={THEME} initialWindowMetrics={inset}>
      <AuthContextProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}

const NBAuthProviders: FC<{ children: ReactNode }> = ({ children }) => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  }
  return (
    <NativeBaseProvider theme={THEME} initialWindowMetrics={inset}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </NativeBaseProvider>
  )
}

const NBNavProviders: FC<{ children: ReactNode }> = ({ children }) => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  }
  return (
    <NativeBaseProvider theme={THEME} initialWindowMetrics={inset}>
      <NavigationContainer>{children}</NavigationContainer>
    </NativeBaseProvider>
  )
}

const readerWithNBNavProviders: typeof render = (ui, options) =>
  render(ui, { wrapper: NBNavProviders, ...options })

const renderWithAllProviders: typeof render = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

const renderWithNBAuthProviders: typeof render = (ui, options) =>
  render(ui, { wrapper: NBAuthProviders, ...options })

export * from '@testing-library/react-native'

export {
  readerWithNBNavProviders as render,
  renderWithAllProviders,
  renderWithNBAuthProviders,
}