import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShareAlt,
  faUsers,
  faBolt,
  faLayerGroup,
  faCloudDownloadAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons'
import i18n from '../../../i18n'

library.add(
  faShareAlt,
  faUsers,
  faBolt,
  faLayerGroup,
  faCloudDownloadAlt,
  faClock
)

const numberWithCommas = val => {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default class NodeInfoBox extends Component {
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
    }).isRequired,
    /** Location of dot relative to box */
    dotLocation: PropTypes.oneOf(['bottomLeft'])
  }

  constructor(props) {
    super(props)
    this.state = { diffTimestamp: moment().unix() }
  }

  componentDidMount() {
    // NOTE: this component should update diff every second
    this.diffInterval = setInterval(() => {
      this.setState({ diffTimestamp: moment().unix() })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.diffInterval)
  }

  localStatsFindingPeers = () => {
    return (
      <div>
        <div className="looking-for-peers row-icon">
          <FontAwesomeIcon icon={faShareAlt} />
          {i18n.t('mist.nodeInfo.lookingForPeers')}
        </div>
      </div>
    )
  }

  localStatsStartSync = () => {
    const { local } = this.props
    const { connectedPeers } = local.sync

    return (
      <div>
        <div className="peer-count row-icon">
          <FontAwesomeIcon icon={faUsers} />
          {` ${connectedPeers} ${i18n.t('mist.nodeInfo.peers')}`}
        </div>
        <div className="sync-starting row-icon">
          <FontAwesomeIcon icon={faBolt} />
          {i18n.t('mist.nodeInfo.syncStarting')}
        </div>
      </div>
    )
  }

  localStatsSyncProgress() {
    const { local } = this.props
    const { sync } = local
    const { highestBlock, currentBlock, startingBlock, connectedPeers } = sync

    const formattedCurrentBlock = numberWithCommas(currentBlock)

    const progress =
      ((currentBlock - startingBlock) / (highestBlock - startingBlock)) * 100

    return (
      <div>
        <div className="block-number row-icon">
          <FontAwesomeIcon icon={faLayerGroup} />
          {formattedCurrentBlock}
        </div>
        <div className="peer-count row-icon">
          <FontAwesomeIcon icon={faUsers} />
          {` ${connectedPeers} ${i18n.t('mist.nodeInfo.peers')}`}
        </div>
        <div className="sync-progress row-icon">
          <FontAwesomeIcon icon={faCloudDownloadAlt} />
          <progress max="100" value={progress || 0} />
        </div>
      </div>
    )
  }

  localStatsSynced() {
    const { local, network } = this.props
    const { diffTimestamp } = this.state
    const { blockNumber, timestamp, sync } = local
    const { connectedPeers } = sync

    const formattedBlockNumber = numberWithCommas(blockNumber)

    const timeSince = moment.unix(timestamp)
    const diff = moment.unix(diffTimestamp).diff(timeSince, 'seconds')

    return (
      <div>
        <div
          className="block-number row-icon"
          title={i18n.t('mist.nodeInfo.blockNumber')}
        >
          <FontAwesomeIcon icon={faLayerGroup} />
          {formattedBlockNumber}
        </div>
        {network !== 'private' && (
          <div className="peer-count row-icon">
            <FontAwesomeIcon icon={faUsers} />
            {` ${connectedPeers} ${i18n.t('mist.nodeInfo.peers')}`}
          </div>
        )}
        <div
          className={
            diff > 60 ? 'block-diff row-icon red' : 'block-diff row-icon'
          }
        >
          {
            // TODO: make this i8n compatible
          }
          <FontAwesomeIcon icon={faClock} />
          {diff < 120 ? `${diff} seconds` : `${Math.floor(diff / 60)} minutes`}
        </div>{' '}
      </div>
    )
  }

  renderRemoteStats() {
    const { active, remote } = this.props
    const { diffTimestamp } = this.state
    const { blockNumber, timestamp } = remote

    // Hide remote stats if local node is synced
    if (active !== 'remote') {
      return null
    }

    const formattedBlockNumber = numberWithCommas(blockNumber)
    const remoteTimestamp = moment.unix(timestamp)
    const diff = moment.unix(diffTimestamp).diff(remoteTimestamp, 'seconds')

    if (remote.blockNumber < 1000) {
      // Still loading initial remote results
      return (
        <div id="remote-stats" className="node-info__section">
          <div className="node-info__node-title orange">
            <strong>Remote</strong> Node
          </div>
          <div>
            <div className="remote-loading row-icon">
              <FontAwesomeIcon icon={faBolt} />
              {i18n.t('mist.nodeInfo.connecting')}
            </div>
          </div>
        </div>
      )
    }
    return (
      <div id="remote-stats" className="node-info__section">
        <div className="node-info__node-title orange">
          <strong>Remote</strong> Node
          <span className="node-info__pill">
            {i18n.t('mist.nodeInfo.active')}
          </span>
        </div>
        <div className="block-number row-icon">
          <FontAwesomeIcon icon={faLayerGroup} />
          {formattedBlockNumber}
        </div>
        <div
          className={
            diff > 60 ? 'block-diff row-icon red' : 'block-diff row-icon'
          }
        >
          {
            // TODO: make this i8n compatible
          }
          <FontAwesomeIcon icon={faClock} />
          {diff < 120 ? `${diff} seconds` : `${Math.floor(diff / 60)} minutes`}
        </div>
      </div>
    )
  }

  renderLocalStats() {
    const { local, active } = this.props
    const { syncMode, sync } = local
    const { currentBlock, connectedPeers } = sync

    let syncText
    if (syncMode) {
      syncText = syncMode === 'nosync' ? 'sync off' : `${syncMode} sync`
    }

    let localStats

    // TODO: potentially refactor local node status into Redux
    // possible states: findingPeers, starting, synced, synced, disabled/nosync

    // Determine 'status' of local node, then show appropriate lens on sync data
    if (syncMode === 'nosync') {
      // Case: no local node
      return null
    }

    if (active === 'local') {
      // Case: already synced up
      localStats = this.localStatsSynced()
    } else if (active === 'remote') {
      // Case: not yet synced up
      if (currentBlock === 0) {
        // Case: no results from syncing
        if (connectedPeers === 0) {
          // Case: no peers yet
          localStats = this.localStatsFindingPeers()
        } else {
          // Case: connected to peers, but no blocks yet
          localStats = this.localStatsStartSync()
        }
      } else {
        // Case: show progress
        localStats = this.localStatsSyncProgress()
      }
    }

    return (
      <div id="local-stats" className="node-info__section">
        <div className="node-info__node-title local">
          <strong>{i18n.t('mist.nodeInfo.local')}</strong>{' '}
          {i18n.t('mist.nodeInfo.node')}
          {syncText && <span className="node-info__pill">{syncText}</span>}
        </div>

        {localStats}
      </div>
    )
  }

  render() {
    const { network, dotLocation } = this.props
    return (
      <StyledBox dotLocation={dotLocation}>
        <section className="node-info__submenu-container">
          <section>
            <div className="node-info__section">
              <div className="node-info__network-title">{network}</div>
              <div className="node-info__subtitle">
                {network !== 'main' && i18n.t('mist.nodeInfo.testNetwork')}
                {network === 'main' && i18n.t('mist.nodeInfo.network')}
              </div>
            </div>
            {this.renderRemoteStats()}
            {this.renderLocalStats()}
          </section>
        </section>
      </StyledBox>
    )
  }
}

