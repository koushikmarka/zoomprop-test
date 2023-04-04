import axios from 'axios'

export const getUsers = (token: any) => {
  return axios
    .get(`${process.env.ZOOMPROP_API_URL}/org`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data
      // return response;
    })
    .catch((error) => {
      console.log('this is error', error)
      return null
    })
}
