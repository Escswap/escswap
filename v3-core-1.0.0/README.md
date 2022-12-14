# Escswap V3

[![Lint](https://github.com/Escswap/escswap-v3-core/actions/workflows/lint.yml/badge.svg)](https://github.com/Escswap/escswap-v3-core/actions/workflows/lint.yml)
[![Tests](https://github.com/Escswap/escswap-v3-core/actions/workflows/tests.yml/badge.svg)](https://github.com/Escswap/escswap-v3-core/actions/workflows/tests.yml)
[![Fuzz Testing](https://github.com/Escswap/escswap-v3-core/actions/workflows/fuzz-testing.yml/badge.svg)](https://github.com/Escswap/escswap-v3-core/actions/workflows/fuzz-testing.yml)
[![Mythx](https://github.com/Escswap/escswap-v3-core/actions/workflows/mythx.yml/badge.svg)](https://github.com/Escswap/escswap-v3-core/actions/workflows/mythx.yml)
[![npm version](https://img.shields.io/npm/v/@escswap/v3-core/latest.svg)](https://www.npmjs.com/package/@escswap/v3-core/v/latest)

This repository contains the core smart contracts for the Escswap V3 Protocol.
For higher level contracts, see the [escswap-v3-periphery](https://github.com/Escswap/escswap-v3-periphery)
repository.

## Bug bounty

This repository is subject to the Escswap V3 bug bounty program, per the terms defined [here](./bug-bounty.md).

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@escswap/v3-core`
and import the factory bytecode located at
`@escswap/v3-core/artifacts/contracts/EscswapV3Factory.sol/EscswapV3Factory.json`.
For example:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@escswap/v3-core/artifacts/contracts/EscswapV3Factory.sol/EscswapV3Factory.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all Escswap code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The Escswap v3 interfaces are available for import into solidity smart contracts
via the npm artifact `@escswap/v3-core`, e.g.:

```solidity
import '@escswap/v3-core/contracts/interfaces/IEscswapV3Pool.sol';

contract MyContract {
  IEscswapV3Pool pool;

  function doSomethingWithPool() {
    // pool.swap(...);
  }
}

```

## Licensing

The primary license for Escswap V3 Core is the Business Source License 1.1 (`BUSL-1.1`), see [`LICENSE`](./LICENSE).

### Exceptions

- All files in `contracts/interfaces/` are licensed under `GPL-2.0-or-later` (as indicated in their SPDX headers), see [`contracts/interfaces/LICENSE`](./contracts/interfaces/LICENSE)
- Several files in `contracts/libraries/` are licensed under `GPL-2.0-or-later` (as indicated in their SPDX headers), see [`contracts/libraries/LICENSE_GPL`](contracts/libraries/LICENSE_GPL)
- `contracts/libraries/FullMath.sol` is licensed under `MIT` (as indicated in its SPDX header), see [`contracts/libraries/LICENSE_MIT`](contracts/libraries/LICENSE_MIT)
- All files in `contracts/test` remain unlicensed.
