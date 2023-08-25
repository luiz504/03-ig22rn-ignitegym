import { render } from '@testing-library/react-native'
import { FC, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={{}}>{children}</ThemeProvider>
}

const customRender: typeof render = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react-native'

export { customRender as render }
