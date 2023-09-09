import { convertUTCToLocalTime } from '.'

describe('convertUTCToLocalTime', () => {
  const utcMinus5Date = '2023-01-15T07:00:00.000-05:00'
  const utc0Date = '2023-01-15T12:00:00.000Z'
  const utcPlusOneDate = '2023-01-15T13:00:00.000+01:00'
  it('should parse a date string and return a date object converted to LocalTime', () => {
    const date1 = convertUTCToLocalTime(utcMinus5Date)
    expect(date1).toEqual(new Date('2023-01-15T12:00:00.000Z'))

    const date2 = convertUTCToLocalTime(utc0Date)
    expect(date2).toEqual(new Date(utc0Date))

    const date3 = convertUTCToLocalTime(utcPlusOneDate)
    expect(date3).toEqual(new Date('2023-01-15T12:00:00.000Z'))
  })

  it('should parse a date object and return a date object converted to LocalTime', () => {
    const date1 = convertUTCToLocalTime(new Date(utcMinus5Date))
    expect(date1).toEqual(new Date('2023-01-15T12:00:00.000Z'))

    const date2 = convertUTCToLocalTime(new Date(utc0Date))
    expect(date2).toEqual(new Date(utc0Date))

    const date3 = convertUTCToLocalTime(new Date(utcPlusOneDate))
    expect(date3).toEqual(new Date('2023-01-15T12:00:00.000Z'))
  })
})
