import React from 'react'
import PropTypes from 'prop-types'
import util from 'ethereumjs-util'
import Checkmark from './AnimatedIcons/Checkmark'
import Cross from './AnimatedIcons/AnimatedCross'

const height = 50

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
  }

}

class ValidatedField extends React.Component {
  constructor(props) {
    super(props)
    const { value } = props
    const inputValue = value || ''
    this.state = {
      inputValue,
      isValid: undefined, // valid || invalid || error || processing
      errorMessage: ''
    }
  }

  componentDidMount() {
    const { inputValue } = this.state
    this.handleValidation(inputValue)
  }

  handleValidation = async (value) => {
    const { validator } = this.props
    this.setState({
      inputValue: value,
      errorMessage: '',
      isValid: ''
    })
    if (value === '') return

    let isValid = 'processing'
    this.setState({
      isValid
    })
    let errorMessage = ''
    try {
      isValid = await validator(value)
      if (isValid === true) {
        isValid = 'valid'
      } else if (isValid === false) {
        isValid = 'invalid'
      } else {
        isValid = 'error'
      }
    } catch (error) {
      isValid = 'error'
      errorMessage = error.message
    }
    this.setState({
      isValid,
      errorMessage
    })
  }

  renderIndicator() {
    const { isValid } = this.state
    if (isValid === undefined) return ''
    if (isValid === 'valid') return <Checkmark size={24} />
    if (isValid === 'invalid') return <Cross size={24} />
    if (isValid === 'error') return <Cross size={24} />
    return (
      isValid
    )
  }

  render() {
    const { type, placeholder } = this.props
    const { inputValue, errorMessage } = this.state
    return (
      <div>
        <div style={{
          height,
          display: 'flex',
          alignItems: 'center'
        }}
        >
          <input
            type={type}
            size="45"
            placeholder={placeholder}
            value={inputValue}
            onChange={e => this.handleValidation(e.target.value)}
          />
          {this.renderIndicator()}
        </div>
        <span style={{ color: 'red' }}>{errorMessage}</span>
      </div>
    )
  }
}


const EthValidatedField = ({ type, value = '' }) => {
  const { validator, placeholder } = config[type]
  const inputType = config[type].input || 'text'
  return (
    <ValidatedField
      validator={validator}
      type={inputType}
      placeholder={placeholder}
      value={value}
    />
  )
}

EthValidatedField.displayName = 'ValidatedField'

EthValidatedField.propTypes = {
  type: PropTypes.oneOf(['address', 'checksum-address', 'password', 'private-key', 'public-key', 'signature', 'zero-address']).isRequired
}


export default EthValidatedField
