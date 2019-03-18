import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import i18n from '../../../i18n'
import Spinner from '../../Widgets/AnimatedIcons/Spinner'
import { toBigNumber, weiToEther } from '../../../lib/util'

export default class FeeSelector extends Component {
  static propTypes = {
    network: PropTypes.string,
    etherPriceUSD: PropTypes.string,
    estimatedGas: PropTypes.string,
    gasPrice: PropTypes.string,
    gasLoading: PropTypes.bool,
    togglePriority: PropTypes.func,
    priority: PropTypes.bool
  }

  gasEtherAmount = () => {
    const { estimatedGas, gasPrice } = this.props
    const bigGas = toBigNumber(estimatedGas)
    const bigGasPrice = toBigNumber(gasPrice)
    const gasEtherAmount = weiToEther(bigGas.times(bigGasPrice))
    return gasEtherAmount
  }

  gasEtherAmountPriority = () => {
    return this.gasEtherAmount().times(toBigNumber(2))
  }

  parseFee = () => {
    const { etherPriceUSD, network, priority } = this.props

    const gasEtherAmount = this.gasEtherAmount()
    const gasEtherAmountPriority = this.gasEtherAmountPriority()

    let fee
    if (!priority) {
      if (network.toLowerCase() === 'main' && etherPriceUSD) {
        const standardFee = gasEtherAmount
          .times(toBigNumber(etherPriceUSD))
          .toFixed(2)
        fee = `$${standardFee} USD (${gasEtherAmount} ETH)`
      } else {
        fee = `${gasEtherAmount} ETH`
      }
    } else if (network.toLowerCase() === 'main' && etherPriceUSD) {
      const priorityFee = gasEtherAmountPriority
        .times(toBigNumber(etherPriceUSD))
        .toFixed(2)
      fee = `$${priorityFee} USD (${gasEtherAmountPriority} ETH)`
    } else {
      fee = `${gasEtherAmountPriority} ETH`
    }
    return fee
  }

  togglePriority = () => {
    const { togglePriority } = this.props
    togglePriority()
  }

  renderStatus = () => {
    const { estimatedGas, gasLoading } = this.props

    let error
    if (!estimatedGas && gasLoading) {
      error = (
        <StyledWarning>{i18n.t('mist.sendTx.gasLoadingWarning')}</StyledWarning>
      )
    } else {
      error = <StyledError>{i18n.t('mist.sendTx.gasLoadingError')}</StyledError>
    }

    return (
      <div>
        {gasLoading && (
          <StyledSpinnerContainer>
            <Spinner size={18} />
          </StyledSpinnerContainer>
        )}
        {error}
      </div>
    )
  }

  render() {
    const { estimatedGas, priority } = this.props

    if (!estimatedGas) {
      return <div>{this.renderStatus()}</div>
    }

    return (
      <div>
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
        <span>{this.parseFee()}</span>
      </div>
    )
  }
}

const StyledFeeSelector = styled.span`
  user-select: none;
  color: #00aafa;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 0;
  }
`

const StyledWarning = styled.div`
  display: inline-block;
  font-style: italic;
`

const StyledError = styled.div`
  display: inline-block;
  color: red;
  font-weight: bold;
`

const StyledSpinnerContainer = styled.div`
  width: 50px;
  height: 50px;
  display: inline-block;
  margin-left: 10px;
`
