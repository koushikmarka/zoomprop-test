import InfoBox from './InfoBox'
import PriceEstimateGraph from './PriceEstimateGraph'
import { useTheme } from '@mui/material/styles'

export default function PriceEstimate({ item }) {
  const theme = useTheme()
  return (
    <InfoBox title="Price Estimate - 10 Years">
      <PriceEstimateGraph item={item} />
    </InfoBox>
  )
}
