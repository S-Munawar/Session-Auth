# Auth Client

The frontend application for the Auth project, built with Next.js.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm

### Installation

```bash
pnpm install
```

### Development

Start the development server on port 1000:

```bash
pnpm dev
```

Open [http://localhost:1000](http://localhost:1000) in your browser.

### Production

Build and start the production server:

```bash
pnpm build
pnpm start
```

## Project Structure

```
client/
├── app/                # Next.js App Router
│   ├── (auth)/         # Authentication routes
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable UI components
├── context/            # React context providers
├── db/                 # Database utilities
├── hooks/              # Custom React hooks
├── libs/               # Utility libraries
└── public/             # Static assets
```

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server on port 1000 |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server on port 1000 |
| `pnpm lint` | Run ESLint |

## Docker

Build and run using Docker:

```bash
docker build -t auth-client .
docker run -p 1000:1000 auth-client
```

Or use Docker Compose from the root directory:

```bash
docker-compose up client
```
