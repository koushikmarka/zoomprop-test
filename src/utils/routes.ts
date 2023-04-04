export const noAuth = [
  'sign-in',
  'sign-up',
  'forgot-password',
  'reset-password',
  'enterprise',
  'enterprise[...company]',
]

export const authRedirect = (valid: any, isNoAuth: any, router: any) => {
  if (valid) {
    if (isNoAuth) {
      router.push('/')
    }
  } else if (!isNoAuth && !valid) {
    router.push('/sign-in')
  }
}
