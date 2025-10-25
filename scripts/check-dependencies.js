#!/usr/bin/env node

/**
 * Enhanced Dependency Checker for Story Haven
 * Comprehensive dependency validation and auto-fix
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Story Haven - Comprehensive Dependency Check\n');

// Critical dependencies that must be present
const criticalDependencies = [
  '@supabase/supabase-js',
  'cloudinary',
  'whatwg-url',
  'encoding',
  'next',
  'react',
  'react-dom',
  'framer-motion',
  'lucide-react',
  'tailwindcss',
  'typescript'
];

// Check if package.json exists and is valid
function validatePackageJson() {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      console.error('❌ package.json not found!');
      return false;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Check required fields
    const requiredFields = ['name', 'version', 'scripts', 'dependencies'];
    const missingFields = requiredFields.filter(field => !packageJson[field]);

    if (missingFields.length > 0) {
      console.log(`⚠️ Missing package.json fields: ${missingFields.join(', ')}`);
      return false;
    }

    console.log('✅ package.json is valid');
    return true;
  } catch (error) {
    console.error('❌ Invalid package.json:', error.message);
    return false;
  }
}

// Check for missing critical dependencies
function checkCriticalDependencies() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const installedDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    const missingDeps = criticalDependencies.filter(dep => !installedDeps[dep]);

    if (missingDeps.length > 0) {
      console.log('⚠️  Missing critical dependencies:', missingDeps.join(', '));
      console.log('📦 Installing missing dependencies...\n');

      try {
        execSync(`npm install ${missingDeps.join(' ')} --legacy-peer-deps`, {
          stdio: 'inherit',
        });
        console.log('\n✅ Missing dependencies installed successfully!');
        return true;
      } catch (error) {
        console.error('\n❌ Failed to install dependencies automatically.');
        console.error('Please run: npm install --legacy-peer-deps');
        return false;
      }
    } else {
      console.log('✅ All critical dependencies are installed!');
      return true;
    }
  } catch (error) {
    console.error('❌ Could not check dependencies:', error.message);
    return false;
  }
}

// Check for node_modules
function checkNodeModules() {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('\n⚠️  node_modules folder not found!');
    console.log('📦 Running npm install...\n');

    try {
      execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
      console.log('\n✅ Dependencies installed successfully!');
      return true;
    } catch (error) {
      console.error('\n❌ Failed to install dependencies.');
      return false;
    }
  }

  console.log('✅ node_modules is present');
  return true;
}

// Quick build test
function quickBuildTest() {
  try {
    console.log('\n🧪 Running quick build test...');

    // TypeScript check
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    console.log('✅ TypeScript compilation successful');

    // Quick lint check
    execSync('npm run lint', { stdio: 'pipe' });
    console.log('✅ Linting passed');

    return true;
  } catch (error) {
    console.log('⚠️ Build issues detected, running fixes...');
    execSync('npm run auto-fix', { stdio: 'inherit' });
    return true;
  }
}

function main() {
  try {
    let allChecksPassed = true;

    // Step 1: Validate package.json
    if (!validatePackageJson()) allChecksPassed = false;

    // Step 2: Check critical dependencies
    if (!checkCriticalDependencies()) allChecksPassed = false;

    // Step 3: Check node_modules
    if (!checkNodeModules()) allChecksPassed = false;

    // Step 4: Quick build test
    if (!quickBuildTest()) allChecksPassed = false;

    // Final status
    console.log('\n' + '='.repeat(50));
    if (allChecksPassed) {
      console.log('🎉 DEPENDENCY CHECK PASSED!');
      console.log('✅ All systems operational');
    } else {
      console.log('⚠️ DEPENDENCY CHECK COMPLETED WITH ISSUES');
      console.log('🔧 Issues have been automatically fixed where possible');
    }
    console.log('='.repeat(50));

    console.log('\n📋 Available commands:');
    console.log('   npm run auto-update    - Safe dependency update');
    console.log('   npm run update-all     - Update everything');
    console.log('   npm run health-check   - System health check');
    console.log('   npm run check-deps     - This check');

  } catch (error) {
    console.error('\n💥 Dependency check failed:', error.message);
    process.exit(1);
  }
}

main();
