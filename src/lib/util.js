/* eslint-disable */
import ethUtils from 'ethereumjs-util'

const BigNumber = ethUtils.BN

const isHex = str => typeof str === 'string' && str.startsWith('0x')
export const toBN = str => new BigNumber(str)
export const hexToNumberString = str => toBN(str).toString(10)

export const toBigNumber = (str) => {
  /**
   web3.utils.isHex(estimatedGas)
      ? new BigNumber(web3.utils.hexToNumberString(estimatedGas))
      : new BigNumber(estimatedGas) 
   */
  return isHex(str) ? new BigNumber(hexToNumberString(str)) : new BigNumber(str)
}

export const weiToEther = (valWei) => {
  return toBigNumber(valWei).div(new BigNumber('1000000000000000000'))
}

export const etherToGwei = (valEther) => {
  return new BigNumber(valEther).mul(new BigNumber('1000000000'))
}

export const toUsd = (etherAmount, format, etherPriceUSD) => {
  return toBigNumber(etherAmount)
        .mul(new BigNumber(etherPriceUSD))
        .toString()
        .toFixed(2);
}

export const networkIdToName = (str) => {
  return str
}

// FIXME wrapper for EthTools.formatBalance
export const formatBalance = () => {

}
