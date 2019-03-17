// TODO: placeholder

import React, { Component } from 'react'
// import PropTypes from 'prop-types'

export default class TextArea extends Component {
  static displayName = 'TextArea'

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <textarea {...this.props} />
  }
}
