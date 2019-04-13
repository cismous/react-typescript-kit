import { Location, History } from 'history'
import { ColumnProps } from 'antd/lib/table'

export function getCookie(name: string): string {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return decodeURIComponent(arr[2])
  } else {
    return ''
  }
}

export function getStrLength(str: string): number {
  let strLen = 0

  for (let i = 0, len = str.length; i < len; i++) {
    let charCode = str.charCodeAt(i)
    if (charCode <= 128) strLen += 1
    else strLen += 2
  }

  return strLen
}

export function updateQuery<T extends { [key: string]: string | number }>(
  props: { location: Location; history: History },
  query: T,
): void {
  const { history, location } = props
  const searchParams = new URLSearchParams(location.search)

  const updateSearchParams = (key: string, value: string | number): void => {
    if (!query[key] && query[key] !== 0) return
    if (searchParams.has(key)) searchParams.set(key, value.toString())
    else searchParams.append(key, value.toString())
  }

  const keys = Object.keys(query)
  for (const key of keys) updateSearchParams(key, query[key])

  history.replace({
    pathname: location.pathname,
    search: searchParams.toString(),
  })
}

export function getTableWidth<T>(columns: ColumnProps<T>[], initWidth: number = 0): number {
  return columns.reduce((width: number, item) => width + ((item.width as number) || 0), initWidth)
}

export function humanNum(num?: number): string {
  if (num === 0) return '0'
  if (!num) return '-'

  const thousand = 1000
  const hundred = 100
  let result = num
  let unit = ''
  let isFloat = true
  try {
    if (result >= hundred * hundred) {
      result = result / (hundred * hundred)
      unit = '万'

      if (result >= hundred) {
        result = result / hundred
        unit = '百万'

        if (result >= hundred) {
          result = result / hundred
          unit = '亿'

          if (result >= thousand) {
            result = result / thousand
            unit = '万亿'
          }
        }
      }
    } else {
      isFloat = false
    }
    if (isNaN(result)) throw new Error('数据不正确')
    return `${result.toFixed(isFloat ? 2 : 0)}${unit}`
  } catch (_) {
    return num ? num.toString() : '-'
  }
}

export function humanMoney(num?: number): string {
  let unit = '元'
  if (num === 0) return `0${unit}`
  if (!num) return '-'

  const thousand = 1000
  const hundred = 100
  let result = num
  try {
    if (result >= hundred * hundred) {
      result = result / (hundred * hundred)
      unit = '万元'

      if (result >= hundred * hundred) {
        result = result / (hundred * hundred)
        unit = '亿元'

        if (result >= thousand) {
          result = result / thousand
          unit = '万亿元'
        }
      }
    }
    if (isNaN(result)) throw new Error('数据不正确')
    return `${result.toFixed(2)}${unit}`
  } catch (_) {
    return num ? num.toString() : '-'
  }
}

export function humanByte(num?: number): string {
  if (num === 0) return '0Byte'
  if (!num) return '-'

  const rate = 1024
  let result = num
  let unit = 'KB'

  try {
    if (result <= 1) {
      result = result / rate
      unit = 'Byte'
    } else if (result >= rate) {
      result = result / rate
      unit = 'MB'

      if (result >= rate) {
        result = result / rate
        unit = 'GB'

        if (result >= rate) {
          result = result / rate
          unit = 'TB'

          if (result >= rate) {
            result = result / rate
            unit = 'PB'

            if (result >= rate) {
              result = result / rate
              unit = 'EB'
            }
          }
        }
      }
    }
    if (isNaN(result)) throw new Error('数据不正确')
    return `${result.toFixed(2)}${unit}`
  } catch (_) {
    return num ? num.toString() : '-'
  }
}
