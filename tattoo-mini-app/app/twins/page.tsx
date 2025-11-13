"use client";

import { useState } from 'react';
import { mockTattoos } from '@/lib/data/mockTattoos';
import TattooCard from '@/components/TattooCard';
import Link from 'next/link';

export default function TattooTwinsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [matches, setMatches] = useState<typeof mockTattoos>([]);

  // Get all unique tags from mock data
  const allTags = Array.from(
    new Set(mockTattoos.flatMap(t => t.tags.map(tag => tag.label)))
  );

  const findTwins = () => {
    if (selectedTags.length === 0) {
      setMatches([]);
      return;
    }

    // Find tattoos that match selected tags
    const matching = mockTattoos.filter(tattoo =>
      tattoo.tags.some(tag => selectedTags.includes(tag.label))
    );

    // Sort by number of matching tags (most matches first)
    matching.sort((a, b) => {
      const aMatches = a.tags.filter(tag => selectedTags.includes(tag.label)).length;
      const bMatches = b.tags.filter(tag => selectedTags.includes(tag.label)).length;
      return bMatches - aMatches;
    });

    setMatches(matching);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Link href="/" className="text-purple-600 hover:text-purple-700 text-sm font-medium mb-4 inline-block">
            ← Back
          </Link>
          <div className="text-center">
            <div className="text-6xl mb-4">👥</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Find Your Tattoo Twins
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select tags that describe your tattoos and discover people with similar ink!
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tag Selection */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Select Your Tattoo Tags ({selectedTags.length} selected)
          </h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            onClick={findTwins}
            disabled={selectedTags.length === 0}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Find My Tattoo Twins
          </button>
        </div>

        {/* Results */}
        {matches.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Found {matches.length} Tattoo Twin{matches.length !== 1 ? 's' : ''}!
              </h2>
              <p className="text-gray-600">
                People with similar tattoos to yours
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((tattoo) => {
                const matchingTags = tattoo.tags.filter(tag =>
                  selectedTags.includes(tag.label)
                );

                return (
                  <div key={tattoo.id} className="relative">
                    <TattooCard tattoo={tattoo} />
                    <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {matchingTags.length} match{matchingTags.length !== 1 ? 'es' : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedTags.length > 0 && matches.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No twins found yet
            </h3>
            <p className="text-gray-600 mb-6">
              Try selecting different tags or be the first to upload a tattoo like yours!
            </p>
            <Link
              href="/upload"
              className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Upload Your Tattoo
            </Link>
          </div>
        )}

        {/* Initial State */}
        {selectedTags.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Select tags to find twins
            </h3>
            <p className="text-gray-600">
              Choose tags that describe your tattoos from the options above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
