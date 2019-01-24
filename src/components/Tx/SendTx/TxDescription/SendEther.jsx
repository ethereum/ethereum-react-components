import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class SendEther extends Component {
  static displayName = 'SendEther'

  static propTypes = {
    network: PropTypes.string,
    value: PropTypes.string,
    valueInUSD: PropTypes.string
  }

  static defaultProps = {}

  render() {
    const { network, value, valueInUSD } = this.props

    let conversion = <span>About ${valueInUSD} USD</span>

    if (network !== 'main') {
      conversion = (
        <span>
          $0 (<Capitalize>{network}</Capitalize>)
        </span>
      )
    }

    return (
      <StyledWrapper>
        <div>
          <Bold>Transfer</Bold> {value.toString()} Ether
        </div>
        <StyledSubtext>{conversion}</StyledSubtext>
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  font-size: 36px;
`

const StyledSubtext = styled.div`
  font-size: 16px;
  margin: 12px 0;
`

const Bold = styled.span`
  font-weight: bold;
`

const Capitalize = styled.span`
  text-transform: capitalize;
`
