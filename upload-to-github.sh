#!/bin/bash

echo "🚀 Story Haven - GitHub Upload Script"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the Story Haven website directory"
    exit 1
fi

echo "✅ In correct directory"

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "✅ Git is available"

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Add all files
echo "📁 Adding all files..."
git add .
echo "✅ Files added"

# Commit files
echo "💾 Creating commit..."
git commit -m "Complete Story Haven website with auto-update system"
echo "✅ Files committed"

# Set main branch
echo "🏷️ Setting main branch..."
git branch -M main
echo "✅ Main branch set"

echo ""
echo "📋 NEXT STEPS:"
echo "   1. Create GitHub repository: https://github.com/new"
echo "   2. Repository name: story-haven-website"
echo "   3. Copy the commands below (replace YOUR_USERNAME):"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/story-haven-website.git"
echo "   git push -u origin main"
echo ""
echo "   4. Add Vercel secrets to GitHub"
echo "   5. Push code to trigger deployment"
echo ""
echo "🎉 Your website will be live automatically!"

echo ""
echo "📝 Replace YOUR_USERNAME with your actual GitHub username!"
echo "🔥 Then your site will be at: https://story-haven.vercel.app"
