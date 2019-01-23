import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TxParty from './TxParty'

export default class TxParties extends Component {
  static displayName = 'TxParties'

  static propTypes = {
    from: PropTypes.string,
    isNewContract: PropTypes.bool,
    isTokenTransfer: PropTypes.bool,
    params: PropTypes.array,
    to: PropTypes.string,
    toIsContract: PropTypes.bool
  }

  static defaultProps = {
    isNewContract: false,
    isTokenTransfer: false,
    toIsContract: false
  }

  parseDestination = () => {
    const {
      isNewContract,
      isTokenTransfer,
      params,
      to,
      toIsContract
    } = this.props

    if (isNewContract) return null

    // If sending tokens, the 'To' address is the token recipient
    let destinationAddress = to
    if (isTokenTransfer) {
      if (params[0] && params[0].value) {
        destinationAddress = params[0].value
      }
    }

    return (
      <TxParty
        address={destinationAddress}
        addressType={toIsContract ? 'contract' : 'user'}
      />
    )
  }

  render() {
    const { from, isTokenTransfer, toIsContract } = this.props

    return (
      <StyledDiv className="tx-parties">
        <TxParty address={from} isContract={toIsContract && !isTokenTransfer} />
        {this.parseDestination()}
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`
