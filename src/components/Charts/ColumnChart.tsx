// material-ui
// project import
import useConfig from '@/hooks/useConfig'
// third-party
import { thousands, getPercentage, slugify } from '@/utils'
import { useTheme } from '@mui/material/styles'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Props as ChartProps } from 'react-apexcharts'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export type ColumnChartProps = {
  data?: any
  chartOptions?: any
}
// chart options

// ==============================|| COLUMN CHART ||============================== //

const ApexColumnChart = ({ data }: ColumnChartProps) => {
  const theme = useTheme()
  const { navType } = useConfig()
  const router = useRouter()

  const { primary } = theme.palette.text
  const darkLight = theme.palette.dark.light
  const grey200 = theme.palette.grey[200]

  const secondary = theme.palette.secondary.main
  const primaryMain = theme.palette.primary.main
  const successDark = theme.palette.success.dark

  const [series] = useState([
    {
      name: data.tooltip,
      data: data.data,
    },
  ])

  const [options, setOptions] = useState<ChartProps>({
    chart: {
      type: 'bar',
      height: 450,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      labels: {
        style: {
          colors: ['#ffffff'],
          cssClass: 'apexcharts-xaxis-label',
        },
      },
    },
    yaxis: {
      show: false,
      type: 'percentage',
      title: {
        text: '$ (thousands)',
      },
      labels: {
        formatter: (value: any) => value.toFixed(0) + '%',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter(val: number) {
          return data.type === 'percentage'
            ? getPercentage(val)
            : `${thousands(val)}`
        },
      },
    },
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: false,
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8,
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          yaxis: {
            show: false,
          },
        },
      },
    ],
  })

  React.useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [secondary, primaryMain, successDark],
      chart: {
        events: {
          dataPointSelection: function (
            event: any,
            chartContext: any,
            config: any,
          ) {
            console.log(event)
            router.push(
              `/region/${slugify(
                chartContext.data.twoDSeriesX[config.selectedDataPoints[0]],
              )}`,
            )
          },
        },
      },
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
              primary,
              primary,
            ],
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value: any) => {
            return data.type === 'percentage'
              ? getPercentage(value)
              : `${thousands(value)}`
          },
          style: {
            colors: [primary],
          },
        },
      },
      grid: {
        borderColor: navType === 'dark' ? darkLight + 20 : grey200,
      },
      tooltip: {
        theme: navType === 'dark' ? 'dark' : 'light',
      },
      legend: {
        labels: {
          colors: 'grey.500',
        },
      },
    }))
  }, [
    navType,
    primary,
    darkLight,
    grey200,
    secondary,
    primaryMain,
    successDark,
  ])

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  )
}

export default ApexColumnChart
