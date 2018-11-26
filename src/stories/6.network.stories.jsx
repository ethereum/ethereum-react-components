import React from 'react'
import { storiesOf } from '@storybook/react'

import { NodeInfo } from '../components'
import NodeInfoDot from '../components/Network/NodeInfo/NodeInfoDot'
import NodeInfoBox from '../components/Network/NodeInfo/NodeInfoBox'
import NetworkChooser from '../components/Network/NetworkChooser'
import RpcTest from '../components/Network/RPC/test'

storiesOf('Network/Node Info/Dot', module)
  .add('no connection ', () => <NodeInfoDot />)
  .add('main network remote', () => <NodeInfoDot network="main" active="remote" />)
  .add('main network local', () => <NodeInfoDot network="main" active="local" />)
  .add('private network remote', () => <NodeInfoDot network="private" active="remote" />)
  .add('private network local', () => <NodeInfoDot network="private" active="local" />)

storiesOf('Network/Node Info/Box', module)
  .add('no connection ', () => <NodeInfoBox />)

storiesOf('Network/Node Info/Full', module)
  .add('no connection ', () => <NodeInfo />)

storiesOf('Network/Network Chooser', module)
  .add('default', () => <div style={{width: 200}}> <NetworkChooser /> </div>)

storiesOf('Network/Rpc', module)
  .add('default', () => <div style={{width: 200}}> <RpcTest /> </div>)