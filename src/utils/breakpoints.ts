export const breakpoints = {
  sm: 576, //Small screen start
  md: 768, //Medium screen start
  lg: 992, //Large screen start
  xl: 1200, //Extra Large screen start
  xxl: 1400, //Extra Extra Large screen start
  xxxl: 1600, //Extra Extra Extra Large screen start
}

export const device = {
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  xxl: `(min-width: ${breakpoints.xxl}px)`,
  xxxl: `(min-width: ${breakpoints.xxxl}px)`,
  ipad: `(min-device-width: ${breakpoints.sm}) and (max-device-width: ${breakpoints.xl})`,
}
