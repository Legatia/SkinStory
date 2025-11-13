import { useState } from 'react';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits, type Address } from 'viem';
import { polygon, polygonAmoy } from 'wagmi/chains';
import { ERC20_ABI } from '@/config/abis';
import { PYUSD_ADDRESS } from '@/config/wagmi';
import { toast } from '@/hooks/use-toast';

export function usePyusdTip() {
  const { address, chainId } = useAccount();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get the correct PYUSD contract address based on chain
  const pyusdAddress = chainId === polygon.id
    ? PYUSD_ADDRESS.polygon
    : PYUSD_ADDRESS.polygonAmoy;

  // Read PYUSD balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: pyusdAddress as Address,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Write contract for sending tips
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  /**
   * Send a PYUSD tip to an artist
   * @param recipientAddress - The artist's wallet address
   * @param amountInUsd - The tip amount in USD (e.g., "5.00")
   */
  const sendTip = async (recipientAddress: Address, amountInUsd: string) => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to send tips",
        variant: "destructive",
      });
      return;
    }

    if (!recipientAddress || recipientAddress === '0x0') {
      toast({
        title: "Invalid recipient",
        description: "Artist address is not valid",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);

      // PYUSD has 6 decimals (like USDC)
      const amount = parseUnits(amountInUsd, 6);

      // Check if user has sufficient balance
      if (balance && BigInt(balance.toString()) < amount) {
        toast({
          title: "Insufficient balance",
          description: `You need ${amountInUsd} PYUSD to send this tip`,
          variant: "destructive",
        });
        return;
      }

      // Send the transaction
      writeContract({
        address: pyusdAddress as Address,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [recipientAddress, amount],
      });

      toast({
        title: "Tip sent!",
        description: `Sending ${amountInUsd} PYUSD to the artist...`,
      });
    } catch (err) {
      console.error('Error sending tip:', err);
      toast({
        title: "Transaction failed",
        description: err instanceof Error ? err.message : "Failed to send tip",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Format balance for display
  const formattedBalance = balance
    ? formatUnits(BigInt(balance.toString()), 6)
    : '0.00';

  return {
    sendTip,
    balance: formattedBalance,
    refetchBalance,
    isProcessing: isProcessing || isPending || isConfirming,
    isSuccess,
    transactionHash: hash,
    error,
    isConnected: !!address,
    pyusdAddress,
  };
}
