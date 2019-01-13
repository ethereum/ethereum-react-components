import React from 'react'
import { storiesOf } from '@storybook/react'
import FeeSelector from '../components/Tx/SendTx/FeeSelector'
import TxHistory from '../components/Tx/History'
import SubmitTxForm from '../components/Tx/SendTx/SubmitTxForm'
import TxDescription from '../components/Tx/SendTx/TxDescription'
import DeployContract from '../components/Tx/SendTx/TxDescription/DeployContract'
import TokenTransfer from '../components/Tx/SendTx/TxDescription/TokenTransfer'
import FunctionExecution from '../components/Tx/SendTx/TxDescription/FunctionExecution'
import SendEther from '../components/Tx/SendTx/TxDescription/SendEther'
import GasNotification from '../components/Tx/SendTx/GasNotification'
import TxParties from '../components/Tx/SendTx/TxParties'
import TxParty from '../components/Tx/SendTx/TxParty'
import SendTx from '../components/Tx/SendTx/SendTxForm'

const dummyTx = {
  nonce: 0,
  from: '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
  to: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
  gas: '0x76c0', // 30400
  data: '',
  gasPrice: '0x9184e72a000', // 10000000000000
  value: '1000000000000000000',
  params: [],
  network: 'main'
}

storiesOf('Tx/Fee Selector', module)
  .add('Main network, gas loading', () => (
    <FeeSelector network="main" etherPriceUSD={200} gasLoading />
  ))
  .add('Main network, no gas', () => (
    <FeeSelector network="main" etherPriceUSD={200} />
  ))
  .add('Main network', () => (
    <FeeSelector
      network="main"
      etherPriceUSD={200}
      gas={dummyTx.gas}
      gasPrice={dummyTx.gasPrice}
    />
  ))
  .add('Test network', () => (
    <FeeSelector
      network="rinkeby"
      gas={dummyTx.gas}
      gasPrice={dummyTx.gasPrice}
    />
  ))

storiesOf('Tx/Submit Form', module)
  .add('Default', () => <SubmitTxForm />)
  .add('Confirming', () => <SubmitTxForm unlocking />)
  .add('Error', () => <SubmitTxForm error />)

storiesOf('Tx/Description', module)
  .add('Standard tx', () => {
    return <TxDescription {...dummyTx} etherPriceUSD={200} />
  })
  .add('Standard tx, testnet', () => {
    return <TxDescription {...dummyTx} etherPriceUSD={200} network="rinkeby" />
  })
  .add('Deploy contract', () => {
    return (
      <TxDescription
        {...dummyTx}
        data="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        isNewContract
      />
    )
  })
  .add('Transfer tokens', () => {
    return (
      <TxDescription
        {...dummyTx}
        executionFunction="transfer(address,uint256)"
        token={{ symbol: 'MKR', decimals: 18 }}
        params={[
          {
            type: 'address',
            value: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef'
          },
          { value: '800000000000000' }
        ]}
        toIsContract
      />
    )
  })
  .add('Transfer tokens without token data', () => {
    return (
      <TxDescription
        {...dummyTx}
        executionFunction="transfer(address,uint256)"
        params={[
          {
            type: 'address',
            value: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef'
          },
          { value: '800000000000000' }
        ]}
        toIsContract
      />
    )
  })
  .add('Execute function', () => {
    return <TxDescription {...dummyTx} toIsContract />
  })
  .add('Execute named function', () => {
    return (
      <TxDescription
        {...dummyTx}
        executionFunction="approve(uint256)"
        toIsContract
      />
    )
  })

storiesOf('Tx/TxParty', module)
  .add('Origin', () => {
    return <TxParty address={dummyTx.from} />
  })
  .add('Origin - executing a contract', () => {
    return <TxParty address={dummyTx.from} isContract />
  })
  .add('Destination - user', () => {
    return <TxParty address={dummyTx.from} addressType="user" />
  })
  .add('Destination - contract', () => {
    return <TxParty address={dummyTx.from} addressType="contract" isContract />
  })

storiesOf('Tx/TxParties', module)
  .add('Default', () => {
    return <TxParties {...dummyTx} />
  })
  .add('Deploy contract', () => {
    return <TxParties {...dummyTx} isNewContract />
  })
  .add('Executing contract function', () => {
    return <TxParties {...dummyTx} toIsContract />
  })
  .add('Sending tokens', () => {
    return <TxParties {...dummyTx} isTokenTransfer />
  })

storiesOf('Tx/Gas Notification', module).add('default', () => (
  <GasNotification />
))

storiesOf('Tx/SendTx', module).add('default', () => {
  return <SendTx network="main" newTx={dummyTx} />
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
