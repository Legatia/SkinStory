"use client";

import Link from "next/link";
import { useSignIn } from "@/hooks/use-sign-in";
import Image from "next/image";

export default function Home() {
  const { signIn, isLoading, isSignedIn, user } = useSignIn({
    autoSignIn: false, // Don't auto sign in on landing
  });

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white text-black flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-3xl">
        {/* Logo/Title */}
        <div className="text-6xl mb-4">🎨</div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Your Tattoos, Your Identity
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 font-medium">
          Share the stories behind your ink
        </p>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Upload photos of YOUR tattoos. Tell their stories. Mint them as permanent soul-bound NFTs. Connect with tattoo twins worldwide.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/upload"
            className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105"
          >
            Upload Your Tattoo
          </Link>

          <Link
            href="/discover"
            className="px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-50 transition-all"
          >
            Browse Stories
          </Link>

          {!isSignedIn && (
            <button
              onClick={signIn}
              disabled={isLoading}
              className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          )}
        </div>

        {isSignedIn && user && (
          <div className="flex items-center gap-3 justify-center px-4 py-2 bg-white rounded-lg shadow-md inline-flex mx-auto">
            <Image
              src={user?.pfp_url || "/images/avatar.png"}
              alt="Profile"
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
            />
            <span className="font-medium text-sm">@{user?.username}</span>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">📸</div>
            <h3 className="font-semibold text-gray-900 mb-2">Upload Your Ink</h3>
            <p className="text-sm text-gray-600">
              Share photos of YOUR tattoos and the stories behind them.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">🔗</div>
            <h3 className="font-semibold text-gray-900 mb-2">Soul-Bound Identity</h3>
            <p className="text-sm text-gray-600">
              Mint as permanent NFTs. Your tattoos become your on-chain identity.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="font-semibold text-gray-900 mb-2">Find Tattoo Twins</h3>
            <p className="text-sm text-gray-600">
              Connect with people who have similar tattoos and meanings.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="font-semibold text-gray-900 mb-2">Tip Great Stories</h3>
            <p className="text-sm text-gray-600">
              Reward meaningful content with USDC on Base blockchain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
