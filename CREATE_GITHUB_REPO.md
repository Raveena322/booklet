# 📝 Create GitHub Repository - Step by Step

## Quick Steps (2 minutes)

### Step 1: Create Repository on GitHub

1. **Open your browser** and go to: **https://github.com**
2. **Sign in** to your GitHub account (or create one if needed)
3. Click the **"+"** icon in the top right corner
4. Click **"New repository"**

### Step 2: Fill Repository Details

Fill in the form:

- **Repository name**: `hd-booking-app` (or any name you prefer)
- **Description**: `Full-stack booking application with React, TypeScript, Express, and MongoDB`
- **Visibility**: 
  - ✅ **Public** (recommended - free, anyone can see)
  - ⚠️ **Private** (requires GitHub Pro for private repos, or free for students)

**IMPORTANT**: 
- ❌ **DO NOT** check "Add a README file" 
- ❌ **DO NOT** add .gitignore
- ❌ **DO NOT** add a license

(We already have these files!)

### Step 3: Create Repository

Click the green **"Create repository"** button

### Step 4: Copy Repository URL

After creating, GitHub will show you a page with setup instructions.

**Copy the repository URL** - it will look like:
```
https://github.com/YOUR_USERNAME/hd-booking-app.git
```

### Step 5: Push Your Code

**Option A: Use the automated script** (Easiest)
```powershell
.\push-to-github.ps1
```

When prompted, paste the repository URL you copied.

**Option B: Manual commands**
```powershell
# Replace YOUR_USERNAME and repository name
git remote add origin https://github.com/YOUR_USERNAME/hd-booking-app.git
git branch -M main
git push -u origin main
```

**Option C: Copy from GitHub** (after Step 3, GitHub shows these exact commands)

GitHub will display commands like:
```bash
git remote add origin https://github.com/YOUR_USERNAME/hd-booking-app.git
git branch -M main
git push -u origin main
```

Copy and paste those into PowerShell.

## 🔐 Authentication

When you push, you may be prompted for credentials:

### If using HTTPS:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your password)
  - Create token: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
  - Permissions: Check `repo` (full control)
  - Copy the token and use it as password

### If using SSH:
- Set up SSH keys in GitHub Settings → SSH and GPG keys
- Use SSH URL: `git@github.com:YOUR_USERNAME/hd-booking-app.git`

## ✅ Verification

After pushing:
1. Refresh your GitHub repository page
2. You should see all your files listed
3. Check that `README.md`, `package.json`, and source files are there

## 🚀 Next Steps

Once code is on GitHub:
1. ✅ Deploy to Render/Railway (see `DEPLOYMENT_GUIDE.md`)
2. ✅ Update `README.md` with repository URL
3. ✅ Test your deployed application

---

**Need help?** Check `DEPLOYMENT_GUIDE.md` for full instructions.

