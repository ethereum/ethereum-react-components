import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Identicon, EthAddress } from '..'

export default class TransactionRow extends Component {
  static displayName = 'TransactionRow'

  static propTypes = {
    isRecipient: PropTypes.bool,
    onAddressClick: PropTypes.func,
    onArrowClick: PropTypes.func,
    onTxClick: PropTypes.func,
    transaction: PropTypes.shape({
      contractAddress: PropTypes.any,
      dateSent: PropTypes.instanceOf(Date),
      from: PropTypes.string,
      to: PropTypes.any,
      value: PropTypes.string,
      confirmationNumber: PropTypes.any
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
    let clickAddress = () => {}
    if (AddressClick) {
      clickAddress = AddressClick
    }
    return (
      <span>
        <StyledIdenticon size="tiny" address={address} />
        <EthAddress address={address} short onClick={clickAddress} />
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
    const { isRecipient, transaction } = this.props
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

    const amount = ` ${transaction.value} ETHER`

    let toOrFrom = null
    if (isRecipient) {
      toOrFrom = (
        <React.Fragment>
          <StyledReceivedAmount>{amount}</StyledReceivedAmount>
          <StyledArrow>
            <StyledFAUp size="1px" icon={faArrowUp} onClick={this.ArrowClick} />
          </StyledArrow>
        </React.Fragment>
      )
    } else {
      toOrFrom = (
        <React.Fragment>
          <StyledSentAmount> - {transaction.value} ETHER</StyledSentAmount>
          <StyledArrow>
            <StyledFARight
              size="1px"
              icon={faArrowRight}
              onClick={this.ArrowClick}
            />
          </StyledArrow>
        </React.Fragment>
      )
    }

    return (
      <StyledTableRow
        confirmationNumber={confirmationNumber}
        onClick={this.TxClick}
      >
        {progressBar}
        <StyledDate data-tool-tip={transaction.dateSent}>
          <h2>{moment(transaction.dateSent).format('MMM')}</h2>
          <p>{moment(transaction.dateSent).format('Do')}</p>
        </StyledDate>
        {this.transactionType(transaction)}
        <StyledInfo> {confirmationCount} </StyledInfo>
        {toOrFrom}
      </StyledTableRow>
    )
  }
}

const StyledProgress = styled.td`
  position: absolute;
  left: 29px;
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

const StyledFARight = styled(FontAwesomeIcon)`
  font-style: normal;
  color: #c20e25;
  padding: 2px;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 50%;
`

const StyledFAUp = styled(FontAwesomeIcon)`
  font-style: normal;
  color: #827a7a;
  padding: 2px;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 50%;
`
