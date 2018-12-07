import React from 'react'
import { storiesOf } from '@storybook/react'

import EthValidatedField from '../components/Tools/EthValidatedField'
import EthConverterForm from '../components/Tools/EthConverterForm'
import ConverterForm from '../components/Widgets/ConverterForm'

storiesOf('Tools/Validation', module)
  .add('address', () => <EthValidatedField type="address" />, {
    notes: 'try 0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D'
  })
  .add('address valid', () => (
    <EthValidatedField
      type="address"
      value="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
    />
  ))
  .add('checksum address', () => <EthValidatedField type="checksum-address" />)
  .add('password', () => <EthValidatedField type="password" />)
  .add('password invalid', () => (
    <EthValidatedField type="password" value="123" />
  ))
  .add('private key', () => <EthValidatedField type="private-key" />)
  .add('public key', () => <EthValidatedField type="public-key" />)
  .add('signature', () => <EthValidatedField type="signature" />)
  .add('zero address', () => (
    <EthValidatedField
      type="zero-address"
      value="0x0000000000000000000000000000000000000000"
    />
  ))

storiesOf('Tools/Conversion', module)
  .add('select', () => <EthConverterForm />)
  .add('keccak', () => <ConverterForm converter={() => {}} />)
