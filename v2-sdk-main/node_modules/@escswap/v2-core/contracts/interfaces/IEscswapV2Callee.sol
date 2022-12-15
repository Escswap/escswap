pragma solidity >=0.5.0;

interface IEscswapV2Callee {
    function escswapV2Call(address sender, uint amount0, uint amount1, bytes calldata data) external;
}
