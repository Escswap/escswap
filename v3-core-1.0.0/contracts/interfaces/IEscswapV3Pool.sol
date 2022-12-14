// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/IEscswapV3PoolImmutables.sol';
import './pool/IEscswapV3PoolState.sol';
import './pool/IEscswapV3PoolDerivedState.sol';
import './pool/IEscswapV3PoolActions.sol';
import './pool/IEscswapV3PoolOwnerActions.sol';
import './pool/IEscswapV3PoolEvents.sol';

/// @title The interface for a Escswap V3 Pool
/// @notice A Escswap pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IEscswapV3Pool is
    IEscswapV3PoolImmutables,
    IEscswapV3PoolState,
    IEscswapV3PoolDerivedState,
    IEscswapV3PoolActions,
    IEscswapV3PoolOwnerActions,
    IEscswapV3PoolEvents
{

}
