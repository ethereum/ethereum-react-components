import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'loaders.css'
import './LoadingAnimations.css'

// for more examples see https://connoratherton.com/loaders
// https://github.com/ConnorAtherton/loaders.css
export default class Spinner extends Component {
  static displayName = 'Spinner'

  static propTypes = {
    pstyle: PropTypes.any
  }

  render() {
    const { pstyle } = this.props

    const divCount = 8
    const style = { backgroundColor: '#AAA' }

    return (
      <div
        className="loader"
        style={{
          ...pstyle,
          width: '65px',
          height: '65px'
        }}>
        <div className="ball-spin-fade-loader">
          {[...Array(divCount)].map((_, idx) => (
            <div key={idx} style={style} />
          ))}
        </div>
      </div>
    )
  }
}
