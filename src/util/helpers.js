export function sortByBalance(wallets) {
  return wallets
    .filter(wallet => parseFloat(wallet.balance) !== 0)
    .sort((a, b) => b.balance - a.balance);
}

// export function combineWallets(addresses, walletContracts) {
export function combineWallets(addr, wc) {
  /* scrub for undefined parameters */
  let addresses = addr;
  let walletContracts = wc;
  if (!addr) addresses = {}
  if (!wc) walletContracts = {}
  /* return array of addresses with non-zero balances in ascending order */
  return sortByBalance(
    Object.keys(addresses)
      .map(address => {
        return {
          ...addresses[address],
          address,
          addressType: 'wallet',
        };
      })
      .concat(
        Object.keys(walletContracts).map(address => {
          return {
            ...walletContracts[address],
            address,
            addressType: 'contract',
          };
        })
      )
  );
}
