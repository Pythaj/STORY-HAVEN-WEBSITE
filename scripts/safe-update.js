#!/usr/bin/env node

/**
 * Safe Dependency Update Script
 * Updates dependencies safely with rollback capability
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Starting Safe Dependency Update...\n');

// Backup current package-lock.json
function backupPackageLock() {
  try {
    const backupPath = path.join(process.cwd(), 'package-lock.json.backup');
    if (fs.existsSync('package-lock.json')) {
      fs.copyFileSync('package-lock.json', backupPath);
      console.log('✅ Package-lock.json backed up');
    }
  } catch (error) {
    console.log('⚠️ Could not backup package-lock.json:', error.message);
  }
}

// Check for outdated packages
function checkOutdated() {
  try {
    console.log('📦 Checking for outdated packages...');
    const outdated = execSync('npm outdated --json', { encoding: 'utf8' });
    const outdatedPackages = JSON.parse(outdated);

    if (Object.keys(outdatedPackages).length === 0) {
      console.log('✅ All dependencies are up to date!');
      return [];
    }

    console.log('📋 Outdated packages found:');
    Object.entries(outdatedPackages).forEach(([name, info]) => {
      console.log(`  - ${name}: ${info.current} → ${info.latest}`);
    });

    return outdatedPackages;
  } catch (error) {
    console.log('⚠️ Could not check outdated packages:', error.message);
    return [];
  }
}

// Update dependencies safely
function updateDependencies() {
  try {
    console.log('\n🔄 Updating dependencies...');

    // Update patch and minor versions first (safer)
    console.log('📦 Updating patch and minor versions...');
    execSync('npm update', { stdio: 'inherit' });

    // Check for security vulnerabilities
    console.log('\n🔒 Checking security vulnerabilities...');
    try {
      execSync('npm audit fix --legacy-peer-deps', { stdio: 'inherit' });
      console.log('✅ Security fixes applied');
    } catch (error) {
      console.log('⚠️ Some security issues may remain (this is normal)');
    }

    // Update major versions with caution
    console.log('\n🚀 Checking for major version updates...');
    const outdated = checkOutdated();

    if (Object.keys(outdated).length > 0) {
      console.log('⚠️ Major version updates available. Run manually with:');
      console.log('   npm install package-name@latest');
    }

    return true;
  } catch (error) {
    console.error('❌ Error updating dependencies:', error.message);
    return false;
  }
}

// Test build after update
function testBuild() {
  try {
    console.log('\n🧪 Testing build after updates...');

    // Run linting
    console.log('🔍 Running linting...');
    execSync('npm run lint', { stdio: 'inherit' });

    // Run TypeScript check
    console.log('📝 Running TypeScript check...');
    execSync('npx tsc --noEmit', { stdio: 'inherit' });

    console.log('✅ Build test passed!');
    return true;
  } catch (error) {
    console.error('❌ Build test failed:', error.message);
    return false;
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Story Haven - Safe Dependency Update\n');

    // Step 1: Backup
    backupPackageLock();

    // Step 2: Check current state
    const outdated = checkOutdated();

    if (Object.keys(outdated).length === 0) {
      console.log('\n✨ All dependencies are already up to date!');
      return;
    }

    // Step 3: Update
    const updateSuccess = updateDependencies();

    if (!updateSuccess) {
      console.log('\n❌ Update failed. Rolling back...');
      if (fs.existsSync('package-lock.json.backup')) {
        fs.copyFileSync('package-lock.json.backup', 'package-lock.json');
        console.log('✅ Rolled back to previous state');
      }
      process.exit(1);
    }

    // Step 4: Test
    const testSuccess = testBuild();

    if (!testSuccess) {
      console.log('\n❌ Tests failed. Consider manual review.');
      process.exit(1);
    }

    // Step 5: Success
    console.log('\n🎉 Safe update completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Test your application manually');
    console.log('   2. Check for any breaking changes in updated packages');
    console.log('   3. Update documentation if needed');

    // Clean up backup if everything is good
    if (fs.existsSync('package-lock.json.backup')) {
      fs.unlinkSync('package-lock.json.backup');
      console.log('🧹 Backup cleaned up');
    }

  } catch (error) {
    console.error('\n💥 Update process failed:', error.message);
    process.exit(1);
  }
}

main();
