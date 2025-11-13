# Base Mini App Deployment Guide for Tattoos.lib

## Overview

This guide covers deploying Tattoos.lib as a **Base Mini App** for distribution through Coinbase Wallet and Farcaster.

### What are Base Mini Apps?

- **Mini Apps** are lightweight web applications that run inside Farcaster posts and Coinbase Wallet
- They evolved from "Farcaster Frames v2" (the current official name)
- Built with standard web tech (React, Next.js, HTML/CSS/JavaScript)
- Full Ethereum wallet integration without manual connection
- Instant launch from social posts - no browser redirects or downloads needed

### Mini Apps vs Traditional Frames

| Feature | Frames v1 | Mini Apps (Frames v2) |
|---------|-----------|------------------------|
| **Architecture** | Server-rendered images with meta tags | Full web app (HTML/CSS/JS) |
| **Interaction** | Backend called on every click | Client-side with session tokens |
| **Experience** | Sluggish, image-based | Fast, native app feel |
| **Wallet** | Manual connection required | Direct integration built-in |
| **Capabilities** | Basic buttons only | Any web experience possible |

---

## Prerequisites

### Accounts Required
- [ ] Base app account (for publishing)
- [ ] Vercel account (for hosting)
- [ ] WalletConnect Project ID (already have: `VITE_WALLETCONNECT_PROJECT_ID`)
- [ ] Farcaster account (for distribution)

### Current Project Status
✅ React + TypeScript + Vite app
✅ wagmi + viem + RainbowKit integration
✅ Base blockchain configuration (mainnet + testnet)
✅ PYUSD tipping functionality
❌ Mini App SDK integration (needed)
❌ MiniKit configuration (needed)

---

## Deployment Strategy: Two Options

### Option 1: Quick Deploy with Existing Stack (Recommended)

**Keep your current React + Vite setup and add MiniKit wrapper**

**Pros:**
- Minimal refactoring needed
- Reuse all existing components
- Faster deployment

**Cons:**
- Not "officially recommended" stack (Base prefers Next.js)
- May need extra configuration for Vercel

**Steps:**
1. Add MiniKit SDK: `npm install @coinbase/minikit-sdk`
2. Create `minikit.config.ts` with manifest metadata
3. Wrap app with MiniKitProvider
4. Deploy to Vercel
5. Generate account association credentials
6. Publish to Base app

### Option 2: Migrate to Next.js Template (Official)

**Use `create-onchain --mini` starter template**

**Pros:**
- Official, battle-tested stack
- Better SSR/SEO support
- More examples and documentation

**Cons:**
- Requires migration from Vite to Next.js
- More time investment
- Need to port all components

**Steps:**
1. Run `npx create-onchain --mini`
2. Port components from `/src/pages` to Next.js `/app` directory
3. Migrate routing to Next.js app router
4. Update imports and build config
5. Deploy and configure

---

## Recommended Approach: Option 1 (Quick Deploy)

### Phase 1: Add MiniKit to Existing App

#### Step 1: Install Dependencies

```bash
cd frontend
npm install @coinbase/minikit-sdk
```

#### Step 2: Create `minikit.config.ts`

