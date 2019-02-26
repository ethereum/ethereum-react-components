import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MuiButton from '@material-ui/core/Button'

export default class Button extends Component {
  static displayName = 'Button'

  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf(['primary', 'secondary']),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    secondary: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    className: PropTypes.string,
    variant: PropTypes.oneOf([
      'text',
      'outlined',
      'contained',
      'fab',
      'extendedFab',
      'flat',
      'raised'
    ])
  }

  static defaultProps = {
    color: 'primary',
    disabled: false,
    type: 'button',
    variant: 'contained'
  }

  render() {
    const { children } = this.props

    return <MuiButton {...this.props}>{children}</MuiButton>
  }
}
