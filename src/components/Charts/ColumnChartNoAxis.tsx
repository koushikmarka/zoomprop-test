// material-ui
// project import
import useConfig from '@/hooks/useConfig'
import { useTheme } from '@mui/material/styles'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

// third-party

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export type ColumnChartProps = {
  data?: any
  chartOptions?: any
  counts?: any
  columnWidth?: any
}
// chart options

// ==============================|| COLUMN CHART ||============================== //

const ApexColumnChart = ({ data, columnWidth }: ColumnChartProps) => {
  const theme = useTheme()
  const { navType } = useConfig()

  const { primary } = theme.palette.text
  const darkLight = theme.palette.dark.light
  const grey200 = theme.palette.grey[200]

  const secondary = theme.palette.secondary.main
  const primaryMain = theme.palette.primary.main
  const successDark = theme.palette.success.dark

  const [graphData] = useState<any>({
    options: {
      chart: {
        height: 350,
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false,
            selection: true,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: false,

            customIcons: [],
          },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: columnWidth ? columnWidth : '70%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        colors: ['transparent'],
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },

      yaxis: {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: true,
          style: {
            colors: [primary],
          },
          formatter: (value: any) => {
            return `${(value * 100).toFixed(2)}%`
          },
        },
        show: true,

        crosshairs: {
          show: true,
        },
        tooltip: {
          enabled: true,
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: navType === 'dark' ? 'dark' : 'light',
        x: {
          formatter(val: number) {
            return `${Math.floor(val)}% APPR`
          },
        },
        y: {
          formatter(val: number) {
            return `${(val * 100).toFixed(2)}% properties sold in last 10 years`
          },
          title: {
            formatter() {
              return ``
            },
          },
        },
      },

      colors: [secondary, primaryMain, successDark],

      grid: {
        borderColor: navType === 'dark' ? darkLight + 20 : grey200,
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
    },
    series: [
      {
        name: data.tooltip,
        data: data.data || data,
      },
    ],
  })

  return (
    <div id="chart">
      <ReactApexChart
        options={graphData.options}
        series={graphData.series}
        type="bar"
        height={350}
      />
    </div>
  )
}

export default ApexColumnChart
