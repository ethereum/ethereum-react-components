/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import blockies from 'ethereum-blockies'
import styled, { css } from 'styled-components'
import i18n from '../i18n/'
import hqxConstructor from '../lib/hqx'

const mod = { Math: window.Math }
hqxConstructor(mod)
const { hqx } = mod

export default class Identicon extends Component {
  static propTypes = {
    address: PropTypes.string,
    classes: PropTypes.string,
    size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large'])
  }

  static defaultProps = {
    address: '0x0000000000000000000000000000000000000000',
    size: 'medium'
  }

  // uses hqx pixel scaling with max value 4 x 2 = factor 8
  identiconData(address) {
    return hqx(
      hqx(blockies.create({ seed: address, size: 8, scale: 1 }), 4),
      4
    ).toDataURL()
  }

  // uses blockie's factor 8 scaling
  identiconDataPixel(address) {
    return blockies.create({ seed: address, size: 8, scale: 8 }).toDataURL()
  }

  render() {
    const { address, size, classes } = this.props

    return (
      <StyledSpan
        className={classes}
        backgroundImage={`url('${this.identiconData(address.toLowerCase())}')`}
        size={size}
        title={i18n.t('elements.identiconHelper')}>
        <StyledImg src={this.identiconDataPixel(address.toLowerCase())} />
      </StyledSpan>
    )
  }
}

const StyledSpan = styled.span`
  background-image: ${props => props.backgroundImage};
  background-size: cover;
  border-radius: 50%;
  box-shadow: inset 0 4px 4px hsla(0,0%,100%,.4), inset 0 -4px 6px rgba(0,0,0,.5);
  cursor: help;
  display: inline-block;
  overflow: hidden;
  transition: border-radius 2.5s;
  transition-delay: 3s;
  height: 48px;
  width: 48px;
  :hover {
    border-radius: 15%;
    transition-delay: 1s;
  }

  ${props =>
    props.size === 'tiny' &&
    css`
      height: 21px;
      width: 21px;
      box-shadow: inset 0 1px 1px hsla(0, 0%, 100%, 0.4),
        inset 0 -1px 2px rgba(0, 0, 0, 0.3);
    `}

  ${props =>
    props.size === 'small' &&
    css`
      height: 32px;
      width: 32px;
      box-shadow: inset 0 2px 2px hsla(0, 0%, 100%, 0.4),
        inset 0 -2px 4px rgba(0, 0, 0, 0.4);
    `}

  ${props =>
    props.size === 'large' &&
    css`
      height: 64px;
      width: 64px;
      box-shadow: inset 0 4px 8px hsla(0, 0%, 100%, 0.4),
        inset 0 -4px 12px rgba(0, 0, 0, 0.6);
    `}
`

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
  transition: opacity 5s;
  opacity: 0;
  :hover {
    transition: opacity 0.25s;
    opacity: 1;
  }
`
