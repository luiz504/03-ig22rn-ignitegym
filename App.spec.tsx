import { render, screen } from '~/utils/test-utils'
import App from './App'
import { StatusBar } from 'expo-status-bar'

describe('Hello', () => {
  it('should render correctly', () => {
    render(<App />)

    expect(screen.UNSAFE_getByType(StatusBar)).toBeOnTheScreen()
  })
})
