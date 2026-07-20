# POS System API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except `/auth/register` and `/auth/login`) require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "role": "cashier"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "username": "john_doe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "role": "cashier"
  },
  "token": "jwt_token"
}
```

### Login
**POST** `/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "username": "john_doe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "role": "cashier"
  },
  "token": "jwt_token"
}
```

### Get Current User
**GET** `/auth/me`

**Response:**
```json
{
  "id": "uuid",
  "username": "john_doe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "role": "cashier"
}
```

---

## Products Endpoints

### Get All Products
**GET** `/products`

**Query Parameters:**
- `category_id` (optional): Filter by category
- `search` (optional): Search by name or SKU

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Laptop",
    "sku": "LAP001",
    "price": 999.99,
    "cost": 700.00,
    "quantity_in_stock": 10,
    "category_name": "Electronics",
    "reorder_level": 5
  }
]
```

### Get Product by ID
**GET** `/products/:id`

### Create Product
**POST** `/products`

Required role: `admin` or `manager`

```json
{
  "name": "Laptop",
  "sku": "LAP001",
  "category_id": "uuid",
  "price": 999.99,
  "cost": 700.00,
  "quantity_in_stock": 10,
  "description": "High performance laptop",
  "image_url": "https://example.com/laptop.jpg"
}
```

### Update Product
**PUT** `/products/:id`

Required role: `admin` or `manager`

### Delete Product
**DELETE** `/products/:id`

Required role: `admin` or `manager`

### Get Low Stock Products
**GET** `/products/low-stock`

---

## Categories Endpoints

### Get All Categories
**GET** `/categories`

### Create Category
**POST** `/categories`

Required role: `admin` or `manager`

```json
{
  "name": "Electronics",
  "description": "Electronic devices"
}
```

### Update Category
**PUT** `/categories/:id`

Required role: `admin` or `manager`

### Delete Category
**DELETE** `/categories/:id`

Required role: `admin` or `manager`

---

## Customers Endpoints

### Get All Customers
**GET** `/customers`

**Query Parameters:**
- `search` (optional): Search by name, email, or phone

### Get Customer by ID
**GET** `/customers/:id`

**Response:**
```json
{
  "id": "uuid",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "555-1234",
  "address": "123 Main St",
  "city": "New York",
  "postal_code": "10001",
  "total_purchases": 5000.00,
  "loyalty_points": 500,
  "recent_transactions": []
}
```

### Create Customer
**POST** `/customers`

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "555-1234",
  "address": "123 Main St",
  "city": "New York",
  "postal_code": "10001"
}
```

### Update Customer
**PUT** `/customers/:id`

### Add Loyalty Points
**POST** `/customers/:id/loyalty-points`

```json
{
  "points": 100
}
```

---

## Transactions Endpoints

### Create Transaction
**POST** `/transactions`

Required role: `cashier`, `admin`, or `manager`

```json
{
  "user_id": "uuid",
  "customer_id": "uuid" (optional),
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2
    }
  ],
  "tax": 50.00,
  "discount": 10.00,
  "payment_method": "cash"
}
```

**Response:**
```json
{
  "message": "Transaction created successfully",
  "transaction": {
    "id": "uuid",
    "transaction_number": "TXN-20240120-ABC123",
    "subtotal": 500.00,
    "tax": 50.00,
    "discount": 10.00,
    "total": 540.00
  }
}
```

### Get All Transactions
**GET** `/transactions`

**Query Parameters:**
- `start_date` (optional): ISO date string
- `end_date` (optional): ISO date string
- `user_id` (optional): Filter by cashier

### Get Transaction by ID
**GET** `/transactions/:id`

### Get Daily Sales Report
**GET** `/transactions/report/daily`

**Query Parameters:**
- `date` (optional): ISO date string (defaults to today)

**Response:**
```json
{
  "date": "2024-01-20",
  "total_transactions": 50,
  "total_sales": 5000.00,
  "total_tax": 500.00,
  "total_discount": 100.00,
  "average_transaction": 100.00,
  "cashiers": 3
}
```

### Get Sales by Product
**GET** `/transactions/report/by-product`

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Laptop",
    "sku": "LAP001",
    "total_quantity_sold": 15,
    "total_revenue": 14999.85,
    "times_sold": 12
  }
]
```

---

## User Roles

- **admin**: Full access to all features
- **manager**: Can manage products and view reports
- **cashier**: Can process transactions only

---

## Error Responses

**401 Unauthorized:**
```json
{
  "error": "Invalid token"
}
```

**403 Forbidden:**
```json
{
  "error": "Access denied"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**400 Bad Request:**
```json
{
  "error": "Error message"
}
```

---

## Getting Started

### Backend Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the application:
```bash
npm start
```

---

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `username` (VARCHAR, UNIQUE)
- `email` (VARCHAR, UNIQUE)
- `password` (VARCHAR)
- `full_name` (VARCHAR)
- `role` (VARCHAR) - admin, manager, cashier
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Products Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `sku` (VARCHAR, UNIQUE)
- `category_id` (UUID, Foreign Key)
- `price` (DECIMAL)
- `cost` (DECIMAL)
- `quantity_in_stock` (INT)
- `reorder_level` (INT)
- `description` (TEXT)
- `image_url` (VARCHAR)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Transactions Table
- `id` (UUID, Primary Key)
- `transaction_number` (VARCHAR, UNIQUE)
- `user_id` (UUID, Foreign Key)
- `customer_id` (UUID, Foreign Key)
- `subtotal` (DECIMAL)
- `tax` (DECIMAL)
- `discount` (DECIMAL)
- `total` (DECIMAL)
- `payment_method` (VARCHAR)
- `payment_status` (VARCHAR)
- `notes` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Customers Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR)
- `phone` (VARCHAR)
- `address` (TEXT)
- `city` (VARCHAR)
- `postal_code` (VARCHAR)
- `total_purchases` (DECIMAL)
- `loyalty_points` (INT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

---

## License
MIT
