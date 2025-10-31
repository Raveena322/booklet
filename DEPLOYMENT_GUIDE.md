# 🚀 Deployment Guide

This guide will walk you through deploying the HD Delite Highway booking application to cloud platforms.

## 📋 Prerequisites

1. **GitHub Account** - Create one at [github.com](https://github.com)
2. **MongoDB Atlas Account** - Create one at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
3. **Cloud Platform Account** - Choose one:
   - [Render.com](https://render.com) (Recommended - Free tier available)
   - [Railway.app](https://railway.app) (Free tier available)
   - [Vercel](https://vercel.com) (For frontend, free tier available)

## 🔧 Step 1: Push Code to GitHub

### 1.1 Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `hd-booking-app` (or your preferred name)
   - **Description**: "Full-stack booking application with React, TypeScript, Express, and MongoDB"
   - **Visibility**: Public (or Private if preferred)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### 1.2 Push Local Code to GitHub

**Option A: Using GitHub CLI (if installed)**
```powershell
gh repo create hd-booking-app --public --source=. --remote=origin --push
```

**Option B: Using Git Commands**
```powershell
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/hd-booking-app.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Option C: Using GitHub Desktop**
1. Download [GitHub Desktop](https://desktop.github.com)
2. File → Add Local Repository → Select this folder
3. Publish repository → Enter name and click "Publish"

### 1.3 Verify Push

Go to your GitHub repository URL and verify all files are uploaded.

## 🗄️ Step 2: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Cluster**:
   - Go to [cloud.mongodb.com](https://cloud.mongodb.com)
   - Click **"Build a Database"** → Choose **M0 FREE** tier
   - Select a cloud provider and region (closest to you)
   - Click **"Create"**

2. **Create Database User**:
   - Go to **"Database Access"** in left menu
   - Click **"Add New Database User"**
   - Choose **"Password"** authentication
   - Create username and password (save the password!)
   - Set privileges: **"Atlas admin"**
   - Click **"Add User"**

3. **Configure Network Access**:
   - Go to **"Network Access"** in left menu
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **"Confirm"**

4. **Get Connection String**:
   - Go to **"Database"** → Click **"Connect"**
   - Choose **"Connect your application"**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

## ☁️ Step 3: Deploy to Cloud Platform

### Option A: Render.com (Recommended)

#### 3.1 Create Web Service

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in deployment settings:
   - **Name**: `hd-booking-app`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `.` if required)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if preferred)

#### 3.2 Set Environment Variables

In Render dashboard, go to **"Environment"** tab and add:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hd-booking?retryWrites=true&w=majority
NODE_ENV=production
PORT=10000
```

⚠️ **Note**: Render automatically sets `PORT`, but you may need to adjust your code if it's not `3001`

#### 3.3 Deploy and Seed Database

1. Click **"Manual Deploy"** → **"Deploy latest commit"**
2. Wait for deployment to complete (5-10 minutes)
3. Once deployed, note your service URL (e.g., `https://hd-booking-app.onrender.com`)
4. To seed the database, run:
   ```powershell
   # Set MONGODB_URI environment variable
   $env:MONGODB_URI="your-connection-string"
   
   # Run seed script (you may need to SSH into Render or use their shell)
   npm run seed
   ```

   **Alternative**: Use Render's shell feature or add a one-time deployment script.

#### 3.4 Update Application URL

Update your frontend to use the Render backend URL:
- In Render dashboard, note your service URL
- The API will be available at: `https://your-app.onrender.com/api`

### Option B: Railway.app

#### 3.1 Create New Project

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository

#### 3.2 Configure Environment Variables

1. Go to **"Variables"** tab
2. Add variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hd-booking?retryWrites=true&w=majority
   NODE_ENV=production
   ```

#### 3.3 Deploy

1. Railway auto-detects `railway.json` and deploys
2. Wait for deployment (3-5 minutes)
3. Note your service URL (e.g., `https://hd-booking-app.railway.app`)

#### 3.4 Seed Database

Use Railway's CLI or web console:
```bash
railway run npm run seed
```

### Option C: Vercel (Frontend) + Render/Railway (Backend)

#### 3.1 Deploy Backend First

Follow **Option A (Render)** or **Option B (Railway)** steps above to deploy backend.

#### 3.2 Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**:
     ```
     VITE_API_URL=https://your-backend.onrender.com/api
     ```

5. Click **"Deploy"**
6. Vercel will provide a URL like `https://hd-booking-app.vercel.app`

## 🔄 Step 4: Update README with URLs

After deployment, update `README.md`:

1. Open `README.md`
2. Find lines 386-387
3. Replace placeholders:
   ```markdown
   **Live Demo:** https://your-app-url.onrender.com
   **GitHub Repository:** https://github.com/YOUR_USERNAME/hd-booking-app
   ```

## ✅ Step 5: Test Deployed Application

### 5.1 Test API Endpoints

```powershell
# Test health check
curl https://your-app.onrender.com/api/health

# Test experiences endpoint
curl https://your-app.onrender.com/api/experiences

# Test booking (replace with actual IDs)
curl -X POST https://your-app.onrender.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"experienceId":"...","date":"2025-10-22T00:00:00.000Z","timeSlot":"09:00 AM","quantity":1,"customerName":"Test User","customerEmail":"test@test.com"}'
```

### 5.2 Test Frontend

1. Open your deployed frontend URL
2. Navigate through:
   - ✅ Home page loads experiences
   - ✅ Click "View Details" on an experience
   - ✅ Select date and time
   - ✅ Go to checkout, fill form
   - ✅ Apply promo code (try: SAVE10)
   - ✅ Complete booking
   - ✅ Verify confirmation page shows reference number

### 5.3 Verify Database

1. Check MongoDB Atlas dashboard
2. Verify:
   - Experiences collection has data
   - Bookings are being created
   - Promo codes are stored

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Application won't start
- **Solution**: Check environment variables in platform dashboard
- Verify `MONGODB_URI` is correct
- Check build logs for errors

**Problem**: Database connection fails
- **Solution**: 
  - Verify MongoDB Atlas network access allows all IPs (0.0.0.0/0)
  - Check connection string includes password
  - Verify database user has correct permissions

**Problem**: Port conflicts
- **Solution**: 
  - Render uses `PORT` environment variable automatically
  - Update `server/index.js` to use `process.env.PORT || 3001`

### Frontend Issues

**Problem**: API calls fail (CORS errors)
- **Solution**: 
  - Verify backend CORS is configured (already done in `server/index.js`)
  - Check `VITE_API_URL` is correct
  - Ensure backend URL is publicly accessible

**Problem**: Build fails
- **Solution**: 
  - Check build logs
  - Verify all dependencies are in `package.json`
  - Ensure TypeScript compiles without errors

## 📝 Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy to cloud platform
3. ✅ Seed database with sample data
4. ✅ Update README with live URLs
5. ✅ Test complete booking flow
6. ✅ Share your deployed application!

## 🔗 Quick Links

- **GitHub**: https://github.com
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Render**: https://render.com
- **Railway**: https://railway.app
- **Vercel**: https://vercel.com

---

**Need Help?** Check the main `README.md` for more details or open an issue on GitHub.

