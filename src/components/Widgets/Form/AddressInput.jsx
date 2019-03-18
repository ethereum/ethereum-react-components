import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'
import Identicon from '../../Identicon'
import Input from './Input'
import { isAddress } from '../../../lib/util'
import Cross from '../AnimatedIcons/Cross'

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
    if (isAddress(value)) {
      icon = (
        <Identicon
          address={value}
          size="tiny"
          style={{ marginRight: '10px' }}
        />
      )
    } else if (value) {
      icon = (
        <Cross size={23} style={{ marginRight: '8px', marginLeft: '0px' }} />
      )
    } else {
      icon = <Identicon anonymous size="tiny" style={{ marginRight: '10px' }} />
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
      <Input
        {...this.props}
        onChange={e => this.updateIcon(e.target.value)}
        placeholder="0x000000..."
        InputProps={{
          startAdornment: <InputAdornment>{icon}</InputAdornment>
        }}
      />
    )
  }
}
