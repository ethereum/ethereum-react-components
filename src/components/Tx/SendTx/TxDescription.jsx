import React, { Component } from 'react'
import PropTypes from 'prop-types'
import i18n from '../../../i18n'
import { Identicon } from '../..'
import * as util from '../../../lib/util'

import DeployContract from './TxDescription/DeployContract'
import TokenTransfer from './TxDescription/TokenTransfer'
import FunctionExecution from './TxDescription/FunctionExecution'
import SendEther from './TxDescription/SendEther'

// TODO
const web3 = {}

export default class TxDescription extends Component {
  static displayName = 'TxDescription'

  static propTypes = {
    // txType: PropTypes.oneOf([
    // 'sendEth',
    // 'transferTokens',
    // 'deployContract',
    // 'executeFunction'
    // ]),
    network: PropTypes.oneOf(['main']),
    /** some ether value FIXME underspecified */
    value: PropTypes.string,
    /** current ether price is us dollars */
    etherPriceUSD: PropTypes.string,
    isNewContract: PropTypes.bool,
    toIsContract: PropTypes.bool,
    executionFunction: PropTypes.bool,
    gasError: PropTypes.func,
    token: PropTypes.object,
    params: PropTypes.object,
    data: PropTypes.object,
    adjustWindowHeight: PropTypes.func,
    showDetails: PropTypes.bool,
    gasPrice: PropTypes.string,
    estimatedGas: PropTypes.string
  }

  static defaultProps = {
    showDetails: false
  }

  formattedBalance = () => {
    const { value } = this.props
    return util.formatBalance(
      util.toBN(value || 0),
      '0,0.00[0000000000000000]',
      'ether'
    )
  }

  calculateTransferValue = () => {
    const { value, etherPriceUSD } = this.props

    if (!value || !etherPriceUSD) {
      return
    }

    // const bigValue = util.toBigNumber(value)

    // const fee = bigValue
    // .mult(etherPriceUSD)
    // .div(util.toBN('1000000000000000000'))
    // FIXME return this.formatter.format(fee)

    return '250' // eslint-disable-line
  }

  handleDetailsClick = () => {
    const { adjustWindowHeight } = this.props
    const { showDetails } = this.props
    this.setState({ showDetails: !showDetails }, adjustWindowHeight)
  }

  determineTxType = () => {
    const { isNewContract, toIsContract, executionFunction } = this.props

    if (isNewContract) return 'newContract'
    if (toIsContract) {
      if (executionFunction === 'transfer(address,uint256)') {
        return 'tokenTransfer'
      }

      return 'genericFunctionExecution'
    }

    return 'etherTransfer'
  }

  renderDescription() {
    const {
      etherPriceUSD,
      executionFunction,
      data,
      params,
      network,
      token,
      value
    } = this.props

    const txType = this.determineTxType()
    switch (txType) {
      case 'newContract':
        return <DeployContract data={data} />
      case 'tokenTransfer':
        return <TokenTransfer params={params} token={token} />
      case 'genericFunctionExecution':
        return <FunctionExecution executionFunction={executionFunction} />
      default:
        return (
          <SendEther
            network={network}
            value={util.weiToEther(value)}
            valueInUSD={util.toUsd(value, etherPriceUSD)}
          />
        )
    }
  }

  renderMoreDetails() {
    const {
      estimatedGas,
      executionFunction,
      gasError,
      gasPrice,
      isNewContract,
      params,
      toIsContract,
      token,
      value
    } = this.props
    const { showDetails } = this.state

    if (!toIsContract && !isNewContract) {
      return null
    }

    const isTokenTransfer = executionFunction === 'transfer(address,uint256)'

    const showTxExecutingFunction =
      executionFunction && !isNewContract && !isTokenTransfer

    let tokenDisplayName
    if (isTokenTransfer) {
      if (token.name !== token.symbol) {
        tokenDisplayName = `${token.name} (${token.symbol})`
      } else {
        tokenDisplayName = token.name
      }
    }

    if (!showDetails) {
      return (
        <div
          className="execution-context__details-link"
          onClick={this.handleDetailsClick}>
          {i18n.t('mist.sendTx.showDetails')}
        </div>
      )
    }

    const paramsRows = params.map(param => {
      return (
        <div key={Math.random()} className="execution-context__param">
          <div className="execution-context__param-value">
            <div className="execution-context__param-unicode">{'\u2192'}</div>
            {param.type === 'address' ? (
              <div className="execution-context__param-identicon">
                <Identicon address={param.value} size="small" />
              </div>
            ) : null}
            {param.value}
          </div>
          <div className="execution-context__param-type">{param.type}</div>
        </div>
      )
    })

    const gweiPrice = web3.utils.fromWei(
      web3.utils.hexToNumberString(gasPrice),
      'gwei'
    )

    return (
      <div className="execution-context__details">
        {gasError && (
          <div className="execution-context__details-row">
            <span className="execution-context__details-title">
              {i18n.t('mist.sendTx.errorMessage')}
            </span>
            <span className="execution-context__details-value">{gasError}</span>
          </div>
        )}

        {showTxExecutingFunction && (
          <div className="execution-context__details-row">
            <span className="execution-context__details-title">
              {i18n.t('mist.sendTx.transactionExecutingFunction')}
            </span>
            <span className="execution-context__execution-function">
              {executionFunction.slice(0, executionFunction.indexOf('('))}
            </span>
          </div>
        )}

        <div className="execution-context__details-row">
          <span className="execution-context__details-title">
            {i18n.t('mist.sendTx.etherAmount')}
          </span>
          <span className="execution-context__details-value">
            {this.formattedBalance(value)}
          </span>
        </div>

        <div className="execution-context__details-row">
          <span className="execution-context__details-title">
            {i18n.t('mist.sendTx.gasPrice')}
          </span>
          <span className="execution-context__details-value">{`${gweiPrice} GWEI`}</span>
        </div>

        <div className="execution-context__details-row">
          <span className="execution-context__details-title">
            {i18n.t('mist.sendTx.gasEstimate')}
          </span>
          <span className="execution-context__details-value">{`${estimatedGas} WEI`}</span>
        </div>

        {isTokenTransfer && (
          <div>
            {tokenDisplayName && (
              <div className="execution-context__details-row">
                <span className="execution-context__details-title">
                  {i18n.t('mist.sendTx.tokenName')}
                </span>
                <span className="bold">{tokenDisplayName}</span>
              </div>
            )}
            {token.address && (
              <div className="execution-context__details-row">
                <span className="execution-context__details-title">
                  {i18n.t('mist.sendTx.tokenName')}
                </span>
                <Identicon address={token.address} size="small" />
                <span className="bold">{token.address}</span>
              </div>
            )}
          </div>
        )}

        {params.length > 0 && (
          <div>
            <div className="execution-context__params-title">
              {i18n.t('mist.sendTx.parameters')}
            </div>
            <div className="execution-context__params-table">{paramsRows}</div>
          </div>
        )}

        <div
          className="execution-context__details-link"
          onClick={this.handleDetailsClick}>
          {i18n.t('mist.sendTx.hideDetails')}
        </div>
      </div>
    )
  }

  render() {
    const { gasError } = this.props

    return (
      <div className="execution-context">
        <div className="context-description">
          {this.renderDescription()}
          {!!gasError && (
            <div className="context-description__error">
              Warning: this transaction is likely going to fail and burn your
              fees.
            </div>
          )}
        </div>
        {this.renderMoreDetails()}
      </div>
    )
  }
}
