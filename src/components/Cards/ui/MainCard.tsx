// @ts-nocheck
import MapComponent from '@/components/Maps/Map'
import { Room, RoomOutlined } from '@mui/icons-material'
import { Stack, Grid } from '@mui/material'
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  CardMedia,
  Typography,
  CardProps,
  CardHeaderProps,
  CardContentProps,
  Box,
} from '@mui/material'
// material-ui
import { useTheme } from '@mui/material/styles'
import GoogleMapReact from 'google-map-react'
import Link from 'next/link'
import React, { Ref } from 'react'
import {
  formatCurrencyMobile,
  formatCurrencyDesktop,
  convertToPercentage,
} from 'src/utils/format'
// project imports
import { KeyedObject } from 'types'

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
}

// ==============================|| CUSTOM MAIN CARD ||============================== //

export interface MainCardProps extends KeyedObject {
  border?: boolean
  boxShadow?: boolean
  children: React.ReactNode | string
  style?: React.CSSProperties
  content?: boolean
  className?: string
  contentClass?: string
  contentSX?: CardContentProps['sx']
  darkTitle?: boolean
  sx?: CardProps['sx']
  secondary?: CardHeaderProps['action']
  shadow?: string
  elevation?: number
  title?: React.ReactNode | string
  image?: string
  item?: any
}

const MainCard = React.forwardRef(
  (
    {
      border = true,
      boxShadow,
      image,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      item,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const theme = useTheme()
    const mapProps = {
      center: {
        lat: item.latitude,
        lng: item.longitude,
      },
      zoom: 15,
    }
    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor:
            theme.palette.mode === 'dark'
              ? theme.palette.background.default
              : theme.palette.primary[200] + 75,
          ':hover': {
            boxShadow: boxShadow
              ? shadow ||
                (theme.palette.mode === 'dark'
                  ? '0 2px 14px 0 rgb(33 150 243 / 10%)'
                  : '0 2px 14px 0 rgb(32 40 45 / 8%)')
              : 'inherit',
          },
          ...sx,
          cursor: 'pointer',
        }}
      >
        <Box sx={{ height: 120 }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDellL-_NuC6iLG_841g9haLZy9gedZ6LE',
            }}
            defaultCenter={mapProps.center}
            defaultZoom={mapProps.zoom}
          >
            <Room
              lat={mapProps.center.lat}
              lng={mapProps.center.lng}
              sx={{
                color: '#53b57c',
              }}
              fontSize="large"
            />
          </GoogleMapReact>
        </Box>
        <Link href={`/listings/${item.listingId}`} key={item.listingId}>
          <Box sx={{ position: 'relative' }}>
            {/* card media */}
            <CardMedia
              component="img"
              image={item.primaryImageUrl}
              alt={item.listingId}
              sx={{
                objectFit: 'cover',
                height: 70,
                width: 70,
                borderRadius: 100,
                position: 'absolute',
                top: -35,
                left: 22,
                border: `3px solid ${theme.palette.dark.main}`,
              }}
            />
            {/* card header and action */}
            {!darkTitle && title && (
              <CardHeader
                sx={{
                  paddingTop: 7,
                  paddingBottom: 2,
                  paddingLeft: 3,
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

            <CardContent
              sx={{
                paddingX: 3,
                paddingTop: 0,
              }}
              className={contentClass}
            >
              <Box
                sx={{
                  marginBottom: 3,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 500,
                    marginBottom: 1,
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 1,
                  }}
                >
                  {item.streetAddress} {item.city} {item.state}
                </Typography>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={1}
                >
                  <Typography
                    variant="subtitile1"
                    sx={{ fontWeight: 400, opacity: 0.8 }}
                  >
                    {item.beds} Beds
                  </Typography>
                  <Typography
                    variant="subtitile1"
                    sx={{ fontWeight: 400, opacity: 0.8 }}
                  >
                    {item.baths} Baths
                  </Typography>
                  <Typography
                    variant="subtitile1"
                    sx={{ fontWeight: 400, opacity: 0.8 }}
                  >
                    {item.livingArea} Sqft
                  </Typography>
                </Stack>
              </Box>

              <Grid
                container
                sx={{
                  borderColor: theme.palette.primary[200] + 75,
                  paddingY: 2,
                  borderRadius: 2,
                  backgroundColor: theme.palette.primary[200] + 10,
                }}
              >
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 500, opacity: 0.8 }}
                    >
                      Next year
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 500 }}>
                      {convertToPercentage(item.nextYoy1)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 500, opacity: 0.8 }}
                    >
                      1 year
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 500 }}>
                      {convertToPercentage(item.yoy1)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 500, opacity: 0.8 }}
                    >
                      3 years
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 500 }}>
                      {convertToPercentage(item.yoy3)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </Link>
      </Card>
    )
  },
)

export default MainCard
