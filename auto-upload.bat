@echo off
echo 🚀 Story Haven - Upload to GitHub (Automated)
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed
    echo 📥 Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git is installed

REM Initialize git
echo 📦 Initializing Git repository...
git init
if errorlevel 1 (
    echo ❌ Failed to initialize Git
    pause
    exit /b 1
)
echo ✅ Git repository initialized

REM Add all files
echo 📁 Adding all files...
git add .
if errorlevel 1 (
    echo ❌ Failed to add files
    pause
    exit /b 1
)
echo ✅ Files added

REM Commit files
echo 💾 Creating commit...
git commit -m "Complete Story Haven website"
if errorlevel 1 (
    echo ❌ Failed to commit files
    pause
    exit /b 1
)
echo ✅ Files committed

REM Check if user has set up remote
git remote -v >nul 2>&1
if errorlevel 1 (
    echo.
    echo 📋 Please set up GitHub repository first:
    echo   1. Go to: https://github.com/new
    echo   2. Repository name: story-haven-website
    echo   3. Create repository
    echo   4. Copy the repository URL
    echo   5. Run: git remote add origin https://github.com/YOUR_USERNAME/story-haven-website.git
    echo   6. Then run: git branch -M main
    echo   7. Then run: git push -u origin main
    echo.
    echo 📝 Replace YOUR_USERNAME with your actual GitHub username!
    pause
    exit /b 1
)

echo ✅ Remote repository configured

REM Set main branch
echo 🏷️ Setting main branch...
git branch -M main
if errorlevel 1 (
    echo ❌ Failed to set main branch
    pause
    exit /b 1
)
echo ✅ Main branch set

echo.
echo 📋 Ready to push to GitHub!
echo 📋 Run this command:
echo   git push -u origin main
echo.
echo 🎯 This will upload all your files to GitHub!
echo.
pause
