import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment'

import { NodeInfo } from '../components'
import NodeInfoDot from '../components/Network/NodeInfo/NodeInfoDot'
import NodeInfoBox from '../components/Network/NodeInfo/NodeInfoBox'
import NewBlockEvery3s from '../components/Network/NodeInfo/NewBlockEvery3s'
import QuickSync from '../components/Network/NodeInfo/QuickSync'
import NetworkChooser from '../components/Network/NetworkChooser'
import RpcTest from '../components/Network/RPC/RpcTester'
import NodeSettingsStorybookContainer from '../components/Network/NodeSettings/NodeSettingsStorybookContainer'

const initial = {
  active: 'remote',
  network: 'main',
  changingNetwork: false,
  remote: {
    client: 'infura',
    blockNumber: 100,
    timestamp: 0
  },
  local: {
    client: 'geth',
    blockNumber: 1,
    timestamp: 0,
    syncMode: 'fast',
    sync: {
      connectedPeers: 0,
      currentBlock: 0,
      highestBlock: 0,
      knownStates: 0,
      pulledStates: 0,
      startingBlock: 0
    }
  }
}

const mainRemote = () => {
  return {
    active: 'remote',
    network: 'main',
    changingNetwork: false,
    remote: {
      client: 'infura',
      blockNumber: 100000,
      timestamp: moment()
        .subtract(10, 'seconds')
        .unix()
    },
    local: { ...initial.local }
  }
}

const mainRemoteOldBlock = () => {
  return {
    ...mainRemote(),
    remote: {
      ...mainRemote().remote,
      timestamp: moment()
        .subtract(100, 'seconds')
        .unix()
    }
  }
}

const mainRemoteNoSync = () => {
  return {
    ...mainRemote(),
    local: {
      ...mainRemote().local,
      syncMode: 'nosync',
      sync: { ...initial.sync }
    }
  }
}

const mainRemoteSyncing = () => {
  return {
    ...mainRemote(),
    local: {
      ...mainRemote().local,
      sync: {
        ...mainRemote().local.sync,
        currentBlock: 10000,
        highestBlock: 100000,
        connectedPeers: 5
      }
    }
  }
}

const mainLocal = () => {
  return {
    active: 'local',
    network: 'main',
    changingNetwork: false,
    remote: {
      client: 'infura',
      blockNumber: 10001,
      timestamp: moment()
        .subtract(12, 'seconds')
        .unix()
    },
    local: {
      client: 'geth',
      blockNumber: 10005,
      timestamp: moment()
        .subtract(10, 'seconds')
        .unix(),
      syncMode: 'fast',
      sync: {
        connectedPeers: 5,
        currentBlock: 10005,
        highestBlock: 10005,
        knownStates: 10000,
        pulledStates: 10000,
        startingBlock: 500
      }
    }
  }
}

const mainLocalOldBlock = () => {
  return {
    ...mainLocal(),
    local: {
      ...mainLocal().local,
      timestamp: moment()
        .subtract(100, 'seconds')
        .unix()
    }
  }
}

const mainRemoteNoLocalPeers = () => {
  return {
    ...mainRemote(),
    local: {
      ...mainRemote().local,
      sync: { ...initial.local.sync }
    }
  }
}

const mainRemoteStartingSync = () => {
  return {
    ...mainRemote(),
    local: {
      ...mainRemote().local,
      sync: { ...initial.local.sync, connectedPeers: 2 }
    }
  }
}

const mainLocalSyncingNoRemote = () => {
  return {
    ...mainLocal(),
    active: 'local',
    remote: { ...initial.remote },
    local: {
      ...mainLocal().local,
      sync: {
        ...mainLocal().local.sync,
        currentBlock: 1000,
        highestBlock: 10000
      }
    }
  }
}

const testRemote = () => {
  return { ...mainRemote(), network: 'ropsten' }
}
const testLocal = () => {
  return { ...mainLocal(), network: 'ropsten' }
}
const testLocalSyncing = () => {
  return {
    ...testLocal(),
    local: {
      ...testLocal().local,
      sync: {
        ...testLocal().local.sync,
        currentBlock: 10000,
        highestBlock: 100000,
        connectedPeers: 5
      }
    }
  }
}

const privateNet = () => {
  return { ...mainLocal(), network: 'private' }
}

storiesOf('Network/Node Info/Dot', module).add('no connection ', () => (
  <NodeInfoDot {...initial} />
))

storiesOf('Network/Node Info/Dot/Main Net/Remote', module)
  .add('remote', () => <NodeInfoDot {...mainRemote()} />)
  .add('remote, new block every 3s', () => (
    <NewBlockEvery3s {...mainRemote()}>
      <NodeInfoDot />
    </NewBlockEvery3s>
  ))
  .add('remote, old block (>60s)', () => (
    <NodeInfoDot {...mainRemoteOldBlock()} />
  ))
  .add('remote, local syncing', () => (
    <QuickSync {...mainRemoteSyncing()}>
      <NodeInfoDot />
    </QuickSync>
  ))
  .add('remote, local nosync', () => <NodeInfoDot {...mainRemoteNoSync()} />)

storiesOf('Network/Node Info/Dot/Main Net/Local', module)
  .add('local', () => <NodeInfoDot {...mainLocal()} />)
  .add('local, new block every 3s', () => (
    <NewBlockEvery3s {...mainLocal()}>
      <NodeInfoDot />
    </NewBlockEvery3s>
  ))
  .add('local, old block (>60s)', () => (
    <NodeInfoDot {...mainLocalOldBlock()} />
  ))
  .add('local syncing, remote on', () => (
    <QuickSync {...mainRemoteSyncing()}>
      <NodeInfoDot />
    </QuickSync>
  ))
  .add('local syncing, remote off', () => (
    <QuickSync {...mainLocalSyncingNoRemote()}>
      <NodeInfoDot />
    </QuickSync>
  ))

