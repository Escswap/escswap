// import { BaseProvider } from '@ethersproject/providers'
// import { mocked } from 'ts-jest/utils';
// import { EscswapMulticallProvider } from '../../../src/providers/multicall-escswap-provider';
// import { IERC20Metadata__factory } from '../../../src/types/v3/factories/IERC20Metadata__factory';
// import { EscswapInterfaceMulticall__factory } from '../../../src/types/v3/factories/EscswapInterfaceMulticall__factory';
// import { EscswapInterfaceMulticall } from '../../../src/types/v3/EscswapInterfaceMulticall';

/* jest.mock('../../src/types/v3/EscswapInterfaceMulticall', () => {
  return {
    EscswapInterfaceMulticall: jest.fn().mockImplementation(() => {
      return {
        callStatic: {
          multicall: () => {
            return {
              blockNumber: BigNumber.from(10000),
              returnData: [
                {
                  success: true,
                  gasUsed: BigNumber.from(100),
                  returnData: '0x0',
                },
              ],
            } as any;
          },
        },
      };
    }),
  };
}); */

describe.skip('escswap multicall provider', () => {
  test('placeholder', async () => {
    return;
  });

  /*
  let escswapMulticallProvider: EscswapMulticallProvider;
  const erc20Interface = IERC20Metadata__factory.createInterface();

  let mockProvider: jest.Mocked<BaseProvider>;

  let multicallMock: jest.Mocked<EscswapInterfaceMulticall>;

  beforeAll(() => {
    multicallMock = createMockInstance(EscswapInterfaceMulticall);

    mocked(multicallMock.callStatic.multicall).mockResolvedValue({
      blockNumber: BigNumber.from(10000),
      returnData: [
        { success: true, gasUsed: BigNumber.from(100), returnData: '0x0' },
      ],
    } as any);

    mocked(EscswapInterfaceMulticall__factory.connect).mockReturnValue(
      EscswapInterfaceMulticall as any
    );

    mockProvider = createMockInstance(BaseProvider);
    escswapMulticallProvider = new EscswapMulticallProvider(
      createMockInstance(BaseProvider)
    );
  });

  describe('callSameFunctionOnMultipleContracts', () => {
    test('succeeds', async () => {
      const result =
        await escswapMulticallProvider.callSameFunctionOnMultipleContracts<
          undefined,
          [string]
        >({
          addresses: [
            '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
            '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9C',
          ],
          contractInterface: erc20Interface,
          functionName: 'decimals',
        });

      console.log({ result }, 'Result');
      expect(multicallMock).toHaveBeenCalledTimes(1);
      mockProvider;
    });
  });
  */
});
