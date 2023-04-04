export const getLastTenDays = (list: any) => {
  const lastTenDays: any = []
  const listLength = list?.length
  const lastTenDaysList = list?.slice(listLength - 10, listLength)
  lastTenDaysList?.forEach((item: any) => {
    lastTenDays.push(item.date)
  })

  const lastTenDaysFormatted = lastTenDays.map((item: any) => {
    return item.split('-').slice(1, 3).join('/')
  })

  return lastTenDaysFormatted
}

export const getLastTenDaysValues = (list: any) => {
  const lastTenDaysSold: any = []
  const lastTenDaysOnMarket: any = []
  const listLength = list?.length
  const lastTenDaysList = list?.slice(listLength - 10, listLength)
  lastTenDaysList.forEach((item: any) => {
    lastTenDaysSold.push(item.sold)
    lastTenDaysOnMarket.push(item.onMarket)
  })

  return { lastTenDaysSold, lastTenDaysOnMarket }
}

export const getTopFive = (list: any, attribute: any) => {
  return list.slice(0, 5).map((item: any) => {
    return { name: item?.name, attribute: item[attribute] }
  })
}

export const objectMap = (obj: any, fn: any) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]))
