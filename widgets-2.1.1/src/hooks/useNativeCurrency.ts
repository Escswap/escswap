import { NativeCurrency } from '@escswap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { SupportedChainId } from 'constants/chains'
import { nativeOnChain } from 'constants/tokens'
import { useMemo } from 'react'

export default function useNativeCurrency(): NativeCurrency {
  const { chainId } = useWeb3React()
  return useMemo(
    () =>
      chainId
        ? nativeOnChain(chainId)
        : // display mainnet when not connected
          nativeOnChain(SupportedChainId.MAINNET),
    [chainId]
  )
}
