@AGENTS.md

# CV Chatbot — Claude Code Guidelines

## Project Overview

This is an AI-powered portfolio chatbot built with Next.js, TypeScript, and Tailwind CSS. It allows recruiters to ask questions about Roberto Barahona's professional profile.

## Code Style

### Components

- Always use Arrow Function Components

```tsx
// ✅ Correct
const MyComponent = () => {
  return <div>Hello</div>
}

export default MyComponent

// ❌ Wrong
function MyComponent() {
  return <div>Hello</div>
}
```

### Reusable Components

- Always create reusable components whenever possible
- Place all reusable UI components in `src/components/ui`
- Examples: buttons, inputs, badges, bubbles, indicators, cards

### Page Components

- Split every page into smaller components
- Create a folder with the page name inside `/components` for page-specific components
- Example: for `/app/page.tsx` create `/components/home/ChatHeader.tsx`, `/components/home/ChatMessages.tsx`, etc.

## TypeScript

- Always type props explicitly using interfaces or types
- Place shared types in `/types`
- Avoid using `any`

## Environment Variables

- API Keys must always be read from environment variables, never hardcoded
