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
  static displayName = 'TxEntry'

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

  constructor(props) {
    super(props)

    this.state = { showDetails: false }

    const { tx } = this.props
    tx.isTokenTransfer = tx.executionFunction === 'transfer(address,uint256)'
  }

  toggleDetails() {
    this.setState(prevState => ({ showDetails: !prevState.showDetails }))
  }

  renderTxHash() {
    const { tx } = this.props

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

    const linkedTxHash = (
      <a
        href={`https://${subdomain}etherscan.io/tx/${tx.hash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {tx.hash}
      </a>
    )

    return (
      <div>
        <StyledLabel>{i18n.t('mist.txHistory.txHash')}</StyledLabel>
        <StyledValue>{linkedTxHash}</StyledValue>
      </div>
    )
  }

  renderEtherAmount() {
    const { tx, etherPriceUSD } = this.props
    const etherAmount = weiToEther(tx.value).toString()
    let etherAmountUSD
    if (tx.networkId === 1 && etherPriceUSD) {
      etherAmountUSD = (etherAmount * etherPriceUSD).toFixed(2)
    }
    return (
      <div>
        <StyledLabel>{i18n.t('mist.txHistory.etherAmount')}</StyledLabel>
        <StyledValue>
          {etherAmount} Ether{' '}
          {etherAmountUSD && <span> (~${etherAmountUSD} USD)</span>}
        </StyledValue>
      </div>
    )
  }

  renderNonce() {
    const { tx } = this.props
    return (
      <div>
        <StyledLabel>{i18n.t('mist.txHistory.nonce')}</StyledLabel>
        <StyledValue>{hexToNumberString(tx.nonce)}</StyledValue>
      </div>
    )
  }

  renderGas() {
    const { tx } = this.props
    const gasPriceEther = weiToEther(tx.gasPrice).toString()
    const gasPriceGwei = etherToGwei(weiToEther(tx.gasPrice)).toString()
    return (
      <div>
        <div>
          <StyledLabel>{i18n.t('mist.txHistory.gasLimit')}</StyledLabel>
          <StyledValue>{hexToNumberString(tx.gas)}</StyledValue>
        </div>
        {tx.gasUsed && (
          <div>
            <StyledLabel>{i18n.t('mist.txHistory.gasUsed')}</StyledLabel>
            <StyledValue>{hexToNumberString(tx.gasUsed)}</StyledValue>
          </div>
        )}
        <div>
          <StyledLabel>{i18n.t('mist.txHistory.gasPrice')}</StyledLabel>
          <StyledValue>
            {gasPriceEther} Ether ({gasPriceGwei} Gwei)
          </StyledValue>
        </div>
      </div>
    )
  }

  renderTxCost() {
    const { tx, etherPriceUSD } = this.props

    if (!tx.blockNumber) {
      return null
    }

    let txCostEther
    let txCostUSD
    const txCost = new BN(tx.gasUsed).mul(new BN(tx.gasPrice))
    txCostEther = weiToEther(txCost)
    if (tx.networkId === 1 && etherPriceUSD > 0) {
      txCostUSD = (txCostEther * etherPriceUSD).toFixed(2)
    }
    txCostEther = txCostEther.toString()

    return (
      <div>
        <StyledLabel>{i18n.t('mist.txHistory.txCost')}</StyledLabel>
        <StyledValue>{txCostEther} Ether</StyledValue>
        {txCostUSD && <span> (${txCostUSD} USD)</span>}
      </div>
    )
  }

  renderData() {
    const { tx } = this.props

    if (!tx.data) {
      return null
    }

    return (
      <div>
        <StyledLabel>{i18n.t('mist.txHistory.data')}</StyledLabel>
        <StyledValue>
          <StyledData>{tx.data}</StyledData>
        </StyledValue>
      </div>
    )
  }

  renderDetails() {
    const { showDetails } = this.state

    if (!showDetails) {
      return (
        <StyledMoreDetails
          role="button"
          tabIndex={0}
          onClick={() => this.toggleDetails()}
          onKeyDown={() => this.toggleDetails()}
        >
          Show details
        </StyledMoreDetails>
      )
    }

    return (
      <div>
        {this.renderTxHash()}
        {this.renderEtherAmount()}
        {this.renderNonce()}
        {this.renderGas()}
        {this.renderTxCost()}
        {this.renderData()}

        <StyledMoreDetails
          role="button"
          tabIndex={0}
          onClick={() => this.toggleDetails()}
          onKeyDown={() => this.toggleDetails()}
        >
          Hide details
        </StyledMoreDetails>
      </div>
    )
  }

  renderStatus() {
    const { tx } = this.props
    let status = (
      <StyledValue style={{ color: 'grey' }}>
        {i18n.t('mist.txHistory.statusPending')}
      </StyledValue>
    )
    if (tx.status === 0) {
      status = (
        <StyledValue style={{ color: 'red' }}>
          {i18n.t('mist.txHistory.statusFailed')}
        </StyledValue>
      )
    } else if (tx.status === 1 && tx.blockNumber) {
      const { blockNumber } = this.props
      const numberConfirmations = blockNumber - tx.blockNumber

      status = (
        <span>
          <StyledValue style={{ color: 'green' }}>
            {i18n.t('mist.txHistory.statusConfirmed')}
          </StyledValue>{' '}
          <StyledValue>
            ({numberConfirmations} {i18n.t('mist.txHistory.confirmations')})
          </StyledValue>
        </span>
      )
    }
    return (
      <div>
        <StyledLabel>{i18n.t('mist.txHistory.status')}</StyledLabel>
        <StyledValue style={{ fontWeight: 'bold' }}>{status}</StyledValue>
      </div>
    )
  }

  renderDescription() {
    const { tx } = this.props
    let description
    if (tx.isTokenTransfer) {
      const { decimals, symbol } = tx.token
      const tokenCount = tx.params[1].slice(0, -Math.abs(decimals))
      const tokenSymbol = symbol || 'tokens'
      description = `Transferred ${tokenCount} ${tokenSymbol}`
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
    return <StyledDescription>{description}</StyledDescription>
  }

  renderFrom() {
    const { tx } = this.props
    return (
      <div>
        <StyledLabel>{i18n.t('mist.txHistory.from')}</StyledLabel>
        <StyledIdenticon>
          <Identicon address={tx.from} size="small" />
        </StyledIdenticon>
        <StyledValue>{tx.from}</StyledValue>
      </div>
    )
  }

  renderTo() {
    const { tx } = this.props
    if (tx.isTokenTransfer) {
      const tokensTo = tx.params[0]
      return (
        <div>
          <StyledLabel>{i18n.t('mist.txHistory.to')}</StyledLabel>
          <StyledIdenticon>
            <Identicon address={tokensTo} size="small" />
          </StyledIdenticon>
          <StyledValue>{tokensTo}</StyledValue>
        </div>
      )
    }

    if (!tx.to) {
      return null
    }

    return (
      <div>
        <StyledLabel>
          {i18n.t('mist.txHistory.to')}
          {tx.toIsContract && ` ${i18n.t('mist.txHistory.contract')}`}
        </StyledLabel>
        <StyledIdenticon>
          <Identicon address={tx.to} size="small" />
        </StyledIdenticon>
        <StyledValue>{tx.to}</StyledValue>
      </div>
    )
  }

  renderNewContract() {
    const { tx } = this.props
    if (!tx.contractAddress) {
      return null
    }
    return (
      <div>
        <StyledLabel>{i18n.t('mist.txHistory.newContract')}</StyledLabel>
        <StyledIdenticon>
          <Identicon address={tx.contractAddress} size="small" />
        </StyledIdenticon>
        <StyledValue>{tx.contractAddress}</StyledValue>
      </div>
    )
  }

  renderNetwork() {
    const { tx } = this.props
    const networkName = networkIdToName(tx.networkId)
    return <StyledNetwork>{networkName}</StyledNetwork>
  }

  renderDate() {
    const { tx } = this.props
    const date = new Date(tx.createdAt).toLocaleString()
    return <StyledDate>{date}</StyledDate>
  }

  render() {
    const { tx } = this.props
    return (
      <StyledTx key={tx.hash || tx.nonce}>
        <StyledRight>
          {this.renderNetwork()}
          {this.renderDate()}
        </StyledRight>
        {this.renderDescription()}
        {this.renderNewContract()}
        {this.renderFrom()}
        {this.renderTo()}
        {this.renderStatus()}
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

  div {
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
  }
`

const StyledRight = styled.div`
  float: right;
  text-align: right;
  div {
    margin-bottom: 0;
  }
`

const StyledLabel = styled.div`
  display: inline-block;
  background: #ededed;
  color: #444;
  padding: 0.35em;
  border-radius: 5px;
  font-size: 80%;
  margin-right: 5px;
`

const StyledValue = styled.span``

const StyledDate = styled.div`
  font-size: 80%;
  margin-bottom: 0;
`

const StyledNetwork = styled.div`
  font-size: 13px;
  font-weight: bold;
`

const StyledDescription = styled.div`
  font-size: 125%;
  margin-bottom: 0.5em;
`

const StyledMoreDetails = styled.div`
  color: #02a8f3;
  font-weight: 400;
  cursor: pointer;
  padding: 3px;
  margin-bottom: 0;
  &:focus {
    outline: 0;
  }
`

const StyledIdenticon = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin: 0 7px 0 2px;
`

const StyledData = styled.div``
