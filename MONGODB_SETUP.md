# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended - Free Cloud Database)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account (M0 Free Tier)
3. Create a new organization (if prompted)

### Step 2: Create Cluster
1. Click "Build a Database"
2. Select "M0 Free" tier
3. Choose a cloud provider and region (closest to you)
4. Name your cluster (e.g., "HD-Booking-Cluster")
5. Click "Create"

### Step 3: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Set authentication method to "Password"
4. Create username and password (save these!)
5. Set user privileges to "Atlas admin"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add specific IPs
5. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Databases" in the left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `hd-booking`

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hd-booking?retryWrites=true&w=majority
```

### Step 6: Update .env File
Add the connection string to your `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hd-booking?retryWrites=true&w=majority
```

## Option 2: Local MongoDB

### Windows Installation
1. Download MongoDB Community Server:
   https://www.mongodb.com/try/download/community

2. Install MongoDB:
   - Run the installer
   - Choose "Complete" installation
   - Install as Windows Service (recommended)

3. Verify Installation:
   ```powershell
   mongod --version
   ```

4. Start MongoDB:
   - It should start automatically as a service
   - Or manually: `net start MongoDB`

5. Default connection string:
   ```
   mongodb://localhost:27017/hd-booking
   ```

### Using Docker (Alternative)
```powershell
docker run -d -p 27017:27017 --name mongodb mongo
```

Connection string:
```
mongodb://localhost:27017/hd-booking
```

## After Setup

1. Update `.env` file with your connection string
2. Run database seed:
   ```powershell
   npm run seed
   ```

3. Verify connection:
   - Start the backend server
   - Check console for "Connected to MongoDB" message

## Troubleshooting

### Connection Refused
- Ensure MongoDB is running (check Windows Services)
- Verify connection string is correct
- Check firewall settings

### Authentication Failed
- Verify username and password in connection string
- Ensure database user has proper permissions

### Network Access Denied (Atlas)
- Add your IP address in Network Access settings
- Allow access from anywhere for development (0.0.0.0/0)


