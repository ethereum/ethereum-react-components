import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Identicon from '../../Identicon'

export default class CurrencySelect extends Component {
  static displayName = 'CurrencySelect'

  static propTypes = {
    etherBalance: PropTypes.string,
    tokens: PropTypes.array
  }

  static defaultProps = {
    etherBalance: '0',
    tokens: []
  }

  chooseToken = e => {
    console.log(e.target)
    console.log(e.currentTarget)
    const { onClick } = this.props
    if (onClick) {
      onClick(e)
    }
  }

  renderEther() {
    const { etherBalance } = this.props
    return (
      <React.Fragment>
        <StyledSymbol className="ether-symbol">Ξ</StyledSymbol>
        <StyledName className="token-name">ETHER</StyledName>
        <StyledBalance className="balance">
          {` ${etherBalance} ETHER`}
        </StyledBalance>
      </React.Fragment>
    )
  }

  renderTokens() {
    const { etherBalance, tokens } = this.props
    return (
      <StyledUL className="select-token">
        <StyledLI onClick={this.chooseToken}>
          <StyledInput type="radio" />
          <StyledLabel htmlFor="ether" onClick={this.chooseToken}>
            {this.renderEther()}
          </StyledLabel>
        </StyledLI>
        <StyledLI onClick={this.chooseToken}>
          <StyledInput type="radio" />
          <StyledLabel htmlFor="ether" onClick={this.chooseToken}>
            <StyledIdenticon size="tiny" address="asdf" />
            <StyledName className="token-name">ETHER</StyledName>
            <StyledBalance className="balance">
              {` ${etherBalance} tokenName`}
            </StyledBalance>
          </StyledLabel>
        </StyledLI>
        {/*}
        {tokens.map(token => (
          <StyledLI key={token.address}>
            <label htmlFor={token.address}>
              <StyledIdenticon size="tiny" address={token.address} />
              <span className="token-name">{token.name}</span>
              <span className="balance">
                {`${token.balance} ${token.symbol}` }
              </span>
            </label>
          </StyledLI>
        ))}
      */}
      </StyledUL>
    )
  }

  render() {
    const { tokens } = this.props
    return <React.Fragment>{this.renderTokens()}</React.Fragment>
  }
}

//      {
//   (!tokens ?
//     (
//       <div className="token-ether">
//       { this.renderEther() }
//       </div>
//     )
//     : this.renderTokens())

//   )
// }

const StyledSpan = styled.span`
  flex: 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyledSymbol = styled(StyledSpan)`
  -webkit-box-flex: 0;
  flex: 0;
  display: inline-block;
  min-width: 22px;
  padding: 1px 0;
  height: 22px;
  border: 1px solid #02a8f3;
  background-clip: padding-box;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  text-align: center;
  font-size: 14px;
`

const StyledName = styled(StyledSpan)`
  padding-left: 8px;
  padding-right: 8px;
`

const StyledBalance = styled(StyledSpan)`
  text-align: right;
  color: #827a7a;
`

const StyledLabel = styled.label`
  font-weight: 300;
  color: #02a8f3;
  display: flex;
  overflow: hidden;
  height: 36.8px;
  padding: 6.13333333px 16px;
  transition: height 200ms, opacity 200ms, padding 200ms;
  cursor: pointer;
  background: #fafafa;
`

const StyledInput = styled.input`
  display: none !important;
  &:checked {
    position: relative;
    border-color: #ccc6c6;
    color: #695e5e;
    padding: 6.13333333px 16px;
    opacity: 1;
    background: #ccc6c6;
    font-weight: 400;
  }
`

const StyledLI = styled.li`
  display: block;
  padding: 0;
  margin: 0;
  text-align: -webkit-match-parent;
`
// &:checked {
//     position: relative;
//     border-color: #ccc6c6;
//     color: #695e5e;
//     padding: 6.13333333px 16px;
//     opacity: 1;
//     background: #ccc6c6;
//     font-weight: 400;
//   }

const StyledUL = styled.ul`
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
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
