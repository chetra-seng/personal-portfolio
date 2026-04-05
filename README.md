# Personal Portfolio

A dynamic personal portfolio with a headless CMS studio to manage content — no code changes needed to update projects, skills, or experience.

## Project Structure

This project is a Turborepo monorepo with two applications:

```
.
├── apps/
│   ├── web        # Next.js portfolio website
│   └── studio     # Sanity Studio for managing content
├── packages/
│   ├── tsconfig   # Shared TypeScript config
│   └── sanity     # Shared Sanity schema definitions
├── README.md
└── turbo.json
```

## Tech Stack

- **[Turborepo](https://turbo.build/)** — monorepo build system
- **[Next.js 16](https://nextjs.org/)** — React framework with Turbopack
- **[React 19](https://react.dev/)** — UI library
- **[Sanity](https://www.sanity.io/)** — headless CMS for content management
- **[TailwindCSS v4](https://tailwindcss.com/)** — utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** — accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** — animations
- **[Resend](https://resend.com/)** — transactional email
- **[React Email](https://react.email/)** — email templates
- **[Zod](https://zod.dev/)** — schema validation
- **[Biome](https://biomejs.dev/)** — linter and formatter
- **[TypeScript](https://www.typescriptlang.org/)** — type safety

## Getting Started

### 1. Clone the repository

```bash
# HTTPS
git clone https://github.com/chetra-seng/personal-portfolio.git

# SSH
git clone git@github.com:chetra-seng/personal-portfolio.git
```

### 2. Install dependencies

```sh
pnpm install
```

### 3. Configure environment variables

- Create a [Sanity](https://www.sanity.io/) project
- Sign up for a [Resend](https://resend.com/) account
- Copy `.env.example` to `.env.local` and fill in the values

### 4. Start development servers

```sh
pnpm dev
```

| App    | URL                                        |
| ------ | ------------------------------------------ |
| Web    | [http://localhost:3000](http://localhost:3000) |
| Studio | [http://localhost:3333](http://localhost:3333) |
