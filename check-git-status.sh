#!/bin/bash

echo "🚀 Story Haven - GitHub Connection Check"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Not in the right directory"
    echo "📂 Please navigate to: C:\Users\namuk\Desktop\STORY HAVEN WEBSITE"
    exit 1
fi

echo "✅ In correct directory"

# Check git status
echo "🔍 Checking Git status..."
git status --porcelain > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Git repository initialized"

    # Check if files are committed
    if git log --oneline | head -1 > /dev/null 2>&1; then
        echo "✅ Files committed"
        echo "📋 Commits:"
        git log --oneline | head -3
    else
        echo "❌ No commits yet"
        echo "📋 Run: git add . && git commit -m 'Complete Story Haven website'"
    fi

    # Check remote
    if git remote -v | head -1 > /dev/null 2>&1; then
        echo "✅ Connected to GitHub"
        echo "📋 Remote:"
        git remote -v
    else
        echo "❌ Not connected to GitHub"
        echo "📋 Run: git remote add origin https://github.com/YOUR_USERNAME/story-haven-website.git"
    fi

else
    echo "❌ Git not initialized"
    echo "📋 Run: git init"
fi

echo ""
echo "📋 What to do next:"
if [ ! -d ".git" ]; then
    echo "   1. Run: git init"
    echo "   2. Run: git add ."
    echo "   3. Run: git commit -m 'Complete Story Haven website'"
fi

if ! git remote -v | head -1 > /dev/null 2>&1; then
    echo "   4. Create GitHub repository: https://github.com/new"
    echo "   5. Run: git remote add origin https://github.com/YOUR_USERNAME/story-haven-website.git"
fi

if ! git log --oneline | head -1 > /dev/null 2>&1; then
    echo "   6. Run: git push -u origin main"
fi

echo ""
echo "📝 Replace YOUR_USERNAME with your actual GitHub username!"
