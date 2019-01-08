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
    const { local, network } = this.props
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
          <StyledProgress
            testnet={network !== 'main'}
            max="100"
            value={progress || 0}
          />
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
          <StyledTitle network="remote">
            <strong>Remote</strong> Node
          </StyledTitle>
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
      <StyledSection>
        <StyledTitle network="remote">
          <strong>Remote</strong> Node
          <StyledPill>{i18n.t('mist.nodeInfo.active')}</StyledPill>
        </StyledTitle>
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
      </StyledSection>
    )
  }

  renderLocalStats() {
    const { local, active, network } = this.props
    const { syncMode, sync, blockNumber } = local
    const { currentBlock, highestBlock, connectedPeers } = sync

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

    if (active === 'local' && blockNumber > highestBlock - 50) {
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
    } else {
      // Case: show progress
      localStats = this.localStatsSyncProgress()
    }

    return (
      <StyledSection>
        <StyledTitle network="local" testnet={network !== 'main'}>
          <strong>{i18n.t('mist.nodeInfo.local')}</strong>{' '}
          {i18n.t('mist.nodeInfo.node')}
          {syncText && <StyledPill>{syncText}</StyledPill>}
        </StyledTitle>

        {localStats}
      </StyledSection>
    )
  }

  render() {
    const { network, dotLocation } = this.props
    return (
      <StyledBox dotLocation={dotLocation}>
        <StyledSubmenuContainer>
          <section>
            <StyledSection>
              <StyledNetworkTitle>{network}</StyledNetworkTitle>
              <StyledSubtitle>
                {network !== 'main' && i18n.t('mist.nodeInfo.testNetwork')}
                {network === 'main' && i18n.t('mist.nodeInfo.network')}
              </StyledSubtitle>
            </StyledSection>
            {this.renderRemoteStats()}
            {this.renderLocalStats()}
          </section>
        </StyledSubmenuContainer>
      </StyledBox>
    )
  }
}

const StyledSubmenuContainer = styled.div`
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
`

const StyledSection = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding: 11px;
  &:first-of-type {
    border-top: none;
  }
`

const StyledNetworkTitle = styled.div`
  font-weight: 300;
  font-size: 24px;
  text-transform: capitalize;
`

const StyledSubtitle = styled.div`
  margin-left: 1px;
  font-size: 10px;
  color: #aaa;
  text-transform: uppercase;
`

const StyledPill = styled.span`
  display: inline-block;
  margin-left: 5px;
  font-weight: 300;
  font-size: 11px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  padding: 2px 6px;
  vertical-align: middle;
  text-transform: none;
`

const colorMainnet = '#7ed321'
const colorTestnet = '#00aafa'

const StyledTitle = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 6px;
  strong {
    font-weight: 400;
  }
  ${props =>
    !props.testnet &&
    css`
      color: ${colorMainnet};
    `}
  ${props =>
    props.testnet &&
    css`
      color: ${colorTestnet};
    `}
  ${props =>
    props.network === 'remote' &&
    css`
      color: orange;
    `}
`

const StyledProgress = styled.progress`
    width: 100%;
    background-color: #eee;
    border-radius: 3px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5) inset;
    background: rgba(255, 255, 255, 0.1);
    height: 5px;

    ${props =>
      !props.testnet &&
      css`
        &::-webkit-progress-value {
          bakground-image: linear-gradient(left, transparent, ${colorMainnet});
          background: ${colorMainnet};
          background-size: cover;
        }
      `}
    ${props =>
      props.testnet &&
      css`
        &::-webkit-progress-value {
          background-image: linear-gradient(left, transparent, ${colorTestnet});
          background: ${colorTestnet};
          background-size: cover;
        }
      `}

  }
`

const StyledBox = styled.div`
  font-family: sans-serif;
  ${props =>
    props.dotLocation &&
    css`
      position: absolute;
      top: 152px;
    `}

  .row-icon {
    margin-bottom: 6px;
    margin-left: 3px;
    display: flex;
    align-items: center;
    font-size: 13px;
    svg {
      display: inline-block;
      margin-right: 6px;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
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
`
