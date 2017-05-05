import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  align-items: stretch;
`

export default Flex
