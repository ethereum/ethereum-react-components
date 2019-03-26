import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BN } from 'ethereumjs-util'
import styled from 'styled-components'
import i18n from '../../../i18n'
import Button from '../../Widgets/Button'
import Identicon from '../../Identicon'
import * as util from '../../../lib/util'
import DeployContract from './TxDescription/DeployContract'
import TokenTransfer from './TxDescription/TokenTransfer'
import FunctionExecution from './TxDescription/FunctionExecution'
import SendEther from './TxDescription/SendEther'

export default class TxDescription extends Component {
  static displayName = 'TxDescription'

  static propTypes = {
    network: PropTypes.oneOf(['main', 'ropsten', 'rinkeby', 'kovan']),
    value: PropTypes.string,
    etherPriceUSD: PropTypes.string,
    isNewContract: PropTypes.bool,
    toIsContract: PropTypes.bool,
    executionFunction: PropTypes.bool,
    gasError: PropTypes.func,
    token: PropTypes.object,
    params: PropTypes.array,
    data: PropTypes.object,
    gasPrice: PropTypes.string,
    estimatedGas: PropTypes.string
  }

  static defaultProps = {}

  state = {
    showDetails: false
  }

  handleDetailsClick = () => {
    const { showDetails } = this.state
    this.setState({ showDetails: !showDetails })
  }

  txType = () => {
    const { isNewContract, toIsContract, executionFunction } = this.props

    if (isNewContract) {
      return 'newContract'
    }
    if (toIsContract) {
      if (executionFunction === 'transfer(address,uint256)') {
        return 'tokenTransfer'
      }

      return 'genericFunctionExecution'
    }

    return 'etherTransfer'
  }

