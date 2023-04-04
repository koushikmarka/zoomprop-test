// material-ui
// project import
import useConfig from '@/hooks/useConfig'
import { thousands } from '@/utils'
import { useTheme } from '@mui/material/styles'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export type LineChartProps = {
  data?: any
  chartOptions?: any
}

// ==============================|| LINE CHART ||============================== //

const ApexLineChart = ({ data }: LineChartProps) => {
  const theme = useTheme()
  const { navType } = useConfig()

  const { primary } = theme.palette.text
  const darkLight = theme.palette.dark.light
  const grey200 = theme.palette.grey[200]
  const secondary = theme.palette.secondary.main

  const [graphData] = useState<any>({
    series: [
      {
        name: data.tooltip,
        data: data.data || data,
      },
    ],
    options: {
      colors: [secondary],
      xaxis: {
        tickAmount: 24,
        labels: {
          style: {
            colors: [
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
            ],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
          formatter: (value: any) => {
            return `$${thousands(value)}`
          },
        },
      },
      grid: {
        borderColor: navType === 'dark' ? darkLight + 20 : grey200,
      },
      tooltip: {
        theme: navType === 'dark' ? 'dark' : 'light',
        x: {
          show: true,
          format: 'dd MMM',
          formatter: undefined,
        },
        y: {
          formatter(val: number) {
            return `$${thousands(val)}`
          },
          title: {
            formatter() {
              return `Home price:`
            },
          },
        },
      },
    },
  })

  return (
    <div id="chart">
      {graphData && (
        <ReactApexChart
          options={graphData.options}
          series={graphData.series}
          type="line"
          height={350}
        />
      )}
    </div>
  )
}

export default ApexLineChart
