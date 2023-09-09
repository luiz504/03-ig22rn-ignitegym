import { renderHook } from '@testing-library/react-native'
import { useAppToast } from '.'
import * as NBCompositesModule from 'native-base/src/components/composites'

jest.mock('native-base/src/components/composites/Toast', () => ({
  ...jest.requireActual('native-base/src/components/composites/Toast'),
  useToast: jest.fn(),
}))
describe('useAppToast', () => {
  describe('showError', () => {
    it('should open the toast with the correct message', () => {
      const showMock = jest.fn()
      jest
        .spyOn(NBCompositesModule, 'useToast')
        .mockReturnValue({ show: showMock } as any)

      const { result } = renderHook(() => useAppToast())

      const title = 'Title'
      const description = 'Description'

      // act
      result.current.showError({ title, description })

      expect(showMock).toBeCalledTimes(1)
      expect(showMock).toBeCalledWith({
        placement: 'top',
        bg: 'red.500',
        description,
        title,
      })
    })
  })

  describe('showSuccess', () => {
    it('should open the toast with the correct message', () => {
      const showMock = jest.fn()
      jest
        .spyOn(NBCompositesModule, 'useToast')
        .mockReturnValue({ show: showMock } as any)

      const { result } = renderHook(() => useAppToast())

      const title = 'Title'
      const description = 'Description'

      // act
      result.current.showSuccess({ title, description })

      expect(showMock).toBeCalledTimes(1)
      expect(showMock).toBeCalledWith({
        placement: 'top',
        bg: 'green.700',
        description,
        title,
      })
    })
  })
})
