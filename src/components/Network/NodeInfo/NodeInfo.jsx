import React, { Component } from 'react'
import moment from 'moment'
// import PieChart from 'react-minimal-pie-chart'
import PropTypes from 'prop-types'
import i18n from '../../../i18n'
import Pulse from '../../Widgets/AnimatedIcons/Pulse'

import './NodeInfo.scss'

import NodeInfoDot from './NodeInfoDot'
import NodeInfoBox from './NodeInfoBox'

// FIXME
const numeral = val => {
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
    const { network, active, remote, local } = this.props
    const { showSubmenu } = this.state

    let mainClass = network === 'main' ? 'node-mainnet' : 'node-testnet'
    if (this.state.sticky) mainClass += ' sticky'

    return (
      <div
        id="node-info"
        className={mainClass}
        onMouseUp={() => this.setState({ sticky: !this.state.sticky })}
        onMouseEnter={() => this.setState({ showSubmenu: true })}
        onMouseLeave={() => this.setState({ showSubmenu: this.state.sticky })}>
        <NodeInfoDot
          network={network}
          active={active}
          remote={remote}
          local={local}
        />

        {showSubmenu && (
          <NodeInfoBox
            network={network}
            active={active}
            remote={remote}
            local={local}
          />
        )}
      </div>
    )
  }
}

export default NodeInfo
