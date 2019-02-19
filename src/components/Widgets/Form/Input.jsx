import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

export default class Input extends Component {
  static displayName = 'Input'

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <TextField variant="outlined" {...this.props} />
  }
}
