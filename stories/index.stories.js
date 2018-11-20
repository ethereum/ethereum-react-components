import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';


import { Button, Identicon, EthAddress, FeeSelector, FormCreateAccount, InputPassword } from '../src/index'
import { addDecorator } from '@storybook/react/dist/client/preview';

storiesOf('Welcome', module).add('to Ethereum Components', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Identicon', module)
  .add('with seed', () => (
    <div>
      <Identicon seed={"0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"} />
    </div>
  ))
  .add('with radius', () => (
    <div>
      <Identicon seed={"0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"} />
    </div>
  ))

storiesOf('Eth Address', module)
  .addDecorator(story => (
    <div style={{
      padding: '20px 40px 40px'
    }}>
      <h1 style={{
        margin: '20px 0px 0px',
        padding: '0px 0px 5px',
        color: 'rgb(68, 68, 68)'
      }}>Rendered</h1>
      <div style={{ borderBottom: '1px solid rgb(238, 238, 238)', backgroundColor: '#eeeeee63' }}></div>
      <div style={{ padding: 20, }}>{story()}</div>
    </div>
  ))
  .addParameters({
    // see https://github.com/storybooks/storybook/tree/master/addons/info#options-and-defaults
    info: {
      inline: true,
      header: false,
      styles: {
        infoBody: {
          border: 'none'
        }
      }
    },
  })
  .add('default', () => <EthAddress address={"0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"} />)
  .add('shortened', () => <EthAddress short address={"0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"} />)
  .add('click -> copy to clipboard', () => <span>placeholder</span>)

storiesOf('Eth QR', module)
  .add('default', () => <EthAddress address={"0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"} />)
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

storiesOf('Create Account/Password Input', module)
  .add('default ', () => (
    <InputPassword />
  ))
  .add('filled + default (invisible) ', () => (
    <InputPassword value="my secret password" />
  ))
  .add('filled + visible ', () => (
    <InputPassword show value="my secret password" />
  ))

storiesOf('Create Account/Form', module)
  .add('default ', () => (
    <FormCreateAccount />
  ))
  .add('repeat password ', () => (
    <FormCreateAccount />
  ))
  .add('password too short ', () => (
    <FormCreateAccount />
  ))
  .add('bad character ', () => (
    <FormCreateAccount />
  ))
  .add('password mismatch ', () => (
    <FormCreateAccount />
  ))
  .add('creating ', () => (
    <FormCreateAccount />
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