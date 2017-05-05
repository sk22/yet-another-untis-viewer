import styled, { css } from 'styled-components'

export const margin = ({ left, right }) => css`
  ${!left && !right && 'margin: .25rem;'}
  ${left && 'margin-left: .25rem;'}
  ${right && 'margin-right: .25rem;'}
`


const Margin = styled.div`
  ${props => margin(props)}
`

export default Margin
