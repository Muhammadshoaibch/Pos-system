# POS System - Quick Start Guide

## 🚀 Fastest Way to Run (Using Docker)

### Prerequisites
- Install [Docker](https://www.docker.com/products/docker-desktop)
- That's it!

### Step 1: Clone the Repository
```bash
git clone https://github.com/Muhammadshoaibch/Pos-system.git
cd Pos-system
```

### Step 2: Run Everything with One Command
```bash
docker-compose up --build
```

Wait for all services to start (2-3 minutes on first run)

### Step 3: Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432

---

## 🛑 Setup Without Docker (Local Installation)

### Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- PostgreSQL v12+ ([Download](https://www.postgresql.org/download/))

### Step 1: Setup Database
```bash
# Open PostgreSQL command line
psql -U postgres

# Create database
CREATE DATABASE pos_db;

# Exit
\q
```

### Step 2: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start backend (in new terminal)
npm run dev
```

Backend runs on: **http://localhost:5000**

### Step 3: Frontend Setup (in new terminal)
```bash
cd frontend

# Install dependencies
npm install

# Create .env file with:
# REACT_APP_API_URL=http://localhost:5000/api

# Start frontend
npm start
```

Frontend runs on: **http://localhost:3000**

---

## 📝 First Time Login

After startup, create an admin user via API:

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

Then login with:
- **Email**: admin@example.com
- **Password**: admin123

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Test API with Postman
Import the API collection from `docs/API.md` or use curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

---

## 🔧 Useful Commands

### Docker Commands
```bash
# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after changes
docker-compose up --build --no-cache
```

### Database Commands
```bash
# Reset database
docker-compose down -v

# Access PostgreSQL inside Docker
docker exec -it pos_postgres psql -U postgres -d pos_db
```

### Development Commands
```bash
# Backend
npm run dev      # Start with nodemon
npm test         # Run tests

# Frontend
npm start        # Start dev server
npm run build    # Build for production
```

---

## 📂 Project Structure
```
Pos-system/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth, error handling
│   │   ├── config/         # Database config
│   │   └── app.js          # Main app file
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main app
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── docs/
    ├── SETUP.md            # Detailed setup
    └── API.md              # API documentation
```

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Change port in docker-compose.yml or .env
# Or kill existing process:
sudo lsof -ti:5000 | xargs kill -9  # Linux/Mac
netstat -ano | findstr :5000         # Windows
```

### Database Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify credentials match

### Docker Issues
```bash
# Clean up Docker
docker-compose down -v
docker system prune

# Rebuild
docker-compose up --build
```

### Frontend Can't Connect to Backend
- Check REACT_APP_API_URL in frontend/.env
- Ensure backend is running
- Check CORS_ORIGIN in backend/.env

---

## 📚 Learn More
- [Backend API Documentation](./docs/API.md)
- [Detailed Setup Guide](./docs/SETUP.md)
- [Database Schema](./docs/API.md#database-schema)

---

## 🎉 You're Ready!
The POS System should now be running. Enjoy! 🚀
