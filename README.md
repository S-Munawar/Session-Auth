# Auth

A full-stack authentication application with a Next.js client and Express.js server.

## Project Structure

```
├── client/          # Next.js frontend application
├── server/          # Express.js backend API
└── docker-compose.yaml
```

## Tech Stack

### Client
- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

### Server
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: Auth0 (JWT)
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js >= 18.15.0
- pnpm >= 8.8.0
- Docker (optional)

### Development

1. Clone the repository:
   ```bash
   git clone https://github.com/S-Munawar/Auth.git
   cd Auth
   ```

2. Install dependencies for both client and server:
   ```bash
   cd client && pnpm install
   cd ../server && pnpm install
   ```

3. Start the development servers:

   **Client** (runs on port 1000):
   ```bash
   cd client
   pnpm dev
   ```

   **Server** (runs on port 2000):
   ```bash
   cd server
   pnpm dev
   ```

### Using Docker

Run both services using Docker Compose:

```bash
docker-compose up --build
```

- Client: http://localhost:1000
- Server: http://localhost:2000

## Scripts

### Client
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

### Server
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Compile TypeScript |
| `pnpm start` | Start production server |

## License

MIT
