"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Tattoo } from '@/lib/data/mockTattoos';
import { useState } from 'react';

interface StoryCardProps {
  tattoo: Tattoo;
}

export default function StoryCard({ tattoo }: StoryCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 10);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  // Truncate story to 150 characters for preview
  const storyPreview = tattoo.story.length > 150
    ? tattoo.story.substring(0, 150) + '...'
    : tattoo.story;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* User Header */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-100">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
          {tattoo.owner.charAt(0)}
        </div>
        <div className="flex-1">
          <Link href={`/profile`} className="font-semibold text-gray-900 hover:text-purple-600">
            {tattoo.owner}
          </Link>
          <div className="text-xs text-gray-500">{tattoo.mintedDate}</div>
        </div>
        {tattoo.isSoulBound && (
          <div className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
            Soul Bound
          </div>
        )}
      </div>

      {/* Image */}
      <Link href={`/tattoo/${tattoo.id}`}>
        <div className="relative w-full h-96 cursor-pointer">
          <Image
            src={tattoo.imageUrl}
            alt={tattoo.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/tattoo/${tattoo.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
            {tattoo.title}
          </h3>
        </Link>

        <p className="text-gray-700 mb-4 leading-relaxed">
          {storyPreview}
          {tattoo.story.length > 150 && (
            <Link href={`/tattoo/${tattoo.id}`} className="text-purple-600 hover:text-purple-700 ml-1">
              Read more
            </Link>
          )}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tattoo.tags.slice(0, 4).map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              #{tag.label}
            </span>
          ))}
          {tattoo.tags.length > 4 && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
              +{tattoo.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${
              liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <span className="text-xl">{liked ? '❤️' : '🤍'}</span>
            <span className="font-medium">{likeCount}</span>
          </button>

          <Link
            href={`/tattoo/${tattoo.id}#comments`}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <span className="text-xl">💬</span>
            <span className="font-medium">{Math.floor(Math.random() * 20)}</span>
          </Link>

          <Link
            href={`/tattoo/${tattoo.id}#tip`}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <span className="text-xl">💰</span>
            <span className="font-medium">Tip</span>
          </Link>

          <button className="ml-auto text-gray-600 hover:text-purple-600 transition-colors">
            <span className="text-xl">🔗</span>
          </button>
        </div>
      </div>
    </div>
  );
}
