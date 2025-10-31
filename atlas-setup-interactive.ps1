# Interactive MongoDB Atlas Setup Script
Write-Host "=== MongoDB Atlas Setup - Step by Step ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "You've created your Atlas account. Let's complete the setup!" -ForegroundColor Green
Write-Host ""

# Step 1: Create Cluster
Write-Host "[STEP 1] Creating Cluster..." -ForegroundColor Yellow
Write-Host ""
Write-Host "In MongoDB Atlas dashboard:" -ForegroundColor White
Write-Host "1. You should see 'Build a Database' or 'Create' button" -ForegroundColor Gray
Write-Host "2. Click it and select 'M0 FREE' tier (Free forever)" -ForegroundColor Gray
Write-Host "3. Choose a cloud provider (AWS recommended)" -ForegroundColor Gray
Write-Host "4. Select region closest to you" -ForegroundColor Gray
Write-Host "5. Click 'Create'" -ForegroundColor Gray
Write-Host "6. Wait 3-5 minutes for cluster to deploy (orange -> green)" -ForegroundColor Gray
Write-Host ""
$clusterReady = Read-Host "Press Enter when your cluster is created and shows 'Deploying' or 'Idle' status"

# Step 2: Create Database User
Write-Host ""
Write-Host "[STEP 2] Creating Database User..." -ForegroundColor Yellow
Write-Host ""
Write-Host "In MongoDB Atlas dashboard:" -ForegroundColor White
Write-Host "1. Click 'Database Access' in left sidebar" -ForegroundColor Gray
Write-Host "2. Click 'Add New Database User'" -ForegroundColor Gray
Write-Host "3. Authentication Method: 'Password'" -ForegroundColor Gray
Write-Host "4. Username: (enter any username, e.g., 'hdbooking')" -ForegroundColor Gray
Write-Host "5. Password: (create a strong password - YOU MUST SAVE THIS!)" -ForegroundColor Gray
Write-Host "6. User Privileges: Select 'Atlas admin'" -ForegroundColor Gray
Write-Host "7. Click 'Add User'" -ForegroundColor Gray
Write-Host ""
Write-Host "IMPORTANT: Save your username and password - you'll need them!" -ForegroundColor Red
$userCreated = Read-Host "Press Enter when database user is created"

# Step 3: Network Access
Write-Host ""
Write-Host "[STEP 3] Configuring Network Access..." -ForegroundColor Yellow
Write-Host ""
Write-Host "In MongoDB Atlas dashboard:" -ForegroundColor White
Write-Host "1. Click 'Network Access' in left sidebar" -ForegroundColor Gray
Write-Host "2. Click 'Add IP Address'" -ForegroundColor Gray
Write-Host "3. Click 'Allow Access from Anywhere' button" -ForegroundColor Gray
Write-Host "   (This adds 0.0.0.0/0 - safe for development)" -ForegroundColor Gray
Write-Host "4. Click 'Confirm'" -ForegroundColor Gray
Write-Host ""
$networkReady = Read-Host "Press Enter when network access is configured"

# Step 4: Get Connection String
Write-Host ""
Write-Host "[STEP 4] Getting Connection String..." -ForegroundColor Yellow
Write-Host ""
Write-Host "In MongoDB Atlas dashboard:" -ForegroundColor White
Write-Host "1. Go to 'Database' tab (left sidebar)" -ForegroundColor Gray
Write-Host "2. Click 'Connect' button on your cluster" -ForegroundColor Gray
Write-Host "3. Select 'Connect your application'" -ForegroundColor Gray
Write-Host "4. Driver: 'Node.js' (should be selected)" -ForegroundColor Gray
Write-Host "5. Copy the connection string (looks like):" -ForegroundColor Gray
Write-Host "   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority" -ForegroundColor Cyan
Write-Host ""
Write-Host "Now you'll enter your connection details:" -ForegroundColor White
$connectionString = Read-Host "Paste your connection string here"

