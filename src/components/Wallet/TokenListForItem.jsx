import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Identicon from '../Identicon'

export default class TokenListForItem extends Component {
  static displayName = 'TokenListForItem'

  static propTypes = {
    tokens: PropTypes.array
  }

  static defaultProps = {
    tokens: []
  }

  render() {
    const { tokens } = this.props

    // restrict the number of token icons displayed
    const tokenSubset = tokens.slice(0, 5)

    const tokenIdenticons = tokenSubset.map(token => (
      <IdenticonWrapper key={token.address}>
        <Identicon address={token.address} size="nano" />
      </IdenticonWrapper>
    ))

    return <StyledWrapper>{tokenIdenticons}</StyledWrapper>
  }
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 3px;
`

const IdenticonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 12px;
  width: 10px;
`
