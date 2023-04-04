import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export const getAddress = (address: any, secondary?: any) => {
  let a: any = secondary ? `${secondary} ${address}` : `${address}`
  let obj: any = {
    address: a
      .split(' ')
      .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' '),
  }
  return geocodeByAddress(a)
    .then((results: any) => {
      // const city: any = results[0].address_components.filter((obj) => {
      //   return obj.types.includes('locality')
      // })[0].long_name

      // const state: any = results[0].address_components.filter((obj) => {
      //   return obj.types.includes('administrative_area_level_1')
      // })[0].long_name

      return getLatLng(results[0])
    })
    .then((latLng: any) => {
      obj.coords = latLng
      return obj
    })
    .catch((error) => console.error('Error', error))
}

export const formatAddress = (data: any, type: string) => {
  let obj: any = {}

  const houseNumber: any = data[0].address_components.filter((obj: any) => {
    return obj.types.includes('street_number')
  })[0]?.long_name

  const street: any = data[0].address_components.filter((obj: any) => {
    return obj.types.includes('route')
  })[0]?.long_name

  const zipcode: any = data[0].address_components.filter((obj: any) => {
    return obj.types.includes('postal_code')
  })[0]?.long_name

  const city: any = data[0].address_components.filter((obj: any) => {
    return obj.types.includes('locality')
  })[0]?.long_name

  const state: any = data[0].address_components.filter((obj: any) => {
    return obj.types.includes('administrative_area_level_1')
  })[0]?.short_name

  if (type === 'address') {
    obj = {
      houseNumber,
      street,
      zipcode,
      city,
      state,
    }
  }

  if (type === 'zipcode') {
    obj = {
      zipcode,
    }
  }

  return obj
}
