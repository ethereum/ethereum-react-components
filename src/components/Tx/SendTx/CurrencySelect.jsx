import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Identicon from '../../Identicon'

export default class CurrencySelect extends Component {
  static displayName = 'CurrencySelect'

  static propTypes = {
    address: PropTypes.string,
    balance: PropTypes.string,
    onSelect: PropTypes.func,
    tokens: PropTypes.arrayOf(
      PropTypes.shape({
        balance: PropTypes.string,
        symbol: PropTypes.string,
        address: PropTypes.string,
        name: PropTypes.string
      })
    )
  }

  static defaultProps = {
    tokens: []
  }

  state = {
    selectedCurrency: 'ETHER'
  }

  chooseCurrency = selectedCurrency => {
    const { onSelect } = this.props

    this.setState({ selectedCurrency }, () => {
      if (onSelect) {
        onSelect(selectedCurrency)
      }
    })
  }

  renderCurrencyRow = currency => {
    const { selectedCurrency } = this.state
    const { address, balance, name, symbol } = currency

    let symbolDisplay
    if (name === 'ETHER') {
      symbolDisplay = (
        <StyledSymbol unselected={selectedCurrency !== 'ETHER'}>Ξ</StyledSymbol>
      )
    } else {
      symbolDisplay = <StyledIdenticon size="tiny" address={address} />
    }

    return (
      <StyledRow>
        {symbolDisplay}
        <StyledName>{name}</StyledName>
        <StyledBalance>{` ${balance} ${symbol}`}</StyledBalance>
      </StyledRow>
    )
  }

  render() {
    const { address, balance, tokens } = this.props
    const { selectedCurrency } = this.state

    const currencyList = [
      { address, balance, name: 'ETHER', symbol: 'ETHER' },
      ...tokens
    ]

    if (currencyList.length === 1) {
      return <StyledDiv>{this.renderCurrencyRow(currencyList[0])}</StyledDiv>
    }

    return (
      <StyledList>
        {currencyList.map(currency => (
          <StyledListItem key={currency.address}>
            <StyledInput
              type="radio"
              id={currency.name}
              value={currency.name}
              name="choose-token"
              checked={currency.name === selectedCurrency}
              onChange={e => this.chooseCurrency(e.target.value)}
            />
            <StyledLabel htmlFor={currency.name}>
              {this.renderCurrencyRow(currency)}
            </StyledLabel>
          </StyledListItem>
        ))}
      </StyledList>
    )
  }
}

const StyledDiv = styled.div`
  box-sizing: border-box;
  position: relative;
  color: #695e5e;
  font-size: 16px;
  font-weight: normal;
  min-height: 30px;
  margin-top: 13.8px;
  padding: 4.6px 16px;
`

const StyledRow = styled.div`
  display: flex;
  width: 100%;
`

const StyledSpan = styled.span`
  flex: 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 25px;
`

const StyledSymbol = styled(StyledSpan)`
  box-sizing: border-box;
  flex: 0;
  display: inline-block;
  min-width: 22px;
  padding: 1px 0;
  height: 22px;
  background-clip: padding-box;
  border-radius: 50%;
  text-align: center;
  font-size: 14px;
  line-height: 19px;
  border: 1px solid #695e5e !important;

  ${props =>
    props.unselected &&
    css`
      border: 1px solid #02a8f3 !important;
    `}
`

const StyledIdenticon = styled(Identicon)`
  min-width: 21px;
`

const StyledName = styled(StyledSpan)`
  padding: 0 8px;
`

const StyledBalance = styled(StyledSpan)`
  color: #827a7a;
  flex-grow: 1;
  text-align: right;
`

const StyledLabel = styled.label`
  position: relative;
  font-weight: 300;
  color: #02a8f3;
  display: flex;
  overflow: hidden;
  height: 36.8px;
  transition: height 200ms, opacity 200ms, padding 200ms;
  cursor: pointer;
  background: #fafafa;
`

const StyledInput = styled.input`
  display: none !important;
`

const StyledListItem = styled.li`
  display: block;
  padding: 1px;
  margin: 0;
  text-align: -webkit-match-parent;
  > input:checked + label {
    position: relative;
    border-color: #695e5e;
    color: #695e5e;
    padding: 6.13333333px 16px;
    opacity: 1;
    background: #ccc6c6;
    font-weight: 400;
  }

  :hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  > input:not(:checked) + label {
    font-weight: 300;
    color: #02a8f3;
    display: flex;
    overflow: hidden;
    height: 36.8px;
    padding: 6.13333333px 16px;
    transition: height 200ms, opacity 200ms, padding 200ms;
    cursor: pointer;
    background: #fafafa;
  }
`

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  transition: box-shadow 800ms;
  background: #f5f4f2;
  margin-top: 13.8px;
`
