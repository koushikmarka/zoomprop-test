import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import { Box } from '@mui/material'

const Index = () => {
  return (
    <Main meta={<Meta title="title" description="description" />}>
      <Box>Hi</Box>
    </Main>
  )
}

export default Index
