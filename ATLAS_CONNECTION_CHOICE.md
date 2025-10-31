# 📍 MongoDB Atlas - Which Connection Option?

## ✅ Choose This One:

**Click on: "Drivers" (Connect your application)**

This gives you the connection string we need for the backend!

---

## Why "Drivers"?

- ✅ Gives you the MongoDB connection string
- ✅ Perfect for Node.js/Express backend
- ✅ Format: `mongodb+srv://...`
- ✅ This is what our backend code uses

---

## What About the Others?

- **Compass** - GUI tool (not needed for our app)
- **Shell** - Command line tool (not needed)
- **VS Code** - Extension (optional, not required)
- **Atlas SQL** - SQL tools (not needed)

---

## After Clicking "Drivers":

1. You'll see "Connect your application"
2. Driver should show "Node.js"
3. Version doesn't matter (any Node.js version works)
4. **Copy the connection string** that appears below

The connection string looks like:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## Next Step:

Once you have the connection string, run:
```powershell
.\auto-setup.ps1
```

And paste it when asked!

---

**TL;DR: Click "Drivers" → Copy connection string → Run `.\auto-setup.ps1`**


