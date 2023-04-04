import { ConfigContext } from '@/context/ConfigContext'
import { useContext } from 'react'

// ==============================|| CONFIG - HOOKS  ||============================== //

const useConfig = () => useContext(ConfigContext)

export default useConfig
