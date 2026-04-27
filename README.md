# Dreamy Drops - eCommerce Platform

A premium, production-ready eCommerce website built for the "Dreamy Drops" brand. It features a minimal, white/off-white luxury aesthetic with smooth animations and high-end performance.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4, Shadcn UI
- **Animations**: Framer Motion, Lenis (Smooth Scroll)
- **State Management**: Zustand
- **Database**: MongoDB via Mongoose
- **Authentication**: NextAuth.js
- **Payments**: Stripe (Test Mode)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory (you can use `.env.example` as a reference):
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dreamy_drops
   NEXTAUTH_SECRET=your_super_secret_key_12345
   NEXTAUTH_URL=http://localhost:3000
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

3. **Seed the Database**
   Populate the database with mock Instagram products and a default admin user:
   ```bash
   npx tsx scripts/seed.ts
   ```
   *Default Admin Credentials:*
   - **Email:** admin@dreamydrops.com
   - **Password:** admin123

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app`: Next.js App Router pages (Home, Shop, Product, Checkout, Admin, Auth)
- `/components`: Reusable UI components (Navbar, Footer, CartDrawer, etc.)
- `/lib`: Utility functions and database connection logic
- `/models`: Mongoose schemas for User, Product, and Order
- `/store`: Zustand state management for Cart and Wishlist
- `/scripts`: Database seeding scripts
- `/api`: Next.js API Routes (NextAuth, Products, sync-instagram)

## Features

- **Premium UI**: Clean, minimal, off-white luxury theme
- **Smooth Animations**: Lenis smooth scrolling and Framer Motion micro-interactions
- **eCommerce Flow**: Product catalog, category filters, cart drawer, checkout simulation
- **Admin Dashboard**: Protected route for managing orders and products
- **Mock Instagram Sync**: API stub for future Apify/Graph API integration

## Building for Production

```bash
npm run build
npm start
```
