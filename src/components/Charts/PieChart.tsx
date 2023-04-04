// material-ui
// project import
import useConfig from '@/hooks/useConfig'
import { useTheme } from '@mui/material/styles'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
// third-party
import { Props as ChartProps } from 'react-apexcharts'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export type PieChartProps = {
  data?: any
  labels?: any
}

// ==============================|| PIE CHART ||============================== //

const ApexPieChart = ({ data, labels }: PieChartProps) => {
  const theme = useTheme()
  const { navType } = useConfig()

  const { primary } = theme.palette.text
  const darkLight = theme.palette.dark.light
  const grey200 = theme.palette.grey[200]
  const backColor = theme.palette.background.paper

  const [series] = useState(data?.data)
  const [options, setOptions] = useState<ChartProps>({
    chart: {
      type: 'pie',
      width: '50%',
      height: 250,
    },
    plotOptions: {
      pie: {
        size: 200,
      },
    },
    donut: {
      size: '65%',
    },
    labels: labels,
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 5,
      },
      itemMargin: {
        horizontal: 25,
        vertical: 4,
      },
    },
    responsive: [
      {
        breakpoint: 450,
        chart: {
          width: 280,
          height: 280,
        },
        options: {
          legend: {
            show: false,
            position: 'bottom',
          },
        },
      },
    ],
  })

  const secondary = theme.palette.secondary.main
  const primaryMain = theme.palette.primary.main
  const successDark = theme.palette.success.dark
  const error = theme.palette.error.main
  const warningDark = theme.palette.warning.dark
  const orangeDark = theme.palette.orange.dark

  React.useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [
        secondary,
        primaryMain,
        successDark,
        error,
        warningDark,
        orangeDark,
      ],
      xaxis: {
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
            ],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      grid: {
        borderColor: navType === 'dark' ? darkLight + 20 : grey200,
      },
      legend: {
        labels: {
          colors: 'grey.500',
        },
      },
      stroke: {
        colors: [backColor],
      },
    }))
  }, [
    navType,
    primary,
    darkLight,
    grey200,
    backColor,
    secondary,
    primaryMain,
    successDark,
    error,
    warningDark,
    orangeDark,
  ])

  return (
    <div id="chart">
      {series && (
        <ReactApexChart options={options} series={series} type="pie" />
      )}
    </div>
  )
}

export default ApexPieChart
