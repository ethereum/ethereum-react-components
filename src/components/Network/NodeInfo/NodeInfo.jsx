import React, { Component } from 'react'
import moment from 'moment'
// import PieChart from 'react-minimal-pie-chart'
import PropTypes from 'prop-types'
import i18n from '../../../i18n'
import { Pulse } from '../../Widgets/LoadingAnimations';

import './NodeInfo.scss'

import NodeInfoDot from './NodeInfoDot'
import NodeInfoBox from './NodeInfoBox'

// FIXME
const numeral = (val) => {
  return {
    format: () => `${val}`
  }
}

class NodeInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSubmenu: false
    }
  }

  render() {
    const { network, active } = this.props
    const { showSubmenu } = this.state

    let mainClass = network === 'main' ? 'node-mainnet' : 'node-testnet'
    if (this.state.sticky) mainClass += ' sticky'

    return (
      <div
        id="node-info"
        className={mainClass}
        onMouseUp={() => this.setState({ sticky: !this.state.sticky })}
        onMouseEnter={() => this.setState({ showSubmenu: true })}
        onMouseLeave={() => this.setState({ showSubmenu: this.state.sticky })}
      >
        <NodeInfoDot network={network} active={active} />

        {showSubmenu && (
          <NodeInfoBox />
        )}
      </div>
    )
  }
}

/*
NodeInfo.propTypes = {
}
*/

/*
function mapStateToProps(state) {
  return {
    active: state.nodes.active,
    network: state.nodes.network,
    remote: state.nodes.remote,
    local: state.nodes.local,
    // re-render when connectedPeers or remoteBlockNumber changes
    connectedPeers: state.nodes.local.sync.connectedPeers, 
    remoteBlockNumber: state.nodes.remote.blockNumber
  }
}
*/

const NodeInfoWrapper = () => {
  const data = {
    active: 'remote',
    network: 'main',
    changingNetwork: false,
    remote: {
      client: 'infura',
      blockNumber: 100, // if < 1000 NodeInfo will display "connecting.."
      timestamp: 0
    },
    local: {
      client: 'geth',
      blockNumber: 1,
      timestamp: 0,
      syncMode: 'fast',
      sync: {
        connectedPeers: 0,
        currentBlock: 1,
        highestBlock: 0,
        knownStates: 0,
        pulledStates: 0,
        startingBlock: 0
      }
    }
  }
  return (
    <NodeInfo {...data} />
  )
}

NodeInfoWrapper.displayName = 'NodeInfo'

NodeInfoWrapper.propTypes = {
  network: PropTypes.oneOf(['main', 'private'])
}

// export default NodeInfo
export default NodeInfoWrapper
