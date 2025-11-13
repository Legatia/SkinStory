"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSignIn } from '@/hooks/use-sign-in';

export default function UploadPage() {
  const router = useRouter();
  const { isSignedIn, signIn, isLoading: authLoading } = useSignIn({ autoSignIn: false });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const tagCategories = {
    style: ['Traditional', 'Realism', 'Watercolor', 'Japanese', 'Tribal', 'Geometric', 'Minimalist'],
    theme: ['Nature', 'Animal', 'Spiritual', 'Memorial', 'Love', 'Family', 'Strength'],
    bodyPart: ['Arm', 'Back', 'Chest', 'Leg', 'Hand', 'Neck', 'Forearm'],
    color: ['Blackwork', 'Colorful', 'Black & Grey', 'Grayscale'],
    size: ['Tiny', 'Small', 'Medium', 'Large', 'Full Sleeve'],
    meaning: ['Freedom', 'Resilience', 'Journey', 'Balance', 'Protection', 'Courage'],
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 15) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      await signIn();
      return;
    }

    setIsUploading(true);

    // TODO: Implement actual IPFS upload and NFT minting
    // For now, simulate upload
    setTimeout(() => {
      console.log('Uploading tattoo:', {
        title,
        story,
        tags: selectedTags,
        imageFile: imageFile?.name,
      });

      setIsUploading(false);
      alert('Tattoo uploaded successfully! (Mock - implement IPFS + minting)');
      router.push('/discover');
    }, 2000);
  };

  const canSubmit = imageFile && title.trim() && story.trim() && selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            ← Back
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Upload Your Tattoo</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              1. Upload Photo of Your Tattoo
            </label>

            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="text-6xl mb-4">📸</div>
                  <p className="mb-2 text-sm text-gray-600">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            ) : (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview('');
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              2. Give It a Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Phoenix Rising, Sacred Geometry, Mountain Waves"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              maxLength={100}
            />
            <p className="text-sm text-gray-500 mt-2">{title.length}/100 characters</p>
          </div>

          {/* Story */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              3. Share Your Story
            </label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="What does this tattoo mean to you? Why did you get it? What's the story behind it?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base h-48 resize-none"
              maxLength={1000}
            />
            <p className="text-sm text-gray-500 mt-2">{story.length}/1000 characters</p>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              4. Add Tags ({selectedTags.length}/15)
            </label>

            <div className="space-y-6">
              {Object.entries(tagCategories).map(([category, tags]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {selectedTags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Selected Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-start gap-3 mb-6">
              <input type="checkbox" id="soulbound" className="mt-1" required />
              <label htmlFor="soulbound" className="text-sm text-gray-600">
                I understand this tattoo will be minted as a <strong>soul-bound NFT</strong>,
                permanently linked to my identity and non-transferable. Just like my real tattoo,
                it's mine forever.
              </label>
            </div>

            {!isSignedIn ? (
              <button
                type="button"
                onClick={signIn}
                disabled={authLoading}
                className="w-full px-6 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {authLoading ? 'Signing in...' : 'Sign In to Upload'}
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canSubmit || isUploading}
                className="w-full px-6 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading & Minting...' : 'Upload & Mint as NFT'}
              </button>
            )}

            {!canSubmit && isSignedIn && (
              <p className="text-sm text-gray-500 mt-3 text-center">
                Please complete all fields to upload
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
