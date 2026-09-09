# SmartShop Enterprise System Architecture 🏗️

High-level architectural blueprint for the **SmartShop Enterprise** multi-vendor platform monorepo.

```text
Enterprise-SmartShop/
├── frontend-web/             Customer eCommerce Website (React 19 + Vite + Tailwind + Redux + TanStack Query)
├── admin-portal/             Super Admin Management Console (React 19 + Tailwind CSS)
├── vendor-portal/            Merchant Store Management Hub (React 19 + Tailwind CSS)
├── customer-mobile/          Customer Mobile Application (React Native CLI 0.74)
├── vendor-mobile/            Merchant Mobile App (React Native CLI 0.74)
├── backend-api/              High-Performance Microservices API (Python FastAPI + SQLAlchemy + Redis + Postgres)
└── docs/                     Architecture Diagrams, API Specifications & Database Schemas
```

## System Topology & Microservices Blueprint

```mermaid
graph TD
    subgraph Clients["Monorepo Client Interfaces"]
        FW["frontend-web (React 19)"]
        AP["admin-portal (React 19)"]
        VP["vendor-portal (React 19)"]
        CM["customer-mobile (React Native)"]
        VM["vendor-mobile (React Native)"]
    end

    subgraph Gateway["API Gateway / Routing Layer"]
        GW["FastAPI Central Gateway (:8000)"]
    end

    subgraph Services["Python FastAPI Microservices"]
        AuthSvc["Auth & Security Router"]
        ProdSvc["Product Catalog Router"]
        OrderSvc["Order Fulfillment Router"]
        VendorSvc["Merchant Management Router"]
    end

    subgraph Data["Database & Cache Layer"]
        PG[(PostgreSQL 16 DB)]
        RD[(Redis Cache)]
    end

    FW --> GW
    AP --> GW
    VP --> GW
    CM --> GW
    VM --> GW

    GW --> AuthSvc
    GW --> ProdSvc
    GW --> OrderSvc
    GW --> VendorSvc

    AuthSvc --> PG
    ProdSvc --> RD
    ProdSvc --> PG
    OrderSvc --> PG
    VendorSvc --> PG
```
