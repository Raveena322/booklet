# 🎯 DO THIS NOW - Step by Step

## ✅ Step 1: MongoDB Setup (REQUIRED)

### Option A: MongoDB Atlas (5 minutes - Recommended)

1. **Open this link:** https://www.mongodb.com/cloud/atlas/register
2. **Click "Try Free"** and sign up (use your email)
3. **Verify your email** (check inbox)
4. **Create cluster:**
   - Select **"M0 FREE"** tier
   - Choose **AWS** cloud provider
   - Select region closest to you
   - Click **"Create Cluster"**
   - Wait 3-5 minutes for cluster to be ready (orange → green)

5. **Create database user:**
   - Click **"Database Access"** (left sidebar)
   - Click **"Add New Database User"**
   - Username: `hdbooking` (or any you choose)
   - Password: Create a password (**SAVE THIS!**)
   - User Privileges: **"Atlas admin"**
   - Click **"Add User"**

6. **Allow network access:**
   - Click **"Network Access"** (left sidebar)
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (button)
   - Click **"Confirm"**

7. **Get connection string:**
   - Go to **"Database"** tab
   - Click **"Connect"** on your cluster
   - Choose **"Connect your application"**
   - Copy the connection string (looks like):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

8. **Update .env file:**
   - Open `.env` file in this project
   - Find the line: `MONGODB_URI=...`
   - Replace it with your connection string
   - Replace `<password>` with your database user password
   - Replace the `?` part with `/hd-booking?` (add database name)

   **Final format should look like:**
   ```env
   MONGODB_URI=mongodb+srv://hdbooking:YourPassword123@cluster0.xxxxx.mongodb.net/hd-booking?retryWrites=true&w=majority
   ```

### Option B: Local MongoDB

1. **Download:** https://www.mongodb.com/try/download/community
2. **Install** with default settings
3. **MongoDB will start automatically** as Windows service
4. **Keep .env as is** (already configured for local)

---

## ✅ Step 2: Run Complete Setup Script

After updating `.env` with your MongoDB connection string, run:

```powershell
.\complete-setup.ps1
```

**OR manually:**

### 2a. Seed Database
```powershell
npm run seed
```

**Expected output:**
```
Connected to MongoDB
Inserted 5 experiences
Inserted 3 promo codes
Seed data inserted successfully
```

### 2b. Start Backend Server
```powershell
npm run dev:server
```

**Expected output:**
```
Connected to MongoDB
Server running on port 3001
```

### 2c. Start Frontend Server (in new terminal)
```powershell
npm run dev
```

**Expected output:**
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

---

## ✅ Step 3: Test the Application

1. **Open browser:** http://localhost:5173
2. **You should see:** List of experiences (5 cards)
3. **Click:** "View Details" on any experience
4. **Select:** Date and time slot
5. **Go to:** Checkout page
6. **Try promo code:** `SAVE10` (click Apply)
7. **Fill form** and click "Pay and Confirm"
8. **See:** Confirmation page with reference number

---

## 🚨 Troubleshooting

### "MongoDB connection refused"
- MongoDB Atlas: Check network access (must allow 0.0.0.0/0)
- Local MongoDB: Ensure service is running
- Check connection string in `.env` file

### "Authentication failed"
- Verify username and password in connection string
- Make sure you replaced `<password>` with actual password

### "Port already in use"
- Change `PORT=3001` to `PORT=3002` in `.env`
- Or kill existing process

### Frontend shows no experiences
- Ensure backend is running
- Check browser console for errors
- Verify: http://localhost:3001/api/experiences returns data

---

## 📋 Quick Reference

| Action | Command |
|--------|---------|
| Test connection | `npm run seed` |
| Start backend | `npm run dev:server` |
| Start frontend | `npm run dev` |
| Check status | `.\check-setup.ps1` |
| Complete setup | `.\complete-setup.ps1` |

---

## ✨ Success Indicators

✅ MongoDB connected → Seed script completes  
✅ Backend running → Server listening on port 3001  
✅ Frontend running → Vite server on port 5173  
✅ Experiences visible → 5 cards on homepage  
✅ Booking works → Can complete full booking flow  

---

## 🎉 You're Done!

Once all steps complete:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/api/health

**The full-stack application is running!**

