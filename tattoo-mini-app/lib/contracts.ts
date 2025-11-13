// USDC Contract Configuration for Base
export const USDC_BASE_MAINNET = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913';
export const USDC_BASE_SEPOLIA = '0x036CbD53842c5426634e7929541eC2318f3dCF7e';

// ERC-20 Transfer ABI (minimal, just what we need)
export const ERC20_TRANSFER_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Helper to get USDC contract address based on chain
export function getUSDCAddress(chainId: number): `0x${string}` {
  // Base Mainnet
  if (chainId === 8453) {
    return USDC_BASE_MAINNET;
  }
  // Base Sepolia testnet
  if (chainId === 84532) {
    return USDC_BASE_SEPOLIA;
  }
  // Default to mainnet
  return USDC_BASE_MAINNET;
}

// Helper to convert USD amount to USDC token amount (6 decimals)
export function usdToUSDC(usdAmount: number): bigint {
  return BigInt(Math.floor(usdAmount * 1_000_000)); // USDC has 6 decimals
}

// Helper to convert USDC token amount to USD
export function usdcToUSD(usdcAmount: bigint): number {
  return Number(usdcAmount) / 1_000_000;
}
