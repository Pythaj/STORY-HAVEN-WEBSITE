@echo off
echo 🚀 Story Haven - GitHub Upload (Beginner Friendly)
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Please run this from the Story Haven website directory
    echo 📂 Navigate to: C:\Users\namuk\Desktop\STORY HAVEN WEBSITE
    pause
    exit /b 1
)

echo ✅ Found project files

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed
    echo 📥 Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git is installed

REM Initialize git if not already done
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
    echo ✅ Git repository created
) else (
    echo ✅ Git repository already exists
)

REM Add all files
echo 📁 Adding all files...
git add .
echo ✅ Files added

REM Commit files
echo 💾 Creating commit...
git commit -m "Complete Story Haven website"
echo ✅ Files committed

REM Set main branch
echo 🏷️ Setting main branch...
git branch -M main
echo ✅ Main branch set

echo.
echo 📋 NEXT STEPS:
echo   1. Create GitHub repository: https://github.com/new
echo   2. Repository name: story-haven-website
echo   3. Copy and run these commands (replace YOUR_USERNAME):
echo.
echo   git remote add origin https://github.com/YOUR_USERNAME/story-haven-website.git
echo   git push -u origin main
echo.
echo   4. Add Vercel secrets to GitHub
echo   5. Run final push command
echo.
echo 🎉 Your website will be live automatically!
echo.
echo 📝 Remember to replace YOUR_USERNAME with your actual GitHub username!
echo.
pause
