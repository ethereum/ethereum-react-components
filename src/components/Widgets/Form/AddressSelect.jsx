import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import shortid from 'shortid';
import Identicon from '../../Identicon'
import { combineWallets } from '../../../util/helpers';

export default class AddressSelect extends Component {
  static displayName = 'AddressSelect';

  static propTypes = {
    disabled: PropTypes.bool,
    wallets: PropTypes.object,
    walletContracts: PropTypes.object,
    identiconSize: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    wallets: {},
    walletContracts: {},
    identiconSize: 'tiny',
  };

  state = {
    selectedWallet: '',
    combinedWallets: [],
  }

  componentDidMount() {
    const { wallets, walletContracts, onChange } = this.props;
    const combinedWallets = combineWallets(wallets, walletContracts);
    const address = combinedWallets[0] ? combinedWallets[0].address : ''
    this.setState(
      { combinedWallets, selectedWallet: address },
      onChange(combinedWallets[0])
    )
  }

  selectAddress = e => {
    const { onChange } = this.props;
    this.setState({ selectedWallet: e.target.value }, onChange(e))
  }

  render() {
    const { disabled, identiconSize } = this.props;
    const { combinedWallets, selectedWallet } = this.state
    return (
      <StyledDiv>
        <StyledSelect
          onChange={this.selectAddress}
          disabled={disabled}
          value={selectedWallet}
        >
          {combinedWallets.map(w => {
            return (
              <StyledOption key={shortid.generate()} value={w.address}>
                {
                  w.addressType === 'wallet'
                    ? `🔑 ${w.name}`
                    : w['contract-name']
                }
                &nbsp; - &nbsp;
                { w.balance }
                &nbsp;
                ETHER
              </StyledOption>
            );
          })}
        </StyledSelect>
        <StyledIdenticon
          title
          size={identiconSize}
          address={selectedWallet}
        />
        </StyledDiv>
    );
  }
}

const StyledOption = styled.option`
  font-weight: normal;
  display: block;
  white-space: pre;
  min-height: 1.2em;
  padding: 0px 2px 1px;
  color: #02a8f3;
  line-height: 18px;
  font-size: 1em;
`

const StyledSelect = styled.select`
  display: inline-block;
  max-width: 100%;
  padding: 9.2px 16px;
  padding-bottom: 6.13333333px;
  border: 0;
  border-bottom: solid 2px #dddcdb;
  box-sizing: border-box;
  background-color: #f5f4f2;
  font-size: 1em;
  font-weight: 300;
  z-index: 1;
  margin-top: 0;
  padding-left: 41.6px;
  padding-right: 0;
  transition-delay: 0s;
  transition: background-color ease-in-out 1s, color ease-in-out 1s;
  -webkit-appearance: none;
  border-radius: 0;
  height: 36px;
  line-height: 18px;
  color: #02a8f3;
  width: 100%;
`

const StyledDiv = styled.div`
  display: block;
  box-sizing: border-box;
  position: relative;
`

const StyledIdenticon = styled(Identicon)`
  top:4px;
  z-index: 2;
  position: absolute;
  left: 8px;
  width: 26.66666667px;
  height: 26.66666667px;
  cursor: help;
  transition: border-radius 2.5s;
  transition-delay: 3s;
`
