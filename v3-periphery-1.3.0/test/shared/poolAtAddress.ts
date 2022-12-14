import { abi as POOL_ABI } from '@escswap/v3-core/artifacts/contracts/EscswapV3Pool.sol/EscswapV3Pool.json'
import { Contract, Wallet } from 'ethers'
import { IEscswapV3Pool } from '../../typechain'

export default function poolAtAddress(address: string, wallet: Wallet): IEscswapV3Pool {
  return new Contract(address, POOL_ABI, wallet) as IEscswapV3Pool
}
