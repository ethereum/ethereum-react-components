import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Spinner } from '../..'

export default class Button extends Component {
  static displayName = 'Button'

  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    flat: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    secondary: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    /** If `true`, extra margin is added. See `SubmitTxForm` component for example usage. */
    withinInput: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
    disabled: false,
    error: false,
    flat: false,
    loading: false,
    secondary: false,
    type: 'button',
    withinInput: false,
    className: 'Button'
  }

  render() {
    const { children, flat, loading, secondary, className } = this.props

    const spinner = (
      <Spinner color={!secondary && !flat ? 'white' : '#00aafa'} scale="0.5" />
    )

    return (
      <StyledButton {...this.props} className={className}>
        {loading ? spinner : children}
      </StyledButton>
    )
  }
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00aafa;
  border-radius: 4px;
  border: 1px solid #00aafa;
  color: white;
  cursor: pointer;
  font-size: 14px;
  height: 46px;
  line-height: 1;
  min-width: 120px;
  overflow: hidden;
  padding: 12px 24px;
  text-decoration: none;
  text-transform: capitalize;
  white-space: nowrap;

  ${props =>
    props.secondary &&
    css`
      background-color: white;
      color: #00aafa;
    `}

  ${props =>
    props.flat &&
    css`
      background-color: inherit;
      border: none;
      color: #00aafa;
      font-weight: ${props.secondary ? 'inherit' : 'bold'};
    `};

  ${props =>
    (props.disabled || props.loading) &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
    `}

  ${props =>
    props.withinInput &&
    css`
      margin: 4px;
    `}

  ${props =>
    props.error &&
    css`
      border: 1px solid #f66d6f;
      background-color: #f66d6f;
    `}
`
