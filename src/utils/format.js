export const formatCurrencyDesktop = (number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  })
  return formatter.format(number)
}

export const formatCurrencyMobile = (price) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  })

  const abbreviations = {
    K: 1000,
    M: 1000000,
    B: 1000000000,
  }

  let abbreviatedPrice = price
  let abbreviation = ''

  for (const key in abbreviations) {
    if (abbreviations.hasOwnProperty(key)) {
      if (price >= abbreviations[key]) {
        abbreviatedPrice = price / abbreviations[key]
        abbreviation = key
      }
    }
  }

  return `${formatter.format(abbreviatedPrice)}${abbreviation}`
}

export function convertToPercentage(num) {
  return (num * 100).toFixed(0) + '%'
}
