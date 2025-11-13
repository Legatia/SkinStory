# Tattoos.lib

A decentralized platform for minting and sharing tattoo art as soul-bound NFTs on Polygon. Artists can immortalize their work on-chain, share stories, and receive tips in PYUSD.

## Features

- **Soul-Bound NFTs**: Tattoos are minted as non-transferable NFTs, permanently linked to their original owner
- **PYUSD Tipping**: Support artists with PayPal USD (PYUSD) stablecoin tips
- **Fast Discovery**: NFT indexing powered by Blockscout API
- **Artist Profiles**: Showcase your tattoo collection and stories
- **Web3 Wallet Integration**: Connect with MetaMask, Coinbase Wallet, and more

## Technology Stack

### Frontend
- **React 18** - Modern UI library with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool with HMR
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **TanStack React Query** - Server state management
- **React Hook Form + Zod** - Form handling and validation

### Blockchain
- **Polygon PoS** - Ultra-low-cost, fast transactions (~$0.001 per tx)
- **PYUSD** - PayPal USD stablecoin for tipping
- **Blockscout** - NFT indexing and discovery
- **wagmi/viem** - Ethereum interactions
- **RainbowKit** - Wallet connection UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- Polygon Amoy testnet MATIC for testing (get from [faucet](https://faucet.polygon.technology/))

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the frontend directory
cd tattoo-lib/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the frontend directory:

```bash
# Copy the example file
cp .env.example .env
```

Required variables:

```env
# WalletConnect Project ID (REQUIRED - get from https://cloud.walletconnect.com)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# Transak API Key (OPTIONAL - for fiat on-ramp)
VITE_TRANSAK_API_KEY=your_transak_api_key

# Polygon chain configuration
VITE_CHAIN_ID=80002  # Polygon Amoy testnet (137 for mainnet)

# Blockscout API
VITE_BLOCKSCOUT_API=https://polygon.blockscout.com/api/v2
```

**Note**: PYUSD contract addresses are pre-configured in the code:
- Polygon Mainnet: `0x9aA83081AA06AF7208Dcc7A4cB72C94d057D2cda`
- Polygon Amoy: `0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97`

For detailed setup instructions, see [SETUP.md](SETUP.md)

## Project Structure

```
frontend/
├── src/
│   ├── pages/              # Route components
│   │   ├── Landing.tsx     # Homepage
│   │   ├── Discover.tsx    # Browse tattoos
│   │   ├── Profile.tsx     # User profile
│   │   └── TattooDetail.tsx# Tattoo details
│   ├── components/         # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── Navbar.tsx      # Navigation
│   │   └── TattooCard.tsx  # Tattoo card
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities
│   └── data/               # Mock data (temporary)
├── public/                 # Static assets
└── package.json
```

## Development

### Available Scripts

```sh
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Prettier for formatting (recommended)
- Tailwind CSS for styling

## Smart Contracts

Smart contracts will be deployed to Polygon:

- **TattooNFT.sol** - ERC-721 soul-bound NFT contract
- **TippingSystem.sol** - PYUSD tipping mechanism

Contract addresses will be updated after deployment.

## Deployment

### Frontend Deployment

The frontend can be deployed to any static hosting service:

```sh
# Build the project
npm run build

# Deploy the dist/ folder to:
# - Vercel
# - Netlify
# - GitHub Pages
# - AWS S3 + CloudFront
# - IPFS
```

### Smart Contract Deployment

Smart contracts will be deployed using Hardhat or Foundry to:
- Polygon Amoy (testnet)
- Polygon Mainnet (production)

## Roadmap

- [ ] Deploy soul-bound NFT contract to Polygon
- [x] Integrate PYUSD tipping functionality
- [ ] Connect Blockscout API for NFT discovery
- [x] Implement wallet connection (wagmi + RainbowKit)
- [ ] Build tattoo upload and minting flow
- [ ] Add search and filtering
- [ ] Implement pagination/infinite scroll
- [ ] Add loading and error states
- [ ] Write unit and integration tests
- [ ] Deploy to Polygon mainnet

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[Add your license here]

## Links

- [Polygon Network](https://polygon.technology)
- [PYUSD Documentation](https://www.paypal.com/us/digital-wallet/manage-money/crypto/pyusd)
- [Polygon Blockscout](https://polygon.blockscout.com)
- [Polygon Faucet](https://faucet.polygon.technology)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## Support

For questions or issues, please open an issue on GitHub.
