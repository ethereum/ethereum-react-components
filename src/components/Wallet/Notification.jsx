import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

export default class Notification extends Component {
  static displayName = 'Notification'

  static propTypes = {
    /** Text displayed within the notification */
    message: PropTypes.string.isRequired,
    /** Callback function for clearing notification data (e.g. from a Redux store) */
    dismiss: PropTypes.func,
    /** Number of milliseconds to display notification */
    delayMs: PropTypes.number
  }

  static defaultProps = {
    delayMs: 8000
  }

  componentDidMount() {
    const { dismiss, delayMs } = this.props

    if (dismiss) {
      setTimeout(dismiss, delayMs)
    }
  }

  render() {
    const { message } = this.props

    return <StyledWrapper {...this.props}>{message}</StyledWrapper>
  }
}

const slideBy = keyframes`
  0% {
    opacity: 0;
    transform: translateX(400px);
  }
  10% {
    opacity: 1;
    transform: 0px;
    transform: translateX(0px);
  }
  80% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(400px);
  }
`

const StyledWrapper = styled.div`
  opacity: 0;
  max-width: 300px;
  color: rgb(17, 17, 17);
  display: inline-block;
  margin: 0 12px 12px;
  padding: 12px 18px;
  background-color: rgb(254, 204, 9);
  animation: ${slideBy} ${props => props.delayMs}ms;
`
