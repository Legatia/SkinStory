# Tattoos.lib Setup Guide

This guide will help you set up the Tattoos.lib frontend with PayPal PYUSD tipping integration on Polygon.

## Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- Polygon Amoy testnet MATIC (for testing)

## Step 1: Install Dependencies

```bash
cd frontend
npm install
```

## Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Get your WalletConnect Project ID:
   - Visit https://cloud.walletconnect.com
   - Create a new project
   - Copy your Project ID
   - Add to `.env`: `VITE_WALLETCONNECT_PROJECT_ID=your_project_id`

3. (Optional) Get Transak API Key for fiat on-ramp:
   - Visit https://dashboard.transak.com
   - Sign up for an account
   - Get your API key
   - Add to `.env`: `VITE_TRANSAK_API_KEY=your_api_key`

## Step 3: Get Testnet Tokens

### Get Polygon Amoy MATIC
1. Visit https://faucet.polygon.technology/
2. Select "Polygon Amoy" network
3. Enter your wallet address
4. Request testnet MATIC (needed for gas fees)

### Get Testnet PYUSD
Since PYUSD testnet tokens may not be readily available, you have a few options:

**Option A: Use a testnet faucet (if available)**
- Check Polygon Amoy faucets for PYUSD tokens

**Option B: For testing, use mock USDC or USDT**
- Modify the contract address in `src/config/wagmi.ts` to use testnet USDC/USDT
- Polygon Amoy USDC: Check Polygon documentation for current address

**Option C: Deploy your own ERC-20 test token**
- Deploy a simple ERC-20 token for testing purposes

## Step 4: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Features Implemented

### 1. Wallet Connection
- Click "Connect Wallet" in the navbar
- Select your preferred wallet (MetaMask, Coinbase Wallet, WalletConnect, etc.)
- Approve the connection
- Switch to Polygon Amoy network if prompted

### 2. PYUSD Tipping
- Navigate to any tattoo detail page
- Click "Send Tip" button
- Enter tip amount or use quick-select buttons ($5, $10, $25, $50)
- Confirm the transaction in your wallet
- Transaction will be processed on Polygon network

### 3. PayPal On-Ramp
When you need PYUSD, you have three options:

**Option 1: Direct Purchase (Transak)**
- Buy PYUSD directly with credit/debit card
- Requires Transak API key
- ~2.99% fee
- Receive PYUSD directly in your wallet on Polygon

**Option 2: Coinbase**
- Buy PYUSD on Coinbase exchange
- Transfer to your wallet
- Lower fees for larger amounts
- Requires Coinbase account

**Option 3: PayPal App**
- Buy PYUSD in PayPal mobile app
- Send to your external wallet
- Requires PayPal account

## Project Structure

```
frontend/
├── src/
│   ├── config/
│   │   ├── wagmi.ts          # Wagmi & RainbowKit configuration
│   │   └── abis.ts            # ERC-20 ABI for PYUSD
│   ├── hooks/
│   │   └── use-pyusd-tip.ts   # Custom hook for tipping
│   ├── components/
│   │   ├── PayPalOnRamp.tsx   # PayPal on-ramp modal
│   │   └── Navbar.tsx         # Navigation with wallet button
│   └── pages/
│       └── TattooDetail.tsx   # Tattoo detail with tipping
```

## How It Works

### PYUSD Tipping Flow

1. **Connect Wallet**: User connects Web3 wallet via RainbowKit
2. **Select Artist**: User navigates to a tattoo and clicks "Send Tip"
3. **Enter Amount**: User enters tip amount in PYUSD
4. **Check Balance**: Hook checks user's PYUSD balance
5. **Buy if Needed**: If insufficient, user can buy PYUSD via on-ramp
6. **Send Transaction**: User approves ERC-20 transfer transaction
7. **Confirmation**: Transaction is confirmed on Polygon
8. **Success**: Artist receives PYUSD directly to their wallet

### Technical Details

- **Chain**: Polygon PoS
- **Token Standard**: ERC-20
- **PYUSD Decimals**: 6 (like USDC)
- **Gas Token**: MATIC
- **Average Gas Cost**: ~$0.001 per tip (100x cheaper than Ethereum!)

## Troubleshooting

### Wallet won't connect
- Make sure you're using a compatible wallet
- Try refreshing the page
- Check that your wallet extension is unlocked
- Ensure Polygon network is added to your wallet

### Transaction fails
- Ensure you have sufficient Polygon MATIC for gas
- Check that you have enough PYUSD balance
- Verify the recipient address is valid
- Make sure you're on Polygon Amoy testnet

### Balance shows 0.00 PYUSD
- Make sure you're on the correct network (Polygon or Polygon Amoy)
- Check that you have PYUSD tokens at the contract address
- Try refreshing your balance

### On-ramp not working
- Verify Transak API key is configured
- Check that your region is supported
- Try alternative methods (Coinbase or PayPal app)

### Wrong network error
- Switch to Polygon Amoy in your wallet
- RainbowKit will prompt you to switch automatically

## Next Steps

1. **Deploy Smart Contracts**: Deploy tattoo NFT and tipping contracts to Polygon
2. **Integrate Blockscout**: Add NFT discovery via Blockscout API
3. **Add Upload Flow**: Implement tattoo minting functionality
4. **Add Tests**: Write unit and integration tests
5. **Deploy Frontend**: Deploy to Vercel, Netlify, or IPFS

## Resources

- [Polygon Documentation](https://docs.polygon.technology)
- [PYUSD Information](https://www.paypal.com/us/digital-wallet/manage-money/crypto/pyusd)
- [RainbowKit Docs](https://www.rainbowkit.com/docs/introduction)
- [Wagmi Documentation](https://wagmi.sh)
- [Transak Documentation](https://docs.transak.com)
- [Polygon Blockscout](https://polygon.blockscout.com)

## Support

For issues or questions:
- Check the main README.md
- Review the code comments
- Open an issue on GitHub
- Check Polygon and RainbowKit documentation

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit `.env` files** - They contain sensitive API keys
2. **Use testnet first** - Test thoroughly before deploying to mainnet
3. **Audit smart contracts** - Have contracts audited before mainnet deployment
4. **Rate limiting** - Implement rate limiting for API calls
5. **Input validation** - Always validate user inputs
6. **Amount limits** - Consider implementing min/max tip amounts

## Production Checklist

Before deploying to production:

- [ ] Update PYUSD contract address to mainnet
- [ ] Set VITE_CHAIN_ID to 137 (Polygon mainnet)
- [ ] Add proper error handling and logging
- [ ] Implement analytics tracking
- [ ] Add transaction history
- [ ] Set up monitoring and alerts
- [ ] Configure proper CORS policies
- [ ] Enable production API keys
- [ ] Add legal disclaimers and terms
- [ ] Implement rate limiting
- [ ] Test with real funds (small amounts first)
