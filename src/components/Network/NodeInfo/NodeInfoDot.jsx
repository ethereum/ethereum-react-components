import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

class NodeInfoDot extends Component {
  static propTypes = {
    /** Some definition of the prop */
    active: PropTypes.oneOf(['remote', 'local']),
    network: PropTypes.oneOf(['main', 'rinkeby', 'kovan', 'private'])
  }

  static defaultProps = {}

  render() {
    const { network, active } = this.props

    let dotColor = network === 'main' ? '#7ed321' : '#00aafa'
    dotColor = diff > 60 ? 'red' : active === 'remote' ? 'orange' : dotColor
    const currentBlock = 100
    const lightClasses = 'pulse-light__orange'
    const diff = 10

    return (
      <div className="pie-container">
        {/*<Pulse fill color="orange" />*/}
        <div
          id="node-info__light"
          className={lightClasses}
          style={{
            backgroundColor: dotColor
          }}
        />
        {/*
      {active === 'remote' && currentBlock !== 0 && (
      <div>
        <PieChart
          startAngle={-90}
          style={{
            position: 'absolute',
            top: 22,
            left: 0,
            zIndex: 2,
            height: 16
          }}
          data={[
            { value: progress || 0, key: 1, color: dotColor },
            { value: 100 - (progress || 1), key: 2, color: 'orange' }
          ]}
        />
      </div>
      )}
      */}
      </div>
    )
  }
}

const StyledInnerDiv = styled.div``

const StyledOuterDiv = styled.div``

export default NodeInfoDot
