import axios from 'axios'

export const getUser = (token: any) => {
  return axios
    .get(`${process.env.ZOOMPROP_API_URL}/user`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data.data
      // return response;
    })
    .catch((error) => {
      console.log('this is error', error)
      return null
    })
}

export const updateUser = (token: any, user: any) => {
  return axios
    .put(`${process.env.ZOOMPROP_API_URL}/user`, user, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log('this is error', error)
      return null
    })
}

export const forgotPassword = (email: string) => {
  return axios
    .post(`${process.env.ZOOMPROP_API_URL}/forgotPassword`, email, {
      headers: {
        Authorization: `Bearer ${process.env.ZOOMPROP_API_KEY}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error.response
    })
}

export const resetPassword = (obj: any) => {
  // console.log('this is the obj', obj);
  return axios
    .post(`${process.env.ZOOMPROP_API_URL}/password`, obj, {
      headers: {
        Authorization: `Bearer ${process.env.ZOOMPROP_API_KEY}`,
      },
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error.response
    })
}
