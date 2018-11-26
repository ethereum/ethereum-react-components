import React from 'react';
import { storiesOf } from '@storybook/react';
import FeeSelector from '../components/Tx/SendTx/FeeSelector';

storiesOf('Tx/Fee Selector', module)
  .add('default ', () => (
    <FeeSelector />
  ))
  .add('main net', () => (
    <div>
      <span>placeholder</span>
    </div>
  ));

storiesOf('Tx/Fee Selector', module)
  .add('no connection ', () => (
    <div>
      <span>placeholder</span>
    </div>
  ))
  .add('main net', () => (
    <div>
      <span>placeholder</span>
    </div>
  ));


storiesOf('Tx/Send', module)
  .add('no connection ', () => <span>placeholder</span>)


storiesOf('Tx/History', module)
  .add('default ', () => (
    <span>placeholder</span>
  ));