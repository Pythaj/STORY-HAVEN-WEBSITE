#!/usr/bin/env node

/**
 * Auto-Fix Script for Story Haven
 * Automatically fixes common dependency and build issues
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 Auto-Fix: Checking for common issues...\n');

function runCommand(command, description) {
  console.log(`⚙️  ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} - Done!\n`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} - Failed!\n`);
    return false;
  }
}

// Check if .env.local exists
if (!fs.existsSync('.env.local')) {
  console.log('⚠️  .env.local not found!');
  console.log('📝 Creating .env.local from .env.example...\n');
  
  if (fs.existsSync('.env.example')) {
    fs.copyFileSync('.env.example', '.env.local');
    console.log('✅ .env.local created! Please fill in your credentials.\n');
  } else {
    console.log('❌ .env.example not found. Please create .env.local manually.\n');
  }
}

// Fix common issues
const fixes = [
  {
    command: 'npm install whatwg-url encoding --legacy-peer-deps',
    description: 'Installing missing Supabase dependencies',
  },
  {
    command: 'npm audit fix --legacy-peer-deps',
    description: 'Fixing security vulnerabilities',
  },
];

let allFixed = true;
for (const fix of fixes) {
  const success = runCommand(fix.command, fix.description);
  if (!success) allFixed = false;
}

if (allFixed) {
  console.log('🎉 All issues fixed! Your site should work now.\n');
  console.log('Run: npm run dev\n');
} else {
  console.log('⚠️  Some issues could not be fixed automatically.');
  console.log('Please check the errors above and fix manually.\n');
}
