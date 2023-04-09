import CardsView from '@/components/Koushik/CardsView'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import { Container, Typography } from '@mui/material'

const Index = () => {
  return (
    <Main meta={<Meta title="title" description="description" />}>
      <Container maxWidth="lg" sx={{ marginY: 12 }}>
        <Typography variant="h1" sx={{marginBottom: 4}}>Listings</Typography>
        <CardsView />
      </Container>
    </Main>
  )
}

export default Index
