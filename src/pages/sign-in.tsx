import AuthCardWrapper from '@/components/Authentication/AuthCardWrapper'
import AuthWrapper1 from '@/components/Authentication/AuthWrapper1'
import AuthLogin from '@/components/Authentication/auth-forms/AuthLogin'
import Logo from '@/components/Logo/Logo'
import Page from '@/components/Page/Page'
import GlobalContext from '@/context/GlobalContext'
import { checkAuthToken } from '@/services'
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const gContext = useContext<any>(GlobalContext)
  const router = useRouter()
  const user = gContext.user
  const token = user?.authToken
  useEffect(() => {
    checkAuthToken(token).then((res) => {
      if (res.valid) {
        router.push('/')
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const theme = useTheme()

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Page title="Login">
      <AuthWrapper1>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          sx={{ minHeight: '100vh' }}
        >
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: 'calc(100vh - 68px)' }}
            >
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item sx={{ mb: 3 }}>
                      <Link href="#">
                        <Logo />
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction={matchDownSM ? 'column-reverse' : 'row'}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item>
                          <Stack
                            alignItems="center"
                            justifyContent="center"
                            spacing={1}
                          >
                            <Typography
                              variant="caption"
                              fontSize="16px"
                              textAlign={matchDownSM ? 'center' : 'inherit'}
                            >
                              Enter your credentials to continue
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthLogin />
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AuthWrapper1>
    </Page>
  )
}

export default Login
