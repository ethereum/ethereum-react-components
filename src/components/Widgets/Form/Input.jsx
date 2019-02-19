import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

export default class Input extends Component {
  static displayName = 'Input'

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <TextField {...this.props} variant="outlined" />
  }
}
