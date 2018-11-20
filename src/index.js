
import React from 'react'

import Identicon from './Identicon'
import EthAddress from './EthAddress'
import FeeSelector from './FeeSelector'
import {FormCreateAccount, InputPassword } from './CreateAccount'

const Button = ({children, onClick}) => (
  <button className='Button' onClick={onClick}>
    {children}

    {/*language=CSS*/}
    <style jsx>{`
      .Button {
        background-color: #007dff;
        color: white;
        padding: 4px 10px;
        font-size: 14px;
        border: none;
        border-radius: 4px;
      }
    `}</style>
  </button>
)


export {
  Identicon,
  Button,
  EthAddress,
  FeeSelector,
  FormCreateAccount,
  InputPassword
}