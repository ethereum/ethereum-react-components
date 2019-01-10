import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ethUtils from 'ethereumjs-util'
import i18n from '../../../i18n'
import Spinner from '../../Widgets/AnimatedIcons/Spinner'
import styled from 'styled-components'

const { BN } = ethUtils

export default class FeeSelector extends Component {
  static propTypes = {
    network: PropTypes.string,
    etherPriceUSD: PropTypes.string,
    gas: PropTypes.string,
    gasPrice: PropTypes.string,
    gasLoading: PropTypes.bool,
    updateGasPrice: PropTypes.func
  }

  state = {
    priority: false
  }

  parseFee = () => {
    const { gas, gasPrice, etherPriceUSD, network } = this.props
    const { priority } = this.state

    const bigGas = new BN(gas)
    const bigGasPrice = new BN(gasPrice)
    const gasEtherAmount = bigGas
      .mul(bigGasPrice)
      .div(new BN('1000000000000000000'))
    const gasEtherAmountPriority = gasEtherAmount.mul(new BN(2))

    let fee
    if (!priority) {
      if (network.toLowerCase() === 'main' && etherPriceUSD) {
        const standardFee = gasEtherAmount.mul(new BN(etherPriceUSD))
        fee = `$${standardFee} USD (${gasEtherAmount} ETH)`
      } else {
        fee = `${gasEtherAmount} ETH`
      }
    } else if (network.toLowerCase() === 'main' && etherPriceUSD) {
      const priorityFee = gasEtherAmountPriority.mul(new BN(etherPriceUSD))
      fee = `$${priorityFee} USD (${gasEtherAmountPriority} ETH)`
    } else {
      fee = `${gasEtherAmountPriority} ETH`
    }
    return fee
  }

  handleClick = () => {
    const { priority } = this.state
    this.setState({ priority: !priority })
  }

  renderStatus = () => {
    const { gas, gasLoading } = this.props

    let error
    if (!gas && gasLoading) {
      error = (
        <StyledWarning>{i18n.t('mist.sendTx.gasLoadingWarning')}</StyledWarning>
      )
    } else {
      error = <StyledError>{i18n.t('mist.sendTx.gasLoadingError')}</StyledError>
    }

    return (
      <div>
        {error}
        {gasLoading && <Spinner />}
      </div>
    )
  }

  render() {
    const { gas } = this.props
    const { priority } = this.state

    if (!gas) {
      return <div>{this.renderStatus()}</div>
    }

    return (
      <div>
        {priority ? (
          <StyledFeeSelector
            onClick={this.handleClick}
            onKeyDown={this.handleClick}
            role="button"
            tabIndex={0}
            title="Click For Standard Fee"
          >
            {i18n.t('mist.sendTx.priorityFee')}
          </StyledFeeSelector>
        ) : (
          <StyledFeeSelector
            onClick={this.handleClick}
            onKeyDown={this.handleClick}
            role="button"
            tabIndex={0}
            title="Click For Priority Fee"
          >
            {i18n.t('mist.sendTx.standardFee')}
          </StyledFeeSelector>
        )}{' '}
        <StyledFeeAmount>{this.parseFee()}</StyledFeeAmount>
      </div>
    )
  }
}

const StyledFeeSelector = styled.span`
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 0;
  }
`
const StyledFeeAmount = styled.span``

const StyledWarning = styled.div`
  font-style: italic;
`

const StyledError = styled.div`
  color: red;
  font-weight: bold;
`
