# Quick MongoDB Atlas Setup - After creating cluster
Write-Host "=== MongoDB Atlas Quick Setup ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Since you've created your Atlas account, follow these steps:" -ForegroundColor Green
Write-Host ""

# Display steps
Write-Host "[1/4] CREATE CLUSTER (if not done):" -ForegroundColor Yellow
Write-Host "  • Click 'Build a Database'" -ForegroundColor White
Write-Host "  • Select 'M0 FREE' tier" -ForegroundColor White
Write-Host "  • Choose AWS + your region" -ForegroundColor White
Write-Host "  • Click 'Create' and wait 3-5 minutes" -ForegroundColor White
Write-Host ""

Write-Host "[2/4] CREATE DATABASE USER:" -ForegroundColor Yellow
Write-Host "  • Click 'Database Access' → 'Add New Database User'" -ForegroundColor White
Write-Host "  • Username: (choose any, e.g., 'hduser')" -ForegroundColor White
Write-Host "  • Password: (create strong password - SAVE IT!)" -ForegroundColor White
Write-Host "  • Privileges: 'Atlas admin'" -ForegroundColor White
Write-Host "  • Click 'Add User'" -ForegroundColor White
Write-Host ""

Write-Host "[3/4] CONFIGURE NETWORK ACCESS:" -ForegroundColor Yellow
Write-Host "  • Click 'Network Access' → 'Add IP Address'" -ForegroundColor White
Write-Host "  • Click 'Allow Access from Anywhere'" -ForegroundColor White
Write-Host "  • Click 'Confirm'" -ForegroundColor White
Write-Host ""

Write-Host "[4/4] GET CONNECTION STRING:" -ForegroundColor Yellow
Write-Host "  • Go to 'Database' tab" -ForegroundColor White
Write-Host "  • Click 'Connect' on your cluster" -ForegroundColor White
Write-Host "  • Select 'Connect your application'" -ForegroundColor White
Write-Host "  • Copy the connection string" -ForegroundColor White
Write-Host ""

Write-Host "Once you have the connection string, paste it below:" -ForegroundColor Cyan
Write-Host ""

$connectionString = Read-Host "Connection String"

if ([string]::IsNullOrWhiteSpace($connectionString)) {
    Write-Host "[ERROR] Connection string is required!" -ForegroundColor Red
    exit 1
}

# Process connection string
Write-Host ""
Write-Host "Processing connection string..." -ForegroundColor Yellow

# Replace <password> if exists
if ($connectionString -match "<password>") {
    $password = Read-Host "Enter your database password" -AsSecureString
    $passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))
    $connectionString = $connectionString -replace "<password>", $passwordPlain
}

# Ensure database name is included
if ($connectionString -notmatch "/hd-booking") {
    $connectionString = $connectionString -replace "\.net/\?", ".net/hd-booking?"
    $connectionString = $connectionString -replace "\.net\?", ".net/hd-booking?"
}

# Update .env file
Write-Host ""
Write-Host "Updating .env file..." -ForegroundColor Yellow

if (Test-Path .env) {
    $envLines = Get-Content .env
    $newEnvLines = @()
    $found = $false
    
    foreach ($line in $envLines) {
        if ($line -match "^MONGODB_URI=") {
            $newEnvLines += "MONGODB_URI=$connectionString"
            $found = $true
        } else {
            $newEnvLines += $line
        }
    }
    
    if (-not $found) {
        $newEnvLines += "MONGODB_URI=$connectionString"
    }
    
    $newEnvLines | Out-File -FilePath .env -Encoding utf8
} else {
    @"
PORT=3001
MONGODB_URI=$connectionString
"@ | Out-File -FilePath .env -Encoding utf8
}

Write-Host "[✓] .env file updated!" -ForegroundColor Green

# Test connection and seed
Write-Host ""
Write-Host "Testing MongoDB connection and seeding database..." -ForegroundColor Yellow
Write-Host ""

$seedResult = npm run seed 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[✓✓✓] SUCCESS! MongoDB connected and database seeded!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Database now contains:" -ForegroundColor Cyan
    Write-Host "  ✓ 5 experiences" -ForegroundColor White
    Write-Host "  ✓ 3 promo codes (SAVE10, FLAT100, WELCOME20)" -ForegroundColor White
    Write-Host ""
    
    # Ask to start servers
    Write-Host "Start development servers now? (Y/N)" -ForegroundColor Cyan
    $startNow = Read-Host
    
    if ($startNow -eq "Y" -or $startNow -eq "y") {
        Write-Host ""
        Write-Host "Starting servers..." -ForegroundColor Yellow
        
        # Start backend
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '=== Backend Server ===' -ForegroundColor Cyan; Write-Host 'Port: 3001' -ForegroundColor Gray; Write-Host ''; npm run dev:server"
        
        Start-Sleep -Seconds 2
        
        # Start frontend  
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '=== Frontend Server ===' -ForegroundColor Cyan; Write-Host 'Port: 5173' -ForegroundColor Gray; Write-Host ''; npm run dev"
        
        Start-Sleep -Seconds 2
        
        Write-Host ""
        Write-Host "[✓] Servers started in separate windows!" -ForegroundColor Green
        Write-Host ""
        Write-Host "=== Application Ready ===" -ForegroundColor Green
        Write-Host ""
        Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
        Write-Host "Backend:  http://localhost:3001" -ForegroundColor Cyan
        Write-Host "API:      http://localhost:3001/api/experiences" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Open http://localhost:5173 in your browser!" -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "To start servers manually:" -ForegroundColor Cyan
        Write-Host "  npm run dev:server    (terminal 1)" -ForegroundColor White
        Write-Host "  npm run dev           (terminal 2)" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "[ERROR] Connection failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error:" -ForegroundColor Yellow
    Write-Host $seedResult -ForegroundColor Gray
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Check password is correct" -ForegroundColor White
    Write-Host "  2. Verify network access allows 0.0.0.0/0" -ForegroundColor White
    Write-Host "  3. Ensure cluster is deployed (green status)" -ForegroundColor White
    Write-Host "  4. Wait 1-2 minutes after creating user/network access" -ForegroundColor White
    Write-Host ""
    Write-Host "Try again by running: .\quick-atlas-setup.ps1" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")


