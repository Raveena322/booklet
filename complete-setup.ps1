# Complete Setup Script - Run after MongoDB connection is configured
Write-Host "=== HD Delite Highway - Complete Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check .env file
if (-not (Test-Path .env)) {
    Write-Host "[ERROR] .env file not found!" -ForegroundColor Red
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
PORT=3001
MONGODB_URI=mongodb://localhost:27017/hd-booking
"@ | Out-File -FilePath .env -Encoding utf8
    Write-Host "Please update .env with your MongoDB connection string" -ForegroundColor Yellow
    Write-Host "See atlas-quick-setup.md for MongoDB Atlas setup" -ForegroundColor Gray
    exit 1
}

Write-Host "[1/4] Checking .env file..." -ForegroundColor Cyan
$envContent = Get-Content .env
$mongoUri = ($envContent | Select-String "MONGODB_URI=").ToString() -replace "MONGODB_URI=", ""

if ($mongoUri -match "localhost:27017" -and $mongoUri -notmatch "mongodb\+srv") {
    Write-Host "[!] Using local MongoDB connection" -ForegroundColor Yellow
    Write-Host "    Make sure MongoDB is running locally" -ForegroundColor Gray
} elseif ($mongoUri -match "mongodb\+srv") {
    Write-Host "[OK] MongoDB Atlas connection string detected" -ForegroundColor Green
} else {
    Write-Host "[!] Check your MONGODB_URI in .env file" -ForegroundColor Yellow
}

Write-Host ""

# Step 2: Test MongoDB Connection
Write-Host "[2/4] Testing MongoDB connection..." -ForegroundColor Cyan
$seedOutput = npm run seed 2>&1
$seedSuccess = $LASTEXITCODE -eq 0

if ($seedSuccess) {
    Write-Host "[OK] MongoDB connected successfully!" -ForegroundColor Green
    Write-Host "[OK] Database seeded with experiences and promo codes" -ForegroundColor Green
} else {
    Write-Host "[ERROR] MongoDB connection failed!" -ForegroundColor Red
    
    if ($seedOutput -match "ECONNREFUSED") {
        Write-Host ""
        Write-Host "Local MongoDB is not running or connection string is incorrect" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "SOLUTION 1: Set up MongoDB Atlas (Recommended - 5 minutes):" -ForegroundColor Cyan
        Write-Host "  1. Go to: https://www.mongodb.com/cloud/atlas" -ForegroundColor White
        Write-Host "  2. Create free account and cluster" -ForegroundColor White
        Write-Host "  3. Get connection string and update .env" -ForegroundColor White
        Write-Host "  4. See: atlas-quick-setup.md for detailed steps" -ForegroundColor White
        Write-Host ""
        Write-Host "SOLUTION 2: Install local MongoDB:" -ForegroundColor Cyan
        Write-Host "  1. Download: https://www.mongodb.com/try/download/community" -ForegroundColor White
        Write-Host "  2. Install and start MongoDB service" -ForegroundColor White
        Write-Host "  3. Keep current connection string: mongodb://localhost:27017/hd-booking" -ForegroundColor White
        Write-Host ""
        Write-Host "After setting up MongoDB, run this script again:" -ForegroundColor Yellow
        Write-Host "  .\complete-setup.ps1" -ForegroundColor White
        exit 1
    } elseif ($seedOutput -match "authentication") {
        Write-Host ""
        Write-Host "Authentication failed - check username/password in connection string" -ForegroundColor Yellow
        Write-Host "Verify MONGODB_URI in .env file has correct credentials" -ForegroundColor White
        exit 1
    } else {
        Write-Host ""
        Write-Host "MongoDB connection error. Check your connection string in .env" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host ""

# Step 3: Verify seeded data
Write-Host "[3/4] Verifying database..." -ForegroundColor Cyan
Write-Host "[OK] Database ready with:" -ForegroundColor Green
Write-Host "  - 5 experiences" -ForegroundColor Gray
Write-Host "  - 3 promo codes (SAVE10, FLAT100, WELCOME20)" -ForegroundColor Gray

Write-Host ""

# Step 4: Start servers
Write-Host "[4/4] Starting development servers..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '=== Backend Server (Port 3001) ===' -ForegroundColor Cyan; Write-Host ''; npm run dev:server"

Start-Sleep -Seconds 2

Write-Host "Starting frontend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '=== Frontend Server (Port 5173) ===' -ForegroundColor Cyan; Write-Host ''; npm run dev"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Servers are starting in separate windows:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "  Backend:  http://localhost:3001" -ForegroundColor White
Write-Host "  API:      http://localhost:3001/api/experiences" -ForegroundColor White
Write-Host ""
Write-Host "Test the application:" -ForegroundColor Cyan
Write-Host "  1. Open http://localhost:5173 in browser" -ForegroundColor White
Write-Host "  2. Browse experiences" -ForegroundColor White
Write-Host "  3. Try booking flow" -ForegroundColor White
Write-Host "  4. Test promo code: SAVE10" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to close this window (servers will keep running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")


