# Bug Fixes: React Hooks & MiniKit Context Errors

## Issue
The application was crashing with the error:
```
TypeError: Cannot read properties of undefined (reading 'autoSignIn')
```

## Root Cause
The `useSignIn` hook in `hooks/use-sign-in.ts` expects a parameter object with an optional `autoSignIn` property:
```typescript
export const useSignIn = ({ autoSignIn = false }: { autoSignIn?: boolean }) => {
```

However, components were calling it without any parameters:
```typescript
const { isSignedIn, user, signIn, isLoading } = useSignIn(); // ❌ Wrong
```

## Solution
Updated all components to pass the required parameter object:
```typescript
const { isSignedIn, user, signIn, isLoading } = useSignIn({ autoSignIn: false }); // ✅ Correct
```

## Files Fixed
1. **components/Navigation.tsx** (line 10)
2. **app/profile/page.tsx** (line 11)
3. **app/upload/page.tsx** (line 11)

## Result
✅ Application now compiles and runs without errors
✅ All pages load successfully
✅ Navigation, profile, and upload features working correctly

---

## Issue 2: MiniKit Context Error

### Problem
The application was throwing an error:
```
TypeError: Cannot read properties of undefined (reading 'result')
at async eval (miniapp-context.tsx:26:22)
```

### Root Cause
The `addFrame()` function from `useAddFrame` hook returns `undefined` when running outside the MiniKit context (local development), but the code was trying to access properties on the undefined result.

### Solution
Added defensive checks in `contexts/miniapp-context.tsx`:

1. **Check if addFrame is available** before calling it
2. **Validate the result** before accessing properties
3. **Skip frame adding** in useEffect when not in MiniKit context

```typescript
const handleAddFrame = useCallback(async () => {
  try {
    // Check if addFrame is available (might not be in local dev)
    if (!addFrame) {
      console.log("[info] addFrame not available - likely running outside MiniKit context");
      return null;
    }

    const result = await addFrame();
    if (result && typeof result === 'object' && 'url' in result) {
      return result as { url: string; token: string };
    }
    return null;
  } catch (error) {
    console.error("[error] adding frame", error);
    return null;
  }
}, [addFrame]);
```

### Files Fixed
- **contexts/miniapp-context.tsx** (lines 24-41, 53)

---

## Testing
Server running at: http://localhost:3001

### All Routes Compiling Successfully:
- ✅ / (Home page)
- ✅ /discover (Feed & Grid views)
- ✅ /twins (Tattoo twin matching)
- ✅ /upload (Upload flow)
- ✅ /profile (User profile)

### Features Working:
- ✅ Navigation renders correctly
- ✅ No console errors
- ✅ All pages accessible
- ✅ MiniKit context handled gracefully in local dev
