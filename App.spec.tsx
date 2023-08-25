import { render, screen } from '~/utils/test-utils'
import App from './App'
import { StatusBar } from 'expo-status-bar'

describe('App init file', () => {
  it('should render correctly', () => {
    render(<App />)

    expect(screen.UNSAFE_getByType(StatusBar)).toBeOnTheScreen()
  })
})
