// https://codepen.io/haniotis/pen/KwvYLO

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

export default class Checkmark extends Component {
  static displayName = 'Checkmark'

  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string
  }

  static defaultProps = {
    size: 32,
    color: '#7ac142'
  }

  render() {
    const { size, color } = this.props

    return (
      <Svg
        color={color}
        style={{
          width: size,
          height: size
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <Circle color={color} cx="26" cy="26" r="25" fill="none" />
        <Path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </Svg>
    )
  }
}

const stroke = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`

const scale = keyframes`
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
`

const fill = color => keyframes`
 100% {
    box-shadow: inset 0px 0px 0px 30px ${color};
  }
`

const Svg = styled.svg`
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px ${({ color }) => color};
  animation: ${({ color }) => fill(color)} 0.4s ease-in-out 0.4s forwards,
    ${scale} 0.3s ease-in-out 0.9s both;
`

const Circle = styled.circle`
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: ${({ color }) => color};
  fill: none;
  animation: ${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`

const Path = styled.path`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
`
