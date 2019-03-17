import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import i18n from '../../i18n'
import Checkbox from '../Widgets/Checkbox'
import ValidatedField from '../Widgets/Form/ValidatedField'

export default class InputPassword extends Component {
  static displayName = 'InputPassword'

  static propTypes = {
    className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    /** placeholder when there is no value */
    placeholder: PropTypes.string,
    /** handles value changes */
    onChange: PropTypes.func.isRequired,
    /** value to initialize the input field */
    value: PropTypes.string,
    /** true: input is visible as plaintext */
    show: PropTypes.bool
  }

  static defaultProps = {
    value: '',
    placeholder: '',
    show: false
  }

  constructor(props) {
    super(props)

    const { show } = this.props

    this.state = {
      showPassword: show === true
    }
  }

  render() {
    const { className, placeholder, value, onChange } = this.props
    const { showPassword } = this.state

    return (
      <div className={className}>
        <ValidatedField
          autoFocus
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <ShowPassword>
          <Checkbox
            id="show-password-checkbox"
            name="elements_input_bool"
            checked={showPassword}
            onChange={() => this.setState({ showPassword: !showPassword })}
            labelText={i18n.t(
              'mist.popupWindows.importAccount.buttons.showPassword'
            )}
          />
        </ShowPassword>
      </div>
    )
  }
}

const ShowPassword = styled.div`
  margin-top: 10px;
`
