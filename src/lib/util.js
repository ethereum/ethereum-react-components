import ethUtils from 'ethereumjs-util'

const BN = ethUtils.BN

const isHex = str => typeof str === 'string' && str.startsWith('0x')
export const hexToNumberString = str => toBN(str).toString(10)

export const toBN = str => {
  return new BN(str)
}

export const weiToEther = valWei => {
  return toBN(valWei).div(new BN('1000000000000000000'))
}

export const etherToGwei = valEther => {
  return new BN(valEther).mul(new BN('1000000000'))
}

export const toUsd = (etherAmount = '0', etherPriceUSD) => {
  return parseFloat(
    toBN(etherAmount).mul(toBN(etherPriceUSD))
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
