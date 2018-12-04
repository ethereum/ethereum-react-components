import React, { Component } from 'react'
import Identicon from '../../Identicon'
import i18n from '../../../i18n'
import * as util from '../../../lib/util'

const NETWORK = {
  MAIN: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  KOVAN: 42
}

const TX = {
  FAILED: 0,
  SUCCESS: 1
}

export default class TxRow extends Component {
  static displayName = 'TxRow'

  state = { showDetails: false }

  toggleDetails() {
    this.setState({ showDetails: !this.state.showDetails })
  }

  renderBold = (label, val) => (
    <div>
      {i18n.t('txHistory.gasUsed')}:{' '}
      <span className="bold">{util.hexToNumberString(val)}</span>
    </div>
  )

  renderDetails() {
    const { tx, etherPriceUSD, blockNumber } = this.props

    if (!this.state.showDetails) {
      return (
        <div className="tx-moreDetails" onClick={() => this.toggleDetails()}>
          Show details
        </div>
      )
    }

    let txHashLink = 'Unavailable'
    if (tx.hash) {
      let subdomain = ''
      if (tx.networkId === NETWORK.ROPSTEN) {
        subdomain = 'ropsten.'
      } else if (tx.networkId === NETWORK.RINKEBY) {
        subdomain = 'rinkeby.'
      } else if (tx.networkId === NETWORK.KOVAN) {
        subdomain = 'kovan.'
      }
      txHashLink = (
        <a
          href={`https://${subdomain}etherscan.io/tx/${tx.hash}`}
          target="_blank">
          {tx.hash}
        </a>
      )
    }

    const etherAmount = util.weiToEther(tx.value)
    let etherAmountUSD
    if (tx.networkId === NETWORK.MAIN && etherPriceUSD) {
      etherAmountUSD = util.toUsd(etherAmount, 'ether', etherPriceUSD)
    }
    const gasPriceEther = util.weiToEther(tx.gasPrice)
    const gasPriceGwei = util.etherToGwei(gasPriceEther)
    let txCostEther
    let txCostUSD
    if (tx.blockNumber) {
      const txCost = this.toBigNumber(tx.gasUsed)
        .mul(this.toBigNumber(tx.gasPrice))
        .toString()
        .toFixed()
      txCostEther = util.weiToEther(txCost)
      if (tx.networkId === NETWORK.MAIN && etherPriceUSD > 0) {
        txCostUSD = util.toUsd(txCostEther, 'ether', etherPriceUSD)
      }
    }

    let status = (
      <span className="bold" style={{ color: 'grey' }}>
        {i18n.t('txHistory.statusPending')}
      </span>
    )
    if (tx.status === TX.FAILED) {
      status = (
        <span className="bold" style={{ color: 'red' }}>
          {i18n.t('txHistory.statusFailed')}
        </span>
      )
    } else if (tx.status === TX.SUCCESS && tx.blockNumber) {
      const numberConfirmations = blockNumber - tx.blockNumber
      status = (
        <span>
          <span className="bold" style={{ color: 'green' }}>
            {i18n.t('txHistory.statusConfirmed')}
          </span>{' '}
          <span>
            (
            {i18n.t('txHistory.confirmations', {
              count: numberConfirmations
            })}
            )
          </span>
        </span>
      )
    }

    return (
      <div>
        <div>
          {i18n.t('txHistory.status')}: {status}
        </div>
        {this.renderBold('txHistory.txHash', txHashLink)}

        <div>
          {i18n.t('txHistory.etherAmount')}:{' '}
          <span className="bold">{etherAmount} ether</span>{' '}
          {etherAmountUSD && <span> (${etherAmountUSD} USD)</span>}
        </div>
        {this.renderBold('txHistory.nonce', tx.nonce)}
        {this.renderBold('txHistory.gasLimit', tx.gas)}
        {tx.gasUsed && this.renderBold('txHistory.gasUsed', tx.gasUsed)}
        <div>
          {i18n.t('txHistory.gasPrice')}:{' '}
          <span className="bold">{gasPriceEther} ether</span> ({gasPriceGwei}{' '}
          Gwei)
        </div>
        {txCostEther && (
          <div>
            {i18n.t('txHistory.txCost')}:{' '}
            <span className="bold">{txCostEther} ether</span>
            {txCostUSD && <span> (${txCostUSD} USD)</span>}
          </div>
        )}
        {tx.data && (
          <div>
            {i18n.t('txHistory.data')}: <span className="bold">{tx.data}</span>
          </div>
        )}
        <div className="tx-moreDetails" onClick={() => this.toggleDetails()}>
          Hide details
        </div>
      </div>
    )
  }

  renderAddress = (label, address) => {
    return (
      <div>
        {i18n.t(label)}:
        <Identicon seed={address} size="small" />
        <span className="bold">{address}</span>
      </div>
    )
  }

  render() {
    const { tx, networkString, token } = this.props
    let network = ''
    if (networkString !== 'Main') {
      network = networkString
    }
    const isTokenTransfer = tx.executionFunction === 'transfer(address,uint256)'
    let description
    let tokensTo
    if (isTokenTransfer) {
      const decimals = tx.token.decimals
      const tokenCount = tx.params[1].value.slice(0, -Math.abs(decimals))
      const tokenSymbol = token.symbol || 'tokens'
      description = `Transferred ${tokenCount} ${tokenSymbol}`
      tokensTo = tx.params[0].value
    } else if (tx.isNewContract) {
      description = 'Created New Contract'
    } else if (tx.executionFunction) {
      description = 'Executed Contract Function'
    } else {
      const etherAmount = util.weiToEther(tx.value)
      description = `Sent ${etherAmount} ether`
    }

    return (
      <div key={tx.hash || tx.nonce} className="tx">
        <div className="right">
          {network && <div className="network">{network}</div>}
          <div className="tx-date">{tx.createdAt}</div>
        </div>
        <div className="tx-description">{description}</div>
        {tx.contractAddress &&
          this.renderAddress('txHistory.newContract', tx.contractAddress)}
        {this.renderAddress('txHistory.from', tx.from)}
        {isTokenTransfer && this.renderAddress('txHistory.to', tokensTo)}
        {!isTokenTransfer && (
          <div>
            {tx.to && (
              <div>
                {i18n.t('txHistory.to')}
                {tx.toIsContract && ' ' + i18n.t('txHistory.contract')}:
                <Identicon seed={tx.to} size="small" />
                <span className="bold">{tx.to}</span>
              </div>
            )}
          </div>
        )}
        {this.renderDetails()}
      </div>
    )
  }
}
