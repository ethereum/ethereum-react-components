import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment'

import {
  AccountItem,
  AccountList,
  NavbarItem,
  NetworkStatus,
  Notification
} from '../components'

storiesOf('Wallet/NavbarItem', module)
  .add('wallet', () => {
    return <NavbarItem title="wallets" icon="faWallet" />
  })
  .add('send', () => {
    return <NavbarItem title="send" icon="faArrowCircleUp" />
  })
  .add('contracts', () => {
    return <NavbarItem title="contracts" icon="faCopy" />
  })

storiesOf('Wallet/NetworkStatus', module)
  .add('default', () => (
    <NetworkStatus
      peers={2}
      blockNumber="6,123,456"
      timestamp={moment().unix()}
    />
  ))
  .add('stale timestamp', () => (
    <NetworkStatus
      peers={2}
      blockNumber="6,123,456"
      timestamp={moment()
        .subtract(30, 'minutes')
        .unix()}
    />
  ))
  .add('empty state', () => <NetworkStatus />)

storiesOf('Wallet/Account/List', module).add('default', () => {
  const accounts = [
    {
      balance: '6000000000000000000',
      name: 'Account 1',
      tokens: [
        { address: '0x5555555555555555555555555555555555555555' },
        { address: '0x6666666666666666666666666666666666666666' },
        { address: '0x7777777777777777777777777777777777777777' },
        { address: '0x8888888888888888888888888888888888888888' },
        { address: '0x9999999999999999999999999999999999999999' },
        { address: '0x1111111111111111111111111111111111111111' }
      ],
      address: '0x5555555555555555555555555555555555555555'
    },
    {
      balance: '600000000000000000',
      name: 'Account 2',
      tokens: [],
      address: '0x6666666666666666666666666666666666666666'
    },
    {
      balance: '60000000000000000',
      name: 'Account 3',
      tokens: [],
      address: '0x7777777777777777777777777777777777777777'
    },
    {
      balance: '6000000000000000',
      name: 'Account 4',
      tokens: [],
      address: '0x8888888888888888888888888888888888888888'
    },
    {
      balance: '600000000000000',
      name: 'Account 5',
      tokens: [],
      address: '0x9999999999999999999999999999999999999999'
    },
    {
      balance: '60000000000000',
      name: 'Account 6',
      tokens: [],
      address: '0x1111111111111111111111111111111111111111'
    }
  ]
  return <AccountList accounts={accounts} />
})

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

storiesOf('Wallet/Notification', module).add('default', () => (
  <Notification message="Example message" />
))
