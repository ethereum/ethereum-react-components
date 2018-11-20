import React from 'react';
import PropTypes from 'prop-types';
import Identicon from './Identicon';

const EthAddress = ({
  address, short, identicon, onClick,
}) => (
  <span className="eth-address" onClick={onClick}>
    {identicon === true && <Identicon seed={address} />}
    {short
      ? [...address.split('').slice(0, 10), '...', ...address.split('').slice(42 - 10)].join('')
      : address
    }

    {/* language=CSS */}
    <style jsx>
      {`
      .eth-address {
        color: black;
        padding: 4px 10px;
        font-size: 14px;
        border: 1px solid gray;
        border-radius: 4px;
        cursor: pointer;
      }
    `}
    </style>
  </span>
);

EthAddress.displayName = 'EthAddress';

EthAddress.propTypes = {
  /** Ethereum public address (42 chars)  */
  address: PropTypes.string.isRequired,
  /** Display abbreviated form with '...'& 23 instead of 42 chars.  */
  short: PropTypes.bool,
  /** Displays the identicon next to the address */
  identicon: PropTypes.bool,
};

EthAddress.defaultProps = {
  short: false,
  identicon: false,
};

export default EthAddress;
