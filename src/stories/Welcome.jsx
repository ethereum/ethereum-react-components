import React from 'react'

const Welcome = () => (
  <div className="Welcome">

    <h1>Ethereum React Components</h1>

    This is a components library for Ethereum components...

    {/* language=CSS */}
    <style jsx>
      {`
      .Welcome {
        padding: 4px 10px;
        font-size: 14px;
        border: none;
        border-radius: 4px;
      }
    `}
    </style>
  </div>
)

export default Welcome