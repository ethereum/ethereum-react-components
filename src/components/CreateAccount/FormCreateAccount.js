import React from 'react';
import i18n from '../../i18n'
import { InputPassword } from '..'
import PropTypes from 'prop-types'
import './FormCreateAccount.scss'


let Mist = {
  notification: {
    warn: text => alert(text)
  }
}

class CreateAccount extends React.Component {

  static displayName = 'CreateAccount'

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);

    this.state = {
      creating: false,
      passwordInputType: 'text',
      pw: '',
      pwRepeat: '',
      showPassword: false,
      showRepeat: false
    };
  }
  resetForm() {
    this.setState({
      pw: '',
      pwRepeat: '',
      showRepeat: false,
      creating: false
    });
  }

  handleCancel(e) {
    e.preventDefault();
    Mist.closeThisWindow()
  }

  handleSubmit(e) {
    e.preventDefault();

    const { pw, pwRepeat } = this.state;

    // ask for password repeat
    if (!pwRepeat.length) {
      this.setState({ showRepeat: true });
      this.refs.password_repeat.focus();
      return;
    }

    // check passwords
    if (pw !== pwRepeat) {
      Mist.notification.warn({
        content: i18n.t(
          'mist.popupWindows.requestAccount.errors.passwordMismatch'
        ),
        duration: 3
      });
      this.resetForm();
    } else if (pw && pw.length < 8) {
      Mist.notification.warn({
        content: i18n.t(
          'mist.popupWindows.requestAccount.errors.passwordTooShort'
        ),
        duration: 3
      });
      this.resetForm();
    } else if (pw && pw.length >= 8) {
      this.setState({ creating: true }, () => this.createAccount(pwRepeat));
    }
  }

  async createAccount(pw) {
    try {
      await Mist.createAccountWeb3()
    } catch (error) {

    }
    this.resetForm();
    // notify about backing up!
    alert(i18n.t('mist.popupWindows.requestAccount.backupHint'));
    Mist.closeThisWindow()
  }

  renderFormBody() {
    if (this.state.creating) {
      return <h2>{i18n.t('mist.popupWindows.requestAccount.creating')}</h2>;
    } else {
      return (
        <div>
          <div className={`field-container ${this.state.showRepeat ? 'repeat-field' : ''}`} >
            {this.state.showPassword
              ?<InputPassword 
                className="password"
                placeholder={i18n.t('mist.popupWindows.requestAccount.enterPassword')}
                onChange={e => this.setState({ pw: e.target.value })}
              />
              /** repeat password */
              :<InputPassword 
                className="password-repeat"
                ref="password_repeat"
                placeholder={i18n.t('mist.popupWindows.requestAccount.repeatPassword')}
                onChange={e => this.setState({ pwRepeat: e.target.value })}            
              />
            }
          </div>
          <div className="dapp-modal-buttons">
            <button
              className="cancel"
              type="button"
              onClick={e => this.handleCancel(e)}
            >
              {i18n.t('buttons.cancel')}
            </button>
            <button className="ok dapp-primary-button" type="submit">
              {i18n.t('buttons.ok')}
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="popup-windows request-account">
        <form onSubmit={e => this.handleSubmit(e)}>
          <h1>{i18n.t('mist.popupWindows.requestAccount.title')}</h1>
          {this.renderFormBody()}
        </form>
      </div>
    );
  }
}

export default CreateAccount;
