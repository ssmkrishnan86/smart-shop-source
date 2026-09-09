# OpenAPI 3.0 API Specification & REST Contracts

## Base API Endpoint
`http://localhost:8000/api/v1`

---

## 1. Authentication Service (`/api/v1/auth`)

### `POST /auth/login`
Authenticate user or merchant and retrieve JWT access token.

#### Request Body
```json
{
  "email": "alex.morgan@enterprise.com",
  "password": "password123"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Authentication successful",
  "data": {
    "token": "mock_jwt_token_enterprise_998877",
    "user": {
      "id": "usr_101",
      "email": "alex.morgan@enterprise.com",
      "first_name": "Alex",
      "last_name": "Morgan",
      "role": "CUSTOMER"
    }
  }
}
```

---

## 2. Product Service (`/api/v1/products`)

### `GET /products`
List catalog products with pagination, category filter, and search text query.

#### Parameters
- `category` (optional, string): Filter by category name
- `search` (optional, string): Filter search query
- `page` (optional, int, default: 1): Page number
- `limit` (optional, int, default: 12): Items per page

---

## 3. Order Service (`/api/v1/orders`)

### `POST /orders`
Create a new order for customer checkout.
