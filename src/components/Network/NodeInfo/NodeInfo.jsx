import React, { Component } from 'react'
import moment from 'moment'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import i18n from '../../../i18n'
import Pulse from '../../Widgets/AnimatedIcons/Pulse'

import NodeInfoDot from './NodeInfoDot'
import NodeInfoBox from './NodeInfoBox'

class NodeInfo extends Component {
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

  constructor(props) {
    super(props)

    this.state = {
      showSubmenu: false
    }
  }

  render() {
    const { network, active, remote, local } = this.props
    const { showSubmenu, sticky } = this.state

    let mainClass = network === 'main' ? 'node-mainnet' : 'node-testnet'
    if (sticky) {
      mainClass += ' sticky'
    }

    return (
      <StyledNode>
        <div
          id="node-info"
          className={mainClass}
          onMouseUp={() => this.setState({ sticky: !sticky })}
          onMouseEnter={() => this.setState({ showSubmenu: true })}
          onMouseLeave={() => this.setState({ showSubmenu: sticky })}
        >
          <NodeInfoDot
            network={network}
            active={active}
            remote={remote}
            local={local}
            sticky={sticky}
          />

          {showSubmenu && (
            <NodeInfoBox
              network={network}
              active={active}
              remote={remote}
              local={local}
              dotLocation="topLeft"
            />
          )}
        </div>
      </StyledNode>
    )
  }
}

const StyledNode = styled.div`
  cursor: default;
  display: flex;
  flex-flow: row wrap;
  flex-shrink: 0;
  font-size: 0.9em;
  color: #827a7a;

  #node-info {
    padding: 22px;
    -webkit-app-region: no-drag;
  }
`

export default NodeInfo
