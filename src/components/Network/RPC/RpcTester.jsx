import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'

const jsApi = [
  'net_version',
  'net_peerCount',
  'eth_protocolVersion',
  'eth_syncing',
  'web3_clientVersion'
]

const options = jsApi.map(command => ({
  value: command,
  label: command
}))

// geth --rpc --rpccorsdomain "*"

class Rpc extends Component {
  state = {
    selectedMethod: null,
    result: 'no result'
  }

  componentDidMount = async () => {}

  handleChange = selection => {
    this.setState({ selectedMethod: selection.value })
    this.makeRequest(selection.value)
  }

  makeRequest = async selectedMethod => {
    const url = 'http://localhost:7545'
    const obj = {
      jsonrpc: '2.0',
      method: selectedMethod,
      params: [],
      id: 0
    }
    try {
      const result = await axios.post(url, obj)
      this.setState({
        result: JSON.stringify(result.data, undefined, 2)
      })
    } catch (e) {
      this.setState({
        result: e.message
      })
    }
  }

  render() {
    const { selectedMethod, result } = this.state

    return (
      <div>
        <h1>Rpc Tester</h1>
        <Select
          value={selectedMethod}
          onChange={this.handleChange}
          options={options}
        />
        <h2>Result</h2>
        <pre>{result}</pre>
      </div>
    )
  }
}

export default Rpc
