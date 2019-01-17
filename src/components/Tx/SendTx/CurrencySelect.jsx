import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Identicon from '../../Identicon'

export default class CurrencySelect extends Component {
  static displayName = 'CurrencySelect'

  static propTypes = {
    etherWallet: PropTypes.object,
    onClick: PropTypes.func,
    tokens: PropTypes.array
  }

  static defaultProps = {
    etherWallet: {
      name: 'ETHER',
      symbol: 'ETHER',
      decimals: '10',
      address: '0x123456BfA2A4DFAbdD1Fad5A1cb73a63345zzzzz',
      balance: '0.00'
    },
    tokens: []
  }

  chooseCurrency = e => {
    const { onClick } = this.props
    if (onClick) {
      onClick(e)
    }
  }

  static renderCurrencySpans = currency => {
    return (
      <React.Fragment>
        {currency.name === 'ETHER' ? (
          <StyledSymbol className="ether-symbol">Ξ</StyledSymbol>
        ) : (
          <StyledIdenticon size="tiny" address={currency.address} />
        )}
        <StyledName className="currency-name">{currency.name}</StyledName>
        <StyledBalance className="balance">
          {` ${currency.balance} ${currency.symbol}`}
        </StyledBalance>
      </React.Fragment>
    )
  }

  render() {
    const { etherWallet, tokens } = this.props
    const currencyList = [...tokens]
    currencyList.unshift(etherWallet)

    return (
      <React.Fragment>
        {currencyList.length === 1 ? (
          <StyledDiv>
            {CurrencySelect.renderCurrencySpans(currencyList[0])}
          </StyledDiv>
        ) : (
          <StyledUL className="select-currency">
            {currencyList.map(currency => (
              <StyledLI key={currency.address} onClick={this.chooseCurrency}>
                <StyledInput
                  type="radio"
                  id={currency.name}
                  value={currency.address}
                  name="choose-token"
                />
                <StyledLabel
                  htmlFor={currency.name}
                  onClick={this.chooseCurrency}
                >
                  {CurrencySelect.renderCurrencySpans(currency)}
                </StyledLabel>
              </StyledLI>
            ))}
          </StyledUL>
        )}
      </React.Fragment>
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

  .balance {
    float: right;
  }

  .currency-name {
    position: absolute;
  }

  .ether-symbol {
    border: 1px solid #695e5e !important;
  }
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
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  text-align: center;
  font-size: 14px;
  line-height: 19px;
`

const StyledName = styled(StyledSpan)`
  padding-left: 8px;
  padding-right: 8px;
`

const StyledBalance = styled(StyledSpan)`
  text-align: right;
  color: #827a7a;
  float: ${props => props.float || ''};
`

const StyledLabel = styled.label`
  -webkit-box-sizing: border-box;
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

const StyledLI = styled.li`
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

    .ether-symbol {
      border: 1px solid #695e5e !important;
    }
  }

  :hover {
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
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

    .ether-symbol {
      border: 1px solid #02a8f3 !important;
    }
  }
`

const StyledUL = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  transition: box-shadow 800ms;
  background: #f5f4f2;
  margin-top: 13.8px;
`

const StyledIdenticon = styled(Identicon)`
  flex: 0;
  min-width: 21px;
`
