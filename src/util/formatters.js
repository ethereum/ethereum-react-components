export function formatTokenCount(value, decimals) {
  return Number(value / 10 ** decimals).toString()
}

export function formatFunctionName(functionName) {
  if (functionName === undefined) {
    throw new Error('formatFunctionName() expects a non-empty string')
  }

  return functionName
    .slice(0, functionName.indexOf('('))
    .replace(/_+/g, ' ')
    .replace(/([A-Z]+|[0-9]+)/g, ' $1')
    .toLowerCase()
    .trim()
}

export function timeFromNow(string) {
  const diff = new Date() - new Date(string)
  const hours = parseInt(diff / 360000, 10)
  if (hours <= 24) return '(Less than a day ago)'
  return `(Less than ${Math.ceil(hours / 24)} days ago)`
}

export function floatToTime(input) {
  let str = ' ~'
  if (input < 1) {
    str += `${Math.round((input * 60) / 10) * 10} seconds.`
  } else if (input < 60) {
    str += `${Math.ceil(input)} minute(s).`
  } else {
    str += `${Math.ceil(input / 60)} hour(s).`
  }
  return str
}

export function getMinutes(string) {
  const d = new Date(string)
  return d.getMinutes()
}

export function getHours(string) {
  const d = new Date(string)
  return d.getHours()
}

export function getYear(string) {
  const d = new Date(string)
  return d.getFullYear()
}

export function getDayOfWeek(string) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const d = new Date(string)
  return days[d.getDay()]
}

export function getMonthName() {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const d = new Date()
  return monthNames[d.getMonth()]
}

export function getDate(string) {
  const d = new Date(string)
  return d.getDate()
}

export function getFullTime(string) {
  let h = getHours(string)
  const amORpm = h > 12 ? 'PM' : 'AM'
  if (h > 12) h %= 12

  return `${getDayOfWeek(string)}, ${getMonthName(string)} ${getDate(
    string
  )}, ${getYear(string)} ${h}:${getMinutes(string)} ${amORpm}`
}
