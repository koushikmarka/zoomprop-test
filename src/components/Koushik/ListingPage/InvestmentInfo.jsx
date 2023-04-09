import InfoBox from './InfoBox'
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { isMobile } from 'react-device-detect'
import {
  formatCurrencyMobile,
  formatCurrencyDesktop,
  convertToPercentage,
} from 'src/utils/format'

export default function InvestmentInfo({ item }) {
  const theme = useTheme()

  return (
    <InfoBox title="Investment Info">
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
              Price
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              {isMobile
                ? formatCurrencyMobile(item.listPrice)
                : formatCurrencyDesktop(item.listPrice)}
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
              Market Est
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              {item.marketEstimate
                ? isMobile
                  ? formatCurrencyMobile(item.marketEstimate)
                  : formatCurrencyDesktop(item.marketEstimate)
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
              TAV
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              {isMobile
                ? formatCurrencyMobile(item.taxAssessedValue)
                : formatCurrencyDesktop(item.taxAssessedValue)}
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
              Day listed
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              {item.daysListed}
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
              Cap Rate
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              {item.capRate ? convertToPercentage(item.capRate) : 'N/A'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </InfoBox>
  )
}
