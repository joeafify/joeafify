# AI Agent Guide: Personal Portfolio + Payload CMS

## Project Overview

This is a **bilingual portfolio website** built with **Next.js 16 + Payload CMS v3 + PostgreSQL**, showcasing a developer's work, career journey, and tech stack. Key features:

- **Bilingual Support**: English (default) and Arabic (RTL) with locale detection via cookies, headers, and Accept-Language
- **Headless CMS**: Payload CMS provides admin panel (`/admin`) and content management
- **Hybrid Rendering**: Server Components by default, client components only for interactivity
- **Localized Content**: Single collection model with locale-aware queries (not separate collections per language)

## Quick Start Commands

```bash
# Development
npm run dev                    # Start dev server (http://localhost:3000)

# CMS Management
npm run payload              # Payload CLI access
npm run generate:types       # Auto-generate TypeScript types from Payload schema
npm run migrate              # Run pending database migrations
npm run migrate:create       # Create new migration

# Build & Deploy
npm run build                # Production build
npm run start                # Start production server
npm run ci                   # CI/CD: run migrations + build

# Code Quality
npm run lint                 # ESLint check
npm run format               # Auto-format with Prettier
```

## Architecture Patterns

### Frontend Structure

```
src/app/
├── [lang]/                          # Dynamic locale segment (en, ar)
│   └── (frontend)/
│       ├── (main)/                  # Homepage
│       ├── journey/                 # Career timeline page
│       └── projects/
│           ├── page.tsx             # Grid listing
│           └── [id]/page.tsx        # Project detail page
├── (payload)/admin/[[...segments]]  # CMS admin panel (auto-mounted by Payload)
└── api/
    ├── graphql/                     # GraphQL endpoint
    ├── graphql-playground/          # GraphQL UI
    └── [...]                        # Payload REST API
```

### Data Fetching Pattern (Server-First)

**Prefer Server Components + Server Actions** over API routes:

```typescript
// ✅ DO: Use Server Actions
'use server';
export async function getProjects({ locale, page = 1 }: { locale: Locale; page?: number }) {
  const payload = await getPayload({ config });
  const { docs, hasNextPage } = await payload.find({
    collection: 'projects',
    locale: locale as Locale,
    limit: 6,
    page,
    depth: 1, // Fetch relationships
  });
  return { projects: docs, hasNextPage };
}

// ✅ DO: Use in Server Components
export default async function ProjectsPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const { projects } = await getProjects({ locale: lang });
  return <ProjectsList projects={projects} />;
}

// ❌ DON'T: Use API routes (unless for webhooks or third-party integrations)
// API routes are only for Payload CMS and external services
```

### Server vs Client Components

```typescript
// ✅ Default: Async Server Components (data fetching, database access)
export default async function Page({ params }: Props) {
  const dict = await getDictionary(lang);  // Server-only
  const payload = await getPayload({ config });
  const data = await payload.find({ collection: 'projects', locale: lang });

  return <Component dict={dict} data={data} />;
}

// ✅ Client Components: Only for interactivity
'use client';
export function ConfigurationSwitcher({ currentLocale }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  // Handle clicks, form submissions, etc.
}

// ✅ Pass serializable data from Server → Client
// ❌ DON'T pass Payload objects directly; serialize/extract needed fields
```

## i18n (Internationalization) Patterns

### Locale Detection & Routing

```typescript
// src/proxy.ts handles detection priority:
// 1. Cookie: NEXT_LOCALE (user preference)
// 2. Accept-Language header (browser default)
// 3. Default: 'en'

// Route structure: /:lang/... → /en/projects, /ar/projects
// Use getRedirectedPathName() to translate paths on locale switch
```

### Dictionary Usage (JSON-based)

```typescript
// ✅ Server-side dictionary loading
const dict = await getDictionary(lang); // Dynamic import
<h1>{dict.home.title_part1}</h1>

// ✅ Dictionary structure: Always use i18n keys, never hardcode text
// File: src/dictionaries/en.json
{
  "nav": { "home": "Home", "journey": "My Journey", "projects": "Projects" },
  "home": { "title_part1": "I build", "title_gradient": "digital experiences" },
  "contact": { "form": { "email": "Your email", "message": "Your message" } }
}

// ✅ For Arabic numerals, use utility function
import { formatYear } from '@/utils/i18n';
formatYear(2024, 'ar');  // "٢٠٢٤" (Arabic numerals)
formatYear(2024, 'en');  // "2024" (Latin numerals)
```

### Locale-Aware Components

```typescript
// ✅ Always accept locale as prop
interface PageProps {
  params: Promise<{ lang: string }>;
}

// ✅ Convert params to locale early
export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  // Pass locale to all data fetching and child components
}

// ✅ Pass dictionaries to Client Components via props
<ClientComponent dict={dict} locale={locale} />
```

