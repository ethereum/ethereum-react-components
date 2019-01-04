import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import i18n from '../../../i18n'
import Identicon from '../../Identicon'
import {
  networkIdToName,
  hexToNumberString,
  weiToEther,
  etherToGwei,
  BigNumber as BN
} from '../../../lib/util'

export default class TxEntry extends Component {
  static propTypes = {
    /** Tx details */
    tx: PropTypes.shape({
      nonce: PropTypes.number,
      from: PropTypes.string.isRequired,
      to: PropTypes.string,
      gas: PropTypes.string.isRequired,
      data: PropTypes.string,
      gasPrice: PropTypes.string.isRequired,
      value: PropTypes.string,
      params: PropTypes.array.isRequired
    }),
    /** USD price of ether for displaying tx costs  */
    etherPriceUSD: PropTypes.number,
    /** Latest blockNumber */
    blockNumber: PropTypes.number
  }

  static linkedTxHash(tx) {
    if (!tx.hash) {
      return null
    }

    let subdomain = ''
    if (tx.networkId === 3) {
      subdomain = 'ropsten.'
    } else if (tx.networkId === 4) {
      subdomain = 'rinkeby.'
    } else if (tx.networkId === 42) {
      subdomain = 'kovan.'
    }

    return (
      <a
        href={`https://${subdomain}etherscan.io/tx/${tx.hash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {tx.hash}
      </a>
    )
  }

  constructor(props) {
    super(props)

    this.state = { showDetails: false }
  }

  toggleDetails() {
    this.setState(prevState => ({ showDetails: !prevState.showDetails }))
  }

  renderDetails() {
    const { tx, etherPriceUSD } = this.props
    const { showDetails } = this.state

    if (!showDetails) {
      return (
        <div
          role="button"
          tabIndex={0}
          className="moreDetails"
          onClick={() => this.toggleDetails()}
          onKeyDown={() => this.toggleDetails()}
        >
          Show details
        </div>
      )
    }

    const linkedTxHash = TxEntry.linkedTxHash(tx)
    const etherAmount = weiToEther(tx.value).toString()
    let etherAmountUSD

    if (tx.networkId === 1 && etherPriceUSD) {
      etherAmountUSD = (etherAmount * etherPriceUSD).toFixed(2)
    }

    const gasPriceEther = weiToEther(tx.gasPrice).toString()
    const gasPriceGwei = etherToGwei(weiToEther(tx.gasPrice)).toString()

    let txCostEther
    let txCostUSD

    if (tx.blockNumber) {
      console.log(tx.gasUsed)
      console.log(tx.gasPrice)
      const txCost = new BN(tx.gasUsed).mul(new BN(tx.gasPrice))
      txCostEther = weiToEther(txCost)

      if (tx.networkId === 1 && etherPriceUSD > 0) {
        txCostUSD = (txCostEther * etherPriceUSD).toFixed(2)
      }

      txCostEther = txCostEther.toString()
    }

    return (
      <div>
        <div>
          <div className="label">{i18n.t('mist.txHistory.txHash')}</div>
          <span className="value">{linkedTxHash}</span>
        </div>
        <div>
          <div className="label">{i18n.t('mist.txHistory.etherAmount')}</div>
          <span className="value">{etherAmount} Ether</span>{' '}
          {etherAmountUSD && <span> (~${etherAmountUSD} USD)</span>}
        </div>
        <div>
          <div className="label">{i18n.t('mist.txHistory.nonce')}</div>
          <span className="value">{hexToNumberString(tx.nonce)}</span>
        </div>
        <div>
          <div className="label">{i18n.t('mist.txHistory.gasLimit')}</div>
          <span className="value">{hexToNumberString(tx.gas)}</span>
        </div>
        {tx.gasUsed && (
          <div>
            <div className="label">{i18n.t('mist.txHistory.gasUsed')}</div>
            <span className="value">{hexToNumberString(tx.gasUsed)}</span>
          </div>
        )}
        <div>
          <div className="label">{i18n.t('mist.txHistory.gasPrice')}</div>
          <span className="value">{gasPriceEther} Ether</span> ({gasPriceGwei}{' '}
          Gwei)
        </div>
        {txCostEther && (
          <div>
            <div className="label">{i18n.t('mist.txHistory.txCost')}</div>
            <span className="value">{txCostEther} Ether</span>
            {txCostUSD && <span> (${txCostUSD} USD)</span>}
          </div>
        )}
        {tx.data && (
          <div>
            <div className="label">{i18n.t('mist.txHistory.data')}</div>
            <span className="value data">{tx.data}</span>
          </div>
        )}
        <div
          role="button"
          tabIndex={0}
          className="moreDetails"
          onClick={() => this.toggleDetails()}
          onKeyDown={() => this.toggleDetails()}
        >
          Hide details
        </div>
      </div>
    )
  }

  render() {
    const { tx } = this.props

    const date = new Date(tx.createdAt).toLocaleString()

    const networkString = networkIdToName(tx.networkId)
    let network = ''
    if (networkString !== 'Main') {
      network = networkString
    }

    const isTokenTransfer = tx.executionFunction === 'transfer(address,uint256)'

    let description
    let tokensTo

    if (isTokenTransfer) {
      const { decimals, symbol } = tx.token
      const tokenCount = tx.params[1].slice(0, -Math.abs(decimals))
      const tokenSymbol = symbol || 'tokens'
      description = `Transferred ${tokenCount} ${tokenSymbol}`
      tokensTo = tx.params[0]
    } else if (tx.isNewContract) {
      description = 'Created New Contract'
    } else if (tx.executionFunction) {
      const executionFunctionSentence =
        tx.executionFunction.charAt(0).toUpperCase() +
        tx.executionFunction
          .slice(1, tx.executionFunction.indexOf('('))
          .replace(/([A-Z]+|[0-9]+)/g, ' $1')
      description = `Executed ${executionFunctionSentence} function`
    } else {
      const etherAmount = weiToEther(tx.value)
      description = `Sent ${etherAmount} Ether`
    }

    let status = (
      <span className="value" style={{ color: 'grey' }}>
        {i18n.t('mist.txHistory.statusPending')}
      </span>
    )
    if (tx.status === 0) {
      status = (
        <span className="value" style={{ color: 'red' }}>
          {i18n.t('mist.txHistory.statusFailed')}
        </span>
      )
    } else if (tx.status === 1 && tx.blockNumber) {
      const { blockNumber } = this.props
      const numberConfirmations = blockNumber - tx.blockNumber

      status = (
        <span>
          <span className="value" style={{ color: 'green' }}>
            {i18n.t('mist.txHistory.statusConfirmed')}
          </span>{' '}
          <span>
            ({numberConfirmations} {i18n.t('mist.txHistory.confirmations')})
          </span>
        </span>
      )
    }

    return (
      <StyledTx key={tx.hash || tx.nonce}>
        <div className="right">
          {network && <div className="network">{network}</div>}
          <div className="date">{date}</div>
        </div>
        <div className="description">{description}</div>
        {tx.contractAddress && (
          <div>
            <div className="label">{i18n.t('mist.txHistory.newContract')}</div>
            <div className="identicon">
              <Identicon address={tx.contractAddress} size="small" />
            </div>
            <span className="value">{tx.contractAddress}</span>
          </div>
        )}
        <div>
          <div className="label">{i18n.t('mist.txHistory.from')}</div>
          <div className="identicon">
            <Identicon address={tx.from} size="small" />
          </div>
          <span className="value">{tx.from}</span>
        </div>
        {isTokenTransfer && (
          <div>
            <div className="label">{i18n.t('mist.txHistory.to')}</div>
            <div className="identicon">
              <Identicon address={tokensTo} size="small" />
            </div>
            <span className="value">{tokensTo}</span>
          </div>
        )}
        {!isTokenTransfer && (
          <div>
            {tx.to && (
              <div>
                <div className="label">
                  {i18n.t('mist.txHistory.to')}
                  {tx.toIsContract && ` ${i18n.t('mist.txHistory.contract')}`}
                </div>
                <div className="identicon">
                  <Identicon address={tx.to} size="small" />
                </div>
                <span className="value">{tx.to}</span>
              </div>
            )}
          </div>
        )}
        <div>
          <div className="label">{i18n.t('mist.txHistory.status')}</div>
          <strong className="value">{status}</strong>
        </div>
        {this.renderDetails()}
      </StyledTx>
    )
  }
}

const StyledTx = styled.div`
  background: #f9f9f9;
  margin-bottom: 1em;
  border-bottom: solid 2px #dcdada;
  padding: 1em;
  color: #111;
  word-wrap: break-word;

  .description {
    font-size: 125%;
    margin-bottom: 0.5em;
  }

  .label {
    display: inline-block;
    background: #ededed;
    color: #444;
    padding: 0.35em;
    border-radius: 5px;
    font-size: 80%;
    margin-right: 5px;
  }

  .right {
    float: right;
    text-align: right;
  }

  .date {
    font-size: 80%;
    margin-bottom: 0;
  }

  .network {
    color: red;
    font-size: 13px;
    font-weight: value;
    margin-bottom: 0;
  }

  .identicon {
    display: inline-block;
    vertical-align: middle;
    margin: 0 7px 0 2px;
  }

  div {
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
  }

  .moreDetails {
    color: #02a8f3;
    font-weight: 400;
    cursor: pointer;
    padding: 3px;
    margin-bottom: 0;
    &:focus {
      outline: 0;
    }
  }
`
