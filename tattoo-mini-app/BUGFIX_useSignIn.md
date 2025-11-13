# Bug Fix: useSignIn Hook Parameter Error

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

## Testing
Server running at: http://localhost:3001
- ✅ Home page loads
- ✅ Navigation renders correctly
- ✅ Profile page accessible
- ✅ Upload page accessible
- ✅ No console errors
