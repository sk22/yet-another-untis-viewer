import React from 'react'
import PropTypes from 'prop-types'
import Container from '../components/container'

const Timetable = ({ url }) => (
  <Container>
    {url || 'No URL given'}
  </Container>
)

Timetable.propTypes = {
  url: PropTypes.string
}

Timetable.defaultProps = {
  url: null
}

export default Timetable
