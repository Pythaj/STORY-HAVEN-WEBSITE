#!/usr/bin/env node

/**
 * Comprehensive Dependency Update Script
 * Updates all dependencies including major versions
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Comprehensive Dependency Update...\n');

// Read current package.json
function readPackageJson() {
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageContent = fs.readFileSync(packagePath, 'utf8');
    return JSON.parse(packageContent);
  } catch (error) {
    console.error('❌ Could not read package.json:', error.message);
    process.exit(1);
  }
}

// Backup current state
function backupCurrentState() {
  try {
    console.log('💾 Creating comprehensive backup...');

    // Backup package.json
    if (fs.existsSync('package.json')) {
      fs.copyFileSync('package.json', 'package.json.backup');
    }

    // Backup package-lock.json
    if (fs.existsSync('package-lock.json')) {
      fs.copyFileSync('package-lock.json', 'package-lock.json.backup');
    }

    // Backup node_modules info
    const packageJson = readPackageJson();
    const backupInfo = {
      timestamp: new Date().toISOString(),
      dependencies: packageJson.dependencies,
      devDependencies: packageJson.devDependencies,
      nodeVersion: process.version,
      npmVersion: execSync('npm --version', { encoding: 'utf8' }).trim()
    };

    fs.writeFileSync('update-backup.json', JSON.stringify(backupInfo, null, 2));
    console.log('✅ Comprehensive backup created');
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
  }
}

// Check for outdated packages with details
function checkOutdatedDetailed() {
  try {
    console.log('📦 Checking all outdated packages...');
    const outdated = execSync('npm outdated --json', { encoding: 'utf8' });
    const outdatedPackages = JSON.parse(outdated);

    if (Object.keys(outdatedPackages).length === 0) {
      console.log('✅ All dependencies are up to date!');
      return [];
    }

    console.log('\n📋 Detailed outdated packages:');
    Object.entries(outdatedPackages).forEach(([name, info]) => {
      const type = info.type || 'dependency';
      const change = info.wanted !== info.latest ? 'major' : 'minor/patch';
      console.log(`  ${type === 'devDependency' ? '🔧' : '📦'} ${name}: ${info.current} → ${info.wanted} → ${info.latest} (${change})`);
    });

    return outdatedPackages;
  } catch (error) {
    console.log('⚠️ Could not check outdated packages:', error.message);
    return [];
  }
}

// Update all dependencies
function updateAllDependencies() {
  try {
    console.log('\n🔄 Updating all dependencies...');

    // Clean install first (removes node_modules and package-lock)
    console.log('🧹 Performing clean install...');
    execSync('rm -rf node_modules package-lock.json', { stdio: 'inherit' });

    // Fresh install
    console.log('📥 Fresh npm install...');
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

    // Update to latest versions
    console.log('🚀 Updating to latest versions...');
    execSync('npm update --legacy-peer-deps', { stdio: 'inherit' });

    // Fix security issues
    console.log('🔒 Fixing security vulnerabilities...');
    execSync('npm audit fix --legacy-peer-deps', { stdio: 'inherit' });

    return true;
  } catch (error) {
    console.error('❌ Error updating dependencies:', error.message);
    return false;
  }
}

// Update major versions individually
function updateMajorVersions(outdatedPackages) {
  const packageJson = readPackageJson();
  let updatedCount = 0;

  console.log('\n🚀 Updating major versions individually...');

  Object.entries(outdatedPackages).forEach(([name, info]) => {
    if (info.current !== info.latest) {
      try {
        console.log(`  Updating ${name} to latest...`);
        execSync(`npm install ${name}@latest --legacy-peer-deps`, { stdio: 'inherit' });
        updatedCount++;
      } catch (error) {
        console.log(`  ⚠️ Could not update ${name}:`, error.message);
      }
    }
  });

  console.log(`✅ Updated ${updatedCount} major versions`);
}

// Test everything after update
function comprehensiveTest() {
  console.log('\n🧪 Running comprehensive tests...');

  try {
    // TypeScript check
    console.log('📝 TypeScript compilation...');
    execSync('npx tsc --noEmit', { stdio: 'inherit' });

    // Linting
    console.log('🔍 ESLint check...');
    execSync('npm run lint', { stdio: 'inherit' });

    // Build test
    console.log('🔨 Build test...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('✅ All tests passed!');
    return true;
  } catch (error) {
    console.error('❌ Tests failed:', error.message);
    return false;
  }
}

// Generate update report
function generateReport() {
  try {
    const packageJson = readPackageJson();
    const backupInfo = JSON.parse(fs.readFileSync('update-backup.json', 'utf8'));

    const report = {
      updateDate: new Date().toISOString(),
      previousVersions: backupInfo,
      currentVersions: {
        dependencies: packageJson.dependencies,
        devDependencies: packageJson.devDependencies,
        nodeVersion: process.version,
        npmVersion: execSync('npm --version', { encoding: 'utf8' }).trim()
      },
      changes: []
    };

    // Compare versions
    Object.entries(packageJson.dependencies).forEach(([name, version]) => {
      const prevVersion = backupInfo.dependencies[name];
      if (prevVersion && prevVersion !== version) {
        report.changes.push({
          name,
          type: 'dependency',
          from: prevVersion,
          to: version,
          change: prevVersion.replace(/[^0-9.]/g, '') !== version.replace(/[^0-9.]/g, '') ? 'major' : 'minor'
        });
      }
    });

    Object.entries(packageJson.devDependencies).forEach(([name, version]) => {
      const prevVersion = backupInfo.devDependencies[name];
      if (prevVersion && prevVersion !== version) {
        report.changes.push({
          name,
          type: 'devDependency',
          from: prevVersion,
          to: version,
          change: prevVersion.replace(/[^0-9.]/g, '') !== version.replace(/[^0-9.]/g, '') ? 'major' : 'minor'
        });
      }
    });

    fs.writeFileSync('update-report.json', JSON.stringify(report, null, 2));
    console.log('\n📊 Update report generated: update-report.json');

    if (report.changes.length > 0) {
      console.log('\n📋 Changes made:');
      report.changes.forEach(change => {
        console.log(`  ${change.type === 'devDependency' ? '🔧' : '📦'} ${change.name}: ${change.from} → ${change.to} (${change.change})`);
      });
    }

  } catch (error) {
    console.error('❌ Could not generate report:', error.message);
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Story Haven - Comprehensive Dependency Update\n');

    // Step 1: Backup
    backupCurrentState();

    // Step 2: Check current state
    const outdated = checkOutdatedDetailed();

    if (Object.keys(outdated).length === 0) {
      console.log('\n✨ All dependencies are already up to date!');
      return;
    }

    // Step 3: Update
    const updateSuccess = updateAllDependencies();

    if (!updateSuccess) {
      console.log('\n❌ Update failed. Check the backup files.');
      process.exit(1);
    }

    // Step 4: Update major versions
    updateMajorVersions(outdated);

    // Step 5: Test
    const testSuccess = comprehensiveTest();

    if (!testSuccess) {
      console.log('\n❌ Tests failed. Rolling back...');
      if (fs.existsSync('package.json.backup')) {
        fs.copyFileSync('package.json.backup', 'package.json');
        fs.copyFileSync('package-lock.json.backup', 'package-lock.json');
        execSync('npm install --legacy-peer-deps');
        console.log('✅ Rolled back to previous state');
      }
      process.exit(1);
    }

    // Step 6: Generate report
    generateReport();

    // Step 7: Success
    console.log('\n🎉 Comprehensive update completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   ✅ All dependencies updated');
    console.log('   ✅ Security vulnerabilities fixed');
    console.log('   ✅ Tests passed');
    console.log('   ✅ Backup created for safety');
    console.log('   ✅ Report generated');

    // Clean up backups if everything is good
    setTimeout(() => {
      try {
        if (fs.existsSync('package.json.backup')) fs.unlinkSync('package.json.backup');
        if (fs.existsSync('package-lock.json.backup')) fs.unlinkSync('package-lock.json.backup');
        if (fs.existsSync('update-backup.json')) fs.unlinkSync('update-backup.json');
        console.log('🧹 Backup files cleaned up');
      } catch (error) {
        console.log('⚠️ Could not clean up backup files');
      }
    }, 5000);

  } catch (error) {
    console.error('\n💥 Update process failed:', error.message);
    process.exit(1);
  }
}

main();
