import Header from '@/components/Header'
import GlobalContext from '@/context/GlobalContext'
import { AppConfig } from '@/utils/AppConfig'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ReactNode, useContext, useEffect } from 'react'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
  user?: any
  onboarding?: any
}

const Main = ({ meta, user, children, onboarding }: IMainProps) => {
  const gContext = useContext<any>(GlobalContext)
  const theme = useTheme()
  useEffect(() => {
    const html: any =
      typeof document !== 'undefined' ? document.querySelector('html') : ''
    html.classList.add('zoomprop')
  }, [])
  return (
    <div className="w-full text-gray-700 antialiased">
      {meta}
      <Header appConfig={AppConfig} user={user} onboarding={onboarding} />
      <Box className="content text-xl" sx={{ margin: '' }}>
        <Box
          sx={{
            [theme.breakpoints.up('md')]: {
              p: 3,
            },
          }}
        >
          <Box>
            <Typography variant="h2" sx={{ ml: 0, mr: 2 }}>
              {gContext.currentPage}
            </Typography>
          </Box>
          {children}
        </Box>
      </Box>
    </div>
  )
}

export { Main }
