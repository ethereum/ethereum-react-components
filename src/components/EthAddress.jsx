import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class EthAddress extends Component {
  static displayName = 'EthAddress'

  static propTypes = {
    /** Ethereum public address (42 chars)  */
    address: PropTypes.string.isRequired,
    /** Display abbreviated form with '...' (23 chars)  */
    short: PropTypes.bool,
    /** Callback to be executed onClick */
    onClick: PropTypes.func,
    classes: PropTypes.string
  }

  static defaultProps = {
    short: false
  }

  render() {
    const { address, classes, onClick, short } = this.props

    const content =
      address && short
        ? [
            ...address.split('').slice(0, 10),
            '...',
            ...address.split('').slice(42 - 10)
          ].join('')
        : address

    if (onClick) {
      return (
        <StyledButton className={`eth-address ${classes}`} onClick={onClick}>
          {content}
        </StyledButton>
      )
    }

    return <span className={`eth-address ${classes}`}>{content}</span>
  }
}

const StyledButton = styled.button`
  background: none;
  color: #00aafa;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
`
