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
  FileChooser,
  Grid,
  Identicon,
  Input,
  Progress,
  Pulse,
  Select,
  Spinner,
  TextArea,
  WalletButton
} from '../components'
import Checkmark from '../components/Widgets/AnimatedIcons/Checkmark'
import Cross from '../components/Widgets/AnimatedIcons/Cross'

const theme = createMuiTheme({
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

storiesOf('Widgets/Form/AddressSelect', module)
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

storiesOf('Grid', module).add('index', () => {
  return (
    <Grid container justify="center" spacing={16}>
      <Grid item xs={12}>
        <div style={{ background: '#00A4FF', height: '50px' }} />
      </Grid>
      <Grid item xs={6}>
        <div style={{ background: '#00A4FF', height: '50px' }} />
      </Grid>
      <Grid item xs={6}>
        <div style={{ background: '#00A4FF', height: '50px' }} />
      </Grid>
      <Grid item xs={4} sm={3}>
        <div style={{ background: '#00A4FF', height: '50px' }} />
      </Grid>
      <Grid item xs={4} sm={6}>
        <div style={{ background: '#00A4FF', height: '50px' }} />
      </Grid>
      <Grid item xs={4} sm={3}>
        <div style={{ background: '#00A4FF', height: '50px' }} />
      </Grid>
    </Grid>
  )
})

storiesOf('Widgets/Identicon', module)
  .add('default', () => <Identicon />)
  .add('anonymous', () => <Identicon anonymous />)
  .add('nano (with address)', () => (
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="nano"
    />
  ))
  .add('tiny (with address)', () => (
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="tiny"
    />
  ))
  .add('small (with address)', () => (
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="small"
    />
  ))
  .add('medium (with address)', () => (
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="medium"
    />
  ))
  .add('large (with address)', () => (
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="large"
    />
  ))

storiesOf('Widgets/Progress', module).add('index', () => (
  <MuiThemeProvider theme={theme}>
    <Progress value={40} />
    <br />
    <Progress variant="indeterminate" />
    <br />
    <Progress variant="buffer" value={60} valueBuffer={70} />
    <br />
    <Progress variant="query" />
  </MuiThemeProvider>
))

storiesOf('Widgets/Animations/Spinner', module).add('index', () => (
  <MuiThemeProvider theme={theme}>
    <div>
      <Spinner />
      <Spinner size={30} />
      <Spinner size={20} />

      <br />
      <br />
      <div
        style={{
          backgroundColor: 'black',
          padding: '20px',
          display: 'inline-block'
        }}
      >
        <Spinner color="secondary" />
        <Spinner color="secondary" size={30} />
        <Spinner color="secondary" size={20} />
      </div>
    </div>
  </MuiThemeProvider>
))

storiesOf('Widgets/WalletButton', module).add('default', () => (
  <WalletButton onClick={() => {}}>Add Wallet Contract</WalletButton>
))

storiesOf('Widgets/Animations/Pulse', module)
  .add('default', () => <Pulse />)
  .add('filled', () => <Pulse fill />)
  .add('multiple', () => <Pulse multiple />)
  .add('multiple filled', () => <Pulse multiple fill />)
  .add('multiple filled green', () => <Pulse multiple fill color="#78c781" />)

storiesOf('Widgets/Animations/Icons', module)
  .add('checkmark', () => <Checkmark />)
  .add('cross', () => <Cross />)

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
        <Button secondary>click me</Button>
        <br />
        <br />
        <Button secondary disabled>
          click me
        </Button>
      </div>
    </MuiThemeProvider>
  )
})

storiesOf('Widgets/Form/Input', module).add('default', () => (
  <Input label="Example Label" placeholder="Placeholder text..." />
))

storiesOf('Widgets/Form/AddressInput', module).add('index', () => {
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

storiesOf('Widgets/Form/TextArea', module).add('index', () => (
  <TextArea label="Multiline Input" placeholder="Enter adds a line..." />
))

storiesOf('Widgets/Form/FileChooser', module).add('default', () => (
  <FileChooser />
))

storiesOf('Widgets/Form/Select', module).add('index', () => {
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

storiesOf('Widgets/Form/Checkbox', module)
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
