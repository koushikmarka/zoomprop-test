import MainCard from '../../components/Cards/ui/MainCard'
import Appreciation from '../../components/Koushik/ListingPage/Appreciation'
import InvestmentInfo from '../../components/Koushik/ListingPage/InvestmentInfo'
import PriceEstimate from '../../components/Koushik/ListingPage/PriceEstimate'
import Rental from '../../components/Koushik/ListingPage/Rental'
import YoY from '../../components/Koushik/ListingPage/YoY'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import {
  BathtubOutlined,
  BedOutlined,
  CalendarTodayOutlined,
  SquareFootOutlined,
} from '@mui/icons-material'
import { Room } from '@mui/icons-material'
import { Container, Typography, Box, Grid } from '@mui/material'
import { Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import GoogleMapReact from 'google-map-react'
import Link from 'next/link'
import { formatCurrencyDesktop } from 'src/utils/format'

function getRandomListings(arr) {
  let result = []
  let numObjects = 3
  let maxIndex = arr.length - 1

  while (numObjects > 0) {
    let randomIndex = Math.floor(Math.random() * maxIndex)
    result.push(arr[randomIndex])
    numObjects--
  }

  return result
}

export default function Listing({ item, listings }) {
  const theme = useTheme()
  const mapProps = {
    center: {
      lat: item.latitude,
      lng: item.longitude,
    },
    zoom: 16,
  }
  return (
    <Main meta={<Meta title={item.title} description={item.description} />}>
      <Container maxWidth="lg" sx={{ marginY: 12 }}>
        <Link href="/">
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              marginBottom: 2,
              fontWeight: 400,
              opacity: 0.7,
              cursor: 'pointer',
              ':hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Back to all listings
          </Typography>
        </Link>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            mb: 5,
            flexDirection: 'row',
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
            },
          }}
        >
          <img
            src={item.primaryImageUrl}
            alt={item.listingId}
            width="250px"
            style={{
              borderRadius: '8px',
              objectFit: 'cover',
              [theme.breakpoints.up('md')]: {
                width: '50%',
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <Box>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  marginBottom: 2,
                }}
              >
                {formatCurrencyDesktop(item.listPrice)}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 500,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 1,
                }}
              >
                {item.streetAddress} {item.city} {item.state}
              </Typography>
            </Box>

            <Stack
              direction="row"
              // divider={<Divider orientation="vertical" flexItem />}
              spacing={{
                xs: 3,
                md: 6,
              }}
            >
              <Box>
                <BedOutlined
                  fontSize="small"
                  sx={{
                    opacity: 0.7,
                  }}
                />
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                  {item.beds} Beds
                </Typography>
              </Box>
              <Box>
                <BathtubOutlined
                  fontSize="small"
                  sx={{
                    opacity: 0.7,
                  }}
                />
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                  {item.baths} Baths
                </Typography>
              </Box>

              <Box>
                <SquareFootOutlined
                  fontSize="small"
                  sx={{
                    opacity: 0.7,
                  }}
                />
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                  {item.livingArea} Sqft
                </Typography>
              </Box>
              <Box>
                <CalendarTodayOutlined
                  fontSize="small"
                  sx={{
                    opacity: 0.7,
                  }}
                />
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                  Built in {item.yearBuilt}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Grid
          container
          spacing={4}
          sx={{
            mb: 4,
          }}
          direction={{ xs: 'column', md: 'row' }}
        >
          <Grid item xs={6}>
            <Grid container spacing={4} direction="column">
              <Grid item xs={6}>
                <YoY item={item} />
              </Grid>
              <Grid item xs={6}>
                <Appreciation item={item} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={4} direction="column">
              <Grid item xs={6}>
                <InvestmentInfo item={item} />
              </Grid>
              <Grid item xs={6}>
                <Rental item={item} />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ height: '260px', borderRadius: 4 }}>
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
                        fontSize: '3rem',
                      }}
                    />
                  </GoogleMapReact>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <PriceEstimate item={item} />
        </Box>
        <Box
          sx={{
            marginTop: 10,
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontWeight: 500, mb: 4 }}
            component="h3"
          >
            More listings like this
          </Typography>
          <Grid container spacing={3} alignItems="stretch">
            {listings.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.listingId}>
                <MainCard
                  title={item.listPrice}
                  darkTitle={false}
                  item={item}
                  boxShadow={true}
                ></MainCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Main>
  )
}

export async function getServerSideProps(context) {
  let id = context.query.id
  const res = await fetch(
    `https://642babccd7081590f926e18c.mockapi.io/api/v1/listings`,
  )
  const data = await res.json()
  let item = data.find((item) => item.listingId == id)
  let listings = getRandomListings(data)

  return {
    props: { item, listings },
  }
}
