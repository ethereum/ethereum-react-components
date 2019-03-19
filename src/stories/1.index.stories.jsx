import React from 'react'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Welcome from './Welcome'

import {
  AddressInput,
  AddressSelect,
  Button,
  Checkbox,
  EthAddress,
  Identicon,
  Select,
  Spinner,
  WalletButton
} from '../components'
import Checkmark from '../components/Widgets/AnimatedIcons/Checkmark'
import Cross from '../components/Widgets/AnimatedIcons/Cross'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#00A4FF',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ffffff'
    }
  }
})

const dummyWallets = {
  '0x2685F863Ddb456601783A57A1C3E9F8f3ebc6c3B': {
    balance: '3',
    name: 'Account 1',
    addressType: 'wallet'
  },
  '0xabc5F863Ddb456601783A57A1C3E9F8f3ebc6c3B': {
    balance: '0',
    name: 'Account 2',
    addressType: 'wallet'
  },
  '0yyy5F863Ddb456601783A57A1C3E9F8f3ebc6c3B': {
    balance: '0.01',
    name: 'Account 6',
    addressType: 'wallet'
  },
  '0xwww5F863Ddb456601783A57A1C3E9F8f3ebc6c3B': {
    balance: '0.0',
    name: 'Account 7',
    addressType: 'wallet'
  }
}

const dummyContracts = {
  '0xD26B16d9Cf2054fd0B266a03A11C4CC198Eed025': {
    from: '0x672a39c474572338713d8d01024d497d364b2bed',
    status: true,
    to: null,
    'contract-name': 'Contract 1',
    address: '0xD26B16d9Cf2054fd0B266a03A11C4CC198Eed025',
    balance: '0',
    addressType: 'contract'
  },
  '0xabcB16d9Cf2054fd0B266a03A11C4CC198Eed025': {
    from: '0x672a39c474572338713d8d01024d497d364b2bed',
    balance: '2',
    'contract-name': 'Contract 2',
    addressType: 'contract'
  }
}

storiesOf('Welcome', module).add('to Ethereum Components', () => (
  <Welcome showApp={linkTo('Button')} />
))

storiesOf('Widgets/AddressSelect', module)
  .add('wallets and contracts', () => (
    <AddressSelect
      wallets={dummyWallets}
      walletContracts={dummyContracts}
      onChange={() => {}}
    />
  ))
  .add('only wallets', () => (
    <AddressSelect wallets={dummyWallets} onChange={() => {}} />
  ))
  .add('only contracts', () => (
    <AddressSelect walletContracts={dummyContracts} onChange={() => {}} />
  ))
  .add('no addresses provided', () => <AddressSelect onChange={() => {}} />)

storiesOf('Widgets/Identicon', module).add('index', () => (
  <div>
    <Identicon />
    <Identicon anonymous />
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="nano"
    />
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="tiny"
    />
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="small"
    />
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="medium"
    />
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="large"
    />
  </div>
))

storiesOf('Widgets/Animations', module)
  .add('spinner', () => (
    <MuiThemeProvider theme={theme}>
      <Spinner />
      <Spinner size={30} />
      <Spinner size={20} />
    </MuiThemeProvider>
  ))
  .add('checkmark', () => <Checkmark />)
  .add('cross', () => <Cross />)

storiesOf('Widgets/WalletButton', module).add('default', () => (
  <WalletButton onClick={() => {}}>Add Wallet Contract</WalletButton>
))

storiesOf('Widgets/Button', module).add('index', () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Button>click me</Button>
        <br />
        <br />
        <Button disabled>click me</Button>
        <br />
        <br />
        <Button color="secondary">click me</Button>
        <br />
        <br />
        <Button color="secondary" disabled>
          click me
        </Button>
      </div>
    </MuiThemeProvider>
  )
})

storiesOf('Widgets/AddressInput', module).add('index', () => {
  return (
    <div>
      <AddressInput label="address" />
      <br />
      <br />
      <AddressInput label="address" value="0x0123" />
      <br />
      <br />
      <AddressInput
        label="address"
        value="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      />
    </div>
  )
})

storiesOf('Widgets/Select', module).add('index', () => {
  const options = [
    { value: 1, label: 'main' },
    { value: 3, label: 'ropsten' },
    { value: 4, label: 'rinkeby' },
    { value: 42, label: 'kovan' }
  ]

  return (
    <MuiThemeProvider theme={theme}>
      <Select
        name="network"
        id="colors-select"
        defaultValue={4}
        onChange={e => alert(`Value: ${e}`)}
        options={options}
      />
    </MuiThemeProvider>
  )
})

storiesOf('Widgets/Checkbox', module)
  .add('unchecked', () => (
    <Checkbox id="example" name="example" labelText="Example" />
  ))
  .add('checked', () => (
    <Checkbox id="example" name="example" checked labelText="Example" />
  ))

storiesOf('Widgets/Eth Address', module)
  .add('default', () => (
    <EthAddress address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />
  ))
  .add('shortened', () => (
    <EthAddress short address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />
  ))
  .add('with callback', () => (
    <EthAddress
      onClick={() => alert('clicked!')}
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
    />
  ))

storiesOf('Widgets/Eth QR', module)
  .add('default', () => (
    <EthAddress address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />
  ))
  .add('click -> copy to clipboard', () => <span>placeholder</span>)
