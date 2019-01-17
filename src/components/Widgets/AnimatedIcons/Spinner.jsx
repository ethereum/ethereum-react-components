import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import 'loaders.css'

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
      <StyledWrapper style={{ transform: `scale(${scale}, ${scale})` }}>
        <div className="ball-spin-fade-loader">
          {[...Array(divCount)].map((_, idx) => (
            <div key={idx} style={style} />
          ))}
        </div>
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  box-sizing: border-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -ms-flex-preferred-size: 25%;
  flex-basis: 25%;
  max-width: 25%;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
`
