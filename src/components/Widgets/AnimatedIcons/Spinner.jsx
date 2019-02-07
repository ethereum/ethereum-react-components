import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

// for more examples see https://connoratherton.com/loaders
// https://github.com/ConnorAtherton/loaders.css
export default class Spinner extends Component {
  static displayName = 'Spinner'

  static propTypes = {
    color: PropTypes.string,
    scale: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    scale: '1',
    color: '#AAA'
  }

  render() {
    const { color, scale, style } = this.props

    const divCount = 8

    return (
      <StyledWrapper
        scale={scale}
        style={{ transform: `scale(${scale}, ${scale})`, ...style }}
      >
        {[...Array(divCount)].map((_, idx) => (
          <div key={idx} style={{ backgroundColor: color }} />
        ))}
      </StyledWrapper>
    )
  }
}

const BallSpin = keyframes`
  50% {
    opacity: 0.3;
    transform: scale(0.4);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const StyledWrapper = styled.div`
  position: relative;
  display: block;
  width: 68px;
  height: 68px;
  box-sizing: border-box;

  & > div {
    background-color: #fff;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    animation-fill-mode: both;
    position: absolute;
  }
  & > div:nth-child(1) {
    top: 50px;
    left: 25px;
    animation: ${BallSpin} 1s -0.96s infinite linear;
  }
  & > div:nth-child(2) {
    top: 42.04545px;
    left: 42.04545px;
    animation: ${BallSpin} 1s -0.84s infinite linear;
  }
  & > div:nth-child(3) {
    top: 25px;
    left: 50px;
    animation: ${BallSpin} 1s -0.72s infinite linear;
  }
  & > div:nth-child(4) {
    top: 8.04545px;
    left: 42.04545px;
    animation: ${BallSpin} 1s -0.6s infinite linear;
  }
  & > div:nth-child(5) {
    top: 0px;
    left: 25px;
    animation: ${BallSpin} 1s -0.48s infinite linear;
  }
  & > div:nth-child(6) {
    top: 8.04545px;
    left: 8.04545px;
    animation: ${BallSpin} 1s -0.36s infinite linear;
  }
  & > div:nth-child(7) {
    top: 25px;
    left: 0;
    animation: ${BallSpin} 1s -0.24s infinite linear;
  }
  & > div:nth-child(8) {
    top: 42.04545px;
    left: 8.04545px;
    animation: ${BallSpin} 1s -0.12s infinite linear;
  }
`
