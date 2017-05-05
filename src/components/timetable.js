import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Loading from '../components/loading'

const TimetableView = styled.div`
  overflow-x: scroll;
  padding: 1rem;
`

const Timetable = ({ html: __html }) => (
  <TimetableView>
    {__html
      ? <div dangerouslySetInnerHTML={({ __html })} />
      : <Loading />}
  </TimetableView>
)

Timetable.propTypes = {
  html: PropTypes.string
}

Timetable.defaultProps = {
  html: null
}

export default Timetable
