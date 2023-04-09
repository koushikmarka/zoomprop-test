
import InfoBox from './InfoBox'
import Graph from './YOYGraph'
import { useTheme } from '@mui/material/styles'


export default function YoY({ item }) {
  const theme = useTheme()
  return (
    <InfoBox title="YOY Growth">
      <Graph item={item} />
    </InfoBox>
  )
}
