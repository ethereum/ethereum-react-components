import React from 'react'
import PropTypes from 'prop-types'
import util from 'ethereumjs-util'
import { ValidatedField } from '..';


const config = {
  address: {
    placeholder: 'address',
    validator: util.isValidAddress
  },
  password: {
    placeholder: 'password',
    input: 'password',
    validator: (pw) => {
      const ascii = /^[ -~]+$/
      if (!ascii.test(pw)) {
        throw new Error('illegal character (non-ascii)')
      }

      if (pw.length < 8) {
        throw new Error('password too short (< 8)')
      }

      return true
    }
  },
  'checksum-address': {
    placeholder: 'checksum address',
    validator: util.isValidChecksumAddress
  },
  'private-key': {
    placeholder: 'private key',
    validator: util.isValidPrivate
  },
  'public-key': {
    placeholder: 'public key',
    validator: util.isValidPublic
  },
  signature: {
    placeholder: 'signature',
    validator: util.isValidSignature
  },
  'zero-address': {
    placeholder: 'zero address',
    validator: util.isZeroAddress
  },
  undefined: {
    validator: () => true
  }

}

const EthValidatedField = ({ type = 'undefined', value = '', placeholder, onChange, size=50 }) => {
  config['undefined'].placeholder = placeholder
  const { validator, placeholderConfig } = config[type]
  const inputType = config[type].input || 'text'
  return (
    <ValidatedField
      validator={validator}
      type={inputType}
      placeholder={placeholderConfig}
      value={value}
      onChange={onChange}
      size={size}
    />
  )
}

EthValidatedField.displayName = 'ValidatedField'

EthValidatedField.propTypes = {
  type: PropTypes.oneOf([
    'address',
    'checksum-address',
    'password',
    'private-key',
    'public-key',
    'signature',
    'zero-address'
  ]).isRequired
}


export default EthValidatedField
