# VetPath Academy - Veteran LMS

This project is separated into frontend and backend.

## Frontend
- React/TypeScript app with Vite
- Located in `frontend/` folder

## Backend
- Node.js/Express server with MongoDB
- Located in `backend/` folder

## Setup

1. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

2. Install backend dependencies:
   ```
   cd ../backend
   npm install
   ```

3. Set up environment variables in `backend/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017
   PORT=5000
   ```

4. Start the backend:
   ```
   cd backend
   npm run dev
   ```

5. Start the frontend:
   ```
   cd frontend
   npm run dev
   ```

The frontend will proxy API calls to the backend during development.