import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class Modal extends Component {
  static displayName = 'Modal'

  static propTypes = {
    buttons: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    children: PropTypes.any,
    title: PropTypes.string
  }

  static defaultProps = {}

  render() {
    const { buttons, children, title } = this.props
    let titleRow = null
    let buttonRow = null
    if (title) {
      titleRow = <StyledH1>{title}</StyledH1>
    }
    if (buttons) {
      buttonRow = <StyledButtonRow>{buttons}</StyledButtonRow>
    }
    return (
      <StyledOverlay id="RenderedModal">
        <StyledSection>
          {titleRow}
          {children}
          {buttonRow}
        </StyledSection>
      </StyledOverlay>
    )
  }
}

const StyledH1 = styled.h1`
  margin: 16px 0;
  margin-bottom: 48px;
  font-weight: 100;
  font-size: 2.2em;
  line-height: 1.4em;
  color: #827a7a;
  clear: both;
`

const StyledButtonRow = styled.div`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  margin: 18.4px 32px 0;
  position: relative;
  box-sizing: border-box;
`

const StyledOverlay = styled.div`
  background: rgba(0, 0, 0, 0);
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  -webkit-box-align: start;
  align-items: flex-start;
  -webkit-box-pack: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  transition: opacity 400ms;
`

const StyledSection = styled.section`
  position: relative;
  width: 448px;
  margin: 110.4px auto;
  padding: 18.4px 32px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  text-align: center;
  transition: -webkit-transform 400ms, -moz-transform 400ms, -o-transform 400ms,
    transform 400ms;
`
