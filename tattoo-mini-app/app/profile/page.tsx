"use client";

import { useState } from 'react';
import { useSignIn } from '@/hooks/use-sign-in';
import { mockTattoos } from '@/lib/data/mockTattoos';
import TattooCard from '@/components/TattooCard';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  const { isSignedIn, user, signIn, isLoading } = useSignIn({ autoSignIn: false });
  const [activeTab, setActiveTab] = useState<'tattoos' | 'liked' | 'tipped'>('tattoos');

  // Mock user data - in production, fetch from blockchain/database
  const userTattoos = mockTattoos.slice(0, 3); // First 3 as user's tattoos
  const userStats = {
    tattoosCount: userTattoos.length,
    tipsReceived: 12.5, // USDC
    followers: 142,
    following: 87,
    memberSince: 'Jan 2025',
    totalViews: 1247,
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🎨</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sign In to View Your Profile
          </h2>
          <p className="text-gray-600 mb-6">
            Connect with Farcaster to upload your tattoos, build your collection, and connect with the community.
          </p>
          <button
            onClick={signIn}
            disabled={isLoading}
            className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In with Farcaster'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <Image
                src={user?.pfp_url || '/images/avatar.png'}
                alt={user?.display_name || 'User'}
                width={120}
                height={120}
                className="rounded-full border-4 border-purple-200"
              />
              <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                #{userStats.totalViews}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.display_name || 'Anonymous'}
              </h1>
              <p className="text-gray-600 mb-4">@{user?.username || 'user'}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 justify-center md:justify-start mb-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {userStats.tattoosCount}
                  </div>
                  <div className="text-sm text-gray-600">Tattoos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    ${userStats.tipsReceived}
                  </div>
                  <div className="text-sm text-gray-600">Tips Received</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {userStats.followers}
                  </div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {userStats.following}
                  </div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Member since {userStats.memberSince}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link
                href="/upload"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Upload Tattoo
              </Link>
              <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('tattoos')}
              className={`py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'tattoos'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              My Tattoos ({userStats.tattoosCount})
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'liked'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Liked
            </button>
            <button
              onClick={() => setActiveTab('tipped')}
              className={`py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'tipped'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Tipped
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'tattoos' && (
          <div>
            {userTattoos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userTattoos.map((tattoo) => (
                  <TattooCard key={tattoo.id} tattoo={tattoo} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No tattoos yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload your first tattoo to get started!
                </p>
                <Link
                  href="/upload"
                  className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Upload Your First Tattoo
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'liked' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No liked tattoos yet
            </h3>
            <p className="text-gray-600 mb-6">
              Explore and like tattoos to see them here
            </p>
            <Link
              href="/discover"
              className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Discover Tattoos
            </Link>
          </div>
        )}

        {activeTab === 'tipped' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tipped tattoos yet
            </h3>
            <p className="text-gray-600 mb-6">
              Tip great stories to support the community
            </p>
            <Link
              href="/discover"
              className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse Stories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
