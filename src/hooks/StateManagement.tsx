import GlobalContext from '../context/GlobalContext'
import { isObjEmpty } from '@/utils'
import { useEffect, useState, useContext } from 'react'

export default function StateManagement(
  type: any,
  stateType: any,
  params?: any,
  paramCheck?: any,
) {
  const gContext = useContext<any>(GlobalContext)
  const [stateData, setStateData] = useState<any>()
  useEffect(() => {
    const runStateManagement = () => {
      gContext.user?.authToken &&
        type(gContext.user.authToken, params).then((res: any) => {
          if (res) {
            const getData = res.totalCount
              ? {
                  ...res,
                  data: res.data,
                  count: res.totalCount,
                  regionListings: res?.regionListings || undefined,
                  nonRegionListings: res?.nonRegionListings || undefined,
                  name: res.name ? res.name : null,
                }
              : res.data

            Object.keys(getData).forEach((key) =>
              getData[key] === undefined || getData[key] === null
                ? delete getData[key]
                : {},
            )

            gContext.handleGlobalState(
              res[stateType] ? res[stateType] : getData,
              stateType,
            )
            setStateData(res[stateType] ? res[stateType] : getData)
          }
        })
    }

    if (paramCheck != undefined && !isObjEmpty(params)) {
      let checkAllParams = paramCheck.every((i: any) =>
        params.hasOwnProperty(i),
      )
      if (checkAllParams) {
        runStateManagement()
      }
    } else {
      runStateManagement()
    }
  }, [params])
  return stateData
}

export const StateManagementFn = (
  user: any,
  type: any,
  stateType: any,
  params?: any,
) => {
  return (
    user?.authToken &&
    type(user.authToken, params).then((res: any) => {
      if (res) {
        const getData = res.totalCount
          ? {
              ...res,
              data: res.data,
              count: res.totalCount,
              regionListings: res?.regionListings || undefined,
              nonRegionListings: res?.nonRegionListings || undefined,
              name: res.name ? res.name : null,
            }
          : res.data

        Object.keys(getData).forEach((key) =>
          getData[key] === undefined || getData[key] === null
            ? delete getData[key]
            : {},
        )

        return res[stateType] ? res[stateType] : getData
      }
    })
  )
}
