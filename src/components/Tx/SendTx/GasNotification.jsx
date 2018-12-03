import React, { Component } from 'react'
import PropTypes from 'prop-types'
import i18n from '../../../i18n'

export default class GasNotification extends Component {
  static displayName = 'GasNotification'

  static propTypes = {
    estimatedGas: PropTypes.string,
    gasLoading: PropTypes.bool,
    gasError: PropTypes.string
  }

  static defaultProps = {
    estimatedGas: '',
    gasLoading: false,
    gasError: ''
  }

  transactionInvalid = estimatedGas => estimatedGas === 'invalid'
    || estimatedGas === 0
    || typeof estimatedGas === 'undefined'

  render() {
    const { gasLoading, gasError, estimatedGas } = this.props

    if (this.transactionInvalid(estimatedGas)) {
      if (gasLoading) {
        return (
          <p className="info gas-loading">{i18n.t('mist.sendTx.loading')}</p>
        )
      }

      return (
        <p className="info dapp-error">
          {i18n.t('mist.sendTx.estimatedGasError')}
        </p>
      )
    }

    if (gasError === 'notEnoughGas') {
      return (
        <div
          className="info dapp-error not-enough-gas"
          style={{ cursor: 'pointer' }}
        >
          {i18n.t('mist.sendTx.notEnoughGas')}
        </div>
      )
    }

    if (gasError === 'overBlockGasLimit') {
      return (
        <div className="info dapp-error">
          {i18n.t('mist.sendTx.overBlockGasLimit')}
        </div>
      )
    }

    return null
  }
}
