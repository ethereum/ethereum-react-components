import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ethUtils from 'ethereumjs-util'
import styled from 'styled-components'
import i18n from '../../../i18n'
import { Identicon } from '../..'
import * as util from '../../../lib/util'

import DeployContract from './TxDescription/DeployContract'
import TokenTransfer from './TxDescription/TokenTransfer'
import FunctionExecution from './TxDescription/FunctionExecution'
import SendEther from './TxDescription/SendEther'

import { Button } from '../../..'

const { BN } = ethUtils

export default class TxDescription extends Component {
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
    gas: PropTypes.string
  }

  static defaultProps = {}

  state = {
    showDetails: false
  }

  calculateTransferValue = () => {
    const { value, etherPriceUSD } = this.props

    if (!value || !etherPriceUSD) {
      return
    }

    const fee = new BN(value)
      .times(etherPriceUSD)
      .dividedBy(new BN('1000000000000000000'))
    return fee
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

    switch (this.txType()) {
      case 'newContract':
        return <DeployContract data={data} />
      case 'tokenTransfer':
        return <TokenTransfer params={params} token={token} />
      case 'genericFunctionExecution':
        return <FunctionExecution executionFunction={executionFunction} />
      default:
        const etherAmount = util.weiToEther(value)
        return (
          <SendEther
            network={network}
            value={etherAmount}
            valueInUSD={util.toUsd(etherAmount, etherPriceUSD)}
          />
        )
    }
  }

  renderMoreDetails() {
    const {
      gas,
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

    const isTokenTransfer = executionFunction === 'transfer(address,uint256)'

    const showTxExecutingFunction =
      executionFunction && !isNewContract && !isTokenTransfer

    let tokenDisplayName
    if (isTokenTransfer) {
      if (!token) {
        tokenDisplayName = 'tokens'
      } else {
        if (token.name && token.name !== token.symbol) {
          tokenDisplayName = `${token.name} (${token.symbol})`
        } else {
          if (token.name) {
            tokenDisplayName = token.name
          } else if (token.symbol) {
            tokenDisplayName = token.symbol
          } else {
            tokenDisplayName = 'tokens'
          }
        }
      }
    }

    if (!showDetails) {
      return (
        <StyledButton flat secondary onClick={this.handleDetailsClick}>
          {i18n.t('mist.sendTx.showDetails')}
        </StyledButton>
      )
    }

    const paramsRows = params.map(param => {
      return (
        <StyledExecutionContextParam key={Math.random()}>
          <StyledExecutionContextParamValue>
            <StyledExecutionContextParamUnicode>
              {'\u2192'}
            </StyledExecutionContextParamUnicode>
            {param.type === 'address' ? (
              <StyledExecutionContextParamIdenticon>
                <Identicon address={param.value} size="small" />
              </StyledExecutionContextParamIdenticon>
            ) : null}
            {param.value}
          </StyledExecutionContextParamValue>
          <StyledExeuctionContextParamType>
            {param.type}
          </StyledExeuctionContextParamType>
        </StyledExecutionContextParam>
      )
    })

    const gasPriceGwei = new BN(gasPrice).div(new BN('1000000000'))

    return (
      <StyledExecutionContextDetails>
        {gasError && (
          <StyledExecutionContextRow>
            <StyledExecutionContextTitle>
              {i18n.t('mist.sendTx.errorMessage')}
            </StyledExecutionContextTitle>
            <StyledExecutionContextDetailsValue>
              {gasError}
            </StyledExecutionContextDetailsValue>
          </StyledExecutionContextRow>
        )}

        {showTxExecutingFunction && (
          <StyledExecutionContextRow>
            <StyledExecutionContextDetailsTitle>
              {i18n.t('mist.sendTx.transactionExecutingFunction')}
            </StyledExecutionContextDetailsTitle>
            <StyledExecutionContextExecutionFunction>
              {executionFunction.slice(0, executionFunction.indexOf('('))}
            </StyledExecutionContextExecutionFunction>
          </StyledExecutionContextRow>
        )}

        <StyledExecutionContextRow>
          <StyledExecutionContextTitle>
            {i18n.t('mist.sendTx.etherAmount')}
          </StyledExecutionContextTitle>
          <StyledExecutionContextDetailsValue>
            {util.weiToEther(value).toString()}
          </StyledExecutionContextDetailsValue>
        </StyledExecutionContextRow>

        <StyledExecutionContextRow>
          <StyledExecutionContextTitle>
            {i18n.t('mist.sendTx.gasPrice')}
          </StyledExecutionContextTitle>
          <StyledExecutionContextDetailsValue>{`${gasPriceGwei} gwei`}</StyledExecutionContextDetailsValue>
        </StyledExecutionContextRow>

        <StyledExecutionContextRow>
          <StyledExecutionContextTitle>
            {i18n.t('mist.sendTx.gasEstimate')}
          </StyledExecutionContextTitle>
          <StyledExecutionContextDetailsValue>{`${new BN(
            gas
          ).toString()} wei`}</StyledExecutionContextDetailsValue>
        </StyledExecutionContextRow>

        {isTokenTransfer && (
          <div>
            {tokenDisplayName && tokenDisplayName !== 'tokens' && (
              <StyledExecutionContextRow>
                <StyledExecutionContextTitle>
                  {i18n.t('mist.sendTx.tokenName')}
                </StyledExecutionContextTitle>
                <StyledExecutionContextDetailsValue>
                  {tokenDisplayName}
                </StyledExecutionContextDetailsValue>
              </StyledExecutionContextRow>
            )}
            {token && token.address && (
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
        )}

        {params.length > 0 && (
          <div>
            <StyledExecutionContextParamsTitle>
              {i18n.t('mist.sendTx.parameters')}
            </StyledExecutionContextParamsTitle>
            <StyledExecutionContextParamsTable>
              {paramsRows}
            </StyledExecutionContextParamsTable>
          </div>
        )}

        <StyledButton flat secondary onClick={this.handleDetailsClick}>
          {i18n.t('mist.sendTx.hideDetails')}
        </StyledButton>
      </StyledExecutionContextDetails>
    )
  }

  render() {
    const { gasError } = this.props

    return (
      <StyledExecutionContext>
        <StyledContextDescription>
          {this.renderDescription()}
          {!!gasError && (
            <div className="context-description__error">
              Warning: this transaction is likely going to fail and burn your
              fees.
            </div>
          )}
        </StyledContextDescription>
        {this.renderMoreDetails()}
      </StyledExecutionContext>
    )
  }
}

const StyledExecutionContext = styled.div``

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

const StyledExecutionContextParamsTable = styled.div``

const StyledButton = styled(Button)``

const StyledContextDescription = styled.div``

const StyledExecutionContextDetailsTitle = styled.span`
  margin-right: 5px;
`

const StyledExecutionContextDetailsValue = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
`

const StyledExecutionContextParamAddress = styled.span`
  user-select: all;
  margin-left: 6px;
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
  display: flex;
  align-items: center;
  margin-right: 6px;
  vertical-align: middle;
  display: inline-block;
`

const StyledExecutionContextExecutionFunction = styled.span`
  font-weight: 500;
`

const StyledExeuctionContextParamType = styled.span`
  display: flex;
  align-items: center;
`

const StyledContextDescriptionSentence = styled.div`
  margin: 18px 0 24px;
  font-size: 36px;
  text-align: left;
`

const StyledContextDescriptionSubtext = styled.div`
  font-size: 16px;
  margin: 12px 0;
`

const StyledContextDescriptionSendEthAlert = styled.div`
  font-size: 15px;
`

const StyledContextDescriptionError = styled.div`
  color: #f66d6f;
  margin: -12px 0 12px;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
`

const StyledExecutionContextParamValue = styled.span``

const StyledDescription = styled.div``
