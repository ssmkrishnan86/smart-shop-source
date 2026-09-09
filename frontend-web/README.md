# CommerceHub-Web / SmartShop-Web 🛒

An enterprise-grade, large-scale multi-vendor eCommerce frontend application built with **React 19**, **TypeScript**, **Vite**, **React Router v7**, **Redux Toolkit**, **TanStack Query**, **Tailwind CSS**, **Framer Motion**, and **i18next**.

## 🚀 Features

- **Clean & Modular Architecture**: Feature-sliced architecture (`src/features/`) designed for enterprise scalability.
- **Global & Server State**: Redux Toolkit for UI state (Auth, Cart, Wishlist, Theme, Settings) & TanStack Query v5 for API query caching and data synchronization.
- **Responsive Modern UI**: Built with Tailwind CSS, HSL design tokens, glassmorphism elements, micro-animations via Framer Motion, and dark/light mode toggle.
- **Type Safety**: 100% strict TypeScript types, Zod schemas, and React Hook Form validation.
- **i18n Multi-Language Support**: i18next supporting English & Spanish dynamically.
- **SEO Ready**: React Helmet Async metadata management per page.
- **Testing**: Vitest for component & unit testing, Playwright for E2E user flow tests.

## 📁 Project Structure

```text
src/
├── app/          # App initialization, Providers & Router
├── assets/       # Static assets, logos, icons
├── components/   # Shared reusable UI & layout components
├── config/       # App & QueryClient configuration
├── constants/    # App constants & API endpoints
├── contexts/     # React Context providers
├── enums/        # TypeScript enums
├── features/     # Modular features (products, cart, checkout, etc.)
├── helpers/      # Utility helpers
├── hooks/        # Custom React hooks
├── i18n/         # Internationalization config
├── interfaces/   # Interface definitions
├── layouts/      # App layout components (Main, Protected, Auth)
├── middleware/   # Custom route & store middleware
├── models/       # Data models
├── pages/        # Route page views
├── services/     # API service modules
├── store/        # Redux toolkit store & slices
├── styles/       # Global CSS & Tailwind styles
├── tests/        # Test utilities & unit test setup
├── types/        # TypeScript type definitions
├── utils/        # Formatting & calculation utilities
└── validators/   # Zod validation schemas
```

## 🛠️ Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Run unit tests
npm run test

# Build for production
npm run build
```
