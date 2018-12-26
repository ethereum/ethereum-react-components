import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'loaders.css'
import './LoadingAnimations.css'

// for more examples see https://connoratherton.com/loaders
// https://github.com/ConnorAtherton/loaders.css
export default class Spinner extends Component {
  static displayName = 'Spinner'

  static propTypes = {
    scale: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps = {
    scale: '1',
    color: '#AAA'
  }

  render() {
    const { color, scale } = this.props

    const divCount = 8
    const style = { backgroundColor: color }

    return (
      <div
        className="loader"
        style={{ transform: `scale(${scale}, ${scale})` }}>
        <div className="ball-spin-fade-loader">
          {[...Array(divCount)].map((_, idx) => (
            <div key={idx} style={style} />
          ))}
        </div>
      </div>
    )
  }
}
