import styled from 'styled-components'
import Select from './select'
import { margin } from './margin'

const Favorites = styled(Select)`
  ${margin({ left: true })}
  width: 3.5rem;
`

export default Favorites
