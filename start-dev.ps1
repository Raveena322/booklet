# Start Development Servers
Write-Host "=== Starting HD Delite Highway Development Servers ===" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "[!] .env file not found!" -ForegroundColor Yellow
    Write-Host "Creating .env file with default settings..." -ForegroundColor Gray
    
    @"
PORT=3001
MONGODB_URI=mongodb://localhost:27017/hd-booking
"@ | Out-File -FilePath .env -Encoding utf8
    
    Write-Host "[!] Please update .env with your MongoDB connection string" -ForegroundColor Yellow
    Write-Host "    See MONGODB_SETUP.md for instructions" -ForegroundColor Gray
    Write-Host ""
}

# Check MongoDB connection first
Write-Host "Checking MongoDB connection..." -ForegroundColor Cyan
$seedTest = npm run seed 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[!] MongoDB connection failed!" -ForegroundColor Red
    Write-Host "    Backend server will not start without MongoDB." -ForegroundColor Yellow
    Write-Host "    See MONGODB_SETUP.md for setup instructions." -ForegroundColor Gray
    Write-Host ""
    Write-Host "Starting frontend only..." -ForegroundColor Yellow
    Write-Host ""
    
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
    Write-Host "[✓] Frontend server starting at http://localhost:5173" -ForegroundColor Green
    Write-Host ""
    Write-Host "To start backend after MongoDB is connected:" -ForegroundColor Cyan
    Write-Host "  npm run dev:server" -ForegroundColor White
    exit
}

Write-Host "[✓] MongoDB connected!" -ForegroundColor Green
Write-Host ""

# Start both servers
Write-Host "Starting servers..." -ForegroundColor Cyan

# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Backend Server (Port 3001)' -ForegroundColor Cyan; npm run dev:server"

# Start frontend in new window  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Frontend Server (Port 5173)' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "[✓] Servers starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "API:      http://localhost:3001/api/experiences" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window (servers will continue running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")


