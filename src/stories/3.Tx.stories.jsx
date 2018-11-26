import React from 'react'
import { storiesOf } from '@storybook/react'
import FeeSelector from '../components/Tx/SendTx/FeeSelector'
import TxHistory from '../components/Tx/History'

storiesOf('Tx/Fee Selector', module)
  .add('default ', () => (
    <FeeSelector />
  ))
  .add('main net', () => (
    <div>
      <span>placeholder</span>
    </div>
  ))

storiesOf('Tx/Fee Selector', module)
  .add('no connection ', () => (
    <div>
      <span>placeholder</span>
    </div>
  ))
  .add('main net', () => (
    <div>
      <span>placeholder</span>
    </div>
  ))


storiesOf('Tx/Send', module)
  .add('no connection ', () => <span>placeholder</span>)


storiesOf('Tx/History', module)
  .add('default ', () => <TxHistory /> )
  .add('default ', () => (
    <TxHistory
      etherPriceUSD="200"
      txs={[
        {
          nonce: 0,
          from: '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
          to: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
          gas: '0x76c0', // 30400
          data: '',
          gasPrice: '0x9184e72a000', // 10000000000000
          value: '1000000000000000000'
        }
      ]}
    />
  ))
