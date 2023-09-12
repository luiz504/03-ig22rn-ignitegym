import MockAdapter from 'axios-mock-adapter'

import * as APIInterceptorsMod from '~/middlewares/api.interceptors'

import { api } from './axios'
import { act } from 'react-test-renderer'

import { RefreshQueue } from '~/utils/RefreshQueue'

describe('axios api response interceptor', () => {
  describe('registerInterceptorTokenManager', () => {
    it('should register the interceptor token manager and return the cleanUp', async () => {
      const signOut = jest.fn()
      const useSpy = jest.spyOn(api.interceptors.response, 'use')
      const ejectSpy = jest.spyOn(api.interceptors.response, 'eject')

      const adapterMocked = new MockAdapter(api)
      adapterMocked.onGet('/').reply(401)

      const _onFulfilled = jest.spyOn(APIInterceptorsMod, 'onFulfilled')
      const _onRejected = jest.spyOn(APIInterceptorsMod, 'onRejected')
      const cleanUp = api.registerInterceptorTokenManager(signOut)

      expect(useSpy).toHaveBeenCalled()
      expect(useSpy).toHaveBeenCalledWith(_onFulfilled, expect.any(Function))

      // Find the response interceptor

      try {
        await api.get('/')
        fail('it must Fail')
      } catch (err) {
        expect(_onRejected).toHaveBeenCalled()
        expect(_onRejected).toHaveBeenCalledWith(
          err,
          signOut,
          expect.any(RefreshQueue),
          api,
        )
      }

      // act
      act(() => {
        cleanUp()
      })

      expect(ejectSpy).toBeCalled()

      // expect
    })
  })
})
