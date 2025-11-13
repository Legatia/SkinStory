"use client";

import { mockTattoos } from '@/lib/data/mockTattoos';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import TipDialog from '@/components/TipDialog';

export default function TattooDetailPage() {
  const params = useParams();
  const tattoo = mockTattoos.find((t) => t.id === params.id);
  const [showTipDialog, setShowTipDialog] = useState(false);

  if (!tattoo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tattoo Not Found</h1>
          <p className="text-gray-600 mb-4">The tattoo you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/discover" className="text-purple-600 hover:text-purple-700">
            ← Back to Discover
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/discover" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            ← Back
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">{tattoo.title}</h1>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Image */}
        <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6">
          <Image
            src={tattoo.imageUrl}
            alt={tattoo.title}
            fill
            className="object-cover"
          />
          {tattoo.isSoulBound && (
            <div className="absolute top-4 right-4 bg-purple-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg">
              Soul Bound NFT
            </div>
          )}
        </div>

        {/* Artist Info */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{tattoo.title}</h2>
            <p className="text-gray-600">by <span className="font-medium">{tattoo.owner}</span></p>
            <p className="text-sm text-gray-500 mt-1">
              Minted on {new Date(tattoo.mintedDate).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setShowTipDialog(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md"
          >
            Send Tip
          </button>
        </div>

        {/* Story */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Story</h3>
          <p className="text-gray-700 leading-relaxed">{tattoo.story}</p>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tattoo.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* Owner Address */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Owner Address</p>
          <p className="text-sm font-mono text-gray-900">{tattoo.ownerAddress}</p>
        </div>
      </div>

      {/* OnchainKit Tip Dialog */}
      <TipDialog
        isOpen={showTipDialog}
        onClose={() => setShowTipDialog(false)}
        recipientAddress={tattoo.ownerAddress}
        recipientName={tattoo.owner}
      />
    </div>
  );
}
