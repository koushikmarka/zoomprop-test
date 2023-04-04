import { breakpoints } from '@/utils'
import styled from 'styled-components'

export const PagePresenceContainer = styled.div`
  padding: 10px;
  border-radius: 20px;
  right: 20px;
  margin-top: 20px;
  display: flex;
  width: auto;
  justify-content: end;
  margin-right: 20px;
  margin-bottom: 20px;
  @media (max-width: ${breakpoints.sm}px) {
    margin-right: 10px;
  }
`
