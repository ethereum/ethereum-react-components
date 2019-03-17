// https://codepen.io/vissuel/pen/WwmOdO

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

export default class Cross extends Component {
  static displayName = 'AnimatedCross'

  static propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    color: PropTypes.string
  }

  static defaultProps = {
    size: 32,
    color: '#e55454'
  }

  render() {
    const { size, style, color } = this.props

    return (
      <CrossSvg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
        style={{
          ...style,
          width: size,
          height: size
        }}
      >
        <CrossCircle cx="26" cy="26" r="25" fill="none" color={color} />
        <CrossPath color={color} fill="none" d="M16,16 l20,20" />
        <CrossPath color={color} left fill="none" d="M16,36 l20,-20" />
      </CrossSvg>
    )
  }
}

const StrokeAnimation = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`

const CrossSvg = styled.svg`
  border-radius: 50%;
  display: inline-block;
  stroke-width: 3;
  margin-left: 10px;
`

const CrossCircle = styled.circle`
  animation: 0.6s ease 0s normal forwards 1 running ${StrokeAnimation};
  fill: none;
  margin: 0 auto;
  stroke: ${({ color }) => color};
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
`

const CrossPath = styled.path`
  stroke: ${({ color }) => color};
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  transform-origin: 50% 50% 0;
  animation: ${({ left }) => (left ? '1s' : '0.3s')} ease 0.8s normal forwards 1
    running ${StrokeAnimation};
`
