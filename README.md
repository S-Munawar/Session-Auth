# Session-Auth

A full-stack authentication application using **session-based authentication** with HTTP-only cookies. Built with Next.js 16 and Express.js, featuring Redis for session storage.

## Features

- 🔐 **Session-based Authentication** - Secure server-side sessions with Redis storage
- 🍪 **HTTP-only Cookies** - Protection against XSS attacks
- 🔒 **Password Hashing** - bcrypt for secure password storage
- 🛡️ **CSRF Protection** - SameSite cookie policy
- 📱 **Protected Routes** - Authentication middleware for secure endpoints

## Project Structure

```
├── client/                 # Next.js frontend application
│   ├── app/
│   │   ├── (auth)/         # Authentication pages (login, register)
│   │   ├── api/            # API routes
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Dashboard (protected)
│   ├── lib/
│   │   └── api.ts          # API client functions
│   └── types/              # TypeScript types
├── server/                 # Express.js backend API
│   └── src/
│       ├── config/         # Database configuration
│       ├── controllers/    # Route handlers
│       ├── middleware/     # Auth middleware
│       ├── models/         # Data models
│       ├── routes/         # API routes
│       └── server.ts       # Entry point
└── docker-compose.yaml
```

## Tech Stack

### Client
- **Framework**: Next.js 16
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm

### Server
- **Framework**: Express.js
- **Language**: TypeScript
- **Session Store**: Redis (connect-redis)
- **Password Hashing**: bcryptjs
- **Build Tool**: esbuild / tsx
- **Package Manager**: pnpm

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login user | No |
| `POST` | `/api/auth/logout` | Logout user | Yes |
| `GET` | `/api/user/getProfile` | Get current user profile | Yes |

## Getting Started

### Prerequisites

- Node.js >= 18.15.0
- pnpm >= 8.8.0
- Redis server (for session storage)
- Docker (optional)

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/S-Munawar/Session-Auth.git
   cd Session-Auth
   ```

2. Set up environment variables:

   **Server** (`server/.env`):
   ```env
   PORT=2000
   FRONTEND_URL=http://localhost:1000
   JWT_SECRET=your_jwt_secret_key_here
   SESSION_SECRET=your_session_secret_key_here
   REDIS_URL=redis://localhost:6379
   ```

   **Client** (`client/.env`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:2000
   ```

   You can copy from the example files:
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```

3. Install dependencies:
   ```bash
   cd client && pnpm install
   cd ../server && pnpm install
   ```

4. Start Redis server (required for sessions):
   ```bash
   redis-server
   ```

5. Start the development servers:

   **Server** (runs on port 2000):
   ```bash
   cd server
   pnpm dev
   ```

   **Client** (runs on port 1000):
   ```bash
   cd client
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
| `pnpm dev` | Start development server on port 1000 |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server on port 1000 |
| `pnpm lint` | Run ESLint |

### Server
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload (tsx) |
| `pnpm build` | Bundle with esbuild |
| `pnpm start` | Start production server |

## Authentication Flow

1. **Registration**: User submits email/password → Server hashes password → Creates session → Returns user data
2. **Login**: User submits credentials → Server verifies password → Creates session → Sets HTTP-only cookie
3. **Protected Routes**: Requests include session cookie → Middleware validates session → Grants access
4. **Logout**: Session destroyed on server → Cookie cleared

## Security Features

- **HTTP-only Cookies**: Tokens cannot be accessed via JavaScript
- **Secure Cookies**: HTTPS-only in production
- **SameSite Policy**: Protection against CSRF attacks
- **Password Hashing**: bcrypt with salt rounds
- **Session Expiry**: 7-day session lifetime

## License

MIT
