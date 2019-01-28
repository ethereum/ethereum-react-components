import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Identicon, EthAddress } from '..'

import { getMonthName, getDate } from '../../util/formatters'

export default class TransactionRow extends Component {
  static displayName = 'TransactionRow'

  static propTypes = {
    isRecipient: PropTypes.bool,
    onAddressClick: PropTypes.func,
    onArrowClick: PropTypes.func,
    onTxClick: PropTypes.func,
    transaction: PropTypes.shape({
      contractAddress: PropTypes.any,
      dateSent: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.any,
      value: PropTypes.string
    })
  }

  AddressClick = () => {
    const { onAddressClick } = this.props
    if (onAddressClick) {
      onAddressClick()
    }
  }

  ArrowClick = () => {
    const { onArrowClick } = this.props
    if (onArrowClick) {
      onArrowClick()
    }
  }

  TxClick = () => {
    const { onTxClick } = this.props
    if (onTxClick) {
      onTxClick()
    }
  }

  transactionAddress = (address, AddressClick) => {
    return (
      <span>
        <StyledIdenticon size="tiny" address={address} />
        <EthAddress address={address} short onClick={() => {}} />
      </span>
    )
  }

  transactionType(transaction) {
    const { AddressClick, description, from, to } = transaction
    return (
      <StyledAccounts>
        <h2> {description} </h2>
        <p>
          {this.transactionAddress(from, AddressClick)}
          <StyledAccountArrow>→</StyledAccountArrow>
          {this.transactionAddress(to, AddressClick)}
        </p>
      </StyledAccounts>
    )
  }

  render() {
    const { isRecipient, onArrowClick, transaction, TxClick } = this.props
    const { confirmationNumber } = transaction

    let progressBar = null
    let confirmationCount = null
    if (confirmationNumber && confirmationNumber < 12) {
      progressBar = (
        <StyledProgress>
          <StyledBar confirmationNumber={confirmationNumber} />
        </StyledProgress>
      )
      confirmationCount = `${confirmationNumber} of 12 Confirmations`
    }

    let toOrFrom = null
    if (isRecipient) {
      toOrFrom = (
        <React.Fragment>
          <StyledReceivedAmount>
            {' '}
            + {transaction.value} ETHER
          </StyledReceivedAmount>
          <StyledArrow>
            <StyledArrrowLeft onClick={onArrowClick} />
          </StyledArrow>
        </React.Fragment>
      )
    } else {
      toOrFrom = (
        <React.Fragment>
          <StyledSentAmount> - {transaction.value} ETHER</StyledSentAmount>
          <StyledArrow>
            <StyledArrrowRight onClick={onArrowClick} />
          </StyledArrow>
        </React.Fragment>
      )
    }

    return (
      <StyledTableRow confirmationNumber={confirmationNumber} onClick={TxClick}>
        {progressBar}
        <StyledDate data-tool-tip={transaction.dateSent}>
          <h2>{getMonthName(transaction.dateSent)}</h2>
          <p>{getDate(transaction.dateSent)}</p>
        </StyledDate>
        {this.transactionType(transaction)}
        <StyledInfo> {confirmationCount} </StyledInfo>
        {toOrFrom}
      </StyledTableRow>
    )
  }
}

const StyledProgress = styled.div`
  position: absolute;
  left: 1px;
  right: 1px;
  margin: 0;
  height: 84px;
  width: auto;
  border: 0;
  zoom: 1;
  filter: alpha(opacity=10);
  -webkit-opacity: 0.1;
  -moz-opacity: 0.1;
  opacity: 0.1;
`

const StyledBar = styled.div`
  height: 100%;
  transition: width 10400ms linear;
  background-image: linear-gradient(
    to bottom,
    #0e73b8 0%,
    rgba(14, 115, 184, 0) 100%
  );
  width: ${props => (props.confirmationNumber / 12) * 100}%;
`

const StyledTableRow = styled.tr`
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  opacity: ${props => {
    if (props.confirmationNumber) {
      return 1
    }
    return 0.4
  }};
`

const StyledDate = styled.td`
  text-align: center;
  padding-left: 16px;
  cursor: help;
  h2 {
    margin: 0;
    padding: 0;
    background-color: transparent;
    color: #827a7a;
    text-transform: none;
    font-style: normal;
  }
  p {
    margin: 0;
    font-size: 2em;
    padding-top: 0;
  }
`

const StyledAccounts = styled.td`
  box-sizing: border-box;
  display: table-cell;
  padding: 12.26666667px 16px;
  text-align: left;
  vertical-align: middle;
  color: #827a7a;
  line-height: 22.08px;
  h2 {
    display: inline-block;
    font-size: 1em;
    font-family: 'Montserrat';
    font-weight: 400;
    margin: 0;
    padding: 0;
    background-color: transparent;
    color: #827a7a;
    text-transform: none;
    font-style: normal;
  }
  p {
    font-style: italic;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-top: 8px;
    margin: 0;
    font-size: 0.9em;
    display: block;
  }
`

const StyledIdenticon = styled(Identicon)`
  position: relative;
  top: 5px;
  margin-right: 5.33333333px;
`

const StyledAccountArrow = styled.span`
  display: inline;
  padding: 0 4px;
`

const StyledInfo = styled.td`
  padding: 12.26666667px 16px;
  vertical-align: middle;
  text-align: right;
  font-size: 0.8em;
`

const StyledSentAmount = styled.td`
  display: table-cell;
  padding: 12.26666667px 16px;
  vertical-align: middle;
  color: #c20e25;
  text-align: right;
`

const StyledReceivedAmount = styled.td`
  display: table-cell;
  padding: 12.26666667px 16px;
  vertical-align: middle;
  color: #827a7a;
  text-align: right;
`

const StyledArrow = styled.td`
  display: table-cell;
  padding: 12.26666667px 16px;
  text-align: left;
  vertical-align: middle;
`

const StyledArrrowRight = styled.i`
  color: #c20e25;
  box-sizing: border-box;
  ::before {
    font-family: 'Simple-Line-Icons';
    content: '\\e079';
  }
`

const StyledArrrowLeft = styled.i`
  color: #827a7a;
  box-sizing: border-box;
  :before {
    font-family: 'Simple-Line-Icons';
    content: '\\e078';
  }
`
