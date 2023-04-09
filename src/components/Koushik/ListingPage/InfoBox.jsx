import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function InfoBox({ children, title }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.up('md')]: {
          padding: 3.5,
        },
        padding: 2.5,
        borderRadius: 2,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 500, mb: 4 }}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}
