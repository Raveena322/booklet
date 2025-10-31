# 📸 MongoDB Atlas Visual Guide

## Step 1: Create Cluster

After logging into MongoDB Atlas:

1. **Look for "Build a Database" or "Create" button** (usually prominent on dashboard)
2. **Select "M0 FREE"** (Free tier - shown with price "$0/month")
3. **Choose Provider:** AWS (recommended)
4. **Select Region:** Choose closest to you (e.g., Mumbai, Singapore, etc.)
5. **Cluster Name:** Leave default or change (e.g., "HD-Booking-Cluster")
6. **Click "Create"**
7. **Wait 3-5 minutes** - Cluster status will change from "Creating" → "Deploying" → "Idle" (green)

✅ **You'll know it's ready when:** Status shows "Idle" with green dot

---

## Step 2: Create Database User

1. **Click "Database Access"** in left sidebar (under Security section)
2. **Click green "Add New Database User" button** (top right)
3. **Authentication Method:** Select "Password"
4. **Username:** Enter any name (e.g., `hdbooking`, `admin`, `user`)
5. **Password:** 
   - Click "Autogenerate Secure Password" OR create your own
   - **IMPORTANT:** Copy and save this password!
6. **User Privileges:** Select "Atlas admin" (first option)
7. **Click "Add User"** (bottom)

✅ **You'll know it's done when:** User appears in the list

---

## Step 3: Configure Network Access

1. **Click "Network Access"** in left sidebar (under Security section)
2. **Click green "Add IP Address" button** (top right)
3. **Click "Allow Access from Anywhere"** button (big blue button)
   - This adds `0.0.0.0/0` which allows all IPs (safe for development)
4. **Click "Confirm"**

✅ **You'll know it's done when:** Entry shows "0.0.0.0/0" in the list

---

## Step 4: Get Connection String

1. **Go to "Database" tab** (left sidebar, usually first item)
2. **You should see your cluster** with status "Idle"
3. **Click "Connect" button** (on the cluster card)
4. **Modal opens:** Select **"Connect your application"**
5. **Driver:** Select "Node.js" (version doesn't matter)
6. **Copy the connection string** - It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

✅ **You'll have:** A connection string with `<username>` and `<password>` placeholders

---

## Step 5: Use the Setup Script

Once you have the connection string:

1. **Open PowerShell** in the project folder
2. **Run:**
   ```powershell
   .\quick-atlas-setup.ps1
   ```
3. **Paste your connection string** when prompted
4. **Enter your password** when asked (the one you created in Step 2)
5. **Script will:**
   - Update .env file
   - Test connection
   - Seed database
   - Start servers (if you choose)

✅ **Done!** Your app will be running!

---

## Common Issues

### "Connection refused"
- **Fix:** Make sure Step 3 (Network Access) is done - allow 0.0.0.0/0

### "Authentication failed"
- **Fix:** Check username and password are correct in connection string

### "Cluster not ready"
- **Fix:** Wait a few more minutes for cluster to fully deploy

### Can't find "Build a Database"
- **Fix:** You might already have a cluster - check "Database" tab

---

## Quick Checklist

- [ ] Cluster created and shows "Idle" (green)
- [ ] Database user created (username + password saved)
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied from Atlas
- [ ] Ran `.\quick-atlas-setup.ps1`
- [ ] Database seeded successfully
- [ ] Servers started

---

**Need help?** Each step in Atlas has tooltips and help text. Hover over question marks (?) for more info.


