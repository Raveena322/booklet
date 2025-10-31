# PowerShell script to push code to GitHub
# Run this after creating your GitHub repository

Write-Host "🚀 GitHub Push Script" -ForegroundColor Green
Write-Host ""

# Get repository details
$repoName = Read-Host "Enter your GitHub repository name (e.g., hd-booking-app)"
$username = Read-Host "Enter your GitHub username"

# Confirm repository exists
Write-Host ""
Write-Host "⚠️  Make sure you've created the repository on GitHub.com first!" -ForegroundColor Yellow
Write-Host "   If not, go to: https://github.com/new" -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "Have you created the repository on GitHub? (yes/no)"

if ($confirm -ne "yes" -and $confirm -ne "y") {
    Write-Host ""
    Write-Host "📝 Steps to create repository:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/new"
    Write-Host "2. Repository name: $repoName"
    Write-Host "3. Description: Full-stack booking application"
    Write-Host "4. Choose Public or Private"
    Write-Host "5. DO NOT check 'Add a README file'"
    Write-Host "6. Click 'Create repository'"
    Write-Host ""
    Write-Host "Then run this script again!" -ForegroundColor Green
    exit
}

# Rename branch to main if needed
Write-Host ""
Write-Host "🔄 Renaming branch to 'main'..." -ForegroundColor Cyan
git branch -M main

# Add remote
Write-Host ""
Write-Host "🔗 Adding remote repository..." -ForegroundColor Cyan
$remoteUrl = "https://github.com/$username/$repoName.git"

# Check if remote already exists
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "⚠️  Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
    $update = Read-Host "Update to new repository? (yes/no)"
    if ($update -eq "yes" -or $update -eq "y") {
        git remote set-url origin $remoteUrl
        Write-Host "✅ Remote updated!" -ForegroundColor Green
    }
} else {
    git remote add origin $remoteUrl
    Write-Host "✅ Remote added!" -ForegroundColor Green
}

# Push to GitHub
Write-Host ""
Write-Host "📤 Pushing code to GitHub..." -ForegroundColor Cyan
Write-Host "   (You may be prompted for GitHub credentials)" -ForegroundColor Yellow
Write-Host ""

$pushResult = git push -u origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Your repository is at: https://github.com/$username/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Yellow
    Write-Host "1. Follow DEPLOYMENT_GUIDE.md to deploy to Render/Railway"
    Write-Host "2. Update README.md with your repository URL"
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Error pushing to GitHub!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "- Make sure the repository exists on GitHub"
    Write-Host "- Check your GitHub username and repository name"
    Write-Host "- You may need to authenticate (GitHub will prompt you)"
    Write-Host "- If using HTTPS, use a Personal Access Token instead of password"
    Write-Host ""
    Write-Host "Try running manually:" -ForegroundColor Cyan
    Write-Host "  git push -u origin main"
    Write-Host ""
}

