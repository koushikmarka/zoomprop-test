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

function convertToPercentage(num) {
  return Math.round(num * 100)
}

export default function YOYGraph({ item }) {
  const theme = useTheme()
  const data = [
    {
      name: 'Last 1M',
      YOY: convertToPercentage(item.months1),
    },
    {
      name: 'Last 3M',
      YOY: convertToPercentage(item.months3),
    },
    {
      name: 'Last 6M',
      YOY: convertToPercentage(item.months6),
    },
    {
      name: 'Next 1M',
      YOY: convertToPercentage(item.nextMonths1),
    },
    {
      name: 'Next 3M',
      YOY: convertToPercentage(item.nextMonths3),
    },
    {
      name: 'Next 6M',
      YOY: convertToPercentage(item.nextMonths6),
    },
  ]

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
          <p className="label">{`${label} : ${payload[0].value}%`}</p>
        </div>
      )
    }

    return null
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
        <AreaChart data={data} margin={{ left: -30, bottom: 0 }}>
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
          <XAxis dataKey="name" tickLine={false} stroke="#5d5e5e" />
          <YAxis tickLine={false} stroke="#5d5e5e" />
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
            dataKey="YOY"
            stroke="#6be29c"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}
