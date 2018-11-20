import React from 'react';
import { storiesOf } from '@storybook/react';
import FeeSelector from '../components/SendTx/FeeSelector';

storiesOf('Send TX/Fee Selector', module)
  .add('default ', () => (
    <FeeSelector />
  ))
  .add('main net', () => (
    <div>
      <span>placeholder</span>
    </div>
  ));

storiesOf('Send TX/Fee Selector', module)
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
