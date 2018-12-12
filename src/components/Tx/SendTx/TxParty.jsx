import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Identicon from '../../Identicon'
import i18n from '../../../i18n'

export default class TxParty extends Component {
  static propTypes = {
    address: PropTypes.string,
    addressType: PropTypes.oneOf(['origin', 'user', 'contract']),
    isContract: PropTypes.bool
  }

  static defaultProps = {
    addressType: 'origin',
    isContract: false
  }

  renderDirectionText = () => {
    const { addressType } = this.props

    switch (addressType) {
      case 'user':
        return i18n.t('mist.sendTx.to')
      case 'contract':
        return i18n.t('mist.sendTx.contract')
      default:
        return i18n.t('mist.sendTx.from')
    }
  }

  render() {
    const { address, addressType, isContract } = this.props

    return (
      <StyledWrapper className="tx-parties__party">
        <Identicon address={address.toLowerCase()} size="small" />
        <StyledDirectionName
          isContract={isContract || addressType === 'contract'}>
          {this.renderDirectionText()}
        </StyledDirectionName>
        <StyledAddress>{address}</StyledAddress>
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 8px 0;
`

const StyledDirectionName = styled.div`
  display: inline-block;
  margin: 0 5px 0 15px;
  width: 50px;

  ${props =>
    props.isContract &&
    css`
      width: 75px;
    `}
`

const StyledAddress = styled.div`
  font-weight: bold;
`
