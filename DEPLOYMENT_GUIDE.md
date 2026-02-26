# VetPath Academy - Deployment Guide

## Prerequisites
- GitHub account (for code hosting)
- Vercel account (free)
- MongoDB Atlas connection string
- Render account (free tier)

## Step 1: Prepare Your Code for Deployment

### 1.1 Set up environment variables

**Backend** - Create `backend/.env`:
```
MONGODB_URI=your_mongodb_atlas_uri
PORT=5000
NODE_ENV=production
CORS_ORIGIN=your-frontend-domain.vercel.app
```

**Frontend** - Create `frontend/.env`:
```
VITE_API_URL=your-backend-api-domain.onrender.com
```

### 1.2 Update backend CORS configuration
Edit `backend/server.js` and ensure CORS is properly configured:
```javascript
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
```

## Step 2: Deploy Backend to Render.com

1. **Create Render Account**: Go to [render.com](https://render.com) and sign up
2. **Push to GitHub**: Push your code to a GitHub repository
3. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as root directory
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Add Environment Variables**:
   - Go to "Environment" tab
   - Add `MONGODB_URI` with your Atlas connection string
   - Add `NODE_ENV=production`
5. **Deploy**: Click "Deploy"
   - Your API will be available at: `https://your-app-name.onrender.com`

## Step 3: Deploy Frontend to Vercel

1. **Create Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up
2. **Import Repository**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository
3. **Configure**:
   - Framework: Next.js (or leave automatic)
   - Root Directory: `./frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment Variables**:
   - Add `VITE_API_URL` = `https://your-backend.onrender.com`
5. **Deploy**: Click "Deploy"
   - Your site will be available at: `https://your-app-name.vercel.app`

## Step 4: Update Backend CORS

Once you have your frontend URL, update the backend `.env`:
```
CORS_ORIGIN=https://your-app-name.vercel.app
```

Then redeploy on Render.

## Step 5: Test Your Deployment

1. Go to your Vercel frontend URL
2. Check the browser console (F12) for any errors
3. Test API calls to verify backend connectivity
4. Check MongoDB Atlas connection logs

## Troubleshooting

### CORS Errors
- Verify `CORS_ORIGIN` in backend .env matches your frontend domain
- Check that backend is using the correct CORS middleware

### Database Connection Errors
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist (allow all: 0.0.0.0/0)

### Build Failures
- Check build logs in Vercel/Render dashboard
- Ensure all dependencies in package.json
- Verify Node.js version compatibility

## Free Tier Limits

- **Vercel**: 100GB/month bandwidth, unlimited deployments
- **Render**: Auto-sleeps after 15 mins of inactivity (paid plan to keep always-on)
- **MongoDB Atlas**: 512MB storage free tier

## Next Steps (Optional)

- Set up custom domain
- Enable HTTPS (automatic on Vercel/Render)
- Set up CI/CD for automatic deployments
- Monitor logs and performance

---

For questions or issues, check the service documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://docs.render.com)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
