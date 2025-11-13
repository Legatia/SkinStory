# 🏷️ Tag-Based Discovery System - Pinterest/RedNote Style

## Overview

Tattoos.lib now features a sophisticated tag-based discovery system, transforming it into a Pinterest/RedNote-style social platform where tattoos are the identifier and tags enable powerful content discovery.

## 🎯 System Architecture

### Tag-Based Search Flow

```
User searches by tags → Blockscout API queries NFT metadata →
Filter by tag attributes → Display matching tattoos →
Pinterest-style grid with infinite scroll
```

## 📋 Components Implemented

### 1. Type System (`src/types/tattoo.ts`)

**Tag Categories:**
- `Style` - Traditional, Realism, Watercolor, Japanese, etc.
- `Theme` - Nature, Animal, Spiritual, Memorial, etc.
- `BodyPart` - Arm, Back, Chest, Leg, etc.
- `Color` - Blackwork, Colorful, Grayscale, etc.
- `Size` - Tiny, Small, Medium, Large, Full Sleeve, etc.
- `Artist` - Artist name (dynamic)
- `Meaning` - Love, Family, Strength, Freedom, etc.

**NFT Metadata Schema (ERC-721 + OpenSea compatible):**
```typescript
interface TattooMetadata {
  name: string;
  description: string;
  image: string; // IPFS URL
  story: string; // The story behind the tattoo
  tags: string[]; // ["Traditional", "Nature", "Arm", "Colorful"]
  artist?: string;
  studio?: string;
  location?: string;
  soul_bound: boolean;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}
```

### 2. Blockscout Integration (`src/hooks/use-blockscout.ts`)

**Hooks Created:**

**`useTattoos(filters)`** - Main discovery hook
- Fetches NFTs from Blockscout API
- Filters by tags, categories, artist, location
- Sorts by recent, popular, trending
- Returns array of Tattoo objects

**`useTattoo(tokenId)`** - Single tattoo fetch
- Fetches specific NFT by token ID
- Converts Blockscout data to Tattoo interface

**`useTrendingTags(limit)`** - Trending tags analytics
- Analyzes all tattoos
- Counts tag occurrences
- Returns top N most used tags with counts

**`useTagSearch(tags)`** - Pinterest-style tag search
- Searches tattoos matching specific tags
- Optimized for discovery page

**`useRelatedTattoos(tattoo, limit)`** - Related content
- Finds tattoos with shared tags
- Similarity scoring algorithm
- Powers "You may also like" feature

### 3. Tag Input Component (`src/components/TagInput.tsx`)

**Features:**
- ✅ Keyboard navigation (Enter, Comma, Backspace)
- ✅ Popular tags picker by category
- ✅ Visual tag badges with remove buttons
- ✅ Max tags limit (default: 15)
- ✅ Tag categories in tabs
- ✅ Autocomplete suggestions

**Usage:**
```tsx
<TagInput
  tags={tags}
  onTagsChange={setTags}
  maxTags={15}
  placeholder="Add tags to help others discover..."
/>
```

### 4. Tag Search Component (`src/components/TagSearch.tsx`)

**Features:**
- ✅ Real-time search with suggestions
- ✅ Trending tags display
- ✅ Selected tags as removable badges
- ✅ "Clear all" functionality
- ✅ Enter to add custom tags

**Usage:**
```tsx
<TagSearch
  selectedTags={selectedTags}
  onTagsChange={setSelectedTags}
/>
```

### 5. Enhanced Discover Page (`src/pages/Discover.tsx`)

**New Features:**
- ✅ Tag-based filtering
- ✅ Sort by: Recent, Popular, Trending
- ✅ View modes: Grid / List
- ✅ Results count display
- ✅ Empty state handling
- ✅ Responsive design

**User Flow:**
1. User enters tags or selects from trending
2. Tattoos filter in real-time
3. Results update with count
4. Switch between grid/list views
5. Clear filters anytime

### 6. Updated Mock Data (`src/data/mockTattoos.ts`)

Added comprehensive tags to all mock tattoos:

**Example:**
```typescript
{
  id: "1",
  title: "Phoenix Rising",
  tags: [
    { label: 'Realism', category: 'style' },
    { label: 'Animal', category: 'theme' },
    { label: 'Back', category: 'body_part' },
    { label: 'Colorful', category: 'color' },
    { label: 'Large', category: 'size' },
    { label: 'Resilience', category: 'meaning' },
  ]
}
```

## 🔍 How Tag Discovery Works

### For Users (Discovering Tattoos)

**1. Browse by Trending Tags**
- See most popular tags in real-time
- Click tag to filter tattoos
- Multi-tag filtering (AND/OR logic)

