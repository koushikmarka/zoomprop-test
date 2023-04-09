
import InfoBox from './InfoBox'
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { isMobile } from 'react-device-detect'
import {
  formatCurrencyMobile,
  formatCurrencyDesktop,
  convertToPercentage,
} from 'src/utils/format'

export default function Rental({ item }) {
  const theme = useTheme()
  return (
    <InfoBox title="Rental Info">
      <Grid container rowGap={3} spacing={3}>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'left',
              flexDirection: 'column',
              gap: 0.5,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 500, opacity: 0.8 }}
            >
              Avg Daily Rate
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              {formatCurrencyDesktop(item.averageDailyRate)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'left',
              flexDirection: 'column',
              gap: 0.5,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 500, opacity: 0.8 }}
            >
              Annual Revenue
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              {item.annualRevenue
                ? isMobile
                  ? formatCurrencyMobile(item.annualRevenue)
                  : formatCurrencyDesktop(item.annualRevenue)
                : 'N/A'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'left',
              flexDirection: 'column',
              gap: 0.5,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 500, opacity: 0.8 }}
            >
              Occupancy Rate
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              {convertToPercentage(item.occupancy)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </InfoBox>
  )
}
