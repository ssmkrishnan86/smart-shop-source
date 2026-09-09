# Enterprise-SmartShop Monorepo 🛒

An enterprise-grade multi-vendor eCommerce platform monorepo containing web, mobile, admin, seller, and microservice backend systems.

```text
Enterprise-SmartShop/
├── frontend-web/             Customer Website (React 19 + Vite + Redux + TanStack Query + Tailwind CSS)
├── admin-portal/             Super Admin Panel (React 19 + Vite + Tailwind CSS)
├── vendor-portal/            Vendor Seller Hub (React 19 + Vite + Tailwind CSS)
├── customer-mobile/          Customer Mobile Application (React Native CLI)
├── vendor-mobile/            Vendor Mobile Application (React Native CLI)
├── backend-api/              FastAPI Microservices Backend (Python + SQLAlchemy + Pydantic)
└── docs/                     Architecture Diagrams, API Specs & Database Schemas
```

## Service Overview

| Directory | Tech Stack | Description | Port |
| :--- | :--- | :--- | :--- |
| `frontend-web` | React 19 + Vite | Customer eCommerce Platform | `:3000` |
| `admin-portal` | React 19 + Vite | Admin Operations Console | `:3001` |
| `vendor-portal` | React 19 + Vite | Merchant Seller Hub | `:3002` |
| `customer-mobile` | React Native CLI | Cross-platform iOS/Android App | Native |
| `vendor-mobile` | React Native CLI | Merchant Mobile Store Manager | Native |
| `backend-api` | Python FastAPI | Microservices API Gateway & DB | `:8000` |
| `docs` | Markdown + Mermaid | System & Database Documentation | N/A |
