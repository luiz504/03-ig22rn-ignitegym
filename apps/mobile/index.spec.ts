import App from './App'
import { registerRootComponent } from 'expo'

jest.mock('expo', () => ({
  registerRootComponent: jest.fn(),
}))
describe('App index', () => {
  it('should call register the App Component correctly', () => {
    const registerSpy = jest.mocked(registerRootComponent)
    require('./index')

    expect(registerSpy).toHaveBeenCalledTimes(1)
    expect(registerSpy).toBeCalledWith(App)
  })
})
