import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Identicon } from '..'
import styled from 'styled-components'
import GeoPattern from 'geopattern'

export default class TokenCard extends Component {
  static displayName = 'TokenCard'

  static propTypes = {
    address: PropTypes.string,
    name: PropTypes.string,
    amount: PropTypes.string
  }

  static defaultProps = {
    amount: '0.000000000000000000'
  }

  render() {
    const { address, name, amount } = this.props

    const pattern = GeoPattern.generate(address || '', { color: '#CCC6C6' })

    return (
      <StyledWrapper pattern={pattern.toDataUrl()}>
        <Left>
          <StyledIdenticon address={address} size="small" />
        </Left>
        <Right>
          {address && (
            <React.Fragment>
              <StyledName>{name}</StyledName>
              <StyledAmount>{amount}</StyledAmount>
              <StyledAddress>{address}</StyledAddress>
            </React.Fragment>
          )}
        </Right>
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  width: 208px;
  min-height: 73.6px;
  padding-right: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 0;
  -webkit-transition: background-color 1600ms, opacity 400ms;
  -moz-transition: background-color 1600ms, opacity 400ms;
  -o-transition: background-color 1600ms, opacity 400ms;
  transition: background-color 1600ms, opacity 400ms;
  perspective: 800px;
  position: relative;
  background-repeat: repeat-y;
  background-color: #ccc6c6;
  background-size: cover;
  background-position-x: 4px;
  background-blend-mode: overlay;
  overflow: hidden;
  transform-style: preserve-3d;
  background-image: ${props => props.pattern};
`

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyledIdenticon = styled(Identicon)`
  border: #fafafa solid 2px;
`

const StyledName = styled.div`
  color: #02a8f3;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyledAmount = styled.div`
  color: #827a7a;
  font-size: 1em;
  line-height: 1.3em;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyledAddress = styled.div`
  color: rgba(130, 122, 122, 0.6);
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
`
