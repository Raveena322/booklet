# 🚀 START HERE - One Command Setup

## Super Simple Setup (3 Steps)

### Step 1: Get MongoDB Connection String (5 minutes in Atlas)

1. Go to: https://cloud.mongodb.com/
2. Follow these 4 clicks in Atlas:
   - **Build Database** → M0 FREE → Create
   - **Database Access** → Add User → Save password
   - **Network Access** → Allow from Anywhere
   - **Database** → Connect → Copy connection string

*Detailed guide: `ATLAS_VISUAL_GUIDE.md`*

### Step 2: Run This One Command

```powershell
.\auto-setup.ps1
```

### Step 3: Paste Connection String When Asked

That's it! The script does everything else:
- ✅ Updates .env file
- ✅ Tests MongoDB connection
- ✅ Seeds database (5 experiences, 3 promo codes)
- ✅ Starts backend server
- ✅ Starts frontend server

**Done!** Your app will be running at http://localhost:5173

---

## What You Need From Atlas

Just one thing: **Connection String**

It looks like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Get it from: Database → Connect → Connect your application

---

## Troubleshooting

If connection fails:
1. Wait 1-2 minutes after creating user/network access
2. Make sure network access allows 0.0.0.0/0
3. Verify password is correct
4. Check cluster status is "Idle" (green)

Then run `.\auto-setup.ps1` again.

---

**That's it! Just run `.\auto-setup.ps1` after getting your connection string!**

