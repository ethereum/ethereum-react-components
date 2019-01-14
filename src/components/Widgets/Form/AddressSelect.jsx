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
        <Identicon
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
  color: #02a8f3;
  width: 100%;
  -webkit-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  border-radius: 0;
  height: 36px;
  line-height: 18px;
`

const StyledDiv = styled.div`
  position: relative;
  box-sizing: border-box;
  display: block;    
`
