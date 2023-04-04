export type FeatureGateProps = {
  access: any
  children: any
  permissions: any
}

const FeatureGate = ({ children, access, permissions }: FeatureGateProps) => {
  const allowed = access.some((r: any) => permissions.indexOf(r) >= 0)
  return allowed ? <>{children}</> : null
}

export default FeatureGate
