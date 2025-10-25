#!/usr/bin/env node

/**
 * Complete Deployment Setup Script
 * Guides through the entire deployment process
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Story Haven - Complete Deployment Setup\n');

function displayDeploymentSteps() {
  console.log('📋 COMPLETE DEPLOYMENT GUIDE\n');

  console.log('🎯 STEP 1: CREATE VERCEL ACCOUNT');
  console.log('   1. Go to: https://vercel.com');
  console.log('   2. Click "Sign Up" → Choose GitHub (recommended)');
  console.log('   3. Create account with Hobby plan (free)');
  console.log('   4. Verify email if needed');
  console.log('');

  console.log('🎯 STEP 2: CREATE PROJECT');
  console.log('   1. Click "Import Project"');
  console.log('   2. Connect your GitHub account');
  console.log('   3. Select "Story Haven Website" repository');
  console.log('   4. Project name: story-haven (or your choice)');
  console.log('   5. Framework: Next.js (auto-detected)');
  console.log('   6. Click "Deploy"');
  console.log('');

  console.log('🎯 STEP 3: GET VERCEL TOKEN');
  console.log('   1. Go to: https://vercel.com/dashboard');
  console.log('   2. Click your profile (top right) → Settings');
  console.log('   3. Click "Tokens" in sidebar → "Create Token"');
  console.log('   4. Name: "Story Haven Deployment"');
  console.log('   5. Copy the token (save it safely!)');
  console.log('');

  console.log('🎯 STEP 4: GET PROJECT ID');
  console.log('   1. Go to your project in Vercel dashboard');
  console.log('   2. Click "Settings" → "General"');
  console.log('   3. Find "Project ID" (starts with prj_)');
  console.log('   4. Copy the Project ID');
  console.log('');

  console.log('🎯 STEP 5: CREATE GITHUB REPOSITORY');
  console.log('   1. Go to: https://github.com/new');
  console.log('   2. Repository name: story-haven-website');
  console.log('   3. Make it public (or private if preferred)');
  console.log('   4. Click "Create repository"');
  console.log('');

  console.log('🎯 STEP 6: UPLOAD CODE TO GITHUB');
  console.log('   1. Open terminal in your project folder');
  console.log('   2. Run: git init');
  console.log('   3. Run: git add .');
  console.log('   4. Run: git commit -m "Complete Story Haven website"');
  console.log('   5. Run: git branch -M main');
  console.log('   6. Run: git remote add origin https://github.com/YOUR_USERNAME/story-haven-website.git');
  console.log('   7. Run: git push -u origin main');
  console.log('');

  console.log('🎯 STEP 7: ADD GITHUB SECRETS');
  console.log('   1. Go to GitHub repository → Settings');
  console.log('   2. Click "Secrets and variables" → "Actions"');
  console.log('   3. Click "New repository secret"');
  console.log('   4. Add each secret from the template');
  console.log('');

  console.log('🎯 STEP 8: DEPLOYMENT HAPPENS AUTOMATICALLY');
  console.log('   1. GitHub Actions start automatically');
  console.log('   2. Build process runs tests');
  console.log('   3. Deployment to Vercel begins');
  console.log('   4. Your site goes live! 🎉');
  console.log('');
}

function generateGitHubCommands() {
  console.log('💻 GITHUB SETUP COMMANDS\n');

  console.log('📝 Replace YOUR_USERNAME with your actual GitHub username:\n');

  console.log('# Initialize Git repository');
  console.log('git init');
  console.log('');
  console.log('# Add all files');
  console.log('git add .');
  console.log('');
  console.log('# Create initial commit');
  console.log('git commit -m "Complete Story Haven website with auto-update system"');
  console.log('');
  console.log('# Rename branch to main');
  console.log('git branch -M main');
  console.log('');
  console.log('# Connect to GitHub (replace YOUR_USERNAME)');
  console.log('git remote add origin https://github.com/YOUR_USERNAME/story-haven-website.git');
  console.log('');
  console.log('# Push to GitHub');
  console.log('git push -u origin main');
  console.log('');
}

function createDeploymentChecklist() {
  console.log('✅ DEPLOYMENT CHECKLIST\n');

  const checklist = [
    { item: 'Create Vercel account', status: 'pending', url: 'https://vercel.com' },
    { item: 'Create Vercel project', status: 'pending', url: 'https://vercel.com/dashboard' },
    { item: 'Get Vercel token', status: 'pending', url: 'https://vercel.com/dashboard → Settings → Tokens' },
    { item: 'Get Vercel project ID', status: 'pending', url: 'Project Settings → General' },
    { item: 'Create GitHub repository', status: 'pending', url: 'https://github.com/new' },
    { item: 'Upload code to GitHub', status: 'pending', url: 'Terminal with git commands' },
    { item: 'Add GitHub secrets', status: 'pending', url: 'Repository Settings → Secrets' },
    { item: 'Automatic deployment', status: 'pending', url: 'GitHub Actions' }
  ];

  checklist.forEach((item, index) => {
    console.log(`${index + 1}. [ ] ${item.item}`);
    console.log(`    🔗 ${item.url}`);
    console.log('');
  });

  console.log('💡 Mark each item as [✓] when completed!');
  console.log('');
}

function createQuickStartScript() {
  console.log('⚡ QUICK START SCRIPT\n');

  const script = `#!/bin/bash

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
`;

  fs.writeFileSync('deploy.sh', script);
  console.log('✅ Quick start script created: deploy.sh');
  console.log('💡 Run: chmod +x deploy.sh && ./deploy.sh');
  console.log('');
}

function main() {
  try {
    console.log('🎯 COMPLETE STORY HAVEN DEPLOYMENT GUIDE\n');

    // Display all deployment steps
    displayDeploymentSteps();

    // Generate GitHub commands
    generateGitHubCommands();

    // Create deployment checklist
    createDeploymentChecklist();

    // Create quick start script
    createQuickStartScript();

    console.log('🎉 DEPLOYMENT GUIDE COMPLETE!');
    console.log('\n📋 Summary:');
    console.log('   ✅ Vercel setup instructions provided');
    console.log('   ✅ GitHub commands generated');
    console.log('   ✅ Deployment checklist created');
    console.log('   ✅ Quick start script ready');
    console.log('   ✅ All secrets templates available');
    console.log('\n🚀 Follow the steps above and your site will be live in minutes!');
    console.log('\n💡 Need help? Check the detailed guides in the project root.');

  } catch (error) {
    console.error('\n💥 Setup failed:', error.message);
    process.exit(1);
  }
}

main();
