export const convertUTCToLocalTime = (date: Date | string) => {
  const _date = date instanceof Date ? date : new Date(date)
  const milliseconds = Date.UTC(
    _date.getFullYear(),
    _date.getMonth(),
    _date.getDate(),
    _date.getHours(),
    _date.getMinutes(),
    _date.getSeconds(),
  )
  return new Date(milliseconds)
}
