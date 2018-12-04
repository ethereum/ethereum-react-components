import React, { Component } from 'react'
import i18n from '../../i18n'
import PropTypes from 'prop-types'
import Checkbox from '../Widgets/Checkbox'
import ValidatedField from '../Widgets/ValidatedField'
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
    value: PropTypes.string.isRequired,
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
    this.state = {
      showPassword: this.props.show === true
    }
  }
  render() {
    return (
      <div className="input-password">
        <ValidatedField
          autoFocus
          type={this.state.showPassword ? 'text' : 'password'}
          placeholder={this.props.placeholder}
          className={this.props.className}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <div className="show-password-container">
          <Checkbox
            id="show-password-checkbox"
            name="elements_input_bool"
            className="show-password"
            checked={this.state.showPassword}
            onChange={() =>
              this.setState({ showPassword: !this.state.showPassword })
            }
            labelText={i18n.t(
              'mist.popupWindows.importAccount.buttons.showPassword'
            )}
          />
        </div>
      </div>
    )
  }
}
