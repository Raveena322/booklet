# Setup script for HD Delite Highway Booking Platform

Write-Host "=== HD Delite Highway Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
# Server Configuration
PORT=3001

# MongoDB Connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/hd-booking

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hd-booking?retryWrites=true&w=majority
"@ | Out-File -FilePath .env -Encoding utf8
    Write-Host ".env file created!" -ForegroundColor Green
} else {
    Write-Host ".env file already exists." -ForegroundColor Green
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Install MongoDB locally OR set up MongoDB Atlas (free at mongodb.com/atlas)" -ForegroundColor White
Write-Host "2. Update .env with your MONGODB_URI if using Atlas" -ForegroundColor White
Write-Host "3. Run: npm run seed (to populate database)" -ForegroundColor White
Write-Host "4. Run: npm run dev:server (in one terminal)" -ForegroundColor White
Write-Host "5. Run: npm run dev (in another terminal)" -ForegroundColor White
Write-Host ""


