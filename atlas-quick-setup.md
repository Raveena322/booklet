# 🚀 MongoDB Atlas Quick Setup (5 Minutes)

## Step 1: Create Account (1 minute)
1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** button
3. Sign up with email (or Google/GitHub)
4. Click **"I agree"** to terms

## Step 2: Create Free Cluster (2 minutes)
1. Select **"M0 FREE"** tier (Free forever)
2. Choose cloud provider (AWS recommended)
3. Select region closest to you
4. Click **"Create"**
5. Wait 3-5 minutes for cluster to deploy (orange → green)

## Step 3: Create Database User (1 minute)
1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Authentication Method: **"Password"**
4. Username: Choose any (e.g., `hdbookinguser`)
5. Password: Create strong password (SAVE IT!)
6. User Privileges: **"Atlas admin"**
7. Click **"Add User"**

## Step 4: Configure Network Access (1 minute)
1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** button
4. Click **"Confirm"**

## Step 5: Get Connection String (30 seconds)
1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Select **"Connect your application"**
4. Driver: **Node.js** (should be selected)
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update .env File (30 seconds)
1. Open `.env` file in project root
2. Replace the connection string with yours
3. Replace `<password>` with your database user password
4. Replace `<dbname>` (or add `/hd-booking` at the end before `?`)

**Example:**
```env
MONGODB_URI=mongodb+srv://hdbookinguser:MyPassword123@cluster0.xxxxx.mongodb.net/hd-booking?retryWrites=true&w=majority
```

## Step 7: Test Connection
Run this command:
```powershell
npm run seed
```

You should see:
```
Connected to MongoDB
Inserted 5 experiences
Inserted 3 promo codes
Seed data inserted successfully
```

## ✅ Done!

Your MongoDB is now set up! Continue with:
- `npm run seed` (if not done already)
- `npm run dev:server` (start backend)
- `npm run dev` (start frontend)

---

**Need Help?** See `MONGODB_SETUP.md` for detailed troubleshooting.


