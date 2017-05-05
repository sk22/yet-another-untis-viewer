import styled from 'styled-components'
import PropTypes from 'prop-types'
import container from '../mixins/container'

const Settings = styled.div`
  ${container}
  display: ${({ active }) => (active ? 'flex' : 'none')};
  flex-direction: column;
  background: #eee;
  padding: 1rem;

  & > * {
    margin-bottom: .3rem;
  }
`

Settings.propTypes = {
  active: PropTypes.bool.isRequired
}

export default Settings