# Validate and extract parts
if ($connectionString -match "mongodb\+srv://") {
    Write-Host ""
    Write-Host "[✓] Valid connection string detected!" -ForegroundColor Green
    
    # Extract username if visible
    if ($connectionString -match "@") {
        Write-Host "Checking connection string format..." -ForegroundColor Gray
        
        # Replace <password> placeholder if exists, or ask for password
        if ($connectionString -match "<password>") {
            Write-Host ""
            Write-Host "Your connection string has <password> placeholder" -ForegroundColor Yellow
            $password = Read-Host "Enter your database user password (will be hidden)" -AsSecureString
            $passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))
            $connectionString = $connectionString -replace "<password>", $passwordPlain
        }
        
        # Ensure database name is in connection string
        if ($connectionString -notmatch "/hd-booking") {
            $connectionString = $connectionString -replace "\.net/\?", ".net/hd-booking?"
            $connectionString = $connectionString -replace "\.net\?", ".net/hd-booking?"
        }
        
        # Update .env file
        Write-Host ""
        Write-Host "[STEP 5] Updating .env file..." -ForegroundColor Yellow
        
        # Read current .env
        if (Test-Path .env) {
            $envContent = Get-Content .env
            $newEnvContent = @()
            
            foreach ($line in $envContent) {
                if ($line -match "^MONGODB_URI=") {
                    $newEnvContent += "MONGODB_URI=$connectionString"
                } else {
                    $newEnvContent += $line
                }
            }
            
            # Write updated .env
            $newEnvContent | Out-File -FilePath .env -Encoding utf8
            Write-Host "[✓] .env file updated!" -ForegroundColor Green
        } else {
            # Create new .env
            @"
PORT=3001
MONGODB_URI=$connectionString
"@ | Out-File -FilePath .env -Encoding utf8
            Write-Host "[✓] .env file created!" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "[STEP 6] Testing MongoDB Connection..." -ForegroundColor Yellow
        
        # Test connection with seed script
        $seedOutput = npm run seed 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "[✓✓✓] SUCCESS! MongoDB is connected and database is seeded!" -ForegroundColor Green
            Write-Host ""
            Write-Host "Database now contains:" -ForegroundColor Cyan
            Write-Host "  - 5 experiences" -ForegroundColor White
            Write-Host "  - 3 promo codes (SAVE10, FLAT100, WELCOME20)" -ForegroundColor White
            Write-Host ""
            Write-Host "Ready to start servers!" -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "[ERROR] Connection failed!" -ForegroundColor Red
            Write-Host "Error details:" -ForegroundColor Yellow
            Write-Host $seedOutput -ForegroundColor Gray
            Write-Host ""
            Write-Host "Common issues:" -ForegroundColor Yellow
            Write-Host "  - Password incorrect (check connection string)" -ForegroundColor White
            Write-Host "  - Network access not configured (allow 0.0.0.0/0)" -ForegroundColor White
            Write-Host "  - Connection string format incorrect" -ForegroundColor White
            Write-Host ""
            Write-Host "Try running: npm run seed (manually) to see detailed error" -ForegroundColor Gray
            exit 1
        }
        
    } else {
        Write-Host "[ERROR] Invalid connection string format" -ForegroundColor Red
        Write-Host "Make sure you copied the full connection string from Atlas" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "[ERROR] Not a valid MongoDB connection string" -ForegroundColor Red
    Write-Host "Connection string should start with: mongodb+srv://" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Would you like to start the servers now? (Y/N)" -ForegroundColor Cyan
$startServers = Read-Host

if ($startServers -eq "Y" -or $startServers -eq "y") {
    Write-Host ""
    Write-Host "Starting servers..." -ForegroundColor Yellow
    
    # Start backend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '=== Backend Server (Port 3001) ===' -ForegroundColor Cyan; npm run dev:server"
    
    Start-Sleep -Seconds 2
    
    # Start frontend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '=== Frontend Server (Port 5173) ===' -ForegroundColor Cyan; npm run dev"
    
    Write-Host ""
    Write-Host "[✓] Servers starting in separate windows!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Access your application:" -ForegroundColor Cyan
    Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
    Write-Host "  Backend:  http://localhost:3001" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "To start servers manually:" -ForegroundColor Cyan
    Write-Host "  npm run dev:server    (backend)" -ForegroundColor White
    Write-Host "  npm run dev           (frontend)" -ForegroundColor White
}

Write-Host ""
Write-Host "Setup complete! Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")


