import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Loading from '../components/loading'

const LimitWidth = styled.div`
  max-width: 100%;
  overflow-x: scroll;
`

const Timetable = ({ html: __html }) => (
  <LimitWidth>
    {__html
      ? <div dangerouslySetInnerHTML={({ __html })} />
      : <Loading />}
  </LimitWidth>
)

Timetable.propTypes = {
  html: PropTypes.string
}

Timetable.defaultProps = {
  html: null
}

export default Timetable
