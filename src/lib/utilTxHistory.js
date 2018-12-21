import BigNumber from 'big-number'

const isHex = str => typeof str === 'string' && str.startsWith('0x')

export const hexToNumberString = str => toBigNumber(str).toString(10)

export const toBigNumber = (str) => {
  return isHex(str) ? new BigNumber(hexToNumberString(str)) : new BigNumber(str)
}

export const weiToEther = (valWei) => {
  return toBigNumber(valWei).dividedBy(new BigNumber('1000000000000000000'))
}

export const etherToGwei = (valEther) => {
  return new BigNumber(valEther).multiply(new BigNumber('1000000000'))
}

export const toUsd = (etherAmount, format, etherPriceUSD) => {
  return toBigNumber(etherAmount)
  .multiply(new BigNumber(etherPriceUSD))
  .toString()
  .toFixed(2);
}

export const txValueToEtherAmount = value => {
  const theValue = toBigNumber(value || 0)
  const etherAmount = theValue
  .divide(new BigNumber('1000000000000000000'))
  .toString()
  return etherAmount
}

// FIXME wrapper for EthTools.formatBalance
export const formatBalance = balance => balance

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
