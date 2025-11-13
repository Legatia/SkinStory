"use client";

import { useState } from 'react';
import { mockTattoos } from '@/lib/data/mockTattoos';
import TattooCard from '@/components/TattooCard';
import StoryCard from '@/components/StoryCard';
import Link from 'next/link';

export default function DiscoverPage() {
  const [viewMode, setViewMode] = useState<'feed' | 'grid'>('feed');

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Discover Stories</h1>
              <p className="text-sm text-gray-600 mt-1">
                Explore tattoos and stories from the community
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('feed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'feed'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Feed
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Feed View */}
        {viewMode === 'feed' && (
          <div className="space-y-6">
            {mockTattoos.map((tattoo) => (
              <StoryCard key={tattoo.id} tattoo={tattoo} />
            ))}

            {/* CTA at end of feed */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-center text-white">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-2">Got Tattoos?</h3>
              <p className="text-purple-100 mb-6">
                Share your ink and stories with the community
              </p>
              <Link
                href="/upload"
                className="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
              >
                Upload Your Tattoo
              </Link>
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTattoos.map((tattoo) => (
              <TattooCard key={tattoo.id} tattoo={tattoo} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {mockTattoos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tattoos found</p>
            <p className="text-gray-400 text-sm mt-2">Be the first to upload!</p>
            <Link
              href="/upload"
              className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Upload Your Tattoo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
