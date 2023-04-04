// @ts-nocheck
import InvestmentTypes from '../Tabs/InvestmentTypes'
import GlobalContext from '@/context/GlobalContext'
import { StateManagement, StateManagementFn } from '@/hooks'
import value from '@/scss/_themes-vars.module.scss'
import { createCollection } from '@/services'
import {
  trendingTypes,
  dataView,
  getGraphData,
  slugify,
  getPercentage,
  thousands,
} from '@/utils'
import { CompareSharp } from '@mui/icons-material'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import {
  Button,
  Skeleton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  CircularProgress,
  TablePagination,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Box,
  alpha,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { useState, useContext, useEffect } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'

export type TableComponentProps = {
  limit?: number
  noPagination?: boolean
  noFilter?: boolean
  basic?: boolean
  viewMore?: boolean
  type?: any
  isComponent?: boolean
  filter?: string
  filterKey?: string
  typeFn?: any
  passedParams?: any
  url?: any
  listingsData?: any
  callBack?: any
  paramCheck?: any
  runFN?: boolean
  dealCheck?: boolean
}

const TableComponent = ({
  limit,
  noFilter,
  viewMore,
  type,
  basic,
  noPagination,
  isComponent,
  filterKey,
  filter,
  typeFn,
  passedParams,
  listingsData,
  url,
  callBack,
  paramCheck,
  runFN,
  dealCheck,
}: TableComponentProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const gContext = useContext<any>(GlobalContext)
  const globalState = gContext.globalState
  const user = gContext.user
  const token = user.authToken
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState(gContext.investmentType)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [sortOrder, setSortOrder] = useState('desc')
  const [params, setParams] = useState<any>({
    ...passedParams,
    page,
    filter: filter ? filter : currentTab,
    sortOrder: sortOrder,
    filterKey: filterKey,
  })

  const [locations, setLocations] = useState<any>(
    listingsData ? listingsData : StateManagement(typeFn, type, params),
  )

  const getFilter = (tab) => {
    const expr = tab
    let filter
    switch (expr) {
      case 'yoy':
        filter = 'yoy1year'
        break
      case 'apr':
        filter = 'aprNextMonth'
        break
      case 'str':
        filter = 'strOccupancyRate'
        break
      case 'ltr':
        filter = 'monthlyProfit'
        break
      default:
        filter = 'yoy1year'
    }
    return filter
  }

  useEffect(() => {
    const data = {
      ...params,
      ...passedParams,
    }
    setParams(data)
  }, [passedParams])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [locations?.data])

  useEffect(() => {
    if (runFN) {
      StateManagementFn(user, typeFn, type, passedParams).then((res) => {
        if (res.message === 'success') {
          setLocations(res)
        }
      })
    }
  }, [passedParams])

  useEffect(() => {
    setLoading(true)

    setParams({
      ...params,
      page,
    })
  }, [page])

  useEffect(() => {
    setLoading(true)

    setParams({
      ...params,
      page,
      filter: filter,
      sortOrder: sortOrder,
      filterKey: filterKey,
    })
  }, [page, filter, sortOrder])

  useEffect(() => {
    setLocations(globalState[type ? type : ''])
  }, [globalState[type ? type : '']])

  useEffect(() => {
    setLoading(true)
    gContext.setInvestmentType(currentTab)

    if (page !== 1) {
      setPage(1)
    } else {
      setParams({
        ...params,
        sortOrder,
        page,
        filterKey: getFilter(currentTab),
      })
    }
  }, [currentTab])

  useEffect(() => {
    setCurrentTab(gContext.investmentType)
  }, [gContext.investmentType])

  useEffect(() => {
    if (callBack) {
      callBack(locations)
    }
  }, [locations])

  // useEffect(() => {
  //   console.log('params', {
  //     ...params,
  //     sortOrder,
  //     page,
  //   })
  // }, [params])

  const runFilter = (type: any, order: any) => {
    if (type === filter) {
      if (order === 'asc') {
        setSortOrder('desc')
      } else {
        setSortOrder('asc')
      }
    }
  }

  const runUrl = (data: string) => {
    let _url: any
    if (url) {
      _url = `${url}${data.propertyid}`
    } else {
      _url = `/${
        type === 'trending'
          ? 'region'
          : `/property/${slugify(data.streetAddress)}/${slugify(
              data.city,
            )}/${slugify(data.state)}`
      }`
    }

    router.push(_url)
  }

  const getRank = (listing: any) => {
    return listing.previousRank - listing.currentRank
  }

  const getLocationsData = (data: any) => {
    if (data?.regionListings || data?.nonRegionListings) {
      return data.regionListings.length > 0
        ? data.regionListings
        : data.nonRegionListings
    } else {
      return data
    }
  }

  const createNewCollection = (location: any, index: any) => {
    let l = locations
    l.data[index].isCollection = true
    setLocations(l)
    const collection = {
      name: location?.city,
      coords: JSON.parse(location?.coords),
      location: location?.city,
      collectionType: 'location',
    }

    createCollection(token, collection).then((response: any) => {
      if (response) {
        enqueueSnackbar(`Collection has successfully been updated!`, {
          variant: 'success',
          autoHideDuration: 3000,
        })
      }
    })
  }

  const checkDeal = (listing: any) => {
    const opacity = (num: number) => {
      let o
      if (num >= 500 && num <= 1000) {
        o = 0.2
      }

      if (num >= 1001 && num <= 2000) {
        o = 0.4
      }

      if (num >= 2001 && num <= 5000) {
        o = 0.6
      }

      if (num >= 5001 && num <= 10000) {
        o = 0.8
      }

      return o
    }
    if (listing.monthlyProfit >= 500) {
      return alpha(theme.palette.secondary.main, opacity(listing.monthlyProfit))
    } else {
      return ''
    }
  }

  return (
    <Grid container spacing={0}>
      <Grid item sm={12}>
        {!basic && (
          <Box sx={{ my: 3 }}>
            <InvestmentTypes
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </Box>
        )}

        <TableContainer
          component={Paper}
          className={`${isComponent && 'component'}`}
          sx={{
            maxHeight: { xs: '80vh', sm: '100%' },
            mb: 15,
            background: 'none',
          }}
        >
          <div className="row">
            <div className="col-xl-12 px-0">
              <div className="table-responsive table-hover fs-14 ">
                <div id="data-table" className="dataTables_wrapper no-footer">
                  <Table
                    sx={{
                      minWidth: 650,
                      '& .MuiTableRow-root:hover': {
                        backgroundColor: theme.palette.dark.dark,
                      },
                    }}
                    stickyHeader
                    aria-label="sticky table"
                    className=""
                    id="marketCapital"
                    role="grid"
                    aria-describedby="data-table"
                  >
                    <TableHead>
                      {!loading &&
                        dataView[type][
                          filter ? filter : gContext.investmentType
                        ] &&
                        dataView[type][
                          filter ? filter : gContext.investmentType
                        ].data.map((item: any, index: number) => (
                          <TableCell
                            key={`tc-${index}`}
                            className={`${
                              params.filterKey === item.key ? 'active' : ''
                            } ${
                              params.filterKey === item.key
                                ? params.sortOrder
                                : ''
                            } ${
                              item.filter && !noFilter
                                ? 'table-head-filter'
                                : ''
                            }`}
                            tabIndex={0}
                            onClick={() =>
                              runFilter(item.key, params.sortOrder)
                            }
                            rowSpan={1}
                            colSpan={1}
                            aria-sort="ascending"
                            aria-label="Rank: activate to sort column descending"
                            sx={{
                              backgroundColor: theme.palette.primary[800],
                              zIndex: 0,
                            }}
                          >
                            {item.label}
                            {!noFilter && (
                              <>
                                <span className="up"></span>
                                <span className="down"></span>
                              </>
                            )}
                          </TableCell>
                        ))}
                    </TableHead>
                    <TableBody sx={{ background: 'none' }}>
                      {getLocationsData(locations?.data)?.length > 0 &&
                      locations !== undefined ? (
                        getLocationsData(locations?.data)
                          .slice(0, limit)
                          .map((listing: any, index: number) => (
                            <TableRow
                              key={`key-${index}`}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                                background: dealCheck
                                  ? checkDeal(listing)
                                  : 'none',
                              }}
                              role="row"
                              className={`${loading && 'loading-tr'}`}
                            >
                              {loading ? (
                                <Skeleton
                                  width="95vw"
                                  height={80}
                                  animation="wave"
                                />
                              ) : (
                                <>
                                  {dataView[type][
                                    filter ? filter : gContext.investmentType
                                  ] &&
                                    dataView[type][
                                      filter ? filter : gContext.investmentType
                                    ].data.map((item: any) => {
                                      let l: any = []
                                      if (item.type === 'array') {
                                        let _l: any = []
                                        item.key.map((k: any) => {
                                          if (!_l.length) {
                                            _l = listing[k]
                                          } else {
                                            _l = _l[k]
                                          }
                                        })
                                        l = _l
                                      } else {
                                        l = listing[item.key]
                                      }
                                      if (
                                        item.key === 'primaryImageUrl' ||
                                        item.key === 'imageUrl'
                                      ) {
                                        if (
                                          listing[item.key] &&
                                          listing[item.key][item.index]
                                        ) {
                                          l = (
                                            <img
                                              width="100px"
                                              style={{ borderRadius: '8px' }}
                                              src={listing[item.key]}
                                              onError={({ currentTarget }) => {
                                                currentTarget.onerror = null // prevents looping
                                                currentTarget.src =
                                                  '/assets/images/no-house.png'
                                              }}
                                            />
                                          )
                                        } else {
                                          l = (
                                            <img
                                              width="100px"
                                              style={{ borderRadius: '8px' }}
                                              src="/assets/images/no-house.png"
                                            />
                                          )
                                        }
                                      }
                                      if (item.dynamic) {
                                        l = `${getPercentage(
                                          listing[
                                            `${gContext.investmentType}${item.key}`
                                          ],
                                        )}
                                `
                                      }
                                      if (item.key === 'rank') {
                                        const r = getRank(listing)
                                        return (
                                          <>
                                            <TableCell>
                                              <Tooltip
                                                title={
                                                  <>
                                                    {r > 0
                                                      ? `up `
                                                      : r === 0
                                                      ? `No change`
                                                      : `down `}
                                                    {thousands(r)}
                                                  </>
                                                }
                                              >
                                                {index === 0 ? (
                                                  <svg
                                                    width="18"
                                                    height="11"
                                                    viewBox="0 0 18 11"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M0.221248 1.1249C0.361637 1.05567 0.523455 1.0687 0.651601 1.15909L5.15738 4.36739L8.30826 0.165605C8.38698 0.0611092 8.51054 0 8.64349 0C8.77557 0 8.9 0.0613281 8.9785 0.165605L12.1313 4.36739L16.6391 1.15909C16.7633 1.0687 16.9238 1.05567 17.0646 1.1249C17.2055 1.19477 17.2857 1.33474 17.2857 1.48646V7.97494C17.2857 8.1991 17.1119 8.38095 16.8844 8.38095H0.402571C0.173839 8.38095 0.000208866 8.1991 0.000208866 7.97494L-9.8093e-06 1.48646C-9.8093e-06 1.33475 0.080027 1.19499 0.221071 1.1249H0.221248Z"
                                                      fill="#C2980E"
                                                    />
                                                    <path
                                                      d="M0.402358 9.95239H16.8844C17.1119 9.95239 17.2857 10.0973 17.2857 10.2823V10.6752C17.2857 10.8602 17.1119 11 16.8844 11H0.402358C0.173623 11 -9.09506e-06 10.8602 -9.09506e-06 10.6752V10.2823C-0.000227759 10.0972 0.173404 9.95239 0.402139 9.95239H0.402358Z"
                                                      fill="#C2980E"
                                                    />
                                                  </svg>
                                                ) : r > 0 ? (
                                                  <svg
                                                    width="14"
                                                    height="10"
                                                    viewBox="0 0 14 10"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M7 0.6875L13.0622 9.30067H0.937822L7 0.6875Z"
                                                      fill="#2BC155"
                                                    />
                                                  </svg>
                                                ) : r === 0 ? (
                                                  <HorizontalRuleIcon />
                                                ) : (
                                                  <svg
                                                    width="14"
                                                    height="7"
                                                    viewBox="0 0 14 7"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M7 7L0.937823 0.249999L13.0622 0.25L7 7Z"
                                                      fill="#FF2D2E"
                                                    />
                                                  </svg>
                                                )}
                                              </Tooltip>
                                            </TableCell>
                                          </>
                                        )
                                      }
                                      if (item.type === 'percentage') {
                                        listing[item.key] === -9999
                                          ? (l = '----')
                                          : (l = `${getPercentage(
                                              listing[item.key],
                                            )}`)
                                      }
                                      if (item.key === 'rank') {
                                        return <>dlkfsdfl</>
                                      }
                                      if (item.type === 'graph') {
                                        return (
                                          <TableCell>
                                            <svg
                                              className="peity-line"
                                              width="280"
                                              height="50"
                                            >
                                              <Sparklines
                                                data={getGraphData(
                                                  listing[item.key],
                                                )}
                                              >
                                                <SparklinesLine
                                                  style={{
                                                    strokeWidth: 4,
                                                    stroke:
                                                      theme.palette.secondary
                                                        .dark,
                                                    fill: 'none',
                                                  }}
                                                />
                                              </Sparklines>
                                            </svg>
                                          </TableCell>
                                        )
                                      }
                                      if (item.type === 'date') {
                                        return (
                                          <TableCell>
                                            {moment(listing[item.key]).format(
                                              'MM-DD-YYYY',
                                            )}
                                          </TableCell>
                                        )
                                      }
                                      if (item.type === 'button') {
                                        if (item.key === 'viewRegion') {
                                          return (
                                            <>
                                              <TableCell>
                                                {listing.isCollection ? (
                                                  <Button
                                                    variant="contained"
                                                    color="success"
                                                    sx={{ mr: 1 }}
                                                  >
                                                    <i
                                                      className="fa fa-check-circle"
                                                      style={{
                                                        marginRight: '5px',
                                                      }}
                                                    />
                                                    <CheckCircleTwoToneIcon
                                                      sx={{ mr: 1 }}
                                                    />
                                                    Is collection
                                                  </Button>
                                                ) : (
                                                  <Button
                                                    variant="contained"
                                                    sx={{ mr: 1 }}
                                                    className="btn-dark btn-sm mr-2"
                                                    onClick={() =>
                                                      createNewCollection(
                                                        listing,
                                                        index,
                                                      )
                                                    }
                                                  >
                                                    <AddCircleTwoToneIcon
                                                      sx={{ mr: 1 }}
                                                    />
                                                    Add to collections
                                                  </Button>
                                                )}

                                                <Button
                                                  variant="contained"
                                                  className="btn-dark btn-sm"
                                                  href={`/region/${slugify(
                                                    listing.city,
                                                  )}`}
                                                >
                                                  View
                                                </Button>
                                              </TableCell>
                                            </>
                                          )
                                        } else {
                                          return (
                                            <TableCell className="sorting_1">
                                              <Button
                                                variant="contained"
                                                className="btn-dark btn-sm"
                                                onClick={() => runUrl(listing)}
                                              >
                                                {item.text
                                                  ? item.text
                                                  : 'View Property'}
                                              </Button>
                                            </TableCell>
                                          )
                                        }
                                      } else {
                                        return (
                                          <TableCell className="sorting_1">
                                            {item.prefix}
                                            {item.type === 'num'
                                              ? thousands(Number(parseInt(l)))
                                              : l}
                                          </TableCell>
                                        )
                                      }
                                    })}
                                </>
                              )}
                            </TableRow>
                          ))
                      ) : (
                        <CircularProgress
                          sx={{
                            mt: 2,

                            color: theme.palette.common.white,
                          }}
                          size={20}
                        />
                      )}
                    </TableBody>
                  </Table>
                  <div className="d-sm-flex text-center justify-content-between align-items-center mt-3"></div>
                </div>
              </div>
              {viewMore && (
                <Button onClick={() => router.push(`/${type}`)}>
                  View all
                </Button>
              )}
            </div>
          </div>
        </TableContainer>

        {!noPagination && locations?.totalCount > 0 && (
          <Pagination
            page={page}
            onChange={(e, page) => setPage(page)}
            count={Math.floor(locations?.totalCount / 50) + 1}
            color="primary"
          />
          // <TablePagination
          //   component="div"
          //   rowsPerPageOptions={[]}
          //   count={locations?.totalCount}
          //   page={page - 1}
          //   rowsPerPage={25}
          //   showFirstButton
          //   showLastButton={true}
          //   onPageChange={(e, page) => setPage(page + 1)}
          // />
        )}
      </Grid>
    </Grid>
  )
}

export default TableComponent
