# Setup Guide

## Prerequisites

- Node.js v14 or higher
- PostgreSQL v12 or higher
- npm or yarn package manager

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/pos_db
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
NODE_ENV=development
JWT_EXPIRE=7d
```

### 4. Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE pos_db;

# Exit
\q
```

### 5. Start the backend server
```bash
npm run dev
```

The backend will be running at `http://localhost:5000`

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start the frontend application
```bash
npm start
```

The application will open at `http://localhost:3000`

## First Time Setup

### 1. Initialize Database

The database tables will be created automatically when you start the backend server for the first time.

### 2. Create Admin User

Use the API to register an admin user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123",
    "full_name": "Administrator",
    "role": "admin"
  }'
```

### 3. Login to Application

- Go to `http://localhost:3000`
- Login with:
  - Email: `admin@example.com`
  - Password: `admin123`

## Project Structure

```
pos-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── transactionController.js
│   │   │   ├── customerController.js
│   │   │   └── categoryController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── transactionRoutes.js
│   │   │   ├── customerRoutes.js
│   │   │   └── categoryRoutes.js
│   │   ├── utils/
│   │   │   └── db-init.js
│   │   └── app.js
│   ├─�� .env.example
│   ├── package.json
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.js
│   │   │   └── Sidebar.js
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── Dashboard.js
│   │   │   ├── POS.js
│   │   │   ├── Products.js
│   │   │   ├── Customers.js
│   │   │   ├── Inventory.js
│   │   │   └── Reports.js
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       ├── productSlice.js
│   │   │       ├── transactionSlice.js
│   │   │       └── customerSlice.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── LoginPage.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Layout.css
│   │   │   ├── Sidebar.css
│   │   │   ├── POS.css
│   │   │   ├── Products.css
│   │   │   ├── Customers.css
│   │   │   ├── Inventory.css
│   │   │   └── Reports.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
├── docs/
│   ├── API.md
│   └── SETUP.md
└── README.md
```

## Features

### Authentication
- ✅ User registration and login
- ✅ JWT token-based authentication
- ✅ Role-based access control (Admin, Manager, Cashier)

### Products
- ✅ Add, edit, and delete products
- ✅ Product categories
- ✅ Stock management
- ✅ Product search and filtering

### Customers
- ✅ Customer management
- ✅ Customer history
- ✅ Loyalty points tracking
- ✅ Purchase history

### Point of Sale
- ✅ Shopping cart
- ✅ Product selection
- ✅ Discount application
- ✅ Tax calculation
- ✅ Multiple payment methods
- ✅ Transaction processing

### Reporting & Analytics
- ✅ Daily sales reports
- ✅ Product sales analysis
- ✅ Sales graphs and charts
- ✅ Inventory valuation

### Inventory
- ✅ Stock tracking
- ✅ Low stock alerts
- ✅ Inventory reports
- ✅ Stock history

## Troubleshooting

### Database Connection Error

If you get a database connection error:

1. Make sure PostgreSQL is running
2. Check your `DATABASE_URL` in `.env`
3. Verify database credentials
4. Ensure the database exists

### Port Already in Use

If port 5000 (backend) or 3000 (frontend) is already in use:

Backend:
```bash
# Change PORT in .env
PORT=5001
```

Frontend:
```bash
# Create .env file
echo "PORT=3001" > .env
npm start
```

### CORS Issues

If you encounter CORS errors:

1. Make sure backend is running on `http://localhost:5000`
2. Check `REACT_APP_API_URL` in frontend `.env`
3. Restart both services

## Development

### Backend Development

```bash
cd backend
npm run dev  # Runs with nodemon for auto-reload
```

### Frontend Development

```bash
cd frontend
npm start  # Starts with hot reload
```

## Production Build

### Frontend Build

```bash
cd frontend
npm run build
# Creates optimized build in build/ directory
```

### Backend Production

```bash
cd backend
NODE_ENV=production npm start
```

## Support

For issues or questions, please refer to the API documentation in `docs/API.md`