storiesOf('Network/Node Info/Dot/Test Net', module)
  .add('remote', () => <NodeInfoDot {...testRemote()} />)
  .add('local', () => <NodeInfoDot {...testLocal()} />)

storiesOf('Network/Node Info/Dot/Private Net', module).add('local', () => {
  return <NodeInfoDot {...privateNet()} />
})

storiesOf('Network/Node Info/Box', module).add('no connection ', () => (
  <NodeInfoBox {...initial} />
))

storiesOf('Network/Node Info/Box/Main Net/Remote', module)
  .add('remote', () => <NodeInfoBox {...mainRemote()} />)
  .add('remote, new block every 3s', () => (
    <NewBlockEvery3s {...mainRemote()}>
      <NodeInfoBox />
    </NewBlockEvery3s>
  ))
  .add('remote, old block (>60s)', () => (
    <NodeInfoBox {...mainRemoteOldBlock()} />
  ))
  .add('remote, starting sync', () => (
    <NodeInfoBox {...mainRemoteStartingSync()} />
  ))
  .add('remote, local syncing', () => (
    <QuickSync {...mainRemoteSyncing()}>
      <NodeInfoBox />
    </QuickSync>
  ))
  .add('remote, local nosync', () => <NodeInfoBox {...mainRemoteNoSync()} />)
  .add('remote, no local peers', () => (
    <NodeInfoBox {...mainRemoteNoLocalPeers()} />
  ))

storiesOf('Network/Node Info/Box/Main Net/Local', module)
  .add('local', () => <NodeInfoBox {...mainLocal()} />)
  .add('local, new block every 3s', () => (
    <NewBlockEvery3s {...mainLocal()}>
      <NodeInfoBox />
    </NewBlockEvery3s>
  ))
  .add('local, old block (>60s)', () => (
    <NodeInfoBox {...mainLocalOldBlock()} />
  ))
  .add('local syncing, remote on', () => (
    <QuickSync {...mainRemoteSyncing()}>
      <NodeInfoBox />
    </QuickSync>
  ))
  .add('local syncing, remote off', () => (
    <QuickSync {...mainLocalSyncingNoRemote()}>
      <NodeInfoBox />
    </QuickSync>
  ))

storiesOf('Network/Node Info/Box/Test Net', module)
  .add('remote', () => <NodeInfoBox {...testRemote()} />)
  .add('local', () => <NodeInfoBox {...testLocal()} />)
  .add('local sync', () => (
    <QuickSync {...testLocalSyncing()}>
      <NodeInfoBox />
    </QuickSync>
  ))

storiesOf('Network/Node Info/Box/Private Network', module).add('local', () => (
  <NodeInfoBox {...privateNet()} />
))

storiesOf('Network/Node Info/Full', module).add('no connection ', () => (
  <NodeInfo {...initial} />
))

storiesOf('Network/Node Info/Full/Main Net/Remote', module)
  .add('remote', () => <NodeInfo {...mainRemote()} />)
  .add('remote, new block every 3s', () => (
    <NewBlockEvery3s {...mainRemote()}>
      <NodeInfo />
    </NewBlockEvery3s>
  ))
  .add('remote, old block (>60s)', () => <NodeInfo {...mainRemoteOldBlock()} />)
  .add('remote, starting sync', () => (
    <NodeInfo {...mainRemoteStartingSync()} />
  ))
  .add('remote, local syncing', () => (
    <QuickSync {...mainRemoteSyncing()}>
      <NodeInfo />
    </QuickSync>
  ))
  .add('remote, local nosync', () => <NodeInfo {...mainRemoteNoSync()} />)
  .add('remote, no local peers', () => (
    <NodeInfo {...mainRemoteNoLocalPeers()} />
  ))

storiesOf('Network/Node Info/Full/Main Net/Local', module)
  .add('local', () => <NodeInfo {...mainLocal()} />)
  .add('local, new block every 3s', () => (
    <NewBlockEvery3s {...mainLocal()}>
      <NodeInfo />
    </NewBlockEvery3s>
  ))
  .add('local, old block (>60s)', () => <NodeInfo {...mainLocalOldBlock()} />)
  .add('local syncing, remote on', () => (
    <QuickSync {...mainRemoteSyncing()}>
      <NodeInfo />
    </QuickSync>
  ))
  .add('local syncing, remote off', () => (
    <QuickSync {...mainLocalSyncingNoRemote()}>
      <NodeInfo />
    </QuickSync>
  ))

storiesOf('Network/Node Info/Full/Test Net', module)
  .add('remote', () => <NodeInfo {...testRemote()} />)
  .add('local', () => <NodeInfo {...testLocal()} />)

storiesOf('Network/Node Info/Full/Private Net', module).add('local', () => (
  <NodeInfo {...privateNet()} />
))

storiesOf('Network/Network Chooser', module).add('default', () => (
  <div style={{ width: 200 }}>
    <NetworkChooser />
  </div>
))

storiesOf('Network/Rpc', module).add('default', () => (
  <div style={{ width: 200 }}>
    <RpcTest />
  </div>
))

storiesOf('Network/NodeSettings', module).add('Default', () => (
  <NodeSettingsStorybookContainer />
))
