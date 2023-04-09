import AppreciationGraph from './AppreciationGraph'
import InfoBox from './InfoBox'
import { useTheme } from '@mui/material/styles'

export default function Appreciation({ item }) {
  const theme = useTheme()
  return (
    <InfoBox title="Appreciation">
      <AppreciationGraph item={item} />
    </InfoBox>
  )
}
