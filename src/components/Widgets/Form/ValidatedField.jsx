import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Checkmark from '../AnimatedIcons/Checkmark'
import Cross from '../AnimatedIcons/Cross'

const height = 50

export default class ValidatedField extends Component {
  static displayName = 'ValidatedField'

  static propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    size: PropTypes.any,
    type: PropTypes.any,
    validator: PropTypes.any,
    value: PropTypes.string
  }

  static defaultProps = {
    value: ''
  }

  constructor(props) {
    super(props)

    const { value } = this.props

    this.state = {
      inputValue: value,
      isValid: undefined, // valid || invalid || error || processing
      errorMessage: ''
    }
  }

  componentDidMount() {
    const { inputValue } = this.state
    this.handleValidation(inputValue)
  }

  handleValidation = async value => {
    const { validator, onChange } = this.props

    // graceful degradation to input field if parent wants to handle change events
    if (typeof onChange === 'function') {
      // e.persist()
      return onChange(value)
    }

    this.setState({
      inputValue: value,
      errorMessage: '',
      isValid: ''
    })
    if (value === '' || !validator) return 0

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

    return this.setState({ isValid, errorMessage })
  }

  renderIndicator() {
    const { isValid } = this.state
    if (isValid === undefined) return ''
    if (isValid === 'valid') return <Checkmark size={24} />
    if (isValid === 'invalid') return <Cross size={24} />
    if (isValid === 'error') return <Cross size={24} />
    return isValid
  }

  render() {
    const { type, placeholder, value, size } = this.props
    const { inputValue, errorMessage } = this.state
    const renderedValue = inputValue || value

    return (
      <React.Fragment>
        <div
          style={{
            height,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <StyledInput
            type={type}
            size={size}
            placeholder={placeholder}
            value={renderedValue}
            onChange={e => this.handleValidation(e.target.value)}
          />
          {this.renderIndicator()}
        </div>
        <span style={{ color: 'red' }}>{errorMessage}</span>
      </React.Fragment>
    )
  }
}

const StyledInput = styled.input`
  border: 0;
  border-bottom: solid 2px #ccc6c6;
  background-color: #f5f4f2;
  color: #4a90e2;
  width: 300px;
  max-width: 100%;
  padding: 6px 16px;
  padding-bottom: 4px;
  font-size: 1em;
  font-weight: 300;
  &:focus {
    outline: 0;
    border-color: #4a90e2;
  }
`
