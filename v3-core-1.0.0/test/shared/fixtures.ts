import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeEscswapV3Pool } from '../../typechain/MockTimeEscswapV3Pool'
import { TestERC20 } from '../../typechain/TestERC20'
import { EscswapV3Factory } from '../../typechain/EscswapV3Factory'
import { TestEscswapV3Callee } from '../../typechain/TestEscswapV3Callee'
import { TestEscswapV3Router } from '../../typechain/TestEscswapV3Router'
import { MockTimeEscswapV3PoolDeployer } from '../../typechain/MockTimeEscswapV3PoolDeployer'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: EscswapV3Factory
}

async function factoryFixture(): Promise<FactoryFixture> {
  const factoryFactory = await ethers.getContractFactory('EscswapV3Factory')
  const factory = (await factoryFactory.deploy()) as EscswapV3Factory
  return { factory }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestEscswapV3Callee
  swapTargetRouter: TestEscswapV3Router
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeEscswapV3Pool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeEscswapV3PoolDeployerFactory = await ethers.getContractFactory('MockTimeEscswapV3PoolDeployer')
  const MockTimeEscswapV3PoolFactory = await ethers.getContractFactory('MockTimeEscswapV3Pool')

  const calleeContractFactory = await ethers.getContractFactory('TestEscswapV3Callee')
  const routerContractFactory = await ethers.getContractFactory('TestEscswapV3Router')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestEscswapV3Callee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestEscswapV3Router

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer = (await MockTimeEscswapV3PoolDeployerFactory.deploy()) as MockTimeEscswapV3PoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string
      return MockTimeEscswapV3PoolFactory.attach(poolAddress) as MockTimeEscswapV3Pool
    },
  }
}
