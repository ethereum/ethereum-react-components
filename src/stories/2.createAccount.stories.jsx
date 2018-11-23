import React from 'react';
import { storiesOf } from '@storybook/react';
import { FormCreateAccount, InputPassword } from '../components';

storiesOf('Wallet/Account/Create/Password Input', module)
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

storiesOf('Wallet/Account/Create/Form', module)
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
  ), {
    notes: {
      markdown: '# Testing notes ',
    },
  })
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
