import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ValidatedField } from '..'

export default class ConverterForm extends Component {
  static displayName = 'ConverterForm'

  static propTypes = {
    converter: PropTypes.func
  }

  static defaultProps = {}

  constructor(props) {
    super(props)

    this.state = {
      input: '',
      output: ''
    }
  }

  handleInputChange = input => {
    const { converter } = this.props
    this.setState({ input }, () => {
      const converted = converter(input)
      this.setState({ output: converted })
    })
  }

  render() {
    const { input, output } = this.state
    return (
      <form>
        Input:
        <br />
        <ValidatedField
          value={input}
          placeholder="input"
          onChange={this.handleInputChange}
          size={70}
        />
        <br />
        Output:
        <br />
        <ValidatedField value={output} placeholder="output" size={70} />
        <br />
      </form>
    )
  }
}
