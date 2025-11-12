# Military Asset Management — Backend

This folder contains the Node.js + Express backend for the Military Asset Management System.

Setup

1. Copy `.env.example` to `.env` and fill MONGODB_URI and JWT_SECRET.
2. Install dependencies:

```powershell
cd backend
npm install
```

3. Run in development:

```powershell
npm run dev
```

API endpoints (scaffold)

- `POST /api/users/register` - register user
- `POST /api/users/login` - login
- `GET /api/assets` - list assets
- `POST /api/assets` - create/purchase asset
- `POST /api/transfers` - transfer asset
- `POST /api/assignments` - assign asset
