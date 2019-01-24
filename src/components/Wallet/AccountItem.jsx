import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import Identicon from '../Identicon'
import TokenListForItem from './TokenListForItem'
import EthAddress from '../EthAddress'

export default class AccountItem extends Component {
  static displayName = 'AccountItem'

  static propTypes = {
    address: PropTypes.string,
    balance: PropTypes.string,
    name: PropTypes.string,
    tokens: PropTypes.array
  }

  static defaultProps = {
    balance: '0',
    tokens: []
  }

  render() {
    const { address, balance, name, tokens } = this.props

    return (
      <StyledWrapper>
        <FlexWrapper>
          <Identicon address={address} size="small" />
        </FlexWrapper>

        {!!tokens.length && <TokenListForItem tokens={tokens} />}

        <FlexWrapper>
          <StyledName>
            <FontAwesomeIcon icon={faKey} style={{ width: '0.8em' }} /> {name}
          </StyledName>

          <StyledBalance>
            {balance} <StyledBalanceEther>ether</StyledBalanceEther>
          </StyledBalance>

          <StyledAddress>
            <EthAddress address={address} short />
          </StyledAddress>
        </FlexWrapper>
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  display: flex;
  width: 220px;
  margin-bottom: 12px;
`

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 6px;
`

const StyledName = styled.div`
  color: #00aafa;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyledBalance = styled.div`
  color: #827a7a;
  font-size: 1.3em;
  line-height: 22px;
  text-overflow: ellipsis;
`

const StyledBalanceEther = styled.span`
  font-size: 0.6em;
`

const StyledAddress = styled.div`
  color: rgba(130, 122, 122, 0.6);
  font-size: 0.8em;
  line-height: 1.4em;
`
