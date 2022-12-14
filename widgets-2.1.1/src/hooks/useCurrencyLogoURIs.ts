import { Currency } from '@escswap/sdk-core'
import EthereumLogo from 'assets/images/ethereum-logo.png'
import bnbLogo from 'assets/images/bnb-logo.png'
import MaticLogo from 'assets/svg/matic-token-icon.svg'
import { SupportedChainId } from 'constants/chains'
import useHttpLocations from 'hooks/useHttpLocations'
import { useMemo } from 'react'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'

type Network = 'ethereum' | 'arbitrum' | 'optimism' | 'BSC'

function chainIdToNetworkName(networkId: SupportedChainId): Network {
  switch (networkId) {
    case SupportedChainId.MAINNET:
      return 'ethereum'
    case SupportedChainId.BSC:
      return 'BSC'
    case SupportedChainId.ARBITRUM_ONE:
      return 'arbitrum'
    case SupportedChainId.OPTIMISM:
      return 'optimism'
    default:
      return 'ethereum'
  }
}

function getNativeLogoURI(chainId: SupportedChainId = SupportedChainId.MAINNET): string {
  switch (chainId) {
    case SupportedChainId.POLYGON_MUMBAI:
    case SupportedChainId.POLYGON:
      return MaticLogo
    case SupportedChainId.MAINNET:
      return EthereumLogo
    default:
      return bnbLogo
  }
}

function getTokenLogoURI(address: string, chainId: SupportedChainId = SupportedChainId.MAINNET): string | void {
  const networkName = chainIdToNetworkName(chainId)
  const networksWithUrls = [SupportedChainId.ARBITRUM_ONE, SupportedChainId.MAINNET, SupportedChainId.OPTIMISM]
  const networksWithUrlsbsc = [SupportedChainId.BSC]
  if (networksWithUrls.includes(chainId)) {
    return `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${address}/logo.png`
  }
  if(networksWithUrlsbsc.includes(chainId)){
    return bnbLogo
  }
}

export default function useCurrencyLogoURIs(currency?: Currency | null): string[] {
  const locations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)
  return useMemo(() => {
    const logoURIs = [...locations]
    if (currency) {
      if (currency.isNative) {
        logoURIs.push(getNativeLogoURI(currency.chainId))
      } else if (currency.isToken) {
        const logoURI = getTokenLogoURI(currency.address, currency.chainId)
        if (logoURI) {
          logoURIs.push(logoURI)
        }
      }
    }
    return logoURIs
  }, [currency, locations])
}
