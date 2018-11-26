import React, { Component } from 'react'
import i18n from '../../../i18n'

const util = {
  
}

class FeeSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ticks: 1,
      gasRetries: 0
    }
  }

  parseFee = () => {

  }

  handleClick = () => {
    this.props.togglePriority()
  }

  renderStatus = () => {

  }

  render() {
    return (
      <div className="fee-selector">
        {this.props.priority 
        ? (
          <span
            onClick={this.handleClick}
            className="fee-selector__btn"
            data-tooltip="Click For Standard Fee"
          >
            {i18n.t('mist.sendTx.priorityFee')}
          </span>
        ) 
        : (
          <span
            onClick={this.handleClick}
            className="fee-selector__btn"
            data-tooltip="Click For Priority Fee"
          >
            {i18n.t('mist.sendTx.standardFee')}
          </span>
        )}{' '}
        <span className="fee-amount">{this.parseFee()}</span>
        {this.renderStatus()}
      </div>
    );
  }
}

export default FeeSelector