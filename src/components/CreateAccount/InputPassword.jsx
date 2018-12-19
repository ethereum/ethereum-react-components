import React, { Component } from 'react'
import PropTypes from 'prop-types'
import i18n from '../../i18n'
import Checkbox from '../Widgets/Checkbox'
import ValidatedField from '../Widgets/Form/ValidatedField'
import './InputPassword.scss'

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
      <div className="input-password">
        <ValidatedField
          autoFocus
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={className}
          value={value}
          onChange={onChange}
        />
        <div className="show-password-container">
          <Checkbox
            id="show-password-checkbox"
            name="elements_input_bool"
            className="show-password"
            checked={showPassword}
            onChange={() => this.setState({ showPassword: !showPassword })}
            labelText={i18n.t(
              'mist.popupWindows.importAccount.buttons.showPassword'
            )}
          />
        </div>
      </div>
    )
  }
}
