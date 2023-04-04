export const addDays = (days: any) => {
  const date = new Date(Date.now())
  date.setDate(date.getDate() + days)
  return date
}
