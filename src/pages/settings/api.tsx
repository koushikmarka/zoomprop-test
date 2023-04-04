// @ts-nocheck
import { ApiKeyContainer, TitleContainer } from '@/components/Settings/styles'
import GlobalContext from '@/context/GlobalContext'
import { api, resetApi } from '@/services'
import React, { useContext, useState, useEffect } from 'react'

const ApiAccess = ({ setMessage, setShow }: any) => {
  const gContext = useContext<any>(GlobalContext)
  const token = gContext.authToken
  const [apiData, setApiData] = useState<any>({})

  useEffect(() => {
    api(token).then((res) => {
      setApiData(res)
    })
  }, [])

  const regenerateKey = () => {
    resetApi(token).then((res) => {
      setApiData({
        ...apiData,
        apiKey: res.apiKey,
      })
      setMessage(res.message)
      setShow(true)
    })
  }

  return (
    <div className="col-xl-12 col-lg-12 col-sm-12">
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-sm-12">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <h4 className="card-title">Developer Plan</h4>
              <div className="progress mb-2">
                <div
                  className="progress-bar progress-animated bg-success"
                  style={{ width: `${apiData?.usage}%` }}
                ></div>
              </div>
              <small className="text-light mt-4">
                {apiData?.usage}% of your quota has been reached
              </small>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-3 col-sm-12">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <button className="btn btn-primary btn-lg btn-block rounded">
                Documentation
              </button>
              <button className="btn btn-dark btn-lg btn-block rounded">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-sm-12">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <TitleContainer className="mb-4">
                <h4 className="card-title">Access Token</h4>
                <button
                  className="btn btn-dark btn-lg btn-block rounded"
                  onClick={regenerateKey}
                >
                  Regenerate Token
                </button>
              </TitleContainer>

              <ApiKeyContainer className="card-bodyp-4 p-3">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.56666 39.6667H2.91667C2.21667 39.6667 1.75 39.2 1.75 38.5V31.85C1.75 31.5 1.86667 31.2667 2.1 31.0333L16.1 17.0333C15.6333 15.2833 15.6333 13.4167 15.9833 11.55C17.0333 6.76667 21 3.15001 25.7833 2.56667C29.6333 2.10001 33.4833 3.50001 36.05 6.30001C38.2667 8.75001 39.3167 11.9 38.9667 15.2833C38.5 20.65 34.1833 25.0833 28.7 25.6667C27.1833 25.7833 25.6667 25.7833 24.2667 25.3167C23.45 25.0833 22.75 25.7833 22.75 26.6C22.75 27.3 22.2833 27.7667 21.5833 27.7667H18.7833V30.5667C18.7833 31.2667 18.3167 31.7333 17.6167 31.7333H14.8167V34.5333C14.8167 35.2333 14.35 35.7 13.65 35.7H10.7333V38.5C10.7333 39.2 10.2667 39.6667 9.56666 39.6667ZM4.08333 37.3333H8.4V34.5333C8.4 33.8333 8.86666 33.3667 9.56666 33.3667H12.3667V30.5667C12.3667 29.8667 12.8333 29.4 13.5333 29.4H16.3333V26.6C16.3333 25.9 16.8 25.4333 17.5 25.4333H20.5333C21 24.0333 22.4 22.9833 23.9167 22.9833C24.2667 22.9833 24.5 22.9833 24.85 23.1C26.0167 23.45 27.1833 23.5667 28.4667 23.3333C32.7833 22.8667 36.2833 19.3667 36.6333 15.05C36.8667 12.3667 36.05 9.80001 34.3 7.81668C32.2 5.60001 29.1667 4.43334 26.1333 4.78334C22.2833 5.25001 19.1333 8.28334 18.3167 12.0167C17.9667 13.65 18.0833 15.4 18.55 16.9167C18.6667 17.3833 18.55 17.85 18.3167 18.0833L4.08333 32.3167V37.3333Z"
                    fill="#6A6A6A"
                  />
                  <path
                    d="M27.4163 19.8333C24.1497 19.8333 21.583 17.2667 21.583 14C21.583 10.7333 24.1497 8.16666 27.4163 8.16666C30.683 8.16666 33.2497 10.7333 33.2497 14C33.2497 17.2667 30.683 19.8333 27.4163 19.8333ZM27.4163 10.5C25.433 10.5 23.9163 12.0167 23.9163 14C23.9163 15.9833 25.433 17.5 27.4163 17.5C29.3997 17.5 30.9163 15.9833 30.9163 14C30.9163 12.0167 29.3997 10.5 27.4163 10.5Z"
                    fill="#6A6A6A"
                  />
                </svg>
                <h2 className="m-0">{apiData?.apiKey}</h2>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.9595 1.25122C9.61836 1.25122 8.44531 2.0342 7.87231 3.16284C7.51352 3.76776 7.72446 4.54864 8.33862 4.89136C8.94031 5.22701 9.70037 5.01351 10.0378 4.41284C10.1539 4.01489 10.5095 3.74756 10.9595 3.74756H25.2893C25.8426 3.74756 26.2488 4.15373 26.2488 4.70703V19.0417C26.2488 19.4752 25.999 19.8155 25.625 19.9439C25.0243 20.2813 24.8108 21.0426 25.1465 21.6443C25.4892 22.2585 26.2701 22.4694 26.875 22.1106C27.9843 21.532 28.75 20.3676 28.75 19.0417V4.70703C28.75 2.81197 27.1844 1.25122 25.2893 1.25122H10.9595ZM4.71069 7.50366C2.81564 7.50366 1.25 9.06319 1.25 10.9583V25.293C1.25 27.188 2.81564 28.7488 4.71069 28.7488H19.0405C20.9356 28.7488 22.5012 27.188 22.5012 25.293V10.9583C22.5012 9.06319 20.9356 7.50366 19.0405 7.50366H4.71069ZM4.71069 9.99878H19.0405C19.5938 9.99878 20 10.405 20 10.9583V25.293C20 25.8463 19.5938 26.2537 19.0405 26.2537H4.71069C4.15739 26.2537 3.75122 25.8463 3.75122 25.293V10.9583C3.75122 10.405 4.15739 9.99878 4.71069 9.99878V9.99878Z"
                    fill="#E7E7E7"
                  />
                </svg>
              </ApiKeyContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ApiAccess