## Styling & Design System

### Tailwind + Custom Tokens

```typescript
// Use predefined custom classes (defined in tailwind config):
className = "text-primary"; // Brand color (accent)
className = "text-ocean-light"; // Secondary accent
className = "text-gradient"; // Gradient text effect
className = "glass"; // Glass morphism (blur + transparency)
className = "glow-hover"; // Glow effect on hover

// Dark mode: Class-based (not system preference)
className = "dark:text-white"; // Only applies when dark class on <html>
className = "dark:bg-black";

// Grid & Spacing: Tailwind standard
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
className = "px-6 py-4";
```

### Icons & Animations

```typescript
// ✅ Use lucide-react for all icons
import { Home, Send, User, Grid2X2, ChevronDown } from "lucide-react";
<Home size={24} className="text-primary" />

// ✅ Use motion/react-client for animations
import * as motion from "motion/react-client";
<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ amount: 0.3 }}
>
  {children}
</motion.section>
```

### Image Optimization

```typescript
// ✅ Use Next.js Image with priority or loading optimization
import Image from 'next/image';
<Image
  src={imageUrl}
  alt={altText}
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={blurredBase64}
  className="rounded-lg"
/>

// ✅ Generate blur placeholders server-side
import { plaiceholder } from 'plaiceholder';
const { base64 } = await plaiceholder(imageUrl);
// Pass base64 to client for smooth image loading
```

## Database & Payload CMS

### Collection Structure (PostgreSQL)

**Projects**: Portfolio items with localized content

```typescript
{
  // Localized fields (queried per locale)
  title: string,                    // 'en' or 'ar'
  description: string,
  challenge: RichText,              // Lexical JSON
  solution: RichText,

  // Base fields
  image: Relationship<Media>,       // Upload relationship
  livePreview: URL,
  sourceCode: URL,
  type: 'poc' | 'mvp' | 'prototype' | 'production' | 'beta',
  highlights: Array<{ title, description }>,  // Max 2
  features: Array<{ title, description }>,    // Max 4
  gallery: Array<Relationship<Media>>,

  // Relationships
  techStack: Relationship<TechStack>[],
  categories: Relationship<Categories>[],
}
```

**JourneyItems**: Career timeline entries

```typescript
{
  // Localized
  jobTitle: string,
  employer: string,
  responsibilities: string,

  // Base
  isCurrent: boolean,
  startMonth: 'Jan' | 'Feb' | ... | 'Dec',
  startYear: string,
  endMonth?: string,
  endYear?: string,
  techStack: Relationship<TechStack>[],
  categories: Relationship<Categories>[],
}
```

**TechStack**: Reusable technology tags (no localization)

```typescript
{ name: 'React', id: '...' }
{ name: 'TypeScript', id: '...' }
```

### Payload Queries Pattern

```typescript
// ✅ Find multiple documents
const { docs, hasNextPage, totalDocs, totalPages } = await payload.find({
  collection: "projects",
  locale: "en" as const, // Type-safe locale
  limit: 6,
  page: 1,
  depth: 1, // Populate relationships
  where: {
    // Optional filtering
    type: { equals: "production" },
  },
});

// ✅ Find single document by ID or slug
const project = await payload.findByID({
  collection: "projects",
  id: projectId,
  locale: "en" as const,
  depth: 2, // Deep populate
});

// ✅ Always specify locale to get correct localized content
// ❌ DON'T: Omit locale - results will be inconsistent
```

### Migrations

```bash
# Create new migration after schema changes
npm run migrate:create -- --name add_new_field

# Check pending migrations
npm run migrate:status

# Run all pending migrations
npm run migrate

# Rollback last migration
npm run migrate:down

# Fresh start (DESTRUCTIVE - use only in dev)
npm run migrate:fresh
```

## Component Naming & Organization

```typescript
// ✅ File structure
src/components/
├── Footer.tsx              // Single exported component per file
├── MainNavbar.tsx
├── ConfigurationSwitcher.tsx
└── TimelineListItem.tsx    // List item variants stay in their domain

// ✅ Naming convention
export interface NavbarProps {
  dict: Dictionary;
  locale: Locale;
  className?: string;
}

export default function MainNavbar({ dict, locale }: NavbarProps) {
  // Component implementation
}

// ✅ Hooks naming
export function useActiveSection(sectionIds: string[]): string | null {
  // Return active section ID
}

// ✅ Server Actions naming (verb-based)
export async function getProjects({ locale }: { locale: Locale }) { }
export async function getProjectBySlug({ slug, locale }: Props) { }
```

## TypeScript & Type Safety

