import React, { Component } from 'react'
import moment from 'moment'
// import PieChart from 'react-minimal-pie-chart'
import i18n from '../../../i18n'

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
      showSubmenu: false,
      lightClasses: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // if new block arrived, add animation to light
    if (this.isNewBlock(prevProps, this.props)) {
      const lightClasses = prevProps.active === 'remote'
        ? 'pulse-light__orange'
        : 'pulse-light__green'
      this.setState({ lightClasses }, () => {
        setTimeout(() => {
          this.setState({ lightClasses: '' })
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

  localStatsFindingPeers() {
    return (
      <div>
        <div className="looking-for-peers row-icon">
          <i className="icon icon-share" />
          {i18n.t('mist.nodeInfo.lookingForPeers')}
        </div>
      </div>
    )
  }

  localStatsStartSync() {
    const { local } = this.props
    const { connectedPeers } = local.sync

    return (
      <div>
        <div className="peer-count row-icon">
          <i className="icon icon-users" />
          {` ${connectedPeers} ${i18n.t('mist.nodeInfo.peers')}`}
        </div>
        <div className="sync-starting row-icon">
          <i className="icon icon-energy" />
          {i18n.t('mist.nodeInfo.syncStarting')}
        </div>
      </div>
    )
  }

  localStatsSyncProgress() {
    const { local } = this.props
    const { sync } = local
    const {
      highestBlock,
      currentBlock,
      startingBlock,
      connectedPeers
    } = sync
    let { displayBlock } = sync

    displayBlock = displayBlock || startingBlock
    displayBlock += (currentBlock - displayBlock) / 20
    const formattedDisplayBlock = numeral(displayBlock).format('0,0')

    sync.displayBlock = displayBlock

    const progress = ((displayBlock - startingBlock) / (highestBlock - startingBlock)) * 100

    return (
      <div>
        <div className="block-number row-icon">
          <i className="icon icon-layers" />
          {formattedDisplayBlock}
        </div>
        <div className="peer-count row-icon">
          <i className="icon icon-users" />
          {` ${connectedPeers} ${i18n.t('mist.nodeInfo.peers')}`}
        </div>
        <div className="sync-progress row-icon">
          <i className="icon icon-cloud-download" />
          <progress max="100" value={progress || 0} />
        </div>
      </div>
    )
  }

  localStatsSynced() {
    const { local, network } = this.props
    const { blockNumber, timestamp, sync } = local
    const { connectedPeers } = sync

    const formattedBlockNumber = numeral(blockNumber).format('0,0')

    const timeSince = moment(timestamp, 'X')
    const diff = moment().diff(timeSince, 'seconds')

    return (
      <div>
        <div
          className="block-number row-icon"
          title={i18n.t('mist.nodeInfo.blockNumber')}
        >
          <i className="icon icon-layers" />
          {formattedBlockNumber}
        </div>
        {network !== 'private' && (
          <div className="peer-count row-icon">
            <i className="icon icon-users" />
            {` ${connectedPeers} ${i18n.t('mist.nodeInfo.peers')}`}
          </div>
        )}
        <div
          className="block-diff row-icon"
          title={i18n.t('mist.nodeInfo.timeSinceBlock')}
        >
          <i className="icon icon-clock" />
          <span>{diff} seconds</span>
        </div>
      </div>
    )
  }

  renderRemoteStats() {
    const { active, remote } = this.props
    const { blockNumber, timestamp } = remote

    // Hide remote stats if local node is synced
    if (active !== 'remote') {
      return null
    }

    const formattedBlockNumber = numeral(blockNumber).format('0,0')
    const remoteTimestamp = moment.unix(timestamp)
    const diff = moment().diff(remoteTimestamp, 'seconds')

    if (remote.blockNumber < 1000) {
      // Still loading initial remote results
      return (
        <div id="remote-stats" className="node-info__section">
          <div className="node-info__node-title orange">
            <strong>Remote</strong> Node
          </div>
          <div>
            <div className="remote-loading row-icon">
              <i className="icon icon-energy" />
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
          <i className="icon icon-layers" /> {formattedBlockNumber}
        </div>
        <div
          className={
            diff > 60 ? 'block-diff row-icon red' : 'block-diff row-icon'
          }
        >
          {
            // TODO: make this i8n compatible
          }
          <i className="icon icon-clock" />
          {diff < 120
            ? diff + ' seconds'
            : `${Math.floor(diff / 60)} minutes`
          }
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
          <strong>{i18n.t('mist.nodeInfo.local')}</strong>
          {' '}
          {i18n.t('mist.nodeInfo.node')}
          {syncText && <span className="node-info__pill">{syncText}</span>}
        </div>

        {localStats}
      </div>
    )
  }

  renderStatusLight() {
    const {
      active,
      network,
      remote,
      local
    } = this.props

    const { lightClasses } = this.state

    const timeSince = moment(remote.timestamp, 'X')
    const diff = moment().diff(timeSince, 'seconds')

    const dotColor = network === 'main' ? '#7ed321' : '#00aafa'

    const { highestBlock, currentBlock, startingBlock } = local.sync
    const progress = ((currentBlock - startingBlock) / (highestBlock - startingBlock)) * 100

    return (
      <div className="pie-container">
        <div
          id="node-info__light"
          className={lightClasses}
          style={{
            backgroundColor: diff > 60 ? 'red' : active === 'remote' ? 'orange' : dotColor
          }}
        />
        {active === 'remote' && currentBlock !== 0 && (
          <span>Indicator here</span>
        )}
        {/*
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
          */}
      </div>
    )
  }

  render() {
    const { network } = this.props
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
        {this.renderStatusLight()}

        {showSubmenu && (
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
        )}
      </div>
    )
  }
}

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

export default NodeInfo
