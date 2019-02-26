import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MuiButton from '@material-ui/core/Button'

export default class Button extends Component {
  static displayName = 'Button'

  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    secondary: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    /** If `true`, extra margin is added. See `SubmitTxForm` component for example usage. */
    className: PropTypes.string
  }

  static defaultProps = {
    disabled: false,
    secondary: false,
    type: 'button'
  }

  render() {
    const { children, secondary } = this.props

    return (
      <MuiButton
        {...this.props}
        color={secondary ? 'secondary' : 'primary'}
        variant="contained"
      >
        {children}
      </MuiButton>
    )
  }
}
