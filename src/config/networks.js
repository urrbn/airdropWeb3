// import { BSC, BSCTestnet } from '@usedapp/core'
import { BSCTestnet } from '@usedapp/core'
// import { RbaChain } from './constants/chain'

export const networkConfig = {
  readOnlyChainId: BSCTestnet.chainId,
  readOnlyUrls: {
    [BSCTestnet.chainId]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    // [BSC.chainId]: BSC.rpcUrl,
    // [BSCTestnet.chainId]: BSCTestnet.rpcUrl,
  },
  networks: [BSCTestnet],
  noMetamaskDeactivate: true,
  refresh: 'never',
  pollingInterval: 15000,
}
