import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

export default class Spinner extends Component {
  static displayName = 'Spinner'

  static propTypes = {
    color: PropTypes.oneOf(['primary', 'secondary']),
    size: PropTypes.number
  }

  static defaultProps = {
    color: 'primary',
    size: 40
  }

  render() {
    return <CircularProgress {...this.props} />
  }
}
