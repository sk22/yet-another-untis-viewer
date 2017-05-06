import styled from 'styled-components'
import { boxedInput } from './boxed-input'

const WeekNumber = styled.input`
  ${boxedInput}
  width: 1.5rem;
  font-size: 1.1rem;
  background: none;
  text-align: center;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export default WeekNumber
