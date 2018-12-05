import React, { Component } from 'react'
import TxDescription from './TxDescription'
import FeeSelector from './FeeSelector'
import FormSubmit from './FormSubmitTx'
import GasNotification from './GasNotification'
import TxParties from './TxParties'

export default class SendTx extends Component {
  static displayName = 'SendTx'

  state = {
    hasSignature: false,
    providedGas: 0,
    fromIsContract: false,
    hasSignature: false
  }

  getGasPrice = () => {
    // FIXME
    return 0
  }

  estimateGasUsage = () => {
    // FIXME
    return 0
  }

  togglePriority = () => {}

  handleSubmit = formData => {
    const {
      data,
      to,
      from,
      gas,
      gasPrice,
      estimatedGas,
      priority,
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
    const { from, to, value } = newTx
    const {
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
            estimatedGas={estimatedGas}
            gasLoading={gasLoading}
            gasPrice={gasPrice}
            getGasPrice={this.getGasPrice}
            getGasUsage={this.estimateGasUsage}
            etherPriceUSD={etherPriceUSD}
            network={network}
            priority={priority}
            togglePriority={this.togglePriority}
          />

          <GasNotification
            estimatedGas={estimatedGas}
            gasLoading={gasLoading}
            toIsContract={toIsContract}
            to={to}
          />

          <div className="footer">
            <FormSubmit
              unlocking={unlocking}
              estimatedGas={estimatedGas}
              gasPrice={gasPrice}
              gasError={gasError}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}
