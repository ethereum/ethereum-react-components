import React from 'react'
import { storiesOf } from '@storybook/react'

import { NodeInfo } from '../components'
import NodeInfoDot from '../components/Network/NodeInfo/NodeInfoDot'
import NodeInfoBox from '../components/Network/NodeInfo/NodeInfoBox'
import NetworkChooser from '../components/Network/NetworkChooser'
import RpcTest from '../components/Network/RPC/RpcTester'

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

const mainRemote = {
  active: 'remote',
  network: 'main',
  changingNetwork: false,
  remote: {
    client: 'infura',
    blockNumber: 100000,
    timestamp: Date.now() - 500
  },
  local: {
    client: 'geth',
    blockNumber: 90000,
    timestamp: Date.now() - 10000,
    syncMode: 'fast',
    sync: {
      connectedPeers: 5,
      currentBlock: 90000,
      highestBlock: 95000,
      knownStates: 1000000,
      pulledStates: 1000000,
      startingBlock: 88000
    }
  }
}

const mainRemoteNoSync = {
  ...mainRemote,
  local: { ...mainRemote.local, syncMode: 'nosync', sync: { ...initial.sync } }
}

const mainLocal = {
  active: 'local',
  network: 'main',
  changingNetwork: false,
  remote: {
    client: 'infura',
    blockNumber: 100000,
    timestamp: Date.now() - 500
  },
  local: {
    client: 'geth',
    blockNumber: 100100,
    timestamp: Date.now() - 200,
    syncMode: 'fast',
    sync: {
      connectedPeers: 5,
      currentBlock: 100100,
      highestBlock: 100100,
      knownStates: 1000000,
      pulledStates: 1000000,
      startingBlock: 88000
    }
  }
}

const mainRemoteNoPeers = {
  ...mainRemote,
  local: {
    ...mainRemote.local,
    sync: { ...initial.local.sync }
  }
}
const mainRemoteStartingSync = {
  ...mainRemote,
  local: {
    ...mainRemote.local,
    sync: { ...initial.local.sync, connectedPeers: 2 }
  }
}
const testRemote = { ...mainRemote, network: 'ropsten' }
const testLocal = { ...mainLocal, network: 'ropsten' }
const privateNet = { ...mainLocal, network: 'private' }

storiesOf('Network/Node Info/Dot', module)
  .add('no connection ', () => <NodeInfoDot {...initial} />)
  .add('main network remote', () => <NodeInfoDot {...mainRemote} />)
  .add('main network remote nosync', () => (
    <NodeInfoDot {...mainRemoteNoSync} />
  ))
  .add('main network local', () => <NodeInfoDot {...mainLocal} />)
  .add('test network remote', () => <NodeInfoDot {...testRemote} />)
  .add('test network local', () => <NodeInfoDot {...testLocal} />)
  .add('private network local', () => <NodeInfoDot {...privateNet} />)

storiesOf('Network/Node Info/Box', module)
  .add('no connection ', () => <NodeInfoBox {...initial} />)
  .add('main network remote', () => <NodeInfoBox {...mainRemote} />)
  .add('main network remote nosync', () => (
    <NodeInfoBox {...mainRemoteNoSync} />
  ))
  .add('main network remote no peers', () => (
    <NodeInfoBox {...mainRemoteNoPeers} />
  ))
  .add('main network remote starting sync', () => (
    <NodeInfoBox {...mainRemoteStartingSync} />
  ))

  .add('main network local', () => <NodeInfoBox {...mainLocal} />)
  .add('test network remote', () => <NodeInfoBox {...testRemote} />)
  .add('test network local', () => <NodeInfoBox {...testLocal} />)
  .add('private network local', () => <NodeInfoBox {...privateNet} />)

storiesOf('Network/Node Info/Full', module)
  .add('no connection ', () => <NodeInfo {...initial} />)
  .add('main network remote', () => <NodeInfo {...mainRemote} />)
  .add('main network remote nosync', () => <NodeInfo {...mainRemoteNoSync} />)
  .add('main network remote no peers', () => (
    <NodeInfo {...mainRemoteNoPeers} />
  ))
  .add('main network remote starting sync', () => (
    <NodeInfo {...mainRemoteStartingSync} />
  ))

  .add('main network local', () => <NodeInfo {...mainLocal} />)
  .add('test network remote', () => <NodeInfo {...testRemote} />)
  .add('test network local', () => <NodeInfo {...testLocal} />)
  .add('private network local', () => <NodeInfo {...privateNet} />)

storiesOf('Network/Network Chooser', module).add('default', () => (
  <div style={{ width: 200 }}>
    {' '}
    <NetworkChooser />{' '}
  </div>
))

storiesOf('Network/Rpc', module).add('default', () => (
  <div style={{ width: 200 }}>
    <RpcTest />
  </div>
))
