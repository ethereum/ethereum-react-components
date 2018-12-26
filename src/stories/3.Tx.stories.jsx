import React from 'react'
import { storiesOf } from '@storybook/react'
import FeeSelector from '../components/Tx/SendTx/FeeSelector'
import TxHistory from '../components/Tx/History'
import FormSubmitTx from '../components/Tx/SendTx/FormSubmitTx'
import TxDescription from '../components/Tx/SendTx/TxDescription'
import DeployContract from '../components/Tx/SendTx/TxDescription/DeployContract'
import TokenTransfer from '../components/Tx/SendTx/TxDescription/TokenTransfer'
import FunctionExecution from '../components/Tx/SendTx/TxDescription/FunctionExecution'
import SendEther from '../components/Tx/SendTx/TxDescription/SendEther'
import GasNotification from '../components/Tx/SendTx/GasNotification'
import TxParties from '../components/Tx/SendTx/TxParties'
import TxParty from '../components/Tx/SendTx/TxParty'
import SendTx from '../components/Tx/SendTx/FormSendTx'

const dummyTx = {
  nonce: 0,
  from: '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
  to: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
  gas: '0x76c0', // 30400
  data: '',
  gasPrice: '0x9184e72a000', // 10000000000000
  value: '1000000000000000000',
  params: [
    { value: '0x4444444444444444444444444444444444444444' },
    { value: '20000000000000000' }
  ],
  network: 'main'
}

storiesOf('Tx/Fee Selector', module).add('default ', () => <FeeSelector />)

storiesOf('Tx/Submit Form', module)
  .add('default', () => <FormSubmitTx />)
  .add('confirming', () => <FormSubmitTx unlocking />)
  .add('error', () => <FormSubmitTx error />)

storiesOf('Tx/Description', module)
  .add('default', () => {
    return <TxDescription {...dummyTx} />
  })
  .add('deploy contract', () => {
    return <TxDescription {...dummyTx} isNewContract />
  })
  .add('transfer tokens', () => {
    return (
      <TxDescription
        {...dummyTx}
        executionFunction="transfer(address,uint256)"
        token={{ symbol: 'LOL', decimals: 18 }}
        toIsContract
      />
    )
  })
  .add('execute function', () => {
    return (
      <TxDescription
        {...dummyTx}
        executionFunction="approve(uint256)"
        toIsContract
      />
    )
  })

storiesOf('Tx/Description/DeployContract', module).add('with data', () => {
  return <DeployContract data={'a'.repeat(500)} />
})

storiesOf('Tx/Description/TokenTransfer', module)
  .add('with token data', () => {
    return (
      <TokenTransfer
        params={[{ value: '?' }, { value: '800000000000000' }]}
        token={{ symbol: 'LOL', decimals: 18 }}
      />
    )
  })
  .add('without token data', () => {
    return (
      <TokenTransfer params={[{ value: '?' }, { value: '800000000000000' }]} />
    )
  })

storiesOf('Tx/Description/SendEther', module)
  .add('default', () => {
    return <SendEther value="0.03" valueInUSD="3" network="main" />
  })
  .add('transfer', () => {
    return <SendEther value="0.03" valueInUSD="3" network="rinkeby" />
  })

storiesOf('Tx/Description/FunctionExecution', module)
  .add('default', () => {
    return <FunctionExecution />
  })
  .add('transfer', () => {
    return <FunctionExecution executionFunction="transfer(uint256,address)" />
  })

storiesOf('Tx/TxParty', module)
  .add('origin', () => {
    return <TxParty address={dummyTx.from} />
  })
  .add('origin - executing a contract', () => {
    return <TxParty address={dummyTx.from} isContract />
  })
  .add('destination - user', () => {
    return <TxParty address={dummyTx.from} addressType="user" />
  })
  .add('destination - contract', () => {
    return <TxParty address={dummyTx.from} addressType="contract" isContract />
  })

storiesOf('Tx/TxParties', module)
  .add('default', () => {
    return <TxParties {...dummyTx} />
  })
  .add('deploy contract', () => {
    return <TxParties {...dummyTx} isNewContract />
  })
  .add('executing contract function', () => {
    return <TxParties {...dummyTx} toIsContract />
  })
  .add('sending tokens', () => {
    return <TxParties {...dummyTx} isTokenTransfer />
  })

storiesOf('Tx/Gas Notification', module).add('default', () => (
  <GasNotification />
))

storiesOf('Tx/SendTx', module).add('default', () => {
  const nodes = {
    network: 'main',
    local: { blockNumber: 100 },
    remote: { blockNumber: 100 }
  }
  return <SendTx network={nodes.network} newTx={dummyTx} />
})

storiesOf('Tx/History', module).add('default ', () => {
  const nodes = {
    local: { blockNumber: 100 },
    remote: { blockNumber: 100 }
  }
  const { local, remote } = nodes
  const blockNumber = Math.max(local.blockNumber, remote.blockNumber)
  return (
    <TxHistory etherPriceUSD="200" blockNumber={blockNumber} txs={[dummyTx]} />
  )
})
