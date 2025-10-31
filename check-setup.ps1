# Setup Status Checker
Write-Host "=== HD Delite Highway - Setup Status ===" -ForegroundColor Cyan
Write-Host ""

# Check .env file
if (Test-Path .env) {
    Write-Host "[✓] .env file exists" -ForegroundColor Green
    $envContent = Get-Content .env
    $hasMongoUri = $envContent | Select-String -Pattern "MONGODB_URI"
    if ($hasMongoUri) {
        Write-Host "[✓] MONGODB_URI configured in .env" -ForegroundColor Green
    } else {
        Write-Host "[!] MONGODB_URI not found in .env" -ForegroundColor Yellow
    }
} else {
    Write-Host "[!] .env file not found - create it with MongoDB connection string" -ForegroundColor Yellow
    Write-Host "    See MONGODB_SETUP.md for instructions" -ForegroundColor Gray
}

Write-Host ""

# Check node_modules
if (Test-Path node_modules) {
    Write-Host "[✓] Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "[!] Dependencies not installed - run: npm install" -ForegroundColor Yellow
}

Write-Host ""

# Check MongoDB connection (if .env exists)
if (Test-Path .env) {
    Write-Host "Checking MongoDB connection..." -ForegroundColor Cyan
    try {
        $envFile = Get-Content .env
        $mongoUri = ($envFile | Select-String "MONGODB_URI").ToString() -replace "MONGODB_URI=", ""
        
        Write-Host "Attempting to connect to MongoDB..." -ForegroundColor Gray
        
        # Try to seed (quick connection test)
        $seedOutput = npm run seed 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[✓] MongoDB connected and seeded successfully!" -ForegroundColor Green
        } else {
            if ($seedOutput -match "ECONNREFUSED") {
                Write-Host "[!] MongoDB connection refused" -ForegroundColor Red
                Write-Host "    - Ensure MongoDB is running locally" -ForegroundColor Gray
                Write-Host "    - OR use MongoDB Atlas connection string" -ForegroundColor Gray
            } elseif ($seedOutput -match "authentication") {
                Write-Host "[!] MongoDB authentication failed" -ForegroundColor Red
                Write-Host "    - Check username/password in connection string" -ForegroundColor Gray
            } else {
                Write-Host "[!] MongoDB connection issue detected" -ForegroundColor Yellow
                Write-Host "    See MONGODB_SETUP.md for setup instructions" -ForegroundColor Gray
            }
        }
    } catch {
        Write-Host "[!] Could not check MongoDB connection" -ForegroundColor Yellow
    }
}

Write-Host ""

# Server status
Write-Host "=== Server Status ===" -ForegroundColor Cyan

$frontendProcess = Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*vite*" -or $_.MainWindowTitle -like "*vite*" }
if ($frontendProcess) {
    Write-Host "[✓] Frontend server likely running" -ForegroundColor Green
    Write-Host "    Access at: http://localhost:5173" -ForegroundColor Gray
} else {
    Write-Host "[ ] Frontend server not running" -ForegroundColor Yellow
    Write-Host "    Start with: npm run dev" -ForegroundColor Gray
}

$backendProcess = Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*server/index.js*" }
if ($backendProcess) {
    Write-Host "[✓] Backend server likely running" -ForegroundColor Green
    Write-Host "    API at: http://localhost:3001" -ForegroundColor Gray
} else {
    Write-Host "[ ] Backend server not running" -ForegroundColor Yellow
    Write-Host "    Start with: npm run dev:server" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=== Documentation ===" -ForegroundColor Cyan
Write-Host "  • README.md - Full documentation" -ForegroundColor Gray
Write-Host "  • QUICK_START.md - Quick setup guide" -ForegroundColor Gray
Write-Host "  • MONGODB_SETUP.md - MongoDB setup instructions" -ForegroundColor Gray
Write-Host "  • SETUP_STATUS.md - Current status overview" -ForegroundColor Gray
Write-Host ""


