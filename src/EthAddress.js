import React from "react";

const EthAddress = ({address, onClick}) => (
  <span className='eth-address' onClick={onClick}>
    {address}

    {/*language=CSS*/}
    <style jsx>{`
      .eth-address {
        color: black;
        padding: 4px 10px;
        font-size: 14px;
        border: 1px solid gray;
        border-radius: 4px;
        cursor: pointer;
      }
    `}</style>
  </span>
)

export default EthAddress;