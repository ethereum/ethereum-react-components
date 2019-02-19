import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

export default class TextArea extends Component {
  static displayName = 'TextArea'

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <TextField multiline variant="outlined" {...this.props} />
  }
}
