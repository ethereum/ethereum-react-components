/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import blockies from 'ethereum-blockies'
import styled from 'styled-components'
import hqxConstructor from '../lib/hqx'

const mod = {
  Math: window.Math
}
hqxConstructor(mod)
const { hqx } = mod

export default class Identicon extends Component {
  static propTypes = {
    seed: PropTypes.string,
    size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large'])
  }

  // uses hqx pixel scaling with max value 4 x 2 = factor 8
  identiconData(identity) {
    return hqx(
      hqx(
        blockies.create({
          seed: identity,
          size: 8,
          scale: 1
        }),
        4
      ),
      4
    ).toDataURL()
  }

  // uses blockie's factor 8 scaling
  identiconDataPixel(identity) {
    return blockies
      .create({
        seed: identity,
        size: 8,
        scale: 8
      })
      .toDataURL()
  }

  render() {

    const seed = this.props.seed ? this.props.seed : '0x0000000000000000000000000000000000000000'
    const size = this.props.size ? this.props.size : 'medium'
    const image = this.identiconData(seed.toLowerCase())
    const classes = this.props.classes ? this.props.classes : ''

    seed === '0x0000000000000000000000000000000000000000'
      ? console.warn("A seed was not passed as a prop to the Identicon")
      : null

    return (
      <StyledSpan
        className={classes}
        backgroundImage={`url('${image}')`}
        size={size}
        title={this.props.title 
          ? `This is a security icon. If there were any change to the address, the resulting icon would be a completely different one`
          : null
        }
        >
        <StyledImg
          src={image}
          className="identicon-pixel"
        />
      </StyledSpan>
    )
  }
}

const config = {
  tiny: {
    width: '21px',
    boxShadow:
      'inset 0 1px 1px hsla(0,0%,100%,.4), inset 0 -1px 2px rgba(0,0,0,.3)'
  },
  small: {
    width: '32px',
    boxShadow:
      'inset 0 2px 2px hsla(0,0%,100%,.4), inset 0 -2px 4px rgba(0,0,0,.4)'
  },
  medium: {
    width: '48px',
    boxShadow:
      'inset 0 4px 4px hsla(0,0%,100%,.4), inset 0 -4px 6px rgba(0,0,0,.5)'
  },
  large: {
    width: '64px',
    boxShadow:
      'inset 0 4px 8px hsla(0,0%,100%,.4), inset 0 -4px 12px rgba(0,0,0,.6)'
  }
}

const StyledSpan = styled.span`
  background-image: ${props => props.backgroundImage};
  background-size: cover;
  border-radius: 50%;
  box-shadow: ${props => config[props.size].boxShadow};
  cursor: help;
  display: inline-block;
  overflow: hidden;
  transition: border-radius 2.5s;
  transition-delay: 3s;
  height: ${props => config[props.size].width};
  width: ${props => config[props.size].width};
  :hover {
    border-radius: 15%;
    transition-delay: 1s;
  }
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
