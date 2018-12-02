import React from 'react'
import PropTypes from 'prop-types'

const EthAddress = ({ address, short = false, onClick, classes }) => {

 !address
   ? short = false
   : null

  return (
    <span className={"eth-address " + classes} onClick={onClick}>
      {short
        ? [
            ...address.split('').slice(0, 10),
            '...',
            ...address.split('').slice(42 - 10)
          ].join('')
        : address}
    </span>
  )
}

EthAddress.displayName = 'EthAddress'

EthAddress.propTypes = {
  /** Ethereum public address (42 chars)  */
  address: PropTypes.string.isRequired,
  /** Display abbreviated form with '...' (23 chars)  */
  short: PropTypes.bool,
  /** Callback to be executed onClick */
  onClick: PropTypes.func
}

export default EthAddress
