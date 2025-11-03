# Next.js + next-intl Typing Showcase (AI-Generated)

**Important:** This repository is an AI-generated showcase to demonstrate typing improvements for the `next-intl` library. While the project setup was generated from a prompt, the actual code for the custom TypeScript types and wrappers is hand-crafted.

This project demonstrates a custom wrapper for `next-intl` that provides enhanced type safety for the `raw()` method and enables type-safe dynamic translation keys.

## Key Features

- **Type-Safe `raw()` Method**: The custom wrapper provides full TypeScript autocomplete and type inference for the `raw()` method, allowing you to get fully typed objects instead of just strings.
- **Dynamic Keys with Type Safety**: Using a custom `ChildKeySegments<T>` type, the project ensures that only valid child keys of a translation object can be passed as props, preventing runtime errors.
- **Nested Object Access**: The typing system correctly infers types for deeply nested translation objects at any level.
- **Server and Client Components**: The same enhanced API is used for both `getTranslations` (server) and `useTranslations` (client).

## Relevant Files

The core logic for the typing improvements is contained in the `src/i18n` directory.

- **`src/i18n/types.ts`**: This is the heart of the solution. It defines the custom TypeScript types that enhance `next-intl`'s default types. It includes `BrandedTranslator`, `NestedKeys`, `NestedValue`, and other helpers to create the type-safe structure.

- **`src/i18n/createTypedTranslator.ts`**: This file contains the utility function that takes an original `next-intl` translator and "brands" it with our enhanced types, adding the strongly-typed `raw()` method.

- **`src/i18n/api.client.ts`**: This file wraps the `useTranslations` hook from `next-intl` to return our custom branded translator for use in Client Components.

- **`src/i18n/api.server.ts`**: Similarly, this file wraps the `getTranslations` function to provide the same type-safe translator for use in Server Components.

- **`src/messages/en.json` & `src/messages/de.json`**: These are the JSON files containing the English and German translations. The structure of these files is what the TypeScript types are based on.

## Demonstration

You can see the implementation in action in the following components:

- **`src/components/MagicianProfile.tsx`**: A Client Component that uses the custom `useTranslations` hook. You can see how `t.raw('user.profile')` returns a fully typed object and how the `TestimonialCard` component accepts a type-safe `itemKey`.

- **`src/app/[locale]/page.tsx`**: A Server Component that uses the custom `getTranslations` function to fetch typed translation objects on the server.

### Testing the Type Safety

To see the type safety in your IDE, you can try the following:

In `src/components/MagicianProfile.tsx`:

```typescript
const t = useTranslations('portfolio');

// ✅ Valid - Autocomplete will show 'user.profile', 'title', etc.
const profile = t.raw('user.profile');
// profile will be correctly typed as { heading: string, bio: string, ... }

// ❌ Invalid - TypeScript will show an error
const invalid = t.raw('user.nonexistent');

// In the TestimonialCard component:
// ✅ Valid
<TestimonialCard itemKey="john" />

// ❌ Invalid - TypeScript will show an error
<TestimonialCard itemKey="invalid" />
```

## Running the Project

To get started, install the dependencies and run the development server:

```bash
npm install
npm run dev
```

Navigate to `/en` for the English version or `/de` for the German version.
