import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TxDescription from './TxDescription'
import FeeSelector from './FeeSelector'
import SubmitTxForm from './SubmitTxForm'
import GasNotification from './GasNotification'
import TxParties from './TxParties'

export default class SendTx extends Component {
  props = {
    gas: PropTypes.string,
    gasPrice: PropTypes.string
  }

  state = {
    hasSignature: false,
    providedGas: 0,
    fromIsContract: false,
    priority: false
  }

  togglePriority = () => {
    const { priority } = this.state
    this.setState({ priority: !priority })
  }

  handleSubmit = formData => {
    const { priority } = this.state
    const {
      data,
      to,
      from,
      gas,
      gasPrice,
      estimatedGas,
      value
    } = this.props.newTx

    // If no gas value was provided, use estimatedGas
    const gasValue =
      parseInt(gas, 16) !== 0 ? gas : `0x${estimatedGas.toString(16)}`

    // If priority tx, double the value and format it
    const chosenPrice = priority ? '0x' + (gasPrice * 2).toString(16) : gasPrice

    let txData = {
      data,
      from,
      gas: gasValue,
      gasPrice: chosenPrice,
      pw: formData.pw,
      value
    }

    if (to) {
      txData.to = to
    }

    // FIXME this.props.dispatch(confirmTx(txData))
  }

  render() {
    const { newTx, network, priority, etherPriceUSD } = this.props
    const {
      from,
      to,
      value,
      gasPrice,
      estimatedGas,
      gasError,
      gasLoading,
      unlocking,
      data
    } = newTx

    const {
      isNewContract,
      toIsContract,
      executionFunction,
      params,
      token
    } = newTx

    const {
      fromIsContract,
      hasSignature,
      showFormattedParams,
      providedGas
    } = this.state

    return (
      <div className="popup-windows tx-info">
        <div ref={divElement => (this.divElement = divElement)}>
          <TxDescription
            adjustWindowHeight={this.adjustWindowHeight}
            data={data}
            estimatedGas={estimatedGas}
            executionFunction={executionFunction}
            gasLoading={gasLoading}
            gasPrice={gasPrice}
            gasError={gasError}
            isNewContract={isNewContract}
            network={network}
            params={params}
            etherPriceUSD={etherPriceUSD}
            providedGas={providedGas}
            showFormattedParams={showFormattedParams}
            to={to}
            toIsContract={toIsContract}
            value={value}
            token={token}
          />

          <TxParties
            fromIsContract={fromIsContract}
            from={from}
            isNewContract={isNewContract}
            to={to}
            toIsContract={toIsContract}
            executionFunction={executionFunction}
            params={params}
            hasSignature={hasSignature}
            value={value}
          />

          <FeeSelector
            gasLoading={gasLoading}
            gasPrice={gasPrice}
            gas={estimatedGas}
            etherPriceUSD={etherPriceUSD}
            network={network}
            updateGasPrice={this.updateGasPrice}
          />

          <GasNotification
            estimatedGas={estimatedGas}
            gasLoading={gasLoading}
            toIsContract={toIsContract}
            to={to}
          />

          <div className="footer">
            <SubmitTxForm
              unlocking={unlocking}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}
