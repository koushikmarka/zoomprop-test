import axios from 'axios'

export const googleAuth = (data: any) => {
  return axios
    .post(`${process.env.ZOOMPROP_API_URL}/googleAuth`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error.response)
    })
}

export const signIn = (data: any) => {
  return axios
    .post(`${process.env.ZOOMPROP_API_URL}/auth`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error?.response?.data
    })
}

export const signOut = (token: string) => {
  return axios
    .post(`${process.env.ZOOMPROP_API_URL}/signOut`, '', {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log('this is error', error)
    })
}

export const signUpStandard = (token: string, data: any) => {
  return axios
    .post(`${process.env.ZOOMPROP_API_URL}/signUp`, data, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log('this is the error', error)
      return error.response.data.message
    })
}

export const checkAuthToken = (token: string) => {
  return axios
    .post(`${process.env.ZOOMPROP_API_URL}/validate`, '', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log('this is error', error)
    })
}

export const setAuthToken = (token: string, sessionToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('Zoomprop_AuthToken', token)
    localStorage.setItem('Zoomprop_CordToken', sessionToken)
    return !!token
  }
}

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('Zoomprop_AuthToken')
    return token || false
  }
}

export const getCordToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('Zoomprop_CordToken')
    return token || false
  }
}
