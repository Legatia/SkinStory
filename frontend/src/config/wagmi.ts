import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygon, polygonAmoy } from 'wagmi/chains';

// PYUSD contract addresses on Polygon
export const PYUSD_ADDRESS = {
  polygon: '0x9aA83081AA06AF7208Dcc7A4cB72C94d057D2cda', // Polygon Mainnet
  polygonAmoy: '0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97', // Polygon Amoy Testnet
} as const;

export const config = getDefaultConfig({
  appName: 'Tattoos.lib',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [polygon, polygonAmoy],
  ssr: false,
});
