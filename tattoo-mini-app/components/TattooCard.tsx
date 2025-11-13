"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Tattoo } from '@/lib/data/mockTattoos';

interface TattooCardProps {
  tattoo: Tattoo;
}

export default function TattooCard({ tattoo }: TattooCardProps) {
  const displayedTags = tattoo.tags.slice(0, 3);
  const remainingCount = tattoo.tags.length - 3;

  return (
    <Link href={`/tattoo/${tattoo.id}`}>
      <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={tattoo.imageUrl}
            alt={tattoo.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {tattoo.isSoulBound && (
            <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Soul Bound
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
            {tattoo.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">by {tattoo.owner}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {displayedTags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {tag.label}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                +{remainingCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