**2. Search by Custom Tags**
- Type any tag in search
- See suggestions from existing tags
- Press Enter to add custom tag

**3. Filter by Categories**
- Style: "Japanese", "Watercolor"
- Theme: "Nature", "Spiritual"
- Body Part: "Arm", "Back"
- And more...

**4. Sort Results**
- **Recent**: Newest first
- **Popular**: Most tips/views
- **Trending**: Most activity

### For Creators (Uploading Tattoos)

**1. Add Tags During Upload**
```tsx
// When minting NFT
<TagInput
  tags={tags}
  onTagsChange={setTags}
/>
```

**2. Choose from Popular Tags**
- Browse tags by category
- Click to add instantly
- See which tags are trending

**3. Add Custom Tags**
- Type unique tags
- Help others discover your style
- Max 15 tags per tattoo

**4. NFT Metadata Includes Tags**
```json
{
  "name": "Phoenix Rising",
  "tags": ["Realism", "Animal", "Back", "Colorful"],
  "attributes": [
    {
      "trait_type": "Style",
      "value": "Realism"
    },
    ...
  ]
}
```

## 🎨 Pinterest/RedNote Features

### Visual Discovery
- ✅ Masonry grid layout (like Pinterest)
- ✅ Infinite scroll support (ready)
- ✅ Large, beautiful images
- ✅ Hover effects with metadata

### Social Features
- ✅ Tag-based following (ready to implement)
- ✅ Trending tags feed
- ✅ Related tattoos suggestions
- ✅ Tip counts as social proof

### Search & Discovery
- ✅ Multi-tag filtering
- ✅ Tag autocomplete
- ✅ Category browsing
- ✅ Similar content recommendations

## 📊 Blockscout API Integration

### Endpoint Structure

**Get All NFTs:**
```
GET /api/v2/tokens/{contract_address}/instances
Query params:
  - offset: 0
  - limit: 50
```

**Get Single NFT:**
```
GET /api/v2/tokens/{contract_address}/instances/{token_id}
```

### Metadata Indexing

Blockscout automatically indexes:
- ✅ NFT metadata from token URI
- ✅ All attributes in `attributes` array
- ✅ Custom fields (story, tags, etc.)
- ✅ Transfer events
- ✅ Owner information

**Search by tags:**
```typescript
const {data: tattoos} = useTattoos({
  tags: ['Japanese', 'Dragon'],
  sortBy: 'popular',
  limit: 50
});
```

## 🚀 Implementation Roadmap

### Phase 1: Foundation (✅ Complete)
- [x] Type system with tag categories
- [x] Blockscout API hooks
- [x] Tag input component
- [x] Tag search component
- [x] Enhanced discover page
- [x] Mock data with tags

### Phase 2: Smart Contracts (Next)
- [ ] Deploy ERC-721 soul-bound NFT contract
- [ ] Implement metadata URI with IPFS
- [ ] Add tag validation in contract
- [ ] Deploy to Polygon Amoy testnet
- [ ] Integrate with Blockscout

### Phase 3: Upload Flow
- [ ] Create tattoo upload page
- [ ] Image upload to IPFS (Pinata/NFT.storage)
- [ ] Metadata generation with tags
- [ ] Minting transaction flow
- [ ] Success page with share options

### Phase 4: Advanced Discovery
- [ ] Implement infinite scroll
- [ ] Add "For You" personalized feed
- [ ] Tag following feature
- [ ] Save/bookmark tattoos
- [ ] Collections/boards (like Pinterest)

### Phase 5: Social Features
- [ ] User profiles with favorite tags
- [ ] Tag-based notifications
- [ ] Trending tags analytics
- [ ] Tag challenges/contests
- [ ] Community tag curation

## 📱 Mobile Optimization

### Touch-Friendly Features
- Large touch targets (44px minimum)
- Swipeable tag pills
- Pull-to-refresh
- Bottom sheet filters (mobile)
- Haptic feedback on tag selection

### Performance
- Lazy loading images
- Virtual scrolling for large lists
- Optimized tag search debouncing
- Cached trending tags

## 🎯 Use Cases

### Scenario 1: User Wants Japanese Dragon Tattoos
1. Open Discover page
2. Click "Japanese" tag (from trending)
3. Click "Dragon" tag (or type it)
4. See all Japanese dragon tattoos
5. Sort by Popular to see best ones
6. Click tattoo to see story & tip artist

### Scenario 2: User Uploads Tattoo
1. Click "Upload Tattoo"
2. Upload image
3. Write story
4. Add tags:
   - Style: "Watercolor"
   - Theme: "Nature"
   - Body Part: "Forearm"
   - Color: "Colorful"
   - Meaning: "Freedom"
