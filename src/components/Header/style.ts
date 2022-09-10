import { Offcanvas } from 'react-bootstrap'
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: #2e677f;
  padding-top: 18px;
  padding-bottom: 18px;
`

export const MenuStyle = styled.div`
  color: #fff;
  font-size: 24px;
`
export const CanvasContainer = styled(Offcanvas)`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);

  li {
    margin-bottom: 16px;
    padding-bottom: 16px;
    font-size: 20px;
    border-bottom: 1px solid #333;
  }
`
