// @ts-nocheck
import Logo from '../Logo/Logo'
import { signOut } from '@/services'
import { matchRoute } from '@/utils/helperFn'
import { Box, Tooltip } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
import React from 'react'

const drawerWidth = 240

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  border: 'none',
  overflowX: 'hidden',
  backgroundColor: theme.palette.primary.main,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: theme.palette.primary.main,
  padding: 0,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  '.MuiToolbar-gutters': {
    padding: 0,
  },
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.primary.main,
  },

  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const logo = '/assets/images/icon-white.png'

const Header = ({ appConfig, user, onboarding }: any) => {
  const nav = useRouter()

  const runUrl = (url: string) => {
    router.push(`/region/${url}`)
  }

  const signOutUser = () => {
    signOut(user.authToken).then((res) => {
      if (res?.message === 'success') {
        router.push('/sign-in')
      }
    })
  }

  const runDynamicFunction = (fn: string) => {
    if (fn === 'signOutUser') {
      signOutUser()
    }
  }

  const goToUrl = (url: string) => {
    router.push(url)
  }
  const theme = useTheme()
  const [open] = React.useState(false)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" className="header" elevation={0}>
        <Toolbar sx={{ p: 0, height: '75px' }}>
          <Box
            sx={{
              width: `calc(${theme.spacing(7)} + 9px)`,
            }}
          >
            <IconButton
              color="inherit"
              edge="start"
              sx={{
                ml: 1,
                bgcolor: matchRoute(nav.pathname, '/')
                  ? theme.palette.dark[800]
                  : 'none',
                ...(open && { display: 'none' }),
                '&:hover': {
                  bgcolor: theme.palette.dark[800],
                },
              }}
            >
              <Link href={'/'}>
                <Tooltip
                  title="Dashboard"
                  arrow
                  enterDelay={300}
                  placement="right"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: theme.palette.primary.main,
                        color: 'common.white',
                        '& .MuiTooltip-arrow': {
                          color: theme.palette.primary.main,
                        },
                      },
                    },
                  }}
                >
                  <Logo />
                </Tooltip>
              </Link>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
