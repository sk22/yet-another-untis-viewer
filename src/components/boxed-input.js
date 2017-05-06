import styled, { css } from 'styled-components'

export const boxedInput = css`
  border: none;
  min-height: 2rem;
`

const BoxedInput = styled.input`
  ${boxedInput}
`

export default BoxedInput
