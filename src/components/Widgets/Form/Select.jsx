import React, { Component } from 'react'
import ReactSelect from 'react-select'

export default class Select extends Component {
  static displayName = 'Select'

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <ReactSelect {...this.props} />
  }
}
