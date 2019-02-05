import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const fiats = ['ETHER', 'FINNEY', 'BTC', 'USD', 'EUR', 'GBP', 'BRL']

export default class FiatDropdown extends Component {
  static displayName = 'FiatDropdown'

  static propTypes = {
    /** Used to disable current selection */
    currentSelection: PropTypes.string,
    /** Toggle visibility */
    display: PropTypes.bool,
    /** Callback to be executed onClick */
    onClick: PropTypes.func,
    /* Prevent outside clicks from closing modal */
    requireFocusToClose: PropTypes.bool
  }

  static defaultProps = {
    currentSelection: '',
    display: false,
    requireFocusToClose: false
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick = event => {
    const { onClick, requireFocusToClose } = this.props
    const value = event.target.textContent
    const doesContain = this.node.contains(event.target)

    if (doesContain && onClick) {
      onClick(value)
    }

    if (!doesContain && requireFocusToClose) {
      return
    }

    this.setState({ display: false })
  }

  render() {
    return (
      <StyledDiv ref={node => (this.node = node)}>
        <StyledUl>
          {fiats.map(f => (
            <StyledLi>
              <StyledButton type="button" data-value={f}>
                {f}
              </StyledButton>
            </StyledLi>
          ))}
        </StyledUl>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  transition-duration: 200ms;
  display: inline-block;
  position: relative;
  max-width: 200px;
  background-color: #fff;
  max-width: 200px;
  width: auto;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  right: 0;
`
// zoom: 1;
// filter: alpha(opacity=0);
// opacity: 0;
// transform: scale(0);
// transform-origin: 0 95%;

const StyledUl = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
`

const StyledLi = styled.li`
  display: block;
  box-sizing: border-box;
`

const StyledButton = styled.button`
  font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial,
    'sans-serif';
  text-align: center;
  min-width: 20px;
  margin: 0;
  width: 100%;
  padding: 8px 15px;
  border: 0;
  box-sizing: border-box;
  color: #02a8f3;
  :hover {
    outline: 0;
    background-color: #eee;
  }
`
