import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import i18n from '../../../../i18n'
import { formatTokenCount } from '../../../../util/formatters'

export default class TokenTransfer extends Component {
  static displayName = 'TokenTransfer'

  static propTypes = {
    params: PropTypes.array,
    token: PropTypes.object
  }

  static defaultProps = {
    token: { decimals: 18 }
  }

  render() {
    const { params, token } = this.props

    if (params.length === 0) return null

    const tokenCount = formatTokenCount(params[1].value, token.decimals)

    const tokenSymbol = token.symbol || i18n.t('mist.sendTx.tokens')

    return (
      <StyledWrapper>
        <Bold>{i18n.t('mist.sendTx.transfer')} </Bold>
        {tokenCount} {tokenSymbol}
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  margin: 18px 0 24px;
  font-size: 36px;
  text-align: left;
`

const Bold = styled.span`
  font-weight: bold;
`
