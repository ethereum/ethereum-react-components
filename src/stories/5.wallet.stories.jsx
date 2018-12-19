import React from 'react'
import { storiesOf } from '@storybook/react'

import { AccountItem } from '../components'

storiesOf('Wallet/Account/Item', module)
  .add('default', () => (
    <AccountItem
      name="Account 1"
      address="0x4444444444444444444444444444444444444444"
    />
  ))
  .add('account with tokens', () => {
    const tokens = [
      { address: '0x5555555555555555555555555555555555555555' },
      { address: '0x6666666666666666666666666666666666666666' }
    ]
    return (
      <AccountItem
        name="Account 1"
        balance="0.0006"
        address="0x4444444444444444444444444444444444444444"
        tokens={tokens}
      />
    )
  })
  .add('account with >5 tokens', () => {
    const tokens = [
      { address: '0x5555555555555555555555555555555555555555' },
      { address: '0x6666666666666666666666666666666666666666' },
      { address: '0x7777777777777777777777777777777777777777' },
      { address: '0x8888888888888888888888888888888888888888' },
      { address: '0x9999999999999999999999999999999999999999' },
      { address: '0x1111111111111111111111111111111111111111' }
    ]
    return (
      <AccountItem
        name="Account 1"
        balance="0.0006"
        address="0x4444444444444444444444444444444444444444"
        tokens={tokens}
      />
    )
  })
