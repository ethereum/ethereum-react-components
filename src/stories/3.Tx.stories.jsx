import React from 'react'
import { storiesOf } from '@storybook/react'
import FeeSelector from '../components/Tx/SendTx/FeeSelector'
import SubmitTxForm from '../components/Tx/SendTx/SubmitTxForm'
import TxDescription from '../components/Tx/SendTx/TxDescription'
import GasNotification from '../components/Tx/SendTx/GasNotification'
import TxParties from '../components/Tx/SendTx/TxParties'
import TxParty from '../components/Tx/SendTx/TxParty'
import SendTx from '../components/Tx/SendTx/SendTxForm'
import TxHistory from '../components/Tx/TxHistory'

const dummyTx = {
  nonce: 0,
  from: '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
  to: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef',
  estimatedGas: '0x76c0', // 30400
  data: '',
  gasPrice: '5000000000', // 5 gwei
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
      estimatedGas={dummyTx.estimatedGas}
      gasPrice={dummyTx.gasPrice}
    />
  ))
  .add('Test network', () => (
    <FeeSelector
      network="rinkeby"
      estimatedGas={dummyTx.estimatedGas}
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
    return <TxDescription {...dummyTx} data={'a'.repeat(500)} isNewContract />
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
  .add('Standard tx', () => {
    return (
      <TxParties from={dummyTx.from} to={dummyTx.to} params={dummyTx.params} />
    )
  })
  .add('Deploy contract', () => {
    return (
      <TxParties
        from={dummyTx.from}
        to={dummyTx.to}
        params={dummyTx.params}
        isNewContract
      />
    )
  })
  .add('Executing contract function', () => {
    return (
      <TxParties
        from={dummyTx.from}
        to={dummyTx.to}
        params={dummyTx.params}
        toIsContract
      />
    )
  })
  .add('Sending tokens', () => {
    return (
      <TxParties
        from={dummyTx.from}
        to={dummyTx.to}
        params={dummyTx.params}
        isTokenTransfer
      />
    )
  })

storiesOf('Tx/Gas Notification', module)
  .add('No error', () => <GasNotification />)
  .add('Not enough gas', () => <GasNotification gasError="notEnoughGas" />)
  .add('Over block gas limit', () => (
    <GasNotification gasError="overBlockGasLimit" />
  ))

storiesOf('Tx/SendTx', module)
  .add('Standard tx, main', () => {
    return <SendTx network="main" newTx={dummyTx} etherPriceUSD={200} />
  })
  .add('Standard tx, testnet', () => {
    return <SendTx network="ropsten" newTx={dummyTx} />
  })
  .add('Standard tx, gas loading', () => {
    return (
      <SendTx
        network="ropsten"
        newTx={{ ...dummyTx, estimatedGas: undefined, gasLoading: true }}
      />
    )
  })
  .add('Standard tx, no gas estimate', () => {
    return (
      <SendTx
        network="ropsten"
        newTx={{ ...dummyTx, estimatedGas: undefined, gasLoading: false }}
      />
    )
  })

const standardTxPending = {
  blockNumber: null,
  createdAt: '2018-12-26T20:31:21.684Z',
  data: '',
  estimatedGas: 21000,
  executionFunction: '',
  from: '0x8a5750357f16d96565f4a06ee732065536a91c6e',
  gas: '0x61a80',
  gasError: '',
  gasPrice: '2000000000',
  hash: '0x68cb1c7673024029578cfa900346eb43f9fb1de59da6495ade46b227a4cbec78',
  isNewContract: false,
  networkId: 1,
  nonce: 63,
  params: [],
  priority: false,
  to: '0x00a839de7922491683f547a67795204763ff8237',
  toIsContract: false,
  token: {
    address: '',
    decimals: 18,
    name: '',
    symbol: ''
  },
  value: '0x174876e800'
}

const standardTxFailed = {
  ...standardTxPending,
  status: 0,
  gasUsed: 21000
}

const standardTxConfirmed = {
  ...standardTxPending,
  blockNumber: 9990,
  status: 1,
  gasUsed: 21000
}

const standardTxConfirmedTestNet = {
  ...standardTxConfirmed,
  networkId: 4
}

const standardTxConfirmedPrivateNet = {
  ...standardTxConfirmed,
  networkId: 500
}

const toContractPending = {
  ...standardTxPending,
  toIsContract: true,
  executionFunction: 'createPet(str)'
}

const toContractConfirmed = {
  ...standardTxConfirmed,
  toIsContract: true,
  blockNumber: 9990,
  status: 1
}

const toContractFailed = {
  ...standardTxFailed,
  toIsContract: true,
  blockNumber: 9990,
  status: 0
}

const tokenTxPending = {
  ...standardTxPending,
  to: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  params: [
    '0x00a839de7922491683f547a67795204763ff8237',
    '10000000000000000000'
  ],
  executionFunction: 'transfer(address,uint256)',
  toIsContract: true,
  token: {
    address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    decimals: 18,
    name: 'Maker',
    symbol: 'MKR'
  },
  value: '0'
}

const tokenTxFailed = {
  ...tokenTxPending,
  blockNumber: 9990,
  status: 0,
  gasUsed: 21000
}

const tokenTxConfirmed = {
  ...tokenTxPending,
  blockNumber: 9990,
  status: 1,
  gasUsed: 21000
}

const toNewContractPending = {
  ...standardTxPending,
  toIsContract: true,
  isNewContract: true
}

const toNewContractFailed = {
  ...toNewContractPending,
  blockNumber: 9990,
  status: 0,
  gasUsed: 25000
}

storiesOf('Tx/TxHistory', module)
  .add('No txs', () => {
    return <TxHistory etherPriceUSD={200} blockNumber={10000} txs={[]} />
  })
  .add('Standard tx, Pending', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[standardTxPending]}
      />
    )
  })
  .add('Standard tx, Confirmed', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[standardTxConfirmed]}
      />
    )
  })
  .add('Standard tx, Failed', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[standardTxFailed]}
      />
    )
  })
  .add('To contract, Pending', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[toContractPending]}
      />
    )
  })
  .add('To contract, Confirmed', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[toContractConfirmed]}
      />
    )
  })
  .add('To contract, Failed', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[toContractFailed]}
      />
    )
  })
  .add('ERC20, Pending', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[tokenTxPending]}
      />
    )
  })
  .add('ERC20, Confirmed', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[tokenTxConfirmed]}
      />
    )
  })
  .add('ERC20, Failed', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[tokenTxFailed]}
      />
    )
  })
  .add('Standard tx, Confirmed, Test Net', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[standardTxConfirmedTestNet]}
      />
    )
  })
  .add('Standard tx, Confirmed, Private Net', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[standardTxConfirmedPrivateNet]}
      />
    )
  })
  .add('New contract, Pending', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[toNewContractPending]}
      />
    )
  })
  .add('New contract, Failed', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[toNewContractFailed]}
      />
    )
  })
  .add('List multiple txs', () => {
    return (
      <TxHistory
        etherPriceUSD={200}
        blockNumber={10000}
        txs={[standardTxPending, tokenTxConfirmed, toNewContractFailed]}
      />
    )
  })