```typescript
// frontend/minikit.config.ts
import { defineConfig } from '@coinbase/minikit-sdk';

export default defineConfig({
  manifest: {
    version: '1.0.0',
    name: 'Tattoos.lib',
    subtitle: 'Tattoo Art NFTs on Base',
    description: 'Discover and tip tattoo artists. Mint your tattoos as soul-bound NFTs on Base blockchain.',

    // Visual Assets (need to create these)
    iconUrl: 'https://your-domain.vercel.app/icon-512.png',
    screenshotUrls: [
      'https://your-domain.vercel.app/screenshots/discover.png',
      'https://your-domain.vercel.app/screenshots/detail.png',
      'https://your-domain.vercel.app/screenshots/tip.png',
    ],
    splashImageUrl: 'https://your-domain.vercel.app/splash.png',
    heroImageUrl: 'https://your-domain.vercel.app/hero.png',

    // URLs
    homeUrl: 'https://your-domain.vercel.app',
    webhookUrl: 'https://your-domain.vercel.app/api/webhook', // Optional

    // Categorization
    primaryCategory: 'ART_AND_COLLECTIBLES',
    tags: ['nft', 'art', 'tattoo', 'social', 'tipping', 'pyusd'],
    tagline: 'Immortalize your ink on-chain',

    // Branding
    splashBackgroundColor: '#0052FF', // Base blue

    // Open Graph (for social sharing)
    ogTitle: 'Tattoos.lib - NFT Tattoo Gallery',
    ogDescription: 'Discover amazing tattoo art, read stories, and tip artists with PYUSD',
    ogImageUrl: 'https://your-domain.vercel.app/og-image.png',
  },

  accountAssociation: {
    // Will be populated after account association generation
    header: '',
    payload: '',
    signature: '',
  },
});
```

#### Step 3: Update App.tsx with MiniKit Provider

```typescript
// frontend/src/App.tsx
import { MiniKitProvider } from '@coinbase/minikit-sdk';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { config } from './config/wagmi';
import miniKitConfig from '../minikit.config';

// Pages
import Landing from './pages/Landing';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import TattooDetail from './pages/TattooDetail';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

const queryClient = new QueryClient();

function App() {
  return (
    <MiniKitProvider config={miniKitConfig}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <TooltipProvider>
              <Router>
                <div className="min-h-screen bg-background">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/tattoo/:id" element={<TattooDetail />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <Toaster />
                <Sonner />
              </Router>
            </TooltipProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </MiniKitProvider>
  );
}

export default App;
```

#### Step 4: Add Mini App Detection Hook

```typescript
// frontend/src/hooks/use-minikit.ts
import { useEffect, useState } from 'react';

export function useMiniKit() {
  const [isMiniApp, setIsMiniApp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if running inside Farcaster/Base app
    const checkMiniApp = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isFarcaster = userAgent.includes('farcaster');
      const isBaseApp = userAgent.includes('base');
      const isFrame = window.parent !== window; // Running in iframe

      setIsMiniApp(isFarcaster || isBaseApp || isFrame);
      setIsLoading(false);
    };

    checkMiniApp();
  }, []);

  return { isMiniApp, isLoading };
}
```

#### Step 5: Optimize Landing Page for Mini App

```typescript
// frontend/src/pages/Landing.tsx
import { useMiniKit } from '@/hooks/use-minikit';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Landing() {
  const { isMiniApp } = useMiniKit();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to Discover page when opened in Mini App
    if (isMiniApp) {
      navigate('/discover');
    }
  }, [isMiniApp, navigate]);

  // Rest of Landing component...
}
```

---

### Phase 2: Prepare Visual Assets

#### Required Images

Create these in `frontend/public/`:

1. **icon-512.png** (512x512px)
   - App icon, circular crop safe
   - High contrast, recognizable at small sizes

2. **splash.png** (1200x1600px)
   - Shown while app loads
   - Can include logo + tagline

3. **hero.png** (1200x630px)
   - Hero image for app store listing
   - Showcase best tattoos

4. **og-image.png** (1200x630px)
   - Open Graph image for social sharing
   - Text overlay safe zones

