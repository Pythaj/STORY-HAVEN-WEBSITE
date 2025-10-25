#!/bin/bash

echo "🚀 Story Haven - Quick Deployment Setup"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "✅ Git is installed"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the Story Haven website directory"
    exit 1
fi

echo "✅ In correct directory"

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Complete Story Haven website with auto-update system"
    git branch -M main
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "📋 NEXT STEPS:"
echo "   1. Create Vercel account: https://vercel.com"
echo "   2. Create GitHub repository: https://github.com/new"
echo "   3. Copy the secrets template from github-secrets-template.txt"
echo "   4. Add secrets to GitHub repository settings"
echo "   5. Update the git remote command with your username"
echo "   6. Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   7. Run: git push -u origin main"
echo ""
echo "🎉 Your site will deploy automatically!"
