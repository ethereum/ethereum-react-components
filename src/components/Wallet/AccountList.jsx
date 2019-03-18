import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AccountItem from './AccountItem'
import { weiToEther } from '../../lib/util'

export default class AccountList extends Component {
  static displayName = 'AccountList'

  static propTypes = {
    accounts: PropTypes.array
  }

  static defaultProps = {
    accounts: []
  }

  render() {
    const { accounts } = this.props
    const accountList = accounts.map(account => {
      return (
        <AccountItem
          key={account.address}
          {...account}
          balance={weiToEther(account.balance).toString()}
        />
      )
    })

    return <StyledWrapper>{accountList}</StyledWrapper>
  }
}

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
