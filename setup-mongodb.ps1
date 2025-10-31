# MongoDB Setup Helper Script
Write-Host "=== MongoDB Setup Helper ===" -ForegroundColor Cyan
Write-Host ""

# Create .env file if it doesn't exist
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    
    @"
# Server Configuration
PORT=3001

# MongoDB Connection
# OPTION 1: MongoDB Atlas (Free Cloud - Recommended)
# Get your connection string from MongoDB Atlas dashboard
# Format: mongodb+srv://username:password@cluster.mongodb.net/hd-booking?retryWrites=true&w=majority
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hd-booking?retryWrites=true&w=majority

# OPTION 2: Local MongoDB
# If you have MongoDB installed locally:
MONGODB_URI=mongodb://localhost:27017/hd-booking
"@ | Out-File -FilePath .env -Encoding utf8
    
    Write-Host "[✓] .env file created!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "[✓] .env file already exists" -ForegroundColor Green
    Write-Host ""
}

Write-Host "=== MongoDB Setup Options ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "OPTION 1: MongoDB Atlas (Recommended - Free Cloud Database)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Steps:" -ForegroundColor White
Write-Host "1. Go to: https://www.mongodb.com/cloud/atlas" -ForegroundColor Gray
Write-Host "2. Click 'Try Free' and sign up (free account)" -ForegroundColor Gray
Write-Host "3. Create a free cluster (M0 - Free tier)" -ForegroundColor Gray
Write-Host "4. Wait 3-5 minutes for cluster to deploy" -ForegroundColor Gray
Write-Host "5. Click 'Connect' on your cluster" -ForegroundColor Gray
Write-Host "6. Select 'Connect your application'" -ForegroundColor Gray
Write-Host "7. Copy the connection string" -ForegroundColor Gray
Write-Host "8. Click 'Database Access' -> 'Add New Database User'" -ForegroundColor Gray
Write-Host "   - Create username/password (remember these!)" -ForegroundColor Gray
Write-Host "9. Click 'Network Access' -> 'Add IP Address'" -ForegroundColor Gray
Write-Host "   - Click 'Allow Access from Anywhere' (0.0.0.0/0) for development" -ForegroundColor Gray
Write-Host "10. Update .env file with your connection string:" -ForegroundColor Gray
Write-Host "    Replace <password> with your database user password" -ForegroundColor Gray
Write-Host "    Replace <dbname> with: hd-booking" -ForegroundColor Gray
Write-Host ""
Write-Host "Example connection string:" -ForegroundColor Cyan
Write-Host 'MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/hd-booking?retryWrites=true&w=majority' -ForegroundColor Yellow
Write-Host ""

Write-Host "OPTION 2: Local MongoDB (Windows)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Steps:" -ForegroundColor White
Write-Host "1. Download MongoDB Community Server:" -ForegroundColor Gray
Write-Host "   https://www.mongodb.com/try/download/community" -ForegroundColor Cyan
Write-Host "2. Install MongoDB with default settings" -ForegroundColor Gray
Write-Host "3. MongoDB will run as a Windows service automatically" -ForegroundColor Gray
Write-Host "4. Use connection string (already in .env):" -ForegroundColor Gray
Write-Host "   mongodb://localhost:27017/hd-booking" -ForegroundColor Yellow
Write-Host ""
Write-Host "OR use Docker (if installed):" -ForegroundColor Gray
Write-Host "   docker run -d -p 27017:27017 --name mongodb mongo" -ForegroundColor Yellow
Write-Host ""

Write-Host "=== Quick Setup Commands ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Once MongoDB is set up, run:" -ForegroundColor White
Write-Host "  npm run seed          # Populate database" -ForegroundColor Yellow
Write-Host "  npm run dev:server    # Start backend" -ForegroundColor Yellow
Write-Host "  npm run dev           # Start frontend" -ForegroundColor Yellow
Write-Host ""
Write-Host "Or use automated script:" -ForegroundColor White
Write-Host "  .\start-dev.ps1       # Starts both servers" -ForegroundColor Yellow
Write-Host ""

Write-Host "=== Testing Connection ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "After updating .env with your MongoDB connection string, test with:" -ForegroundColor White
Write-Host "  npm run seed" -ForegroundColor Yellow
Write-Host ""
Write-Host "If successful, you'll see:" -ForegroundColor Gray
Write-Host "  Connected to MongoDB" -ForegroundColor Green
Write-Host "  Inserted X experiences" -ForegroundColor Green
Write-Host "  Inserted X promo codes" -ForegroundColor Green
Write-Host ""


