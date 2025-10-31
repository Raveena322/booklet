# Restart Servers Script - Handles port conflicts
Write-Host "=== Restarting Servers ===" -ForegroundColor Cyan
Write-Host ""

# Stop processes on ports 3001 and 5173
Write-Host "Stopping existing servers..." -ForegroundColor Yellow

# Port 3001 (Backend)
$backend = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue
if ($backend) {
    $pid = $backend.OwningProcess
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    Write-Host "  Stopped backend (port 3001)" -ForegroundColor Green
}

# Port 5173 (Frontend)
$frontend = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
if ($frontend) {
    $pid = $frontend.OwningProcess
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    Write-Host "  Stopped frontend (port 5173)" -ForegroundColor Green
}

Start-Sleep -Seconds 2

# Start backend
Write-Host ""
Write-Host "Starting backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '=== Backend Server (Port 3001) ===' -ForegroundColor Cyan; Write-Host ''; npm run dev:server"

Start-Sleep -Seconds 2

# Start frontend
Write-Host "Starting frontend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '=== Frontend Server (Port 5173) ===' -ForegroundColor Cyan; Write-Host ''; npm run dev"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "[OK] Servers restarted!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""


