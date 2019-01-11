import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import TxEntry from './TxEntry'
import i18n from '../../../i18n'

export default class TxHistory extends Component {
  static propTypes = {
    /** Tx details */
    txs: PropTypes.arrayOf(
      PropTypes.shape({
        nonce: PropTypes.number,
        from: PropTypes.string.isRequired,
        to: PropTypes.string,
        gas: PropTypes.string.isRequired,
        data: PropTypes.string,
        gasPrice: PropTypes.string.isRequired,
        value: PropTypes.string,
        params: PropTypes.array.isRequired
      })
    ),
    /** USD price of ether for displaying tx costs */
    etherPriceUSD: PropTypes.number,
    /** Latest blockNumber */
    blockNumber: PropTypes.number
  }

  render() {
    const { txs, etherPriceUSD, blockNumber } = this.props

    const txList = txs.map(tx => {
      return (
        <TxEntry
          tx={tx}
          key={tx.hash}
          etherPriceUSD={etherPriceUSD}
          blockNumber={blockNumber}
        />
      )
    })

    return (
      <StyledHistory>
        {txs.length > 0 && <div className="list">{txList}</div>}
        {txs.length === 0 && (
          <div className="noTxs">{i18n.t('mist.txHistory.noTxs')}</div>
        )}
      </StyledHistory>
    )
  }
}

const StyledHistory = styled.div`
  font-family: sans-serif;

  .list {
    border-top: 1px solid #dcdada;
    user-select: text;
  }

  .noTxs {
    font-size: 85%;
    font-style: italic;
    font-weight: light;
    color: #333;
  }
`