  renderDescription = () => {
    const {
      etherPriceUSD,
      executionFunction,
      data,
      params,
      network,
      token,
      value
    } = this.props

    switch (this.txType()) {
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
            valueInUSD={util.toUsd(util.weiToEther(value), etherPriceUSD)}
          />
        )
    }
  }

  isTokenTransfer = () => {
    const { executionFunction } = this.props
    return executionFunction === 'transfer(address,uint256)'
  }

  parseTokenDisplayName = () => {
    const { token } = this.props

    if (!this.isTokenTransfer) {
      return null
    }

    if (token.name && token.name !== token.symbol) {
      return `${token.name} (${token.symbol})`
    }

    if (token.name) {
      return token.name
    }

    if (token.symbol) {
      return token.symbol
    }

    return 'tokens'
  }

  renderGasError() {
    const { gasError } = this.props
    if (!gasError) {
      return null
    }
    return (
      <StyledExecutionContextRow>
        <StyledExecutionContextTitle>
          {i18n.t('mist.sendTx.errorMessage')}
        </StyledExecutionContextTitle>
        <StyledExecutionContextDetailsValue>
          <StyledError>{gasError}</StyledError>
        </StyledExecutionContextDetailsValue>
      </StyledExecutionContextRow>
    )
  }

  renderTxExecutingFunction() {
    const { executionFunction, isNewContract } = this.props

    if (!executionFunction || isNewContract || this.isTokenTransfer()) {
      return null
    }

    return (
      <StyledExecutionContextRow>
        <StyledExecutionContextDetailsTitle>
          {i18n.t('mist.sendTx.txExecutingFunction')}
        </StyledExecutionContextDetailsTitle>
        <StyledExecutionContextExecutionFunction>
          {executionFunction.slice(0, executionFunction.indexOf('('))}
        </StyledExecutionContextExecutionFunction>
      </StyledExecutionContextRow>
    )
  }

  renderEtherAmount() {
    const { value } = this.props
    const etherAmount = util.weiToEther(value).toString()
    return (
      <StyledExecutionContextRow>
        <StyledExecutionContextTitle>
          {i18n.t('mist.sendTx.etherAmount')}
        </StyledExecutionContextTitle>
        <StyledExecutionContextDetailsValue>
          {etherAmount}
        </StyledExecutionContextDetailsValue>
      </StyledExecutionContextRow>
    )
  }

  renderGasPrice() {
    const { gasPrice } = this.props
    const gasPriceGwei = new BN(gasPrice).div(new BN('1000000000'))
    return (
      <StyledExecutionContextRow>
        <StyledExecutionContextTitle>
          {i18n.t('mist.sendTx.gasPrice')}
        </StyledExecutionContextTitle>
        <StyledExecutionContextDetailsValue>{`${gasPriceGwei} gwei`}</StyledExecutionContextDetailsValue>
      </StyledExecutionContextRow>
    )
  }

  renderGasEstimate() {
    const { estimatedGas } = this.props
    const gas = util.toBigNumber(estimatedGas).toString()
    return (
      <StyledExecutionContextRow>
        <StyledExecutionContextTitle>
          {i18n.t('mist.sendTx.gasEstimate')}
        </StyledExecutionContextTitle>
        <StyledExecutionContextDetailsValue>
          {gas} gas
        </StyledExecutionContextDetailsValue>
      </StyledExecutionContextRow>
    )
  }

  renderTokenDetails() {
    const { token } = this.props

    if (!token || !this.isTokenTransfer) {
      return null
    }

    const tokenDisplayName = this.parseTokenDisplayName()

    return (
      <div>
        {tokenDisplayName !== 'tokens' && (
          <StyledExecutionContextRow>
            <StyledExecutionContextTitle>
              {i18n.t('mist.sendTx.tokenName')}
            </StyledExecutionContextTitle>
            <StyledExecutionContextDetailsValue>
              {tokenDisplayName}
            </StyledExecutionContextDetailsValue>
          </StyledExecutionContextRow>
        )}
        {token.address && (
          <StyledExecutionContextRow>
            <StyledExecutionContextTitle>
              {i18n.t('mist.sendTx.tokenAddress')}
            </StyledExecutionContextTitle>
            <StyledExecutionContextParamIdenticon>
              <Identicon address={token.address} size="small" />
            </StyledExecutionContextParamIdenticon>
            <StyledExecutionContextDetailsValue>
              {token.address}
            </StyledExecutionContextDetailsValue>
          </StyledExecutionContextRow>
        )}
      </div>
    )
  }

  renderParams() {
    const { params } = this.props
    if (params.length === 0) {
      return null
    }
    const paramsRows = params.map(param => {
      return (
        <StyledExecutionContextParam key={Math.random()}>
          <span>
            <StyledExecutionContextParamUnicode>
              {'\u2192'}
            </StyledExecutionContextParamUnicode>
            {param.type === 'address' ? (
              <StyledExecutionContextParamIdenticon>
                <Identicon address={param.value} size="small" />
              </StyledExecutionContextParamIdenticon>
            ) : null}
            {param.value}
          </span>
          <StyledExeuctionContextParamType>
            {param.type}
          </StyledExeuctionContextParamType>
        </StyledExecutionContextParam>
      )
    })
    return (
      <div>
        <StyledExecutionContextParamsTitle>
          {i18n.t('mist.sendTx.parameters')}
        </StyledExecutionContextParamsTitle>
        <div>{paramsRows}</div>
      </div>
    )
  }

  renderMoreDetails() {
    const { showDetails } = this.state

    if (!showDetails) {
      return (
        <Button secondary onClick={this.handleDetailsClick}>
          {i18n.t('mist.sendTx.showDetails')}
        </Button>
      )
    }

    return (
      <StyledExecutionContextDetails>
        {this.renderGasError()}
        {this.renderTxExecutingFunction()}
        {this.renderEtherAmount()}
        {this.renderGasPrice()}
        {this.renderGasEstimate()}
        {this.renderTokenDetails()}
        {this.renderParams()}

        <Button secondary onClick={this.handleDetailsClick}>
          {i18n.t('mist.sendTx.hideDetails')}
        </Button>
      </StyledExecutionContextDetails>
    )
  }

  render() {
    const { gasError } = this.props

    return (
      <div>
        <div>
          {this.renderDescription()}
          {!!gasError && (
            <StyledError>
              Warning: this transaction is likely going to fail and burn your
              fees.
            </StyledError>
          )}
        </div>
        {this.renderMoreDetails()}
      </div>
    )
  }
}

const StyledExecutionContextRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`

const StyledExecutionContextDetails = styled.div`
  margin: 18px 0 0;
  font-size: 14px;
  text-align: left;
  -webkit-app-region: drag;
`

const StyledExecutionContextTitle = styled.span`
  width: 100px;
`

const StyledExecutionContextParamsTitle = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 6px;
`

const StyledExecutionContextDetailsTitle = styled.span`
  margin-right: 5px;
`

const StyledExecutionContextDetailsValue = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
`

const StyledExecutionContextParam = styled.span`
  user-select: all;
  display: flex;
  justify-content: space-between;
  height: 36px;
`

const StyledExecutionContextParamUnicode = styled.span`
  font-size: 24px;
  margin-right: 12px;
`

const StyledExecutionContextParamIdenticon = styled.span`
  align-items: center;
  margin-right: 6px;
  vertical-align: middle;
  display: inline-block;
`

const StyledExecutionContextExecutionFunction = styled.span`
  font-weight: bold;
`

const StyledExeuctionContextParamType = styled.span`
  display: flex;
  align-items: center;
`

const StyledError = styled.span`
  color: red;
`
