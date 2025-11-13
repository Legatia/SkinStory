import { useQuery } from '@tanstack/react-query';
import type {
  Tattoo,
  TattooSearchFilters,
  BlockscoutNFTInstance,
  TattooMetadata,
  TattooTag,
  TagCategory
} from '@/types/tattoo';

const BLOCKSCOUT_API = import.meta.env.VITE_BLOCKSCOUT_API || 'https://polygon.blockscout.com/api/v2';
const NFT_CONTRACT_ADDRESS = import.meta.env.VITE_TATTOO_NFT_CONTRACT || '0x0000000000000000000000000000000000000000';

/**
 * Convert Blockscout NFT instance to Tattoo interface
 */
function blockscoutToTattoo(instance: BlockscoutNFTInstance): Tattoo | null {
  if (!instance.metadata) return null;

  const metadata = instance.metadata as TattooMetadata;

  // Extract tags from metadata attributes
  const tags: TattooTag[] = metadata.tags?.map((tag, index) => ({
    id: `${tag}-${index}`,
    label: tag,
    category: inferTagCategory(tag),
  })) || [];

  return {
    id: instance.id,
    tokenId: parseInt(instance.id),
    contractAddress: instance.token.address,
    owner: instance.owner.hash,
    ownerAddress: instance.owner.hash,
    title: metadata.name,
    description: metadata.description,
    imageUrl: metadata.image || instance.image_url || '',
    story: metadata.story || metadata.description,
    tags,
    artist: metadata.artist,
    studio: metadata.studio,
    location: metadata.location,
    isSoulBound: metadata.soul_bound,
    mintedDate: metadata.mint_date,
    tipCount: metadata.tip_count || 0,
    viewCount: metadata.view_count || 0,
    shareCount: metadata.share_count || 0,
  };
}

/**
 * Infer tag category from tag label (simple heuristic)
 */
function inferTagCategory(tag: string): TagCategory {
  const lowerTag = tag.toLowerCase();

  // Style patterns
  if (['traditional', 'realism', 'watercolor', 'japanese', 'tribal', 'minimalist', 'geometric'].some(s => lowerTag.includes(s))) {
    return TagCategory.Style;
  }

  // Body part patterns
  if (['arm', 'leg', 'back', 'chest', 'shoulder', 'hand', 'neck', 'ankle'].some(s => lowerTag.includes(s))) {
    return TagCategory.BodyPart;
  }

  // Color patterns
  if (['black', 'color', 'grey', 'gray', 'vibrant', 'pastel'].some(s => lowerTag.includes(s))) {
    return TagCategory.Color;
  }

  // Size patterns
  if (['tiny', 'small', 'medium', 'large', 'sleeve', 'full'].some(s => lowerTag.includes(s))) {
    return TagCategory.Size;
  }

  // Default to theme
  return TagCategory.Theme;
}

/**
 * Fetch all NFT instances from a contract
 */
