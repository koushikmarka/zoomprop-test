import GlobalContext from '@/context/GlobalContext'
import { checkAuthToken, getAuthToken, getCordToken } from '@/services'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'

export { RouteGuard }

function RouteGuard({ children }: any) {
  const gContext = useContext<any>(GlobalContext)
  const router = useRouter()
  const token: any = getAuthToken()
  const [authorized, setAuthorized] = useState(false)
  const publicPaths = [
    '/sign-in/',
    '/forgot-password/',
    '/check-mail/',
    '/reset-password/',
  ]

  useEffect(() => {
    if (process.env.AUTH_REQUIRED === 'true') {
      // on initial load - run auth check

      // on route change start - hide page content by setting authorized to false
      const hideContent = () => setAuthorized(false)
      router.events.on('routeChangeStart', hideContent)

      checkAuthToken(token).then((res) => {
        if (res.valid) {
          gContext.setUser({
            ...res,
            sessionToken: getCordToken(),
            authToken: token,
          })
        }
        setAuthorized(res.valid)
        authCheck(router.asPath, res.valid)
      })

      // on route change complete - run auth check
      router.events.on('routeChangeComplete', authCheck)

      // unsubscribe from events in useEffect return function
      return () => {
        router.events.off('routeChangeStart', hideContent)
        router.events.off('routeChangeComplete', authCheck)
      }
    } else {
      setAuthorized(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function authCheck(url: any, valid: boolean) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split('?')[0]
    if (!valid) {
      if (!publicPaths.includes(path)) {
        setAuthorized(false)
        router.push({
          pathname: '/sign-in',
          query: { returnUrl: router.asPath },
        })
      } else {
        setAuthorized(true)
      }
    } else {
      setAuthorized(true)
    }
  }
  return authorized && children
}
