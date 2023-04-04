import { noAuth } from './routes'
import moment from 'moment'
import { useRef, useEffect } from 'react'

export const titleCase = (str: any) => {
  const splitStr = str.toLowerCase().split(' ')
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(' ')
}

export const getPercentage = (n: number) => {
  const x: any = `${Math.round(n * 100)}%`
  return x
}

export const removeFromString = (
  text: string,
  value: string,
  replaceValue?: string,
) => {
  return text.replace(value, replaceValue ? replaceValue : '')
}

export const matchRoute = (path: string, navUrl: string) => {
  return path === navUrl ? true : false
}

export const getAlertTime = (alertTime: any) => {
  const local = moment.utc(alertTime).local().format()
  return moment(local).fromNow()
}

export const useIsMount = () => {
  const isMountRef = useRef(true)
  useEffect(() => {
    isMountRef.current = false
  }, [])
  return isMountRef.current
}

export const mergeArraysToObject = (arr1 = [], arr2 = []) => {
  const res = arr1.reduce((acc: any, elem: any, index: number) => {
    acc[elem] = deslugify(arr2[index])
    return acc
  }, {})
  return res
}

export const renameAllKeysInArr = (arr: any, newKeys: any) => {
  let nArr: any = []
  arr.map((item: any) => {
    nArr.push(renameKeys(item, newKeys))
  })
  return nArr
}

export const renameKeys = (obj: any, newKeys: any) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key
    return { [newKey]: obj[key] }
  })
  return Object.assign({}, ...keyValues)
}

export const slugify = (s: any) => {
  return s
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

export const deslugify = (slug: any) => {
  const words: any = slug.split('-')
  return words
    .map(function (word: string) {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    })
    .join(' ')
}

export const thousands = (n: any) => {
  const f = Math.floor(n)
  return f ? f.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
}

export const validateEmail = (value: any) => {
  const filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  if (filter.test(value)) {
    return true
  }
  return false
}

export const checkPath = (path: any) => {
  return path.replace(/\//g, '')
}

export const noAuthRequired = (path: any) => {
  if (typeof window !== 'undefined') {
    return noAuth.includes(path)
  }
}

export const getInitials = (fullName: any) => {
  const allNames = fullName.trim().split(' ')
  const initials = allNames.reduce((acc: any, curr: any, index: any) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`
    }
    return acc
  }, '')
  return initials
}

export const camelCaseToText = (value: any) => {
  const result = value.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export const isNegative = (num: number) => {
  if (Math.sign(num) === -1) {
    return true
  }

  return false
}

export const getGraphData = (data: any) => {
  if (data) {
    const arr: number[] = []
    data &&
      data.map((d: any) => {
        arr.push(d.data || d.value ? d.data || d.value : d.date)
      })
    return arr
  } else {
    return []
  }
}

export const checkPermissions = (permissions: any, type: string) => {
  return permissions.includes(type)
}

export const isObjEmpty = (obj: any) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false
  }

  return true
}

export const arrayEquals = (a: any, b: any) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  )
}
