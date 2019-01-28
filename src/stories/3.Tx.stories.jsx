import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import FeeSelector from '../components/Tx/SendTx/FeeSelector'
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
import TxHistory from '../components/Tx/TxHistory'
import TransactionRow from '../components/Tx/TransactionRow'

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
  network: 'main',
  // description is not part of the receipt or hash
  // and must be set by the program.
  description: 'Sent',
  // dateSent is not part of the receipt or hash
  // and must be set by the program.
  dateSent: new Date()
}

storiesOf('Tx/Fee Selector', module).add('default ', () => <FeeSelector />)

const TxTable = styled.table`
  display: table;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin: 16px 0;
`

const TxTableBody = styled.tbody`
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
  tr:nth-child(odd) {
    background-color: rgba(204, 198, 198, 0.3);
  }
`

storiesOf('Tx/TransactionRow', module)
  .add('Sent Tx', () => {
    return (
      <TxTable>
        <TxTableBody>
          <TransactionRow
            onClick={console.log}
            transaction={Object.assign({}, dummyTx, { confirmationNumber: 13 })}
          />
        </TxTableBody>
      </TxTable>
    )
  })
  .add("Multiple tx's", () => {
    return (
      <TxTable>
        <TxTableBody>
          <TransactionRow
            onClick={console.log}
            transaction={Object.assign({}, dummyTx, { confirmationNumber: 13 })}
          />
          <TransactionRow
            isRecipient
            onClick={console.log}
            transaction={Object.assign({}, dummyTx, { confirmationNumber: 13 })}
          />
        </TxTableBody>
      </TxTable>
    )
  })
  .add('Received Tx', () => {
    return (
      <TxTable>
        <TxTableBody>
          <TransactionRow
            isRecipient
            onClick={console.log}
            transaction={Object.assign({}, dummyTx, { confirmationNumber: 13 })}
          />
        </TxTableBody>
      </TxTable>
    )
  })
  .add('Pending Tx', () => {
    return (
      <TxTable>
        <TxTableBody>
          <TransactionRow onClick={console.log} transaction={dummyTx} />
          <TransactionRow
            onClick={console.log}
            transaction={Object.assign({}, dummyTx, { confirmationNumber: 13 })}
          />
        </TxTableBody>
      </TxTable>
    )
  })
  .add('Confirming Tx', () => {
    return (
      <TxTable>
        <TxTableBody>
          {React.cloneElement(
            <TransactionRow
              onClick={console.log}
              transaction={Object.assign({}, dummyTx, {
                confirmationNumber: 6
              })}
            />
          )}
        </TxTableBody>
      </TxTable>
    )
  })

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
