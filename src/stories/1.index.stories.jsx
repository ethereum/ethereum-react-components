import React from 'react'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import { Welcome } from '@storybook/react/demo'


import {
  Identicon,
  EthAddress,
  Spinner,
  Pulse,
  Button,
  LoadingButton,
  ValidatedField
} from '../components';

storiesOf('Welcome', module).add('to Ethereum Components', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Widgets/Identicon', module)
  .add('with seed', () => (
    <div>
      <Identicon seed="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />
    </div>
  ))
  .add('with radius', () => (<Identicon seed="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />), {
    notes: {
      markdown: '# Title ',
    },
  });

storiesOf('Widgets/Animations/Spinner', module)
  .add('default', () => (
    <div>
      <Spinner />
    </div>
  ))
storiesOf('Widgets/Animations/Pulse', module)
  .add('default', () => (
    <div>
      <Pulse />
    </div>
  ))
  .add('filled', () => (
    <div>
      <Pulse fill />
    </div>
  ))
  .add('multiple', () => (
    <div>
      <Pulse multiple />
    </div>
  ))
  .add('multiple filled', () => (
    <div>
      <Pulse multiple fill />
    </div>
  ))
  .add('multiple filled green', () => (
    <div>
      <Pulse multiple fill color="#78c781" />
    </div>
  ))

storiesOf('Widgets/Button', module)
  .add('default', () => (
    <div>
      <Button>click me</Button>
    </div>
  ))

storiesOf('Widgets/LoadingButton', module)
  .add('default', () => (
    <div>
      <LoadingButton>click me</LoadingButton>
    </div>
  ))
  .add('loading', () => (
    <div>
      <LoadingButton loading>click me</LoadingButton>
    </div>
  ))

storiesOf('Widgets/ValidatedField', module)
  .add('address', () => <ValidatedField type="address" />, {
    notes: 'try 0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D'
  })
  .add('address valid', () => <ValidatedField type="address" value="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />)
  .add('checksum address', () => <ValidatedField type="checksum-address" />)
  .add('password', () => <ValidatedField type="password" />)
  .add('password invalid', () => <ValidatedField type="password" value="123"/>)
  .add('private key', () => <ValidatedField type="private-key" />)
  .add('public key', () => <ValidatedField type="public-key" />)
  .add('signature', () => <ValidatedField type="signature" />)
  .add('zero address', () => <ValidatedField type="zero-address" value="0x0000000000000000000000000000000000000000" />)


storiesOf('Widgets/Eth Address', module)
  .add('default', () => <EthAddress address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />)
  .add('shortened', () => <EthAddress short address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />)
  .add('with identicon', () => <EthAddress identicon address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />)
  .add('click -> copy to clipboard', () => <span>placeholder</span>);

storiesOf('Widgets/Eth QR', module)
  .add('default', () => <EthAddress address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />)
  .add('click -> copy to clipboard', () => <span>placeholder</span>);
