# 🚀 Render.com Deployment Guide for Chimirota Backend

## Issues Fixed:
1. ✅ Removed duplicate `const express` declaration
2. ✅ Fixed CORS wildcard patterns (https://*.vercel.app doesn't work)
3. ✅ Added proper database path for production (/tmp/ directory)
4. ✅ Added comprehensive error handling and logging
5. ✅ Fixed Socket.io CORS configuration
6. ✅ Added request logging for debugging

## Step-by-Step Deployment to Render.com

### 1. Prepare Your Repository

**Important:** Make sure you commit all changes to your Git repository first:

```bash
git add .
git commit -m "Fixed backend for Render deployment"
git push origin main
```

### 2. Deploy to Render.com

1. **Go to [Render.com](https://render.com) and sign up/login**

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**
   - Select your repository containing this project
   - Click "Connect"

4. **Configure the deployment:**
   - **Name:** `chimirota-backend`
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** Leave empty (if backend is in root) or specify path
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

5. **Environment Variables:**
   Add these environment variables:
   ```
   NODE_ENV=production
   FRONTEND_URL=https://chimirota-final.vercel.app
   ```

6. **Click "Deploy Web Service"**

### 3. Monitor Deployment

- Watch the build logs in Render dashboard
- Look for these success messages:
  ```
  ✅ Connected to SQLite database at: /tmp/mosque.db
  🚀 Mosque API server running on port 10000
  📡 WebSocket server ready for real-time updates
  🌍 Environment: production
  ```

### 4. Test Your Backend

Once deployed, test these endpoints:

1. **Health Check:**
   ```
   GET https://chimirota-backend.onrender.com/
   ```

2. **API Health:**
   ```
   GET https://chimirota-backend.onrender.com/api/health
   ```

3. **Prayer Times:**
   ```
   GET https://chimirota-backend.onrender.com/api/prayer-times
   ```

4. **Settings:**
   ```
   GET https://chimirota-backend.onrender.com/api/settings
   ```

### 5. Update Frontend Configuration

Your frontend is already configured to use:
```javascript
const BASE_URL = "https://chimirota-backend.onrender.com";
```

### 6. Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Import your repository
3. Deploy as a static site
4. Update the `FRONTEND_URL` environment variable in Render with your Vercel domain

## Important Notes for Render Free Tier:

⚠️ **Cold Starts:** Free tier goes to sleep after 15 minutes of inactivity
⚠️ **Limitations:** 750 hours/month, spins down with inactivity
⚠️ **Database:** Uses /tmp directory (ephemeral storage)

## Troubleshooting:

### If deployment fails:

1. **Check Build Logs:** Look for npm install errors
2. **Environment Variables:** Ensure NODE_ENV=production is set
3. **CORS Issues:** Check browser console for CORS errors
4. **Database:** Watch for database connection errors in logs

### Common Issues:

1. **"Module not found"**: Check package.json dependencies
2. **"Port already in use"**: Render handles this automatically
3. **Database errors**: Check /tmp/mosque.db path in logs
4. **CORS errors**: Verify frontend domain in FRONTEND_URL

### Useful Commands for Local Testing:

```bash
# Test production mode locally
NODE_ENV=production npm start

# Check if all dependencies install
npm install

# Test specific endpoints
curl https://chimirota-backend.onrender.com/api/health
```

## Next Steps:

1. ✅ Deploy backend to Render
2. ✅ Test all API endpoints
3. ✅ Deploy frontend to Vercel
4. ✅ Update CORS settings with actual frontend domain
5. ✅ Test full application flow

Your backend should now be successfully deployed at:
**https://chimirota-backend.onrender.com**