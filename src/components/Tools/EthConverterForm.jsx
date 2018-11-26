import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import ethUtils from 'ethereumjs-util'
import ConverterForm from '../Widgets/ConverterForm'

function perf(cb) {
  return (input) => {
    console.time('someFunction')
    let result = cb(input) // Whatever is timed goes between the two "console.time"
    console.timeEnd('someFunction')
    return result
  }
}

const converters = {
  keccak: perf(input => ethUtils.keccak(input).toString('hex')),
  base64_encode: perf(input => btoa(input)),
  base64_decode: perf(input => atob(input))
}

const options = [
  { value: 'keccak', label: 'Keccak' },
  { value: 'base64_encode', label: 'Base64 (encode)' },
  { value: 'base64_decode', label: 'Base64 (decode)' },
  // { value: 'base56', label: 'Base56' }
]

class EthConverterForm extends React.Component {

  state = {
    selectedOption: options[0],
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
  }

  render() {
    const { selectedOption } = this.state
    const converter = converters[selectedOption.value]
    return (
      <div>
        <div
          style={{ width: 500, marginBottom: 20 }}
        >
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


EthConverterForm.propTypes = {
  type: PropTypes.oneOf([
    'keccak'
  ]).isRequired
}

export default EthConverterForm
