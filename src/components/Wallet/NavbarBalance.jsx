import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class NavbarBalance extends Component {
  static displayName = 'NavbarBalance'

  static propTypes = {
    balance: PropTypes.string,
    currency: PropTypes.string,
    network: PropTypes.string
  }

  static defaultProps = {
    currency: 'ETHER*',
    balance: '0.00',
    network: 'rinkeby'
  }

  constructor(props) {
    super(props)
    this.state = {
      balance: '0.00'
    }
  }

  componentDidMount() {
    this.mounted = true
    let { balance: bal1 } = this.state
    let { balance: bal2 } = this.props
    bal1 = parseFloat(bal1)
    bal2 = parseFloat(bal2)
    if (bal1 !== bal2) {
      this.changeBalance(bal1, bal2)
    }
  }

  componentDidUpdate() {
    let { balance: bal1 } = this.state
    let { balance: bal2 } = this.props
    bal1 = parseFloat(bal1)
    bal2 = parseFloat(bal2)
    if (bal1 !== bal2) {
      this.changeBalance(bal1, bal2)
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  changeBalance = (bal1, bal2) => {
    setTimeout(() => {
      if (this.mounted) {
        this.setState({
          balance: bal1 < bal2 ? this.increment(bal1) : this.decrement(bal1)
        })
      }
    }, 20)
  }

  increment = bal1 => {
    return (bal1 + 0.01).toFixed(2).toString()
  }

  decrement = bal1 => {
    return (bal1 - 0.01).toFixed(2).toString()
  }

  render() {
    const { currency, network } = this.props
    const { balance } = this.state

    let currencySelect
    let title
    if (network !== 'main') {
      currencySelect = currency
      title = 'This is testnet ether, no real market value'
    } else {
      currencySelect = <StyledButton type="button">ETHER</StyledButton>
    }
    return (
      <React.Fragment>
        <StyledLi>
          <StyledDiv>Balance</StyledDiv>
          <StyledBalance>
            {balance}
            <StyledCurrency title={title}>{currencySelect}</StyledCurrency>
          </StyledBalance>
        </StyledLi>
      </React.Fragment>
    )
  }
}

const StyledLi = styled.li`
  list-style: none;
  font: 300 16px 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  color: #111111;
  display: inline-block;
  padding: 0;
  margin: 0;
  margin-bottom: 0;
  padding-bottom: 7.26666667px;
  padding-left: 32px;
  text-align: right;
  flex: 0 2 auto;
`

const StyledDiv = styled.div`
  clear: both;
  margin: 16px 0;
  padding: 0;
  color: rgba(130, 122, 122, 0.7);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1em;
  margin-bottom: 0;
`

const StyledBalance = styled.span`
  text-align: right;
  box-sizing: border-box;
  color: #827a7a;
  font-size: 1.6em;
`

const StyledCurrency = styled.span`
  padding-left: 5px;
  box-sizing: border-box;
  z-index: 20;
  position: relative;
  display: inline-block;
  font-size: 0.6em;
`

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  text-align: center;
  color: #0285c0;
  transform-origin: 50% 100%;
  text-transform: uppercase;
  font-weight: 400;
`
