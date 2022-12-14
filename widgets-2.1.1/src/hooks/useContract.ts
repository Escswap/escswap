import { Contract } from '@ethersproject/contracts'
import IEscswapV2PairJson from '@escswap/v2-core/build/IEscswapV2Pair.json'
import IEscswapV2Router02Json from '@escswap/v2-periphery/build/IEscswapV2Router02.json'
import QuoterJson from '@escswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import TickLensJson from '@escswap/v3-periphery/artifacts/contracts/lens/TickLens.sol/TickLens.json'
import EscswapInterfaceMulticallJson from '@escswap/v3-periphery/artifacts/contracts/lens/EscswapInterfaceMulticall.sol/EscswapInterfaceMulticall.json'
import NonfungiblePositionManagerJson from '@escswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'
import V3MigratorJson from '@escswap/v3-periphery/artifacts/contracts/V3Migrator.sol/V3Migrator.json'
import { useWeb3React } from '@web3-react/core'
import ARGENT_WALLET_DETECTOR_ABI from 'abis/argent-wallet-detector.json'
import EIP_2612 from 'abis/eip_2612.json'
import ENS_PUBLIC_RESOLVER_ABI from 'abis/ens-public-resolver.json'
import ENS_ABI from 'abis/ens-registrar.json'
import ERC20_ABI from 'abis/erc20.json'
import ERC20_BYTES32_ABI from 'abis/erc20_bytes32.json'
import ERC721_ABI from 'abis/erc721.json'
import ERC1155_ABI from 'abis/erc1155.json'
import { ArgentWalletDetector, EnsPublicResolver, EnsRegistrar, Erc20, Erc721, Erc1155, Weth } from 'abis/types'
import WETH_ABI from 'abis/weth.json'
import {
  ARGENT_WALLET_DETECTOR_ADDRESS,
  ENS_REGISTRAR_ADDRESSES,
  MULTICALL_ADDRESS,
  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
  QUOTER_ADDRESSES,
  TICK_LENS_ADDRESSES,
  V2_ROUTER_ADDRESS,
  V3_MIGRATOR_ADDRESSES,
} from 'constants/addresses'
import { WRAPPED_NATIVE_CURRENCY } from 'constants/tokens'
import { useMemo } from 'react'
import { NonfungiblePositionManager, Quoter, TickLens, EscswapInterfaceMulticall } from 'types/v3'
import { V3Migrator } from 'types/v3/V3Migrator'
import { getContract } from 'utils'

const { abi: IEscswapV2PairABI } = IEscswapV2PairJson
const { abi: IEscswapV2Router02ABI } = IEscswapV2Router02Json
const { abi: QuoterABI } = QuoterJson
const { abi: TickLensABI } = TickLensJson
const { abi: MulticallABI } = EscswapInterfaceMulticallJson
const { abi: NFTPositionManagerABI } = NonfungiblePositionManagerJson
const { abi: V2MigratorABI } = V3MigratorJson

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { provider, account, chainId } = useWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]) as T
}

export function useV2MigratorContract() {
  return useContract<V3Migrator>(V3_MIGRATOR_ADDRESSES, V2MigratorABI, true)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean) {
  const { chainId } = useWeb3React()
  return useContract<Weth>(
    chainId ? WRAPPED_NATIVE_CURRENCY[chainId]?.address : undefined,
    WETH_ABI,
    withSignerIfPossible
  )
}

export function useERC721Contract(nftAddress?: string) {
  return useContract<Erc721>(nftAddress, ERC721_ABI, false)
}

export function useERC1155Contract(nftAddress?: string) {
  return useContract<Erc1155>(nftAddress, ERC1155_ABI, false)
}

export function useArgentWalletDetectorContract() {
  return useContract<ArgentWalletDetector>(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  return useContract<EnsRegistrar>(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612, false)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IEscswapV2PairABI, withSignerIfPossible)
}

export function useV2RouterContract(): Contract | null {
  return useContract(V2_ROUTER_ADDRESS, IEscswapV2Router02ABI, true)
}

export function useInterfaceMulticall() {
  return useContract<EscswapInterfaceMulticall>(MULTICALL_ADDRESS, MulticallABI, false) as EscswapInterfaceMulticall
}

export function useV3NFTPositionManagerContract(withSignerIfPossible?: boolean): NonfungiblePositionManager | null {
  return useContract<NonfungiblePositionManager>(
    NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
    NFTPositionManagerABI,
    withSignerIfPossible
  )
}

export function useV3Quoter() {
  return useContract<Quoter>(QUOTER_ADDRESSES, QuoterABI)
}

export function useTickLens(): TickLens | null {
  const { chainId } = useWeb3React()
  const address = chainId ? TICK_LENS_ADDRESSES[chainId] : undefined
  return useContract(address, TickLensABI) as TickLens | null
}