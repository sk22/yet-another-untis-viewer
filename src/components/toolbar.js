import styled from 'styled-components'
import container from '../mixins/container'

const Toolbar = styled.nav`
  ${container}
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eee;
`

export default Toolbar
