// @ts-nocheck
import MainCard from '../Cards/ui/MainCard'
import { Grid } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const CardsView = () => {
  const { data, error } = useSWR(
    'https://642babccd7081590f926e18c.mockapi.io/api/v1/listings',
    fetcher,
  )

  if (!data) return <div>Loading...</div>

  return (
    <Grid container spacing={3} alignItems="stretch">
      {data.map((item) => (
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
  )
}

export default CardsView
