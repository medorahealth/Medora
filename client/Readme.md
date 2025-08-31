# Medora - Lab Test Website

This is a [Next.js](https://nextjs.org) project for a lab test booking website with a Go backend API.

## Project Structure

- **Frontend**: Next.js application (port 3000)
- **Backend**: Go API server (port 8080) - currently using a Node.js mock server
- **Mock Server**: Node.js Express server for development (port 8080)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Go (v1.25 or higher) - for the actual backend server

## Getting Started

### Option 1: Using Mock Server (Recommended for Development)

1. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

2. **Install Mock Server Dependencies:**
   ```bash
   npm install express cors --legacy-peer-deps
   ```

3. **Start the Mock Backend Server:**
   ```bash
   node mock-server.js
   ```
   This will start the mock server on http://localhost:8080

4. **Start the Frontend Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Option 2: Using Go Backend Server

1. **Navigate to the server directory:**
   ```bash
   cd ../server
   ```

2. **Install Go dependencies:**
   ```bash
   export GOPROXY=https://proxy.golang.org,direct
   go mod tidy
   ```

3. **Start the Go backend server:**
   ```bash
   go run cmd/api/main.go
   ```
   This will start the Go server on http://localhost:8080

4. **Start the Frontend (in a new terminal):**
   ```bash
   cd /Users/utkarshshukla/Medora/client
   npm run dev
   ```

## Available Endpoints

### Mock Server Endpoints (http://localhost:8080)
- `GET /tests` - Get all lab tests
- `GET /tests/women-health` - Get women health tests
- `GET /tests/:id` - Get specific test
- `POST /register` - Register user
- `POST /login` - Login user
- `GET /auth/session` - Get session info
- `POST /orders` - Create order
- `GET /orders/:id` - Get order
- `POST /razorpay/orders` - Create Razorpay order
- `POST /razorpay/verify` - Verify payment

### Go Backend Endpoints (when available)
- Same endpoints as above, with MongoDB integration
- Authentication with JWT tokens
- Real payment processing with Razorpay

## Development

The frontend uses:
- Next.js 15.2.0 with React 19
- NextAuth.js for authentication
- Tailwind CSS for styling
- Turbopack for faster development builds

The mock server provides realistic test data for development without requiring a database connection.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
