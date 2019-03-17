// TODO: placeholder

import React, { Component } from 'react'
// import PropTypes from 'prop-types'

export default class RadioButton extends Component {
  static displayName = 'RadioButton'

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <input type="radio" {...this.props} />
  }
}
