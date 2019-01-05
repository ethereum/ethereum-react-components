import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input, Identicon, utils } from '../..'
import Cross from '../AnimatedIcons/AnimatedCross'

export default class AddressInput extends Component {
  static displayName = 'AddressInput'

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)

    this.state = { icon: null }
  }

  componentDidMount() {
    const { value } = this.props

    this.updateIcon(value)
  }

  updateIcon = value => {
    const { onChange } = this.props

    let icon
    if (utils.isAddress(value)) {
      icon = (
        <Identicon
          address={value}
          size="tiny"
          style={{ zIndex: 2, position: 'absolute', top: '8px', left: '12px' }}
        />
      )
    } else if (value) {
      icon = (
        <Cross
          size={24}
          style={{ zIndex: 2, position: 'absolute', top: '6px' }}
        />
      )
    } else {
      icon = null
    }

    this.setState({ icon }, () => {
      if (onChange) {
        onChange(value)
      }
    })
  }

  render() {
    const { icon } = this.state

    return (
      <StyledWrapper>
        {icon}
        <StyledInput
          {...this.props}
          onChange={e => this.updateIcon(e.target.value)}
          placeholder="0x000000..."
          type="text"
        />
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const StyledInput = styled(Input)`
  padding-left: 42px;
`
