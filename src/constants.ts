import { ReactElement } from 'react'

// theme constant
export const gridSpacing = 3
export const drawerWidth = 260
export const appDrawerWidth = 320

export const LAYOUT: any = {
  main: 'main',
  noauth: 'noauth',
  minimal: 'minimal',
}
export interface Props {
  children: ReactElement
  variant?: 'main' | 'minimal' | 'noauth'
}
export default LAYOUT
