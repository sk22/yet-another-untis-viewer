import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { margin } from './margin'

const Button = styled.button`
  ${margin({ left: true })}
  display: flex;
  box-sizing: content-box;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  transition: background-color 0.3s cubic-bezier(.25,.8,.25,1);
  border: 0;
  padding: ${({ small }) => (small ? '.2rem' : '.4rem')};
  background: none;

  &:hover {
    background: #ccc;
  }

  &:active {
    background: #bbb;
  }
`

const Icon = ({ children, ...rest }) => (
  <Button {...rest}><i className="material-icons">{children}</i></Button>
)

Icon.propTypes = {
  children: PropTypes.node.isRequired
}

export default Icon
