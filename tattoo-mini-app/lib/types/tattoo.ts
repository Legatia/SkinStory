// Tattoo NFT types and metadata schemas

/**
 * Tag categories for tattoo classification
 */
export enum TagCategory {
  Style = 'style',           // Traditional, Realism, Watercolor, etc.
  Theme = 'theme',           // Nature, Spiritual, Memorial, etc.
  BodyPart = 'body_part',    // Arm, Back, Chest, etc.
  Color = 'color',           // Blackwork, Colorful, Grayscale, etc.
  Size = 'size',             // Tiny, Small, Medium, Large, Full Sleeve
  Artist = 'artist',         // Artist name or style
  Meaning = 'meaning',       // Personal, Family, Love, Strength, etc.
}

/**
 * Tag interface for categorizing tattoos
 */
export interface TattooTag {
  id: string;
  label: string;
  category: TagCategory;
  count?: number; // Number of tattoos with this tag (for trending)
}

/**
 * NFT Metadata following ERC-721 and OpenSea standards
 * This will be stored on IPFS and referenced in the smart contract
 */
export interface TattooMetadata {
  // OpenSea standard fields
  name: string;
  description: string;
  image: string; // IPFS URL to tattoo image
  external_url?: string; // Link to tattoo detail page

  // Custom attributes for Blockscout indexing
  attributes: Array<{
    trait_type: string;
    value: string | number;
    display_type?: 'string' | 'number' | 'date' | 'boost_percentage' | 'boost_number';
  }>;

  // Tattoos.lib specific fields
  story: string; // The story behind the tattoo
  tags: string[]; // Tags for discovery (flattened for Blockscout)
  artist?: string; // Tattoo artist name
  studio?: string; // Tattoo studio name
  location?: string; // Geographic location
  date?: string; // Date tattoo was created

  // Soul-bound specific
  soul_bound: boolean;
  original_owner: string; // Wallet address
  mint_date: string; // ISO date string

  // Social features
  tip_count?: number;
  view_count?: number;
  share_count?: number;
}

/**
 * Tattoo interface for frontend display
 */
export interface Tattoo {
  // On-chain data
  id: string; // Token ID
  tokenId: number;
  contractAddress: string;
  owner: string;
  ownerAddress: string;

  // Metadata (from IPFS)
  title: string;
  description: string;
  imageUrl: string;
  story: string;
  tags: TattooTag[];

  // Additional info
  artist?: string;
  studio?: string;
  location?: string;
  isSoulBound: boolean;
  mintedDate: string;

  // Social stats
  tipCount: number;
  viewCount: number;
  shareCount: number;
}

/**
 * Blockscout NFT instance response
 */
export interface BlockscoutNFTInstance {
  id: string;
  token: {
    address: string;
    name: string;
    symbol: string;
    type: string;
  };
  metadata: TattooMetadata | null;
  owner: {
    hash: string;
  };
  external_app_url: string | null;
  animation_url: string | null;
  image_url: string | null;
}

/**
 * Search filters for tag-based discovery
 */
export interface TattooSearchFilters {
  tags?: string[];
  categories?: TagCategory[];
  artist?: string;
  location?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: 'recent' | 'popular' | 'trending';
  limit?: number;
  offset?: number;
}

/**
 * Predefined popular tags across categories
 */
export const POPULAR_TAGS: Record<TagCategory, string[]> = {
  [TagCategory.Style]: [
    'Traditional',
    'Realism',
    'Watercolor',
    'Japanese',
    'Tribal',
    'Minimalist',
    'Geometric',
    'Neo-Traditional',
    'Blackwork',
    'Fine Line',
  ],
  [TagCategory.Theme]: [
    'Nature',
    'Animal',
    'Spiritual',
    'Memorial',
    'Quote',
    'Portrait',
    'Abstract',
    'Religious',
    'Mythology',
    'Pop Culture',
  ],
  [TagCategory.BodyPart]: [
    'Arm',
    'Forearm',
    'Shoulder',
    'Back',
    'Chest',
    'Leg',
    'Thigh',
    'Ankle',
    'Hand',
    'Neck',
  ],
  [TagCategory.Color]: [
    'Blackwork',
    'Colorful',
    'Grayscale',
    'Black & Grey',
    'Single Color',
    'Vibrant',
    'Pastel',
    'Neon',
  ],
  [TagCategory.Size]: [
    'Tiny',
    'Small',
    'Medium',
    'Large',
    'Full Sleeve',
    'Half Sleeve',
    'Full Back',
    'Cover Up',
  ],
  [TagCategory.Artist]: [], // Dynamic, populated from data
  [TagCategory.Meaning]: [
    'Love',
    'Family',
    'Strength',
    'Freedom',
    'Memory',
    'Protection',
    'Hope',
    'Journey',
    'Resilience',
    'Identity',
  ],
};
