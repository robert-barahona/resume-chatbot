@AGENTS.md

# Resume Chatbot — Claude Code Guidelines

## Project Overview

This is an AI-powered portfolio chatbot built with Next.js, TypeScript, and Tailwind CSS. It allows recruiters to ask questions about Roberto Barahona's professional profile.

## Code Style

### React

- Avoid using `useEffect` whenever possible

### React Component Style

When creating or modifying React components, strictly follow these conventions:

- Exports: always use `export const`, never `export default` (unless the framework requires it, e.g. `page.tsx` in Next.js App Router).
- Component typing: type the component using React's `FC`, imported as `import type { FC } from "react"`. Example: `export const MyComponent: FC<MyComponentProps> = (...) => (...)`
- Props: always define an `interface` (not `type`) named `<ComponentName>Props`, with every property marked as `readonly`.
- Implicit return: use an arrow function with a direct return (no `return` keyword, no `{ }` block) whenever the component body is a single JSX expression.
- Props destructuring: destructure props directly in the function parameters, don't access them via `props.something`.

### Functions

- Always use arrow functions, never `function` declarations or expressions. This applies to everything: utility functions, hooks, event handlers, API route handlers, etc.

### Component Folder Structure

Always split components into the following folders under `src/components`:

- `components/ui`: base, reusable components with no business logic (Button, Input, Card, Badge, Modal).
- `components/layout`: page structure (Header, Footer, Sidebar, PageWrapper, Grid).
- `components/feature/<name>`: components specific to a domain/feature (UserProfile, CheckoutForm, ProductCard).

### Page Components

- Split every page into smaller components
- Place page-specific components in the matching `components/feature/<name>` folder
- Example: for `/app/auth.tsx` create `/components/feature/auth/LoginForm.tsx`, etc.

### Hooks Folder Structure

Always split hooks into the following folders under `src/hooks`:

- `hooks/shared`: generic, reusable hooks with no business logic (useDebounce, useLocalStorage, useMediaQuery).
- `hooks/feature/<name>`: hooks specific to a domain/feature (useChat, useCheckout, useUserProfile).

## TypeScript

- Always type props explicitly using interfaces or types
- Place shared types in `/types`
- Always use `const` over `let` whenever possible; only use `let` when a variable must be reassigned
- Avoid using `any`

## Environment Variables

- API Keys must always be read from environment variables, never hardcoded
