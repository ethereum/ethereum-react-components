import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class Notification extends Component {
  static displayName = 'Notification'

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <StyledWrapper>notification</StyledWrapper>
  }
}

const StyledWrapper = styled.div`
  padding: 12px 18px;
  background-color: yellow;
`
