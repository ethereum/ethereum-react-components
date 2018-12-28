import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'

export default class NavbarItem extends Component {
  static displayName = 'NavbarItem'

  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string
  }

  static defaultProps = {}

  render() {
    const { icon, title } = this.props

    return (
      <StyledWrapper>
        <StyledIcon>
          <FontAwesomeIcon icon={icons[icon]} />
        </StyledIcon>
        <StyledTitle>{title}</StyledTitle>
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #0285c0;
`

const StyledIcon = styled.div`
  font-size: 24px;
`

const StyledTitle = styled.div`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
`
