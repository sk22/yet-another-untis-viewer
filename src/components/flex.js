import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')}
`

export default Flex
