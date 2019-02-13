import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Grommet, Button as GrommetButton } from 'grommet'

export default class Button extends Component {
  static displayName = 'Button'

  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    secondary: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    /** If `true`, extra margin is added. See `SubmitTxForm` component for example usage. */
    withinInput: PropTypes.bool
  }

  static defaultProps = {
    disabled: false,
    secondary: false,
    type: 'button',
    withinInput: false
  }

  render() {
    const { secondary } = this.props

    return (
      <Grommet theme={{ global: { colors: { brand: '#00A4FF' } } }}>
        <StyledButton {...this.props} primary={!secondary} />
      </Grommet>
    )
  }
}

const StyledButton = styled(GrommetButton)`
  color: white;
  border-radius: 6px;
  border-width: 1px;
  padding-top: 6px;
  padding-bottom: 2px;
  font-size: 15px;
  text-transform: uppercase;
  min-width: 160px;

  ${props =>
    props.secondary &&
    css`
      color: #00a4ff;
    `}

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}

  ${props =>
    props.withinInput &&
    css`
      margin: 7px;
      padding: 9px 24px 5px;
    `}
`
