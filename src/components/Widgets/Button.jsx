import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  flat = false,
  secondary = false
}) => (
  <StyledButton
    className="Button"
    type={type}
    disabled={disabled}
    onClick={onClick}
    flat={flat}
    secondary={secondary}>
    {children}
  </StyledButton>
)

Button.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  flat: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  secondary: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
}

export default Button

const StyledButton = styled.button`
  background-color: #00aafa;
  border: 1px solid #00aafa;
  border-radius: 4px;
  color: white;
  padding: 12px 24px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;

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
      font-weight: ${props => (props.secondary ? 'inherit' : 'bold')};
    `};

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
    `}
`
