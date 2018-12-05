// https://codepen.io/haniotis/pen/KwvYLO

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Checkmark.scss'

export default class Checkmark extends Component {
  static displayName = 'Checkmark'

  static propTypes = {
    size: PropTypes.number
  }

  static defaultProps = {
    size: 32
  }

  render() {
    const { size } = this.props
    return (
      <svg
        className="checkmark"
        style={{
          width: size,
          height: size
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52">
        <circle
          className="checkmark__circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    )
  }
}
