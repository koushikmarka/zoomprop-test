import { Card, CardHeader, CardMedia, Box } from '@mui/material'
// material-ui
import { useTheme } from '@mui/material/styles'
import GoogleMapReact from 'google-map-react'
import React, { Ref } from 'react'
// project imports
import { formatCurrencyDesktop } from 'src/utils/format'

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
}

const SingleCard = ({ data }) => {
  const theme = useTheme()
  const defaultProps = {
    center: {
      lat: data.latitude,
      lng: data.longitude,
    },
    zoom: 15,
  }
  return (
    <Card>
      <Box sx={{ height: 140 }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDellL-_NuC6iLG_841g9haLZy9gedZ6LE',
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        ></GoogleMapReact>
      </Box>

      <Box sx={{ position: 'relative' }}>
        {/* card media */}
        <CardMedia
          component="img"
          image={data.primaryImageUrl}
          alt="Paella dish"
          sx={{
            objectFit: 'cover',
            height: 70,
            width: 70,
            borderRadius: 100,
            position: 'absolute',
            top: -35,
            left: 14,
            border: `3px solid ${theme.palette.dark.main}`,
          }}
        />
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={{
              paddingTop: 6,
            }}
            title={formatCurrencyDesktop(title)}
            action={secondary}
          />
        )}
        {/* {darkTitle && title && (
            <CardHeader
              sx={headerSX}
              title={
                <Typography variant="h3">{formatCurrency(title)}</Typography>
              }
              action={secondary}
            />
          )} */}

        {/* card content */}

        {/* <CardContent sx={contentSX} className={contentClass}>
            <Stack direction="row" spacing={2}></Stack>
          </CardContent> */}
      </Box>
    </Card>
  )
}

export default SingleCard