5. Mint NFT
6. Tattoo now discoverable by those 5 tags!

### Scenario 3: Browse Trending
1. Open Discover
2. See trending tags: "Minimalist (142)", "Nature (98)"
3. Click "Minimalist"
4. Discover minimal tattoo aesthetic
5. Find related tags: "Fine Line", "Black & Grey"
6. Continue exploration journey

## 🔧 Technical Details

### Tag Matching Algorithm

**Frontend (Mock Data):**
```typescript
tattoos.filter(tattoo =>
  selectedTags.some(selectedTag =>
    tattoo.tags.some(tattooTag =>
      tattooTag.label.toLowerCase() === selectedTag.toLowerCase()
    )
  )
);
```

**Production (Blockscout):**
```typescript
// Blockscout filters by metadata attributes
fetch(`${BLOCKSCOUT_API}/tokens/${contract}/instances`)
  .then(instances => instances.filter(instance =>
    instance.metadata.tags.some(tag =>
      selectedTags.includes(tag)
    )
  ))
```

### Trending Tags Calculation

```typescript
// Count all tag occurrences
const tagCounts = new Map();
tattoos.forEach(tattoo => {
  tattoo.tags.forEach(tag => {
    tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
  });
});

// Sort by count, return top N
return Array.from(tagCounts.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, limit);
```

### Related Tattoos Algorithm

```typescript
// Calculate similarity score based on shared tags
const relatedTattoos = allTattoos.map(tattoo => ({
  tattoo,
  score: tattoo.tags.filter(tag =>
    currentTattoo.tags.includes(tag)
  ).length
}))
.filter(item => item.score > 0)
.sort((a, b) => b.score - a.score)
.slice(0, 6);
```

## 📈 Analytics & Metrics

### Track These Metrics:
- Most searched tags
- Tag combination patterns
- Trending tag velocity
- Tag click-through rates
- Conversion: search → view → tip

### Dashboard Ideas:
- Top 50 trending tags (live)
- Tag network graph (related tags)
- Tag growth over time
- Geographic tag popularity
- Artist signature tags

## 🌟 Best Practices

### For Users:
1. Use specific tags for better discovery
2. Combine style + theme for precision
3. Follow trending tags you like
4. Try related tags for exploration

### For Artists:
1. Add 10-15 relevant tags
2. Mix popular & niche tags
3. Include body part for context
4. Add meaning for deeper connection
5. Use consistent artist tag

### For Platform:
1. Curate quality tags
2. Suggest popular tags to new users
3. Moderate inappropriate tags
4. Encourage tag diversity
5. Analyze tag performance

## 🔮 Future Enhancements

- **AI Tag Suggestions**: Analyze tattoo image, suggest tags
- **Tag Synonyms**: "Colour" → "Color" mapping
- **Tag Hierarchy**: "Japanese" → "Irezumi" → "Traditional"
- **Multilingual Tags**: Tags in multiple languages
- **Tag Combinations**: Save popular combos ("Japanese + Dragon")
- **Tag Challenges**: "#MinimalistMonday" events

## 🎓 How It Compares

### Pinterest
- ✅ Visual grid discovery
- ✅ Tag-based search
- ✅ Related content
- ✅ Save/organize

### RedNote (小红书)
- ✅ Tag-heavy interface
- ✅ Trending tags prominent
- ✅ Community-driven tags
- ✅ Rich media content

### Instagram
- ✅ Hashtag discovery
- ✅ Trending hashtags
- ✅ Related hashtags

### Tattoos.lib Unique:
- ✨ Soul-bound NFTs
- ✨ On-chain stories
- ✨ PYUSD tipping
- ✨ Blockscout indexing
- ✨ Polygon ultra-low fees

## ✅ Current Status

**Completed:**
- ✅ Full type system with 7 tag categories
- ✅ Blockscout API integration hooks
- ✅ Tag input component with popover picker
- ✅ Tag search component with trending tags
- ✅ Enhanced Discover page with filters
- ✅ Mock data with comprehensive tags
- ✅ Build verified and passing

**Ready For:**
- Smart contract deployment
- IPFS metadata upload
- Production Blockscout integration
- User testing

**Next Steps:**
1. Deploy NFT contract to Polygon Amoy
2. Test tag metadata on Blockscout
3. Implement upload flow with TagInput
4. Launch beta with tag discovery!

---

## 🎉 Conclusion

Tattoos.lib is now a Pinterest/RedNote-style discovery platform powered by tags! Users can:
- **Discover** tattoos by style, theme, body part, meaning
- **Search** with multiple tags
- **Explore** trending tags
- **Find** related tattoos
- **Share** their art with perfect discoverability

All powered by Blockscout's NFT metadata indexing on Polygon! 🚀
