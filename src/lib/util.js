import ethUtils from 'ethereumjs-util'
import { BigNumber as BNJS } from 'bignumber.js'

BNJS.config({ EXPONENTIAL_AT: 18 })

export const BigNumber = ethUtils.BN

const isHex = str => typeof str === 'string' && str.startsWith('0x')
export const toBN = str => new BNJS(str)
export const hexToNumberString = str => toBN(str).toString(10)

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

export const networkIdToName = networkId => {
  switch (networkId) {
    case 1:
    return 'Main'
    case 3:
    return 'Ropsten'
    case 4:
    return 'Rinkeby'
    case 42:
    return 'Kovan'
    default:
    return 'Private'
  }
}

// FIXME wrapper for EthTools.formatBalance
export const formatBalance = () => {}
