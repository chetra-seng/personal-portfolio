# Personal Portfolio
My own personal portfolio project included a studio to add and update content for the website dynamically.
## Introduction
A personal portfolio shouldn't always be static. Your skills and project achievements will keep increasing as time went by. Therefore, the portfolio should be up to date with your current skills and project as it should be. 

With this personal portfolio, you will have the ability to update your portfolio from a user friendly application and see your portfolio magically get updated without having to touch a single code or update your code base.
## Project Structure
This project uses turborepo for managing multiple applications such as Nextjs and Sanity studio, which reside in `apps`. Other commons packages are stored within `packages`.
.
├── apps/                  # Contains all applications within this project workspace
│   ├── web                # Next.js portfolio website
│   └── studio             # Sanity studio for updating portfolio
├── packages/              # Tools and dependencies used by apps
│   ├── tsconfig           # Common Typescript config for both apps
│   └── sanity             # Currently used by studio for defining schema
├── README.md
└── turbo.json
## Installation
You can try this project on your local machine by following the steps below:
1. Clone repository
```bash
# For HTTPS
git clone https://github.com/chetra-seng/personal-portfolio.git
# For SSH
git clone git@github.com:chetra-seng/personal-portfolio.git
```

2. Installation
```sh
pnpm install
```

3. Environment variable
- Create a [Sanity](https://www.sanity.io/) project
- Sign up for a [Resend](https://resend.com/) account
- Copy `.env.example` to `.env.local` and update each variable's value

4. Start development servers
```sh
pnpm dev
```
After running this command, your applications should start at:
- web: [http://localhost:3000](https://localhost:3000)
- studio: [http://localhost:3333](http://localhost:3333)

## Technologies
- Turborepo
- Next.js
- Sanity
- TailwindCSS
- ShadcnUI
- Framer motion