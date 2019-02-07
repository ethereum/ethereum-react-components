import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class Checkbox extends Component {
  static displayName = 'Checkbox'

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    labelText: PropTypes.string
  }

  static defaultProps = {}

  render() {
    const { id, labelText } = this.props

    return (
      <React.Fragment>
        <StyledCheckbox {...this.props} type="checkbox" />
        {labelText && (
          <StyledCheckboxLabel htmlFor={id}>{labelText}</StyledCheckboxLabel>
        )}
      </React.Fragment>
    )
  }
}

const StyledCheckbox = styled.input`
  display: inline-block;
  position: relative;
  margin: 0;
  outline: none !important;
  margin-left: 16px;
  width: 24px;
  height: 24px;

  &::before {
    content: '';
    position: relative;
    top: 0;
    left: 0;
    display: block;
    background: #f5f4f2;
    border: 1px solid inset #f5f4f2;
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
    width: 24px;
    height: 24px;
  }
  &:focus::before {
    border-color: rgba(74, 144, 226, 0.4);
  }
  &:disabled::before {
    cursor: not-allowed;
    background-color: rgba(245, 244, 242, 0.8);
    border-color: #f5f4f2;
  }
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 6px;
    left: 6px;
    background: #4a90e2;
    box-shadow: 0 0px 1px rgba(0, 0, 0, 0.3);
    width: 12px;
    height: 12px;
    transition: transform 400ms;
    transform: scale(0);
  }
  &:checked:after {
    transform: scale(1);
  }
  &:disabled:after {
    background: rgba(245, 244, 242, 0.4);
  }
`

const StyledCheckboxLabel = styled.label`
  position: relative;
  top: -7px;
  left: 6px;
  opacity: 0.9;
  font-size: 14px;
  font-weight: 300;
`
