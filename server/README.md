# Auth Server

The backend API for the Auth project, built with Express.js.

## Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: Auth0 (JWT with express-jwt & jwks-rsa)
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js >= 18.15.0
- pnpm >= 8.8.0

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the server directory with the required configuration:

```env
PORT=2000
# Add your Auth0 and other environment variables
```

### Development

Start the development server with hot reload:

```bash
pnpm dev
```

The server runs on [http://localhost:2000](http://localhost:2000).

### Production

Build and start the production server:

```bash
pnpm build
pnpm start
```

## Project Structure

```
server/
├── src/
│   ├── server.ts       # Application entry point
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   ├── models/         # Data models
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic
│   └── utils/          # Utility functions
├── public/             # Static files
└── scripts/            # Build/deploy scripts
```

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with nodemon |
| `pnpm build` | Compile TypeScript to JavaScript |
| `pnpm start` | Start compiled production server |

## Dependencies

### Core
- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **morgan**: HTTP request logger
- **cookie-parser**: Cookie parsing middleware

### Authentication
- **express-jwt**: JWT validation middleware
- **jwks-rsa**: JWKS RSA key retrieval

## Docker

Build and run using Docker:

```bash
docker build -t auth-server .
docker run -p 2000:2000 auth-server
```

Or use Docker Compose from the root directory:

```bash
docker-compose up server
```

## License

MIT
