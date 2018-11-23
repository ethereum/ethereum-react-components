import React from 'react'
import { storiesOf } from '@storybook/react'

import { NodeInfo } from '../components'
import NodeInfoDot from '../components/Network/NodeInfo/NodeInfoDot';
import NodeInfoBox from '../components/Network/NodeInfo/NodeInfoBox';

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