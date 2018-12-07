import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ethUtils from 'ethereumjs-util'
import i18n from '../../../i18n'
import Spinner from '../../Widgets/AnimatedIcons/Spinner'
import * as util from '../../../lib/util'

const { BN } = ethUtils

export default class FeeSelector extends Component {
  static displayName = 'FeeSelector'

  static propTypes = {
    togglePriority: PropTypes.string.isRequired,
    gasLoading: PropTypes.bool,
    network: PropTypes.string
  }

  static defaultProps = {
    network: 'main'
  }

  state = {
    gasRetries: 0
  }

  parseFee = () => {
    const { estimatedGas, priority, gasPrice, etherPriceUSD } = this.props

    // FIXME
    const network = 'main'

    const gas = util.toBigNumber(estimatedGas)
    const bigGasPrice = util.toBigNumber(gasPrice)
    const gasEtherAmount = gas
      .mul(bigGasPrice)
      .div(new BN('1000000000000000000'))
    const gasEtherAmountPriority = gasEtherAmount.mul(new BN(2))

    let fee
    if (!priority) {
      if (network.toLowerCase() === 'main' && etherPriceUSD) {
        const standardFee = gasEtherAmount.mul(etherPriceUSD)
        const formattedFee = this.formatter.format(standardFee)
        fee = `${formattedFee} USD (${gasEtherAmount} ETH)`
      } else {
        fee = `${gasEtherAmount} ETH`
      }
    } else {
      if (network.toLowerCase() === 'main' && etherPriceUSD) {
        const priorityFee = gasEtherAmountPriority.mul(etherPriceUSD)
        const formattedFee = this.formatter.format(priorityFee)
        fee = `${formattedFee} USD (${gasEtherAmount} ETH)`
      } else {
        fee = `${gasEtherAmountPriority} ETH`
      }
    }

    return fee
  }

  handleClick = () => {
    const { togglePriority } = this.props
    togglePriority()
  }

  renderStatus = () => {
    const { gasLoading } = this.props
    const { gasRetries } = this.state

    let error

    if (gasLoading && gasRetries < 5) {
      error = (
        <div className="fee-selector__error">
          {i18n.t('mist.sendTx.gasLoadingWarning')}
        </div>
      )
    } else if (gasLoading && gasRetries === 5) {
      error = (
        <div className="fee-selector__error">
          {i18n.t('mist.sendTx.gasLoadingError')}
        </div>
      )
    }

    return (
      <React.Fragment>
        {gasLoading && (
          <Spinner singleColor="#00aafa" size={16} className="react-spinner" />
        )}
        {error}
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="fee-selector">
        {this.props.priority ? (
          <span
            onClick={this.handleClick}
            className="fee-selector__btn"
            data-tooltip="Click For Standard Fee">
            {i18n.t('mist.sendTx.priorityFee')}
          </span>
        ) : (
          <span
            onClick={this.handleClick}
            className="fee-selector__btn"
            data-tooltip="Click For Priority Fee">
            {i18n.t('mist.sendTx.standardFee')}
          </span>
        )}{' '}
        <span className="fee-amount">{this.parseFee()}</span>
        {this.renderStatus()}
      </div>
    )
  }
}
