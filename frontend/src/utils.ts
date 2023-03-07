export function generateRandomNumber(minVal: number, maxVal: number): number {
  return Math.random() * (maxVal - minVal) + minVal;
}

export const isBrowser = typeof window !== 'undefined'

export function relativeTimeFormat(date, locale = 'es') {
  const rft = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const aDay = 1000 * 60 * 60 * 24
  const diffInDays = parseInt((Date.now() - date) / aDay)

  if (diffInDays < 1) {
    return rft.format(0, 'day')
  } else if (diffInDays < 30) {
    return rft.format(-diffInDays, 'day')
  } else if (diffInDays < 365) {
    return rft.format(parseInt(-diffInDays / 30), 'months')
  } else {
    return rft.format(parseInt(-diffInDays / 365), 'years')
  }
}