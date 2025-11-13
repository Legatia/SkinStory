"use client";

import { useState } from 'react';
import { Transaction, TransactionButton, TransactionStatus, TransactionStatusLabel, TransactionStatusAction } from '@coinbase/onchainkit/transaction';
import type { ContractFunctionParameters } from 'viem';
import { ERC20_TRANSFER_ABI, getUSDCAddress, usdToUSDC } from '@/lib/contracts';
import { base } from 'viem/chains';

interface TipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recipientAddress: string;
  recipientName: string;
}

export default function TipDialog({ isOpen, onClose, recipientAddress, recipientName }: TipDialogProps) {
  const [tipAmount, setTipAmount] = useState("");

  if (!isOpen) return null;

  // Create the USDC transfer contract call
  const createTipContracts = (): ContractFunctionParameters[] => {
    if (!tipAmount || parseFloat(tipAmount) <= 0) return [];

    const usdcAddress = getUSDCAddress(base.id);
    const amountInUSDC = usdToUSDC(parseFloat(tipAmount));

    return [{
      address: usdcAddress,
      abi: ERC20_TRANSFER_ABI,
      functionName: 'transfer',
      args: [recipientAddress as `0x${string}`, amountInUSDC],
    }];
  };

  const handleSuccess = () => {
    console.log('Tip sent successfully!');
    setTipAmount("");
    // Close dialog after short delay to show success
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleError = (error: any) => {
    console.error('Tip transaction failed:', error);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Send Tip to {recipientName}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (USD)
          </label>
          <input
            type="number"
            value={tipAmount}
            onChange={(e) => setTipAmount(e.target.value)}
            placeholder="5.00"
            step="0.01"
            min="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Quick Select */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[5, 10, 25, 50].map((amount) => (
            <button
              key={amount}
              onClick={() => setTipAmount(amount.toString())}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-sm font-medium"
            >
              ${amount}
            </button>
          ))}
        </div>

        {/* OnchainKit Transaction Component */}
        <Transaction
          calls={createTipContracts()}
          chainId={base.id}
          onSuccess={handleSuccess}
          onError={handleError}
        >
          <div className="space-y-4">
            <TransactionButton
              className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!tipAmount || parseFloat(tipAmount) <= 0}
            />

            <TransactionStatus>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <TransactionStatusLabel className="text-sm text-gray-700" />
                <TransactionStatusAction className="mt-2" />
              </div>
            </TransactionStatus>
          </div>
        </Transaction>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Powered by USDC on Base
        </p>
      </div>
    </div>
  );
}
