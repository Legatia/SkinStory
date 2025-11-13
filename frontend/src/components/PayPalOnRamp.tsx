import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreditCard, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PayPalOnRampProps {
  children?: React.ReactNode;
  defaultAmount?: number;
}

/**
 * PayPal On-Ramp Component
 * Allows users to buy PYUSD directly with fiat via Transak or Coinbase
 */
export function PayPalOnRamp({ children, defaultAmount = 20 }: PayPalOnRampProps) {
  const { address, chainId } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const handleTransakPurchase = () => {
    if (!address) return;

    // Transak widget configuration for PYUSD on Polygon
    const transakUrl = new URL('https://global.transak.com');
    transakUrl.searchParams.set('apiKey', import.meta.env.VITE_TRANSAK_API_KEY || 'YOUR_TRANSAK_API_KEY');
    transakUrl.searchParams.set('cryptoCurrencyCode', 'PYUSD');
    transakUrl.searchParams.set('network', chainId === 137 ? 'polygon' : 'ethereum'); // Polygon or Ethereum
    transakUrl.searchParams.set('walletAddress', address);
    transakUrl.searchParams.set('defaultCryptoAmount', defaultAmount.toString());
    transakUrl.searchParams.set('fiatCurrency', 'USD');
    transakUrl.searchParams.set('defaultFiatAmount', defaultAmount.toString());
    transakUrl.searchParams.set('themeColor', '6366f1'); // Indigo color

    window.open(transakUrl.toString(), '_blank', 'width=500,height=700');
  };

  const handleCoinbasePurchase = () => {
    // Coinbase Pay for PYUSD
    // Note: Direct PYUSD purchase link - users will need Coinbase account
    const coinbaseUrl = 'https://www.coinbase.com/price/paypal-usd';
    window.open(coinbaseUrl, '_blank');
  };

  const handlePayPalDirect = () => {
    // PayPal's own crypto buying interface
    const paypalUrl = 'https://www.paypal.com/us/digital-wallet/manage-money/crypto/pyusd';
    window.open(paypalUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Buy PYUSD
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Buy PYUSD with PayPal</DialogTitle>
          <DialogDescription>
            Purchase PayPal USD (PYUSD) to tip artists. PYUSD is a stablecoin backed 1:1 by US dollars.
          </DialogDescription>
        </DialogHeader>

        {!address && (
          <Alert>
            <AlertDescription>
              Please connect your wallet first to purchase PYUSD
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 py-4">
          {/* Method 1: Transak (Direct PYUSD on Base) */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Option 1: Direct Purchase (Transak)</h3>
            <p className="text-sm text-muted-foreground">
              Buy PYUSD directly with credit/debit card and receive it in your wallet
            </p>
            <Button
              onClick={handleTransakPurchase}
              disabled={!address}
              className="w-full gap-2"
              variant="default"
            >
              Buy with Card <ExternalLink className="h-4 w-4" />
            </Button>
            <p className="text-xs text-muted-foreground">
              Powered by Transak • Fees: ~2.99%
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Method 2: Coinbase */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Option 2: Coinbase</h3>
            <p className="text-sm text-muted-foreground">
              Buy PYUSD on Coinbase and transfer to your wallet
            </p>
            <Button
              onClick={handleCoinbasePurchase}
              variant="outline"
              className="w-full gap-2"
            >
              Buy on Coinbase <ExternalLink className="h-4 w-4" />
            </Button>
            <p className="text-xs text-muted-foreground">
              Requires Coinbase account • Lower fees for larger amounts
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Method 3: PayPal Direct */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Option 3: PayPal App</h3>
            <p className="text-sm text-muted-foreground">
              Buy PYUSD directly in your PayPal app, then send to your wallet
            </p>
            <Button
              onClick={handlePayPalDirect}
              variant="outline"
              className="w-full gap-2"
            >
              Open PayPal <ExternalLink className="h-4 w-4" />
            </Button>
            <p className="text-xs text-muted-foreground">
              Requires PayPal account • Available in PayPal mobile app
            </p>
          </div>
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            <strong>Note:</strong> PYUSD is currently available on Ethereum, Polygon, Solana, and select L2s.
            If purchasing on Ethereum, you can bridge to Polygon using the official Polygon Bridge for ultra-low fees.
          </AlertDescription>
        </Alert>
      </DialogContent>
    </Dialog>
  );
}
