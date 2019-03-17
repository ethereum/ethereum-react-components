// TODO: placeholder

import React, { Component } from 'react'
// import PropTypes from 'prop-types'

export default class FileChooser extends Component {
  static displayName = 'FileChooser'

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <input type="file" {...this.props} />
  }
}