```typescript
// ✅ Use generated types from Payload
import type { ProjectsSelect } from "@/payload-types";

// ✅ Define custom types with 'as const' for locales
type Locale = "en" | "ar";
export const locales = ["en", "ar"] as const;

// ✅ Promise-based params in Next.js 16+
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  // ...
}

// ✅ Type server action params
("use server");
export async function getProjects({
  locale,
  page = 1,
}: {
  locale: Locale;
  page?: number;
}): Promise<{ projects: ProjectsSelect[]; hasNextPage: boolean }> {
  // ...
}
```

## Common Patterns to Follow

### Locale Switching with Persistence

```typescript
"use client";
export function ConfigurationSwitcher({ currentLocale }: Props) {
  const pathname = usePathname();

  function switchLocale(newLocale: Locale) {
    // 1. Update cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;

    // 2. Translate current path to new locale
    const newPath = getRedirectedPathName(pathname, newLocale);

    // 3. Navigate
    window.history.replaceState(null, "", newPath);
  }
}
```

### Pagination in Lists

```typescript
// Use server action with 'page' parameter
export async function getProjects({
  locale,
  page = 1
}: { locale: Locale; page?: number }) {
  const { docs, hasNextPage, totalPages } = await payload.find({
    collection: 'projects',
    locale,
    page,
    limit: 6,
  });
  return { projects: docs, hasNextPage, totalPages };
}

// Client component calls it repeatedly
<ProjectsList onLoadMore={() => getProjects({ locale, page: page + 1 })} />
```

### Responsive Media Queries

```typescript
// Use custom hook for media queries
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function Component() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
```

## Environment Variables (Required for Development)

```env
# Database (PostgreSQL on Netlify)
NETLIFY_DATABASE_URL=postgresql://user:pass@host/db

# File Storage (Uploadthing)
UPLOADTHING_TOKEN=sk_live_...
UPLOADTHING_SECRET=sk_live_...

# Payload CMS
PAYLOAD_SECRET=your-secure-random-key

# App
SITE_URL=https://example.com
NODE_ENV=development
```

## Important Caveats & Pitfalls

### ❌ Common Mistakes

1. **Hardcoding text instead of using i18n keys**
   - ❌ `<h1>My Projects</h1>`
   - ✅ `<h1>{dict.nav.projects}</h1>`

2. **Fetching data in Client Components**
   - ❌ `'use client'; useEffect(() => fetch(...), [])`
   - ✅ Use Server Actions or fetch in Server Components

3. **Omitting locale in Payload queries**
   - ❌ `await payload.find({ collection: 'projects' })`
   - ✅ `await payload.find({ collection: 'projects', locale: 'en' })`

4. **Using custom colors instead of design tokens**
   - ❌ `className="text-[#FF6B6B]"`
   - ✅ `className="text-primary"` or `className="text-ocean-light"`

5. **Not awaiting async params in Page components**
   - ❌ `function Page({ params }: { params: { lang: string } })`
   - ✅ `function Page({ params }: { params: Promise<{ lang: string }> })`

6. **Forgetting to pass locale to child components**
   - ❌ `<ChildComponent dict={dict} />` (no locale)
   - ✅ `<ChildComponent dict={dict} locale={locale} />`

7. **Using relative imports instead of path aliases**
   - ❌ `import { Component } from '../../../../components/Component'`
   - ✅ `import { Component } from '@/components/Component'`

### 🔧 Setup Gotchas

- **Migrations**: Always run `npm run migrate` before starting dev server after pulling code
- **Type Generation**: After Payload schema changes, run `npm run generate:types` to update TypeScript types
- **Database**: Payload CMS creates its own tables (`payload_*`) - don't modify directly
- **Dark Mode**: Requires `dark` class on `<html>` element - not system preference based
- **RTL Layout**: Arabic layout automatically handled by `dir="rtl"` attribute, but test flex/grid layouts

## File Structure Quick Reference

| Path                         | Purpose                             |
| ---------------------------- | ----------------------------------- |
| `src/app/[lang]/(frontend)/` | Public website routes               |
| `src/app/(payload)/admin/`   | CMS admin panel                     |
| `src/collections/`           | Payload CMS collection definitions  |
| `src/components/`            | Reusable React components           |
| `src/dictionaries/`          | i18n JSON files (en.json, ar.json)  |
| `src/hooks/`                 | Custom React hooks                  |
| `src/utils/`                 | Utility functions (i18n, env, etc.) |
| `src/migrations/`            | Database migration SQL files        |
| `payload.config.ts`          | Payload CMS configuration           |
| `next.config.ts`             | Next.js build configuration         |

## Getting Help

- **Type Errors**: Run `npm run generate:types` if payload-types.ts is stale
- **Build Failures**: Check migration status with `npm run migrate:status`
- **Data Not Appearing**: Verify locale parameter in Payload query
- **Styling Issues**: Check that custom Tailwind classes are defined in config
- **i18n Issues**: Ensure dictionary keys exist in both en.json and ar.json
