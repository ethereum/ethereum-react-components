import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ethUtils from 'ethereumjs-util'
import styled from 'styled-components'
import i18n from '../../../i18n'
import Spinner from '../../Widgets/AnimatedIcons/Spinner'

const { BN } = ethUtils

export default class FeeSelector extends Component {
  static propTypes = {
    network: PropTypes.string,
    etherPriceUSD: PropTypes.string,
    gas: PropTypes.string,
    gasPrice: PropTypes.string,
    gasLoading: PropTypes.bool,
    togglePriority: PropTypes.func
  }

  state = {
    priority: false
  }

  gasEtherAmount = () => {
    const { gas, gasPrice } = this.props
    const bigGas = new BN(gas)
    const bigGasPrice = new BN(gasPrice)
    const gasEtherAmount = bigGas
      .mul(bigGasPrice)
      .div(new BN('1000000000000000000'))
    return gasEtherAmount
  }

  gasEtherAmountPriority = () => {
    return this.gasEtherAmount().mul(new BN(2))
  }

  parseFee = () => {
    const { etherPriceUSD, network } = this.props
    const { priority } = this.state

    const gasEtherAmount = this.gasEtherAmount()
    const gasEtherAmountPriority = this.gasEtherAmountPriority()

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

  togglePriority = () => {
    const { togglePriority } = this.props
    const { priority } = this.state
    this.setState({ priority: !priority }, () => {
      if (togglePriority) {
        togglePriority()
      }
    })
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
        {gasLoading && <Spinner color="#00aafa" scale="0.5" />}
        {error}
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
      <StyledContainer>
        {priority ? (
          <StyledFeeSelector
            onClick={this.togglePriority}
            onKeyDown={this.togglePriority}
            role="button"
            tabIndex={0}
            title="Click For Standard Fee"
          >
            {i18n.t('mist.sendTx.priorityFee')}
          </StyledFeeSelector>
        ) : (
          <StyledFeeSelector
            onClick={this.togglePriority}
            onKeyDown={this.togglePriority}
            role="button"
            tabIndex={0}
            title="Click For Priority Fee"
          >
            {i18n.t('mist.sendTx.standardFee')}
          </StyledFeeSelector>
        )}{' '}
        <StyledFeeAmount>{this.parseFee()}</StyledFeeAmount>
      </StyledContainer>
    )
  }
}

const StyledContainer = styled.div``

const StyledFeeSelector = styled.span`
  font-weight: bold;
  user-select: none;
  color: blue;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 0;
  }
`
const StyledFeeAmount = styled.span``

const StyledWarning = styled.div`
  display: inline-block;
  font-style: italic;
`

const StyledError = styled.div`
  display: inline-block;
  color: red;
  font-weight: bold;
`
