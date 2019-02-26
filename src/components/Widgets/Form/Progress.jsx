import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'

export default class Progress extends Component {
  static displayName = 'Progress'

  static propTypes = {
    variant: PropTypes.oneOf([
      'determinate',
      'indeterminate',
      'buffer',
      'query'
    ])
  }

  static defaultProps = {
    variant: 'determinate'
  }

  render() {
    const { variant } = this.props

    return <LinearProgress {...this.props} variant={variant} />
  }
}
