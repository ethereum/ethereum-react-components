import ethUtils from 'ethereumjs-util'
import { BigNumber as BNJS } from 'bignumber.js'

const BigNumber = ethUtils.BN

const isHex = str => typeof str === 'string' && str.startsWith('0x')
export const toBN = str => new BNJS(str)
export const hexToNumberString = str => toBN(str).toString(10)

export const isAddress = str => isHex(str) && str.length === 42

export const toBigNumber = str => {
  /**
   web3.utils.isHex(estimatedGas)
      ? new BigNumber(web3.utils.hexToNumberString(estimatedGas))
      : new BigNumber(estimatedGas) 
   */
  return isHex(str) ? new BNJS(hexToNumberString(str)) : new BNJS(str)
}

export const weiToEther = valWei => {
  return toBigNumber(valWei).div(new BNJS('1000000000000000000'))
}

export const etherToGwei = valEther => {
  return new BNJS(valEther).times(new BNJS('1000000000'))
}

export const toUsd = (etherAmount = '0', etherPriceUSD) => {
  return parseFloat(
    toBigNumber(etherAmount).times(toBigNumber(etherPriceUSD))
  ).toFixed(2)
}

export const networkIdToName = str => {
  return str
}

// FIXME wrapper for EthTools.formatBalance
export const formatBalance = () => {}
