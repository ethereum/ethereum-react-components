import React from 'react';

import { storiesOf } from '@storybook/react';

import { FormCreateAccount, InputPassword } from '../components';

storiesOf('Create Account/Password Input', module)
  .addParameters({
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
  .add('default ', () => (
    <InputPassword />
  ))
  .add('filled + default (invisible) ', () => (
    <InputPassword value="my secret password" />
  ))
  .add('filled + visible ', () => (
    <InputPassword show value="my secret password" />
  ));

storiesOf('Create Account/Form', module)
  .addParameters({
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
  ));
