# Copilot Instructions for Farm Report v4

## Architecture Overview

This is a React 19 + TypeScript + Vite app for managing farm expense reports with Firebase backend. The architecture follows feature-based organization with clear separation of concerns:

- **State Management**: Zustand for client state (auth), TanStack Query for server state (reports)
- **Routing**: Protected routes via [src/components/layout/ProtectedRoute.tsx](src/components/layout/ProtectedRoute.tsx) with nested layout in [src/App.tsx](src/App.tsx)
- **Forms**: React Hook Form + Zod validation throughout (see [src/features/auth/components/LoginForm.tsx](src/features/auth/components/LoginForm.tsx))
- **Firebase**: Modular v11 SDK with service abstractions in [src/lib/firebase/](src/lib/firebase/)

## Key Patterns

### Path Aliases
All imports use `@/` prefix (configured in [vite.config.ts](vite.config.ts) and [tsconfig.json](tsconfig.json)):
```typescript
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/Button';
```

### Feature-Based Organization
Features in `src/features/` contain hooks, components, and types specific to that feature. Example: `features/auth/` has auth logic, `features/reports/` has report-specific hooks.

### TanStack Query Hooks Pattern
All Firebase operations use custom hooks wrapping TanStack Query ([src/features/reports/hooks/useReports.ts](src/features/reports/hooks/useReports.ts)):
- `useReports()` - fetch user reports
- `useCreateReport()`, `useUpdateReport()`, `useDeleteReport()` - mutations with automatic cache invalidation
- Query keys follow pattern: `[REPORTS_QUERY_KEY, userId]` for scoping

### Firestore Service Layer
All Firestore operations centralized in [src/lib/firebase/firestore.ts](src/lib/firebase/firestore.ts) using the `firestoreService` object. This abstraction keeps Firebase SDK details out of components:
- Uses Firestore Timestamps for dates
- Maps documents to typed Report objects via `mapDocToReport`
- Includes real-time subscription support via `subscribeToUserReports`

### UI Component Patterns
Components in `src/components/ui/` follow this structure (see [src/components/ui/Button.tsx](src/components/ui/Button.tsx)):
- Use `cn()` utility from [src/lib/utils/cn.ts](src/lib/utils/cn.ts) for conditional Tailwind classes
- Forward refs with `React.forwardRef`
- Variant-based styling with typed props
- Inline Tailwind with `cn()` merging (not CSS modules)

### Report Data Structure
Reports ([src/types/report.ts](src/types/report.ts)) have two dynamic arrays:
- `expenses[]` - individual expense entries with description, amount, category
- `labels[]` - tracking items with name and count
- `total` field calculated via `calculateReportTotal()` in [src/lib/utils/calculations.ts](src/lib/utils/calculations.ts)

## Development Workflows

### Running the App
```bash
npm run dev        # Start dev server on port 3000
npm run build      # TypeScript check + Vite build
npm test           # Run Vitest
npm run type-check # TSC without emit
```

### Environment Setup
Firebase config uses Vite env vars (prefix `VITE_`) in `.env` file. See [src/lib/firebase/config.ts](src/lib/firebase/config.ts) for required variables.

### Auth Flow
1. [src/App.tsx](src/App.tsx) calls `authStore.initialize()` on mount
2. Auth store ([src/stores/authStore.ts](src/stores/authStore.ts)) listens to Firebase auth state via `authService.onAuthStateChanged()`
3. User persisted to localStorage via Zustand persist middleware
4. Protected routes redirect to login if no user

## Code Conventions

- **TypeScript**: Strict mode enabled, all components typed
- **Naming**: PascalCase for components, camelCase for functions/variables
- **File Organization**: Co-locate related files (hooks with features, UI components together)
- **Error Handling**: Try-catch in store actions, display errors from store state
- **Data Flow**: UI → hooks → services → Firebase (unidirectional)
- **Mutations**: Always invalidate TanStack Query cache after Firestore writes

## Common Tasks

### Adding a New Feature
1. Create directory in `src/features/[feature-name]/`
2. Add hooks, components, and types within feature directory
3. If needs server state, use TanStack Query hooks pattern
4. If needs client state, extend or create Zustand store

### Adding UI Component
1. Create in `src/components/ui/` 
2. Use `cn()` for className merging
3. Forward refs for form components
4. Support variant/size props where applicable

### Adding Firestore Collection
1. Add service methods to [src/lib/firebase/firestore.ts](src/lib/firebase/firestore.ts)
2. Create type definitions in `src/types/`
3. Create TanStack Query hooks in feature's `hooks/` directory
4. Follow naming: `use[Entity]`, `useCreate[Entity]`, etc.
