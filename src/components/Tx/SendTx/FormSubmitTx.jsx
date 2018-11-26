import React, { Component } from 'react'
import i18n from '../../../i18n'

class FormSubmitTx extends Component {
  state = {
    pw: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
    this.setState({ pw: '' })
  }

  render() {
    const { pw } = this.state
    const { gasPrice, gasError, estimatedGas, unlocking } = this.props

    /* FIXME
    if (!estimatedGas || !gasPrice || gasPrice === 0 || gasPrice === '0x0') {
      return null
    }
    */

    if (unlocking) {
      return (
        <div className="footer--unlocking">
          <h2>{i18n.t('mist.sendTx.unlocking')}</h2>
        </div>
      )
    }

    return (
      <div className="footer">
        <form
          onSubmit={this.handleSubmit}
          className={gasError ? 'footer__form error' : 'footer__form'}
        >
          <input
            className="footer__input"
            type="password"
            value={pw}
            onChange={e => this.setState({ pw: e.target.value })}
            placeholder={i18n.t('mist.sendTx.enterPassword')}
          />

          <button
            className={gasError ? 'footer__btn error' : 'footer__btn'}
            disabled={!pw}
            type="submit"
          >
            {i18n.t('mist.sendTx.execute')}
          </button>
        </form>
      </div>
    )
  }
}

export default FormSubmitTx
