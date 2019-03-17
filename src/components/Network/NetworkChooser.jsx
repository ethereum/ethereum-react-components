import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import EthCommon from 'ethereumjs-common'
import Select from '../Widgets/Form/Select'
// import { Pulse } from '..'

const chains = [
  'mainnet',
  'ropsten',
  'kovan',
  'rinkeby'
  // 'private',
  // 'custom'
]

// same color-coding as metamask
const chainColor = {
  mainnet: 'rgb(3, 135, 137)',
  ropsten: 'rgb(255, 74, 141)',
  kovan: 'rgb(112, 87, 255)',
  rinkeby: 'rgb(246, 195, 67)'
}

const chainOptions = chains.map(chain => new EthCommon(chain))

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const options = chainOptions.map(chain => {
  const value = Date.now()
  const label = jsUcfirst(chain.chainName())
  return {
    value,
    label,
    color: chainColor[chain.chainName()] || 'gray',
    chainOptions: chain
  }
})

const NetworkOption = ({ innerProps, data }) => (
  <div
    {...innerProps}
    style={{
      display: 'flex',
      flexDirection: 'row',
      height: 40
    }}>
    {/* <Pulse multiple fill color='lightgreen' size="10px"/> */}
    <span
      style={{
        height: 20,
        width: 20,
        backgroundColor: data.color,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10
      }}
    />
    <span>{data.label}</span>
  </div>
)

export default class NetworkChooser extends Component {
  static displayName = 'NetworkChooser'

  state = {
    selectedOption: null
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
  }

  render() {
    const { selectedOption } = this.state

    return (
      <div>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          components={{ Option: NetworkOption }}
        />
      </div>
    )
  }
}
