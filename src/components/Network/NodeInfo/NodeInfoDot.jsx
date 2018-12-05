import React, { Component } from 'react'
import styled, { css, keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import PieChart from 'react-minimal-pie-chart'

class NodeInfoDot extends Component {
  static propTypes = {
    /** Active network */
    active: PropTypes.oneOf(['remote', 'local']).isRequired,
    /** Current network */
    network: PropTypes.oneOf(['main', 'rinkeby', 'kovan', 'private'])
      .isRequired,
    /** Local network data */
    local: PropTypes.shape({
      blockNumber: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired,
      sync: PropTypes.shape({
        highestBlock: PropTypes.number.isRequired,
        currentBlock: PropTypes.number.isRequired,
        startingBlock: PropTypes.number.isRequired
      }).isRequired
    }).isRequired,
    /** Remote network data */
    remote: PropTypes.shape({
      blockNumber: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired
    }).isRequired
  }

  static defaultProps = {}

  constructor(props) {
    super(props)

    this.state = {
      pulseColor: ''
    }
  }

  componentDidUpdate(prevProps) {
    // if new block arrived, add animation to light
    if (this.isNewBlock(prevProps, this.props)) {
      const pulseColor =
        prevProps.active === 'remote'
          ? 'orange'
          : this.props.network === 'main'
          ? 'green'
          : 'blue'

      this.setState({ pulseColor }, () => {
        setTimeout(() => {
          this.setState({ pulseColor: '' })
        }, 2000)
      })
    }
  }

  isNewBlock(prevProps, newProps) {
    if (prevProps.active === 'remote') {
      return prevProps.remote.blockNumber !== newProps.remote.blockNumber
    } else {
      return prevProps.local.blockNumber !== newProps.local.blockNumber
    }
  }

  secondsSinceLastBlock() {
    const { active } = this.props
    const lastBlock = moment(this.props[active].timestamp, 'X')
    return moment().diff(lastBlock, 'seconds')
  }

  render() {
    const { active, network, local, remote } = this.props
    const dotColor = network === 'main' ? '#7ed321' : '#00aafa'

    const { highestBlock, currentBlock, startingBlock } = local.sync
    const progress =
      ((currentBlock - startingBlock) / (highestBlock - startingBlock)) * 100

    return (
      <StyledLight>
        <div className="pie-container">
          <div
            id="node-info__light"
            className={this.state.pulseColor}
            style={{
              backgroundColor:
                this.secondsSinceLastBlock() > 60
                  ? 'red'
                  : active === 'remote'
                  ? 'orange'
                  : dotColor
            }}
          />
          {active === 'remote' && currentBlock !== 0 && (
            <PieChart
              startAngle={-90}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2,
                height: 16
              }}
              data={[
                { value: progress || 0, key: 1, color: dotColor },
                { value: 100 - (progress || 1), key: 2, color: 'orange' }
              ]}
            />
          )}
        </div>
      </StyledLight>
    )
  }
}

const beaconOrange = keyframes`
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(255, 165, 0, 0.4);
    box-shadow: 0 0 0 0 rgba(255, 165, 0, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 10px rgba(255, 165, 0, 0);
    box-shadow: 0 0 0 10px rgba(255, 165, 0, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(255, 165, 0, 0);
    box-shadow: 0 0 0 0 rgba(255, 165, 0, 0);
  }
`

const beaconGreen = keyframes`
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(36, 195, 58, 0.4);
    box-shadow: 0 0 0 0 rgba(36, 195, 58, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 10px rgba(36, 195, 58, 0);
    box-shadow: 0 0 0 10px rgba(36, 195, 58, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(36, 195, 58, 0);
    box-shadow: 0 0 0 0 rgba(36, 195, 58, 0);
  }
`

const beaconBlue = keyframes`
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(0, 170, 250, 0.4);
    box-shadow: 0 0 0 0 rgba(0, 170, 250, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 10px rgba(0, 170, 250, 0);
    box-shadow: 0 0 0 10px rgba(0, 170, 250, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(0, 170, 250, 0);
    box-shadow: 0 0 0 0 rgba(0, 170, 250, 0);
  }
`

const StyledLight = styled.div`
  position: relative;
  z-index: 1;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  transition: background-color ease-in-out 5s;

  ${state =>
    state.pulseColor === 'orange' &&
    css`
      animation: ${beaconOrange} ease-in-out;
      animation-duration: 2s;
    `}

  ${state =>
    state.pulseColor === 'green' &&
    css`
      animation: ${beaconGreen} ease-in-out;
      animation-duration: 2s;
    `}

  ${state =>
    state.pulseColor === 'blue' &&
    css`
      animation: ${beaconBlue} ease-in-out;
      animation-duration: 2s;
    `}
`

export default NodeInfoDot
