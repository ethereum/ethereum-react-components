import React, { Component } from 'react'
import i18n from '../../../i18n'
import TxRow from './TxHistoryListEntry'

export default class TxHistory extends Component {
  static displayName = 'TxHistory'

  renderTxList(txs) {
    const { etherPriceUSD, blockNumber } = this.props
    // FIXME hardcoded network
    const networkString = 'Main'

    return txs.map(tx => (
      <TxRow
        tx={tx}
        blockNumber={blockNumber}
        key={tx.hash}
        networkString={networkString}
        etherPriceUSD={etherPriceUSD}
      />
    ))
  }

  render() {
    const { txs, etherPriceUSD } = this.props

    return (
      <div className="list-txs">
        <div className="header">
          <h1>
            {i18n.t('txHistory.windowTitle')}
            {txs.length > 0 && (
              <span>
                {' '}
                (
                <span className="txs-total">
                  {i18n.t('txHistory.total', { count: txs.length })}
                </span>
                )
              </span>
            )}
          </h1>
        </div>
        <div className="tx-list">
          {this.renderTxList(txs)}
          {txs.length === 0 && (
            <div className="no-txs">No transactions yet.</div>
          )}
        </div>
      </div>
    )
  }
}
