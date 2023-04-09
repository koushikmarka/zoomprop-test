import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function getJanPrices(data) {
  const janPrices = []

  for (const date in data) {
    const dateObj = new Date(date)
    if (dateObj.getMonth() === 0) {
      const year = date.slice(0, 4)
      const price = data[date]
      janPrices.push({ year, price })
    }
  }

  return janPrices
}


export default function PriceEstimateGraph({ item }) {
  const data = getJanPrices(item.estimateHistory)
  const theme = useTheme()

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            background: '#000',
            paddingLeft: '8px',
            paddingRight: '8px',
          }}
        >
          <p className="label">{`${label} : ${formatPrice(
            payload[0].value,
          )}`}</p>
        </div>
      )
    }

    return null
  }

  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    })

    const abbreviations = {
      K: 1000,
      M: 1000000,
      B: 1000000000,
    }

    let abbreviatedPrice = price
    let abbreviation = ''

    for (const key in abbreviations) {
      if (abbreviations.hasOwnProperty(key)) {
        if (price >= abbreviations[key]) {
          abbreviatedPrice = price / abbreviations[key]
          abbreviation = key
        }
      }
    }

    return `${formatter.format(abbreviatedPrice)}${abbreviation}`
  }

  return (
    <Box
      sx={{
        [theme.breakpoints.up('md')]: {
          height: '250px',
        },
        height: '150px',
      }}
    >
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6be29c" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6be29c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="5"
            stroke="#363838"
            horizontal={false}
          />
          <XAxis dataKey="year" tickLine={false} stroke="#5d5e5e" />
          <YAxis
            tickLine={false}
            stroke="#5d5e5e"
            dataKey="price"
            tickFormatter={formatPrice}
          />
          <Tooltip
            cursor={false}
            wrapperStyle={{
              backgroundColor: '#000',
              border: '1px solid red',
              borderRadius: '5px',
            }}
            contentStyle={{
              fontSize: '14px',
              color: '#333',
            }}
            content={<CustomTooltip />}
            active={true}
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke="#6be29c"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}
