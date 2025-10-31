# 🚀 Quick Start Guide

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] MongoDB set up (local or Atlas)

## Step-by-Step Setup

### 1. Create Environment File

Create a `.env` file in the root directory:

**For Local MongoDB:**
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/hd-booking
```

**For MongoDB Atlas (Cloud):**
```env
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hd-booking?retryWrites=true&w=majority
```

> 📖 See `MONGODB_SETUP.md` for detailed MongoDB setup instructions

### 2. Install Dependencies

Already done! ✅

### 3. Set Up MongoDB

**Option A: MongoDB Atlas (Recommended - Free)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Add to `.env` file

**Option B: Local MongoDB**
1. Install MongoDB Community Server
2. Start MongoDB service
3. Use `mongodb://localhost:27017/hd-booking` in `.env`

> 📖 See `MONGODB_SETUP.md` for complete instructions

### 4. Seed the Database

```powershell
npm run seed
```

This will create:
- 5 sample experiences
- 3 promo codes (SAVE10, FLAT100, WELCOME20)

### 5. Start Development Servers

**Terminal 1 - Backend Server:**
```powershell
npm run dev:server
```

**Terminal 2 - Frontend Server:**
```powershell
npm run dev
```

### 6. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001
- **API Health Check:** http://localhost:3001/api/health

## Troubleshooting

### "MongoDB connection error"
- Verify MongoDB is running
- Check `.env` file has correct `MONGODB_URI`
- Test connection: `mongosh "mongodb://localhost:27017"`

### "Port already in use"
- Change `PORT` in `.env` file
- Or kill the process using the port

### Frontend not loading experiences
- Ensure backend server is running
- Check browser console for errors
- Verify API endpoint: http://localhost:3001/api/experiences

## Next Steps After Setup

1. ✅ Database seeded
2. ✅ Servers running
3. Test the booking flow:
   - Browse experiences
   - Select date and time
   - Apply promo code (try SAVE10)
   - Complete booking
4. Deploy to production (see README.md)

## Production Deployment

Ready to deploy? See `README.md` section on "Deployment" for:
- Render.com setup
- Railway.app setup
- Vercel + Render setup
- AWS deployment

---

**Need Help?** Check `README.md` for detailed documentation.


