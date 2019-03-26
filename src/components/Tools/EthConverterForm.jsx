import React, { Component } from 'react'
import Select from 'react-select'
import { keccak } from 'ethereumjs-util'
import ConverterForm from '../Widgets/ConverterForm'

function perf(cb) {
  return input => {
    console.time('someFunction')
    const result = cb(input) // Whatever is timed goes between the two "console.time"
    console.timeEnd('someFunction')
    return result
  }
}

const converters = {
  keccak: perf(input => keccak(input).toString('hex')),
  base64_encode: perf(input => btoa(input)),
  base64_decode: perf(input => atob(input))
}

const options = [
  { value: 'keccak', label: 'Keccak' },
  { value: 'base64_encode', label: 'Base64 (encode)' },
  { value: 'base64_decode', label: 'Base64 (decode)' }
  // { value: 'base56', label: 'Base56' }
]

export default class EthConverterForm extends Component {
  static displayName = 'EthConverterForm'

  static propTypes = {}

  static defaultProps = {}

  state = {
    selectedOption: options[0]
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
  }

  render() {
    const { selectedOption } = this.state
    const converter = converters[selectedOption.value]
    return (
      <div>
        <div style={{ width: 500, marginBottom: 20 }}>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
          />
        </div>
        <ConverterForm converter={converter} />
      </div>
    )
  }
}
