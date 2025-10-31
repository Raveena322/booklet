# GitHub Push Script
# Run this after creating your GitHub repository

Write-Host "🚀 GitHub Push Script" -ForegroundColor Cyan
Write-Host ""

# Check if remote exists
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Current remote:" -ForegroundColor Yellow
    Write-Host $remote -ForegroundColor Gray
    Write-Host ""
    $useExisting = Read-Host "Use existing remote? (y/n)"
    if ($useExisting -ne 'y') {
        git remote remove origin
    }
}

if (-not (git remote get-url origin 2>$null)) {
    Write-Host ""
    Write-Host "Enter your GitHub repository URL:" -ForegroundColor Yellow
    Write-Host "Example: https://github.com/YOUR_USERNAME/hd-booking-app.git" -ForegroundColor Gray
    $repoUrl = Read-Host "Repository URL"
    
    if ($repoUrl) {
        Write-Host ""
        Write-Host "Adding remote..." -ForegroundColor Cyan
        git remote add origin $repoUrl
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Remote added successfully!" -ForegroundColor Green
        } else {
            Write-Host "❌ Failed to add remote" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "❌ No URL provided. Exiting." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Checking branch..." -ForegroundColor Cyan
$currentBranch = git branch --show-current
Write-Host "Current branch: $currentBranch" -ForegroundColor Gray

if ($currentBranch -ne "main" -and $currentBranch -ne "master") {
    Write-Host "Renaming branch to 'main'..." -ForegroundColor Cyan
    git branch -M main
    $currentBranch = "main"
}

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "This may prompt for your GitHub credentials." -ForegroundColor Yellow
Write-Host ""

git push -u origin $currentBranch

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Visit your GitHub repository to verify files are uploaded" -ForegroundColor Gray
    Write-Host "2. Follow DEPLOYMENT_GUIDE.md to deploy to Render/Railway" -ForegroundColor Gray
    Write-Host "3. Update README.md with your repository URL" -ForegroundColor Gray
} else {
    Write-Host ""
    Write-Host "❌ Push failed. Common issues:" -ForegroundColor Red
    Write-Host "1. Repository doesn't exist on GitHub - create it first at github.com" -ForegroundColor Yellow
    Write-Host "2. Authentication failed - check your GitHub credentials" -ForegroundColor Yellow
    Write-Host "3. No internet connection" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "See PUSH_TO_GITHUB.md for manual instructions." -ForegroundColor Gray
}
