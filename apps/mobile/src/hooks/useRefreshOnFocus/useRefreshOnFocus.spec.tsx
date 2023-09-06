import React from 'react'
import { renderHook } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'

import { useRefreshOnFocus } from '.'

describe('useRefreshOnFocus', () => {
  it('should not call refetch on first render', () => {
    const refSpy = jest.spyOn(React, 'useRef')

    const refetch = jest.fn()
    renderHook(() => useRefreshOnFocus(refetch), {
      wrapper: NavigationContainer,
    })

    expect(refetch).not.toBeCalled()
    expect(refSpy.mock.results[0].value.current).toEqual(false)
  })

  it('should call refetch when the component is focused', () => {
    jest.spyOn(React, 'useRef').mockReturnValue({ current: false })

    const refetch = jest.fn()
    renderHook(() => useRefreshOnFocus(refetch), {
      wrapper: NavigationContainer,
    })

    expect(refetch).toHaveBeenCalledTimes(1)
  })
})
