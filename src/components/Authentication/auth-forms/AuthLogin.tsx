// assets
import AnimateButton from '@/components/Button/AnimatedButton'
// project imports
import useConfig from '@/hooks/useConfig'
import { setAuthToken, googleAuth, signIn } from '@/services'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Alert,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
  Box,
} from '@mui/material'
// material-ui
import { useTheme } from '@mui/material/styles'
import { Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// third party
import * as Yup from 'yup'

const Google = '/assets/icons/social-google.svg'

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
  const theme = useTheme()
  const router = useRouter()
  const [googleLoading, setGoogleLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { code } = router.query
  const [error, setError] = useState<any>(null)
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
  const { borderRadius } = useConfig()
  const [checked, setChecked] = React.useState(true)
  const [googleAuthCode, setGoogleAuthCode] = useState<any>(null)

  const runLogin = (response: any) => {
    if (response?.message === 'success') {
      setAuthToken(response?.accessToken, response?.sessionToken)
      window.location.href = '/'
    }
  }

  const googleSignIn = () => {
    const authUrl = `https://zoompropdev.auth.us-east-1.amazoncognito.com`
    const googleBaseUrl = `${authUrl}/oauth2/authorize`
    const clientId = `${process.env.COGNITO_CLIENTID}`
    const redirectUrl = `${process.env.BASE_SITE_REDIRECT_URI}/sign-in`
    const url = `${googleBaseUrl}?identity_provider=Google&client_id=${clientId}&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${redirectUrl}`
    window.location.href = url
  }

  useEffect(() => {
    if (googleAuthCode !== null) {
      googleAuth({
        code: googleAuthCode,
        type: 'user',
        redirectUrl: `${process.env.BASE_SITE_REDIRECT_URI}/sign-in`,
      }).then((response: any) => {
        runLogin(response)
      })
    }
  }, [googleAuthCode])

  useEffect(() => {
    if (code) {
      setGoogleLoading(true)
      setGoogleAuthCode(code)
    }
  }, [code])

  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault()
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={() => googleSignIn()}
              size="large"
              variant="outlined"
              sx={{
                color: 'grey.700',
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.dark.main
                    : theme.palette.grey[50],
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.dark.light + 20
                    : theme.palette.grey[100],
              }}
            >
              <Box
                sx={{
                  mr: { xs: 1, sm: 2 },
                  width: 20,
                  height: 20,
                  marginRight: matchDownSM ? 8 : 16,
                }}
              >
                <Image
                  src={Google}
                  alt="Zoomprop Dashboard"
                  layout="intrinsic"
                  width={'16px'}
                  height={'16px'}
                />
              </Box>
              {!googleLoading ? `Sign in with Google` : <CircularProgress />}
            </Button>
          </AnimateButton>
        </Grid>
        {!googleLoading && (
          <>
            <Grid item xs={12}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                <Button
                  variant="outlined"
                  sx={{
                    cursor: 'unset',
                    m: 2,
                    py: 0.5,
                    px: 7,
                    borderColor:
                      theme.palette.mode === 'dark'
                        ? `${theme.palette.dark.light + 20} !important`
                        : `${theme.palette.grey[100]} !important`,
                    color: `${theme.palette.grey[900]}!important`,
                    fontWeight: 500,
                    borderRadius: `${borderRadius}px`,
                  }}
                  disableRipple
                  disabled
                >
                  OR
                </Button>

                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                  Sign in with Email address
                </Typography>
              </Box>
              {error !== null && (
                <Box sx={{ mb: 2 }}>
                  <Alert severity="error">{error}</Alert>
                </Box>
              )}
            </Grid>
          </>
        )}
      </Grid>
      {!googleLoading && (
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
            password: Yup.string().max(255).required('Password is required'),
          })}
          onSubmit={async (values) => {
            setLoading(true)
            signIn(values).then((res: any) => {
              if (res?.message === 'success') {
                setAuthToken(res?.accessToken, res?.sessionToken)

                window.location.href = '/'
              } else {
                setError(res.message)
              }
              setLoading(false)
            })
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit} {...others}>
              <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-email-login">
                  Email Address
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Email Address"
                  inputProps={{}}
                />
                {touched.email && errors.email && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-email-login"
                  >
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-password-login">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  inputProps={{}}
                />
                {touched.password && errors.password && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-password-login"
                  >
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Link href="/forgot-password">
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    sx={{
                      textDecoration: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Link>
              </Stack>

              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{ pb: 2, pt: 2, color: '#fff' }}
                  >
                    {loading ? (
                      <CircularProgress sx={{ color: '#fff' }} size={30} />
                    ) : (
                      `Sign in`
                    )}
                  </Button>
                </AnimateButton>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  )
}

export default FirebaseLogin
