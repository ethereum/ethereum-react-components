import React from 'react'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import Welcome from './Welcome'

import {
  Identicon,
  EthAddress,
  Spinner,
  Pulse,
  Button,
  Checkbox,
  Input,
  TextArea,
  Select,
  FileChooser
  // ValidatedField,
  // ConverterForm
} from '../components'
import Checkmark from '../components/Widgets/AnimatedIcons/Checkmark'
import Cross from '../components/Widgets/AnimatedIcons/AnimatedCross'

storiesOf('Welcome', module).add('to Ethereum Components', () => (
  <Welcome showApp={linkTo('Button')} />
))

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

storiesOf('Widgets/Animations/Spinner', module).add('default', () => (
  <Spinner />
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

storiesOf('Widgets/Button', module)
  .add('default', () => <Button>click me</Button>)
  .add('loading', () => <Button loading>click me</Button>)
  .add('disabled', () => <Button disabled>click me</Button>)
  .add('secondary', () => <Button secondary>click me</Button>)
  .add('secondary loading', () => (
    <Button secondary loading>
      click me
    </Button>
  ))
  .add('secondary disabled', () => (
    <Button secondary disabled>
      click me
    </Button>
  ))
  .add('flat', () => <Button flat>click me</Button>)
  .add('flat loading', () => (
    <Button flat loading>
      click me
    </Button>
  ))
  .add('flat disabled', () => (
    <Button flat disabled>
      click me
    </Button>
  ))
  .add('flat secondary', () => (
    <Button flat secondary>
      click me
    </Button>
  ))
  .add('flat secondary loading', () => (
    <Button flat secondary loading>
      click me
    </Button>
  ))
  .add('flat secondary disabled', () => (
    <Button flat secondary disabled>
      click me
    </Button>
  ))

storiesOf('Widgets/Form/Input', module).add('default', () => <Input />)

storiesOf('Widgets/Form/TextArea', module).add('default', () => <TextArea />)

storiesOf('Widgets/Form/FileChooser', module).add('default', () => (
  <FileChooser />
))

storiesOf('Widgets/Form/Select', module).add('default', () => <Select />)

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