5. **screenshots/** (750x1334px each)
   - `discover.png` - Tag search interface
   - `detail.png` - Tattoo detail with story
   - `tip.png` - Tipping flow

**Design Tips:**
- Use Base brand colors (blue: #0052FF)
- Maintain consistent branding
- Show actual app UI in screenshots
- Optimize file sizes (<200KB each)

---

### Phase 3: Deploy to Vercel

#### Step 1: Prepare Build Configuration

```bash
# Update package.json build script if needed
npm run build

# Test production build locally
npm run preview
```

#### Step 2: Deploy to Vercel

**Option A: GitHub Integration (Recommended)**
1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure build settings:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables:
   ```
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id
   VITE_CHAIN_ID=8453
   VITE_BLOCKSCOUT_API=https://base.blockscout.com/api/v2
   ```
5. Deploy

**Option B: Vercel CLI**
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

#### Step 3: Disable Deployment Protection

**Important:** For account association to work:
1. Go to Vercel Dashboard → Project Settings
2. Navigate to "Deployment Protection"
3. Toggle OFF (required for Base to verify your domain)
4. Can re-enable after setup is complete

---

### Phase 4: Generate Account Association

Account association proves you own the domain hosting the mini app.

#### Step 1: Get Your Domain

After Vercel deployment, you'll have a URL like:
```
https://tattoos-lib.vercel.app
```

#### Step 2: Generate Credentials

1. Visit **Base Build's Account Association Tool**:
   - URL: `https://base.dev/preview` (or similar, check Base docs)

2. Submit your Vercel domain

3. Click "Verify" button

4. Follow instructions to prove domain ownership

5. Copy the resulting `accountAssociation` object:
   ```json
   {
     "header": "eyJhbGc...",
     "payload": "eyJkb21...",
     "signature": "0x123..."
   }
   ```

#### Step 3: Update minikit.config.ts

```typescript
// frontend/minikit.config.ts
export default defineConfig({
  manifest: {
    // ... existing manifest config
  },

  accountAssociation: {
    header: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9...',
    payload: 'eyJkb21haW4iOiJ0YXR0b29zLWxpYi52ZXJjZWwuYXBwIiwi...',
    signature: '0x1234567890abcdef...',
  },
});
```

#### Step 4: Redeploy

```bash
git add minikit.config.ts
git commit -m "Add account association credentials"
git push origin main
```

Vercel will auto-deploy the update.

---

### Phase 5: Validate & Publish

#### Step 1: Test Your Mini App

Visit: `https://base.dev/preview`

Enter your mini app URL and check:
- ✅ Embed displays correctly
- ✅ Launch functionality works
- ✅ Account association verified
- ✅ Manifest metadata complete
- ✅ Images load properly
- ✅ Wallet connection works

#### Step 2: Publish to Base App

1. Open Base app (mobile or web)
2. Create a new post/cast
3. Include your mini app URL:
   ```
   Check out Tattoos.lib - discover amazing tattoo art and tip artists!

   https://tattoos-lib.vercel.app
   ```
4. Post will automatically create an embed/card
5. Users can launch your mini app directly from the post

#### Step 3: Distribute on Farcaster

1. Open Warpcast or other Farcaster client
2. Create a cast with your URL
3. Add relevant hashtags: `#nft #tattoo #base #pyusd`
4. Tag relevant accounts: `@base @coinbasewallet`

---

## Farcaster Frame Integration

### What Are Farcaster Frames?

Farcaster Frames are the social sharing cards that appear in Farcaster feeds. While **Mini Apps** (Frames v2) are full web applications, you can also create simpler **Frame embeds** (v1) for viral sharing.

### Frame Metadata for Sharing

Add these meta tags to `frontend/index.html`:

```html
<!-- Farcaster Frame metadata -->
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="https://tattoos-lib.vercel.app/og-image.png" />
<meta property="fc:frame:button:1" content="Discover Tattoos" />
<meta property="fc:frame:button:1:action" content="link" />
<meta property="fc:frame:button:1:target" content="https://tattoos-lib.vercel.app/discover" />
<meta property="fc:frame:button:2" content="View Profile" />
<meta property="fc:frame:button:2:action" content="link" />
<meta property="fc:frame:button:2:target" content="https://tattoos-lib.vercel.app/profile" />
```

### Frame for Individual Tattoos

For dynamic frames per tattoo, you'll need server-side rendering. Consider:

**Option A: Add API route to serve dynamic meta tags**
```typescript
// Create simple Express/Node endpoint
GET /api/frame/:tattooId
// Returns HTML with dynamic frame metadata
```

**Option B: Use a Frame builder service**
- Neynar Frame Builder
- Frog Framework (by Paradigm)
- SimpleFi Frames

---

## Distribution Strategy

### 1. Base App Launch

**Week 1: Soft Launch**
- Post in Base app with mini app link
- Share in Base Discord/Telegram
- Tag Base team: `@jessepollak @base`

**Week 2: Feature Push**
- Create dedicated landing post with screenshots
- Share success stories (early users)
- Highlight unique features (soul-bound NFTs, PYUSD tips)

### 2. Farcaster Distribution

**Channels:**
- `/base` channel
- `/nfts` channel
- `/art` channel
- `/tattoos` channel (if exists)

**Content Ideas:**
- "Show us your favorite tattoo" engagement posts
- Weekly featured artist highlights
- "Tip Tuesday" campaign
- Artist AMA sessions

### 3. Cross-Promotion

**Coinbase Wallet**
- Mini apps built on Base/Farcaster auto-distribute to Coinbase Wallet
- No additional work needed
- Appears in "Discover" section

**Social Media**
- Twitter/X: Tag `@base`, `@coinbase`, `@farcaster`
- Use hashtags: `#BuildOnBase`, `#Onchain`, `#NFT`

---

## Optimization Tips

### Performance

**Code Splitting:**
```typescript
// Use React.lazy() for route-based splitting
const Discover = lazy(() => import('./pages/Discover'));
const TattooDetail = lazy(() => import('./pages/TattooDetail'));

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/discover" element={<Discover />} />
    {/* ... */}
  </Routes>
