import '../styles/global.css'
import '@/components/UserOnboarding/dist/index.css'
import { GlobalProvider } from '@/context/GlobalContext'
import ThemeCustomization from '@/themes'
import { RouteGuard } from '@/utils/routeGuard'
import CssBaseline from '@mui/material/CssBaseline'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeCustomization>
    <CssBaseline />
    <GlobalProvider>
      <RouteGuard>
        <SnackbarProvider maxSnack={20}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </RouteGuard>
    </GlobalProvider>
  </ThemeCustomization>
)

export default MyApp
