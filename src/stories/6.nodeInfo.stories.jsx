import React from 'react'
import { storiesOf } from '@storybook/react'

import { NodeInfo } from '../components'

storiesOf('NodeInfo', module)
  .add('no connection ', () => <NodeInfo />)
  .add('main net', () => <NodeInfo />)