</Suspense>
```

**Image Optimization:**
- Use WebP format with PNG fallback
- Implement lazy loading: `loading="lazy"`
- Compress images (<100KB target)
- Consider CDN (Cloudflare, Imgix)

**Bundle Size:**
```bash
# Analyze bundle
npm install -D vite-bundle-visualizer
# Add to vite.config.ts
import { visualizer } from 'vite-bundle-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
});
```

### Mobile Experience

**Responsive Design:**
- Test on iPhone (Safari) and Android (Chrome)
- Ensure tap targets are 44px minimum
- Use mobile-first CSS approach

**Touch Interactions:**
```css
/* Improve touch responsiveness */
* {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
```

### Analytics

**Track Key Metrics:**
- Mini app opens (vs web visits)
- Wallet connection rate
- Tip conversion rate
- Most popular tattoos/tags
- User retention (return visits)

**Implementation:**
```typescript
// Add to App.tsx
import { useMiniKit } from '@/hooks/use-minikit';
import { useEffect } from 'react';

function App() {
  const { isMiniApp } = useMiniKit();

  useEffect(() => {
    // Track source
    if (isMiniApp) {
      // @ts-ignore
      window.gtag?.('event', 'mini_app_open');
    }
  }, [isMiniApp]);
}
```

---

## Testing Checklist

Before publishing:

### Functionality
- [ ] All pages load without errors
- [ ] Wallet connection works (MetaMask, Coinbase Wallet)
- [ ] PYUSD balance displays correctly
- [ ] Tipping transactions succeed
- [ ] PayPal on-ramp modal opens
- [ ] Tag search filters properly
- [ ] Tattoo detail pages render
- [ ] Images load on all pages
- [ ] Mobile responsive on iPhone and Android

### Mini App Specific
- [ ] Launches from Farcaster post
- [ ] Launches from Base app
- [ ] Account association verified
- [ ] Manifest metadata complete
- [ ] Icons and splash screen display
- [ ] Deep links work (e.g., `/tattoo/1`)
- [ ] Wallet connection persists across navigation
- [ ] Back button behaves correctly

### Performance
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Images optimized (<100KB each)

---

## Troubleshooting

### Issue: Account Association Fails

**Solution:**
1. Verify deployment protection is OFF
2. Ensure domain is accessible publicly
3. Check HTTPS is enabled (required)
4. Try regenerating credentials
5. Confirm no typos in `minikit.config.ts`

### Issue: Mini App Doesn't Launch

**Solution:**
1. Validate manifest at `base.dev/preview`
2. Check all URLs are absolute (not relative)
3. Ensure `homeUrl` points to deployed site
4. Verify images are publicly accessible
5. Test in different Farcaster clients (Warpcast, Base app)

### Issue: Wallet Connection Fails in Mini App

**Solution:**
1. Check WalletConnect Project ID is set
2. Verify Base chain is configured in wagmi config
3. Test with different wallet (MetaMask, Coinbase Wallet)
4. Check browser console for errors
5. Ensure RainbowKit is properly initialized

### Issue: Slow Load Times

**Solution:**
1. Enable code splitting with React.lazy()
2. Compress images (use WebP)
3. Remove unused dependencies
4. Enable Vercel Edge caching
5. Use React.memo() for expensive components

---

## Next Steps After Launch

### Phase 1: Post-Launch (Week 1-2)
- Monitor analytics and user feedback
- Fix critical bugs
- Improve load performance
- Add user onboarding flow

### Phase 2: Feature Expansion (Week 3-4)
- Deploy smart contracts to Base mainnet
- Implement IPFS upload
- Enable real NFT minting
- Add transaction history

### Phase 3: Growth (Month 2+)
- Artist outreach program
- Community challenges
- Integration with Basepaint/Zora
- Farcaster channel creation

---

## Resources

### Official Documentation
- [Base Mini Apps Docs](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
- [MiniKit Documentation](https://docs.base.org/builderkits/minikit/overview)
- [OnchainKit](https://www.base.org/build/onchainkit)
- [Farcaster Mini App SDK](https://miniapps.farcaster.xyz/)
- [Farcaster Frames Spec](https://docs.farcaster.xyz/learn/what-is-farcaster/frames)

### Tools
- [Base Preview Tool](https://base.dev/preview)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [WalletConnect Cloud](https://cloud.walletconnect.com)
- [Neynar Frame Builder](https://docs.neynar.com/)

### Community
- [Base Discord](https://discord.gg/buildonbase)
- [Farcaster Dev Group](https://warpcast.com/~/channel/dev)
- [/base Farcaster Channel](https://warpcast.com/~/channel/base)

### Templates & Examples
- [Base MiniKit Starter](https://github.com/builders-garden/base-minikit-starter)
- [OnchainKit Templates](https://github.com/coinbase/onchainkit)
- [Farcaster Mini Apps Examples](https://miniapps.farcaster.xyz/)

---

## Estimated Timeline

| Phase | Duration | Tasks |
|-------|----------|-------|
| **Setup** | 2-3 hours | Install MiniKit, create config, add provider |
| **Assets** | 3-4 hours | Design icons, screenshots, OG images |
| **Deploy** | 1 hour | Vercel setup, environment config |
| **Association** | 30 min | Generate credentials, redeploy |
| **Testing** | 2-3 hours | Cross-device testing, bug fixes |
| **Launch** | 1 hour | Publish posts, social promotion |
| **Total** | ~10-12 hours | From start to public launch |

---

## Success Metrics

Track these KPIs after launch:

- **Week 1:** 100+ mini app opens
- **Week 2:** 50+ wallet connections
- **Week 4:** 20+ tips sent
- **Month 1:** 10+ tattoos minted (once contracts deployed)
- **Month 2:** 500+ DAU, featured in Base ecosystem roundup

---

## Conclusion

Deploying Tattoos.lib as a Base Mini App will:
✅ Reach millions of Coinbase Wallet users
✅ Tap into Farcaster's engaged crypto-native community
✅ Enable viral social discovery
✅ Simplify onboarding (no wallet setup friction)
✅ Position as a flagship Base NFT app

The architecture is ready - just add MiniKit wrapper, deploy to Vercel, and launch! 🚀
