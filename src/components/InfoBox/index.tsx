import TotalOrderLineChartCard from '../Cards/TotalOrderLineChartCard'
import { thousands, getPercentage, isNegative } from '@/utils'
import InfoIcon from '@mui/icons-material/Info'
import {
  Box,
  CircularProgress,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/system'

type InfoBoxProps = {
  data?: any
  simple?: boolean
  boxTitle?: string
  tooltip?: string
  fullWidth?: boolean
}

const InfoBox = ({
  data,
  simple,
  boxTitle,
  tooltip,
  fullWidth,
}: InfoBoxProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        background: theme.palette.dark.dark,
        display: 'inline-block',
        borderRadius: 2,
        p: 2,
        pb: 0,
        width: fullWidth ? '100%' : 'auto',
      }}
    >
      {boxTitle && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h4">{boxTitle}</Typography>
          </Box>
          <Box>
            {tooltip && (
              <Tooltip
                arrow
                placement="right"
                title={tooltip}
                componentsProps={{
                  tooltip: {
                    sx: {
                      p: 2,
                      '& .MuiTooltip-arrow': {
                        color: 'common.white',
                      },
                    },
                  },
                }}
              >
                <InfoIcon />
              </Tooltip>
            )}
          </Box>
        </Box>
      )}
      <Box sx={{ display: 'inline-flex' }}>
        {!data.length ? (
          <Skeleton
            variant="rectangular"
            sx={{ my: 3 }}
            width={600}
            height={50}
          />
        ) : (
          data.map((item: any, index: number) => (
            <Box sx={{ width: 'auto' }} key={`item-${index}`}>
              {simple ? (
                <Box
                  sx={{
                    py: 3,
                    pr: 8,
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {item.type === 'percentage'
                      ? getPercentage(item.value)
                      : thousands(item.value)}
                  </Typography>
                  <Typography sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                      }}
                    >
                      {item.icon && <Box sx={{ mr: 1 }}>{item.icon}</Box>}
                      <Box sx={{ pt: '3px' }}>{item.name}</Box>
                    </Box>
                  </Typography>
                </Box>
              ) : (
                <TotalOrderLineChartCard
                  title={item.name}
                  value={
                    item.value === undefined ? (
                      <CircularProgress size={20} />
                    ) : item.type === 'percentage' ? (
                      getPercentage(item.value)
                    ) : (
                      thousands(item.value)
                    )
                  }
                  isLoading={false}
                  percentage={
                    item?.data?.percent && (
                      <>{getPercentage(item?.data?.percent)}</>
                    )
                  }
                  count={item.count}
                  graph={item?.data?.countHistory}
                  trajectory={
                    item?.data?.percent && !isNegative(item?.data?.percent)
                  }
                  url={item.link}
                />
              )}
            </Box>
          ))
        )}
      </Box>
    </Box>
  )
}

export default InfoBox
