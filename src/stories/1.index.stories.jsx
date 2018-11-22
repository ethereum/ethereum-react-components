import React from 'react'

import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'

import { Welcome } from '@storybook/react/demo'


import { Identicon, EthAddress, Spinner, Pulse, LoadingButton } from '../components';

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

storiesOf('Widgets/LoadingButton', module)
  .add('default', () => (
    <div>
      <LoadingButton>click me</LoadingButton>
    </div>
  ))

storiesOf('Widgets/Eth Address', module)
  .addDecorator(story => (
    <div style={{
      padding: '20px 40px 40px',
    }}
    >
      <h1 style={{
        margin: '20px 0px 0px',
        padding: '0px 0px 5px',
        color: 'rgb(68, 68, 68)',
      }}
      >
Rendered
      </h1>
      <div style={{ borderBottom: '1px solid rgb(238, 238, 238)', backgroundColor: '#eeeeee63' }} />
      <div style={{ padding: 20 }}>{story()}</div>
    </div>
  ))
  .addParameters({
    // see https://github.com/storybooks/storybook/tree/master/addons/info#options-and-defaults
    info: {
      inline: true,
      header: false,
      styles: {
        infoBody: {
          border: 'none',
        },
      },
    },
  })
  .add('default', () => <EthAddress address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />)
  .add('shortened', () => <EthAddress short address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />)
  .add('with identicon', () => <EthAddress identicon address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />)
  .add('click -> copy to clipboard', () => <span>placeholder</span>);

storiesOf('Widgets/Eth QR', module)
  .add('default', () => <EthAddress address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />)
  .add('click -> copy to clipboard', () => <span>placeholder</span>);