async function fetchNFTInstances(contractAddress: string, offset = 0, limit = 50): Promise<BlockscoutNFTInstance[]> {
  const url = `${BLOCKSCOUT_API}/tokens/${contractAddress}/instances?offset=${offset}&limit=${limit}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Blockscout API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.items || [];
}

/**
 * Hook to fetch all tattoos from Blockscout
 */
export function useTattoos(filters?: TattooSearchFilters) {
  return useQuery({
    queryKey: ['tattoos', filters],
    queryFn: async () => {
      const instances = await fetchNFTInstances(
        NFT_CONTRACT_ADDRESS,
        filters?.offset || 0,
        filters?.limit || 50
      );

      let tattoos = instances
        .map(blockscoutToTattoo)
        .filter((t): t is Tattoo => t !== null);

      // Apply tag filters
      if (filters?.tags && filters.tags.length > 0) {
        tattoos = tattoos.filter(tattoo =>
          filters.tags!.some(filterTag =>
            tattoo.tags.some(tattooTag =>
              tattooTag.label.toLowerCase() === filterTag.toLowerCase()
            )
          )
        );
      }

      // Apply category filters
      if (filters?.categories && filters.categories.length > 0) {
        tattoos = tattoos.filter(tattoo =>
          tattoo.tags.some(tag => filters.categories!.includes(tag.category))
        );
      }

      // Apply artist filter
      if (filters?.artist) {
        tattoos = tattoos.filter(tattoo =>
          tattoo.artist?.toLowerCase().includes(filters.artist!.toLowerCase())
        );
      }

      // Apply location filter
      if (filters?.location) {
        tattoos = tattoos.filter(tattoo =>
          tattoo.location?.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      // Apply sorting
      if (filters?.sortBy === 'popular') {
        tattoos.sort((a, b) => b.tipCount - a.tipCount);
      } else if (filters?.sortBy === 'trending') {
        tattoos.sort((a, b) => b.viewCount - a.viewCount);
      } else {
        // Default: recent
        tattoos.sort((a, b) =>
          new Date(b.mintedDate).getTime() - new Date(a.mintedDate).getTime()
        );
      }

      return tattoos;
    },
    enabled: !!NFT_CONTRACT_ADDRESS && NFT_CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000',
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch a single tattoo by token ID
 */
export function useTattoo(tokenId: string) {
  return useQuery({
    queryKey: ['tattoo', tokenId],
    queryFn: async () => {
      const url = `${BLOCKSCOUT_API}/tokens/${NFT_CONTRACT_ADDRESS}/instances/${tokenId}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Tattoo not found: ${response.statusText}`);
      }

      const instance: BlockscoutNFTInstance = await response.json();
      return blockscoutToTattoo(instance);
    },
    enabled: !!tokenId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to fetch trending tags
 * Analyzes all tattoos and returns most used tags
 */
export function useTrendingTags(limit = 20) {
  return useQuery({
    queryKey: ['trending-tags', limit],
    queryFn: async () => {
      // Fetch all tattoos (or a large sample)
      const instances = await fetchNFTInstances(NFT_CONTRACT_ADDRESS, 0, 200);
      const tattoos = instances
        .map(blockscoutToTattoo)
        .filter((t): t is Tattoo => t !== null);

      // Count tag occurrences
      const tagCounts = new Map<string, { label: string; category: TagCategory; count: number }>();

      tattoos.forEach(tattoo => {
        tattoo.tags.forEach(tag => {
          const existing = tagCounts.get(tag.label);
          if (existing) {
            existing.count++;
          } else {
            tagCounts.set(tag.label, {
              label: tag.label,
              category: tag.category,
              count: 1,
            });
          }
        });
      });

      // Sort by count and return top N
      return Array.from(tagCounts.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, limit)
        .map((tag, index) => ({
          id: `trending-${index}`,
          ...tag,
        }));
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

/**
 * Hook to search tattoos by tags (Pinterest-style)
 */
export function useTagSearch(tags: string[]) {
  return useTattoos({
    tags,
    sortBy: 'popular',
    limit: 100,
  });
}

/**
 * Hook to get related tattoos based on shared tags
 */
export function useRelatedTattoos(currentTattoo: Tattoo, limit = 6) {
  return useQuery({
    queryKey: ['related-tattoos', currentTattoo.id, limit],
    queryFn: async () => {
      const instances = await fetchNFTInstances(NFT_CONTRACT_ADDRESS, 0, 100);
      const tattoos = instances
        .map(blockscoutToTattoo)
        .filter((t): t is Tattoo => t !== null)
        .filter(t => t.id !== currentTattoo.id); // Exclude current tattoo

      // Calculate similarity score based on shared tags
      const scoredTattoos = tattoos.map(tattoo => {
        const sharedTags = tattoo.tags.filter(tag =>
          currentTattoo.tags.some(ct => ct.label === tag.label)
        );

        return {
          tattoo,
          score: sharedTags.length,
        };
      });

      // Sort by score and return top N
      return scoredTattoos
        .filter(st => st.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(st => st.tattoo);
    },
    enabled: !!currentTattoo,
    staleTime: 1000 * 60 * 10,
  });
}
