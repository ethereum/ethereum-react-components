import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import i18n from '../../../i18n'

export default class GasNotification extends Component {
  static displayName = 'GasNotification'

  static propTypes = {
    gasError: PropTypes.oneOf(['notEnoughGas', 'overBlockGasLimit'])
  }

  render() {
    const { gasError } = this.props

    switch (gasError) {
      case 'notEnoughGas':
        return <StyledError>{i18n.t('mist.sendTx.notEnoughGas')}</StyledError>
      case 'overBlockGasLimit':
        return (
          <StyledError>{i18n.t('mist.sendTx.overBlockGasLimit')}</StyledError>
        )
      default:
        return null
    }
  }
}

const StyledError = styled.div`
  color: red;
`
