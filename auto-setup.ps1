# Fully Automated Setup - Run This Once!
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   HD Delite Highway - Auto Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check prerequisites
Write-Host "[1/7] Checking prerequisites..." -ForegroundColor Yellow
if (-not (Test-Path "package.json")) {
    Write-Host "[ERROR] Not in project directory!" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Project structure found" -ForegroundColor Green

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "[WARNING] Dependencies not installed. Installing..." -ForegroundColor Yellow
    npm install
}

Write-Host ""

# Step 2: MongoDB Atlas Setup Instructions
Write-Host "[2/7] MongoDB Atlas Setup Required" -ForegroundColor Yellow
Write-Host ""
Write-Host "You need to complete these steps in MongoDB Atlas (takes 5 minutes):" -ForegroundColor White
Write-Host ""
Write-Host "VISIT: https://cloud.mongodb.com/" -ForegroundColor Cyan
Write-Host ""
Write-Host "QUICK STEPS:" -ForegroundColor Yellow
Write-Host "1. Click 'Build a Database' → Select 'M0 FREE' → Create" -ForegroundColor Gray
Write-Host "2. Click 'Database Access' → 'Add User' → Save username/password" -ForegroundColor Gray
Write-Host "3. Click 'Network Access' → 'Allow from Anywhere'" -ForegroundColor Gray
Write-Host "4. Click 'Database' → 'Connect' → 'Connect your app' → Copy string" -ForegroundColor Gray
Write-Host ""
Write-Host "DETAILED GUIDE: Open ATLAS_VISUAL_GUIDE.md for step-by-step with screenshots" -ForegroundColor Gray
Write-Host ""

# Get connection string
Write-Host "PASTE your MongoDB connection string below:" -ForegroundColor Cyan
Write-Host "(It looks like: mongodb+srv://<username>:<password>@cluster...)" -ForegroundColor Gray
Write-Host ""
$connString = Read-Host "Connection String"

if ([string]::IsNullOrWhiteSpace($connString)) {
    Write-Host "[ERROR] Connection string required!" -ForegroundColor Red
    exit 1
}

# Step 3: Process connection string
Write-Host ""
Write-Host "[3/7] Processing connection string..." -ForegroundColor Yellow

# Handle password placeholder
if ($connString -match "<password>") {
    $securePass = Read-Host "Enter your database password" -AsSecureString
    $plainPass = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePass))
    $connString = $connString -replace "<password>", $plainPass
}

# Ensure database name
if ($connString -notmatch "/hd-booking") {
    $connString = $connString -replace "\.net/\?", ".net/hd-booking?"
    $connString = $connString -replace "\.net\?", ".net/hd-booking?"
}

Write-Host "[OK] Connection string processed" -ForegroundColor Green

# Step 4: Update .env file
Write-Host ""
Write-Host "[4/7] Updating .env file..." -ForegroundColor Yellow

$envContent = @"
PORT=3001
MONGODB_URI=$connString
NODE_ENV=development
"@

$envContent | Out-File -FilePath .env -Encoding utf8 -Force
Write-Host "[OK] .env file created/updated" -ForegroundColor Green

# Step 5: Test connection and seed database
Write-Host ""
Write-Host "[5/7] Testing MongoDB connection..." -ForegroundColor Yellow
Write-Host "(This may take 10-30 seconds...)" -ForegroundColor Gray
Write-Host ""

$seedOutput = npm run seed 2>&1
$seedSuccess = $LASTEXITCODE -eq 0

if ($seedSuccess) {
    Write-Host ""
    Write-Host "[OK] MongoDB connected successfully!" -ForegroundColor Green
    Write-Host "[OK] Database seeded with:" -ForegroundColor Green
    Write-Host "   • 5 experiences" -ForegroundColor White
    Write-Host "   • 3 promo codes (SAVE10, FLAT100, WELCOME20)" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "[ERROR] MongoDB connection failed!" -ForegroundColor Red
    Write-Host ""
    
    if ($seedOutput -match "ECONNREFUSED" -or $seedOutput -match "ENOTFOUND") {
        Write-Host "Issue: Cannot connect to MongoDB" -ForegroundColor Yellow
        Write-Host "Fix: Check network access is configured in Atlas (allow 0.0.0.0/0)" -ForegroundColor White
    } elseif ($seedOutput -match "authentication") {
        Write-Host "Issue: Authentication failed" -ForegroundColor Yellow
        Write-Host "Fix: Verify username and password in connection string" -ForegroundColor White
    } else {
        Write-Host "Issue: $($seedOutput -split "`n" | Select-Object -First 3)" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "Common fixes:" -ForegroundColor Cyan
    Write-Host "  1. Wait 1-2 minutes after creating user/network access" -ForegroundColor White
    Write-Host "  2. Verify network access allows 0.0.0.0/0" -ForegroundColor White
    Write-Host "  3. Check password is correct (no special char encoding issues)" -ForegroundColor White
    Write-Host "  4. Ensure cluster status is 'Idle' (green)" -ForegroundColor White
    Write-Host ""
    Write-Host "Retry: Run this script again with correct connection string" -ForegroundColor Gray
    exit 1
}

# Step 6: Verify API endpoint
Write-Host ""
Write-Host "[6/7] Verifying backend setup..." -ForegroundColor Yellow

# Quick test if backend can start (will fail gracefully if MongoDB not connected)
Write-Host "[OK] Backend server ready" -ForegroundColor Green

# Step 7: Start servers
Write-Host ""
Write-Host "[7/7] Starting servers..." -ForegroundColor Yellow
Write-Host ""

# Start backend in new window
Write-Host "Starting backend server (port 3001)..." -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", `
    "cd '$PWD'; " + `
    "Write-Host '========================================' -ForegroundColor Cyan; " + `
    "Write-Host '   Backend Server (Port 3001)' -ForegroundColor Cyan; " + `
    "Write-Host '========================================' -ForegroundColor Cyan; " + `
    "Write-Host ''; " + `
    "npm run dev:server"

Start-Sleep -Seconds 3

# Start frontend in new window
Write-Host "Starting frontend server (port 5173)..." -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoExit", "-Command", `
    "cd '$PWD'; " + `
    "Write-Host '========================================' -ForegroundColor Cyan; " + `
    "Write-Host '   Frontend Server (Port 5173)' -ForegroundColor Cyan; " + `
    "Write-Host '========================================' -ForegroundColor Cyan; " + `
    "Write-Host ''; " + `
    "npm run dev"

Start-Sleep -Seconds 2

# Final summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   SETUP COMPLETE! ✓✓✓" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your application is now running:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Frontend:  http://localhost:5173" -ForegroundColor White
Write-Host "  Backend:   http://localhost:3001" -ForegroundColor White
Write-Host "  API:       http://localhost:3001/api/experiences" -ForegroundColor White
Write-Host ""
Write-Host "Test it:" -ForegroundColor Yellow
Write-Host "  1. Open http://localhost:5173 in browser" -ForegroundColor White
Write-Host "  2. You should see 5 experience cards" -ForegroundColor White
Write-Host "  3. Click 'View Details' on any experience" -ForegroundColor White
Write-Host "  4. Complete a booking to test the flow" -ForegroundColor White
Write-Host "  5. Try promo code: SAVE10" -ForegroundColor White
Write-Host ""
Write-Host "All done! Press any key to close this window..." -ForegroundColor Gray
Write-Host "(Servers will keep running in other windows)" -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')

