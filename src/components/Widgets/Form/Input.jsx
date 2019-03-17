import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class Input extends Component {
  static displayName = 'Input'

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <StyledInput {...this.props} type="text" />
  }
}

const StyledInput = styled.input`
  display: inline-block;
  background-color: #f5f4f2;
  border: 0;
  border-bottom: solid 2px #dddcdb;
  box-sizing: border-box;
  color: #4a90e2;
  font-size: 1em;
  font-weight: 300;
  height: 36.8px;
  max-width: 100%;
  padding: 10px 16px 8px;
  transition-delay: 0s;
  transition: background-color ease-in-out 1s, color ease-in-out 1s;
  width: 440px;
  z-index: 1;

  :focus {
    border-color: #02a8f3;
  }

  ::placeholder {
    color: #ccc6c6;
  }
`
