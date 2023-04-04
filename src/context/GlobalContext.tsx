import React, { useState, createContext } from 'react'

const GlobalContext = createContext<any>({})

const GlobalProvider = ({ children }: any) => {
  const [user, setUser] = useState(null)
  const [globalState, setGlobalState] = useState<any>({})
  const [currentPage, setCurrentPage] = useState(null)
  const [investmentType, setInvestmentType] = useState('yoy')
  const [selectedLocation, setSelectedLocation] = useState(null)

  const handleGlobalState = (data: any, type: any) => {
    globalState[type] = data
    setGlobalState(globalState)
  }

  return (
    <GlobalContext.Provider
      value={{
        setUser,
        user,
        globalState,
        setGlobalState,
        handleGlobalState,
        currentPage,
        setCurrentPage,
        investmentType,
        setInvestmentType,
        selectedLocation,
        setSelectedLocation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
export { GlobalProvider }
