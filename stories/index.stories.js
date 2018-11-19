import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';

import { Button, Identicon, EthAddress, FeeSelector } from '../src/index'

storiesOf('Welcome', module).add('to Ethereum Components', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Identicon', module)
  .add('with seed', () => (
    <div>
      <Identicon seed={"0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"}/>
    </div>
  ))
  .add('with radius', () => (
    <div>
      <Identicon seed={"0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"}/>
    </div>
  ))

storiesOf('Eth Address', module)
  .add('default', () => <EthAddress address={"0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"}/>)
  .add('shortened', () => <EthAddress short address={"0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"}/>)
  .add('click -> copy to clipboard', () => <span>placeholder</span>)

storiesOf('Eth QR', module)
  .add('default', () => <EthAddress address={"0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"}/>)
  .add('click -> copy to clipboard', () => <span>placeholder</span>)

storiesOf('NodeInfo', module)
  .add('no connection ', () => (
    <div>
      <span>placeholder</span>
    </div>
  ))
  .add('main net', () => (
    <div>
      <span>placeholder</span>
    </div>
  ))

storiesOf('Transaction Form/Fee Selector', module)
  .add('default ', () => (
    <FeeSelector />
  ))
  .add('main net', () => (
    <div>
      <span>placeholder</span>
    </div>
  ))

storiesOf('Transaction Form/Fee Selector', module)
  .add('no connection ', () => (
    <div>
      <span>placeholder</span>
    </div>
  ))
  .add('main net', () => (
    <div>
      <span>placeholder</span>
    </div>
  ))