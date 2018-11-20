import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { FeeSelector } from '../components'

storiesOf('Send TX/Fee Selector', module)
.add('default ', () => (
  <FeeSelector />
))
.add('main net', () => (
  <div>
    <span>placeholder</span>
  </div>
))

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
))