const StyledBox = styled.div`
  font-family: sans-serif;
  ${props =>
    props.dotLocation &&
    css`
      position: absolute;
      top: 152px;
    `}

  .node-info__subtitle {
    margin-left: 1px;
    font-size: 10px;
    color: #aaa;
    text-transform: uppercase;
  }

  .node-info__section {
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding: 11px;
  }
  .node-info__section:first-of-type {
    border-top: none;
  }

  .node-info__network-title {
    font-weight: 300;
    font-size: 24px;
    // color: #24C33A;
    text-transform: capitalize;
  }

  .node-info__node-title {
    font-size: 18px;
    font-weight: 200;
    margin-bottom: 6px;
    strong {
      font-weight: 400;
    }
  }

  .node-info__pill {
    display: inline-block;
    margin-left: 5px;
    font-weight: 300;
    font-size: 11px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    padding: 2px 6px;
    vertical-align: middle;
    text-transform: none;
  }

  .node-info__submenu-container {
    width: 220px;
    border-radius: 5px;
    z-index: 1000;
    cursor: default;

    transition: 150ms linear all, 1ms linear top;
    transition-delay: 200ms;
    transform: translateY(-11px);

    section {
      background-color: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(2px);
      width: 100%;
      border-radius: 5px;
      color: #fff;
      position: relative;
    }

    progress {
      width: 100%;
    }

    ${props =>
      props.dotLocation === 'topLeft' &&
      // Apply css arrow to topLeft of box
      css`
        position: absolute;
        left: 40px;
        top: 0px;

        &::before {
          content: '';
          margin-left: -8px;
          top: 0;
          margin-top: 12px;
          display: block;
          position: absolute;
          width: 0px;
          height: 8px * 2.25;
          border: 0px solid transparent;
          border-width: 8px;
          border-left: 0;
          border-right-color: rgba(0, 0, 0, 0.78);
        }
      `}
  }

  .row-icon {
    margin-bottom: 6px;
    margin-left: 3px;
    display: flex;
    align-items: center;
    font-size: 13px;
    .icon {
      display: inline-block;
      margin-right: 6px;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .svg-inline--fa {
    margin-right: 4px;
  }

  strong {
    font-weight: 500;
  }

  .orange {
    color: orange;
  }

  .red {
    color: #e81e1e;
  }

  .node-mainnet .node-info__node-title.local {
    color: $colorMainnet;
  }

  .node-testnet .node-info__node-title.local {
    color: $colorTestnet;
  }

  progress[value]::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 2px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5) inset;
    background: rgba(255, 255, 255, 0.1);
  }

  .node-mainnet progress[value]::-webkit-progress-value {
    background-image: linear-gradient(left, transparent, $colorMainnet);
    background: $colorMainnet;
    background-size: cover;
  }

  .node-testnet progress[value]::-webkit-progress-value {
    background-image: linear-gradient(left, transparent, $colorTestnet);
    background-size: cover;
  }
`
