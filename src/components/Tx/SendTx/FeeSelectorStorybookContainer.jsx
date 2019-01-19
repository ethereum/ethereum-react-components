import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FeeSelector from './FeeSelector'

export default class FeeSelectorStorybookContainer extends Component {
  static propTypes = {
    network: PropTypes.string,
    etherPriceUSD: PropTypes.string,
    estimatedGas: PropTypes.string,
    gasPrice: PropTypes.string,
    gasLoading: PropTypes.bool
  }

  state = {
    priority: false
  }

  togglePriority() {
    const { priority } = this.state
    this.setState({ priority: !priority })
  }

  render() {
    const {
      network,
      etherPriceUSD,
      gasLoading,
      estimatedGas,
      gasPrice
    } = this.props
    const { priority } = this.state

    return (
      <FeeSelector
        togglePriority={() => {
          this.togglePriority()
        }}
        priority={priority}
        network={network}
        etherPriceUSD={etherPriceUSD}
        gasLoading={gasLoading}
        estimatedGas={estimatedGas}
        gasPrice={gasPrice}
      />
    )
  }
}
