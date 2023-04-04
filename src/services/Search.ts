import axios from 'axios'

export const search = (token: string, data: any) => {
  return axios
    .post(`${process.env.ZOOMPROP_API_URL}/search`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.data
    })
    .catch((error) => {
      console.log(error.response)
    })
}

export const autoComplete = (token: string, params: any) => {
  return axios
    .get(`${process.env.ZOOMPROP_API_URL}/search/autocomplete`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.suggestions
    })
    .catch((error) => {
      console.log(error.response)
    })
}

export const nlpSearch = (token: string, data: any) => {
  return axios
    .post(`${process.env.ZOOMPROP_API_URL}/search/gpt3Search`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log('this is response', response)
      return response.data
    })
    .catch((error) => {
      console.log(error.response)
    })
}
