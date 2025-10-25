#!/usr/bin/env node

/**
 * Rollback Dependencies Script
 * Restores system to previous working state
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Rolling back to previous state...\n');

function checkBackupFiles() {
  const backupFiles = [
    'package.json.backup',
    'package-lock.json.backup',
    'dependencies-backup.json',
    'system-snapshot.json'
  ];

  console.log('🔍 Checking available backups...');

  backupFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`   ✅ ${file} found`);
    } else {
      console.log(`   ❌ ${file} missing`);
    }
  });

  return backupFiles.filter(file => fs.existsSync(file));
}

function restorePackageFiles() {
  try {
    console.log('\n📦 Restoring package files...');

    // Restore package.json
    if (fs.existsSync('package.json.backup')) {
      fs.copyFileSync('package.json.backup', 'package.json');
      console.log('   ✅ package.json restored');
    }

    // Restore package-lock.json
    if (fs.existsSync('package-lock.json.backup')) {
      fs.copyFileSync('package-lock.json.backup', 'package-lock.json');
      console.log('   ✅ package-lock.json restored');
    }

    // Restore yarn.lock
    if (fs.existsSync('yarn.lock.backup')) {
      fs.copyFileSync('yarn.lock.backup', 'yarn.lock');
      console.log('   ✅ yarn.lock restored');
    }

    return true;
  } catch (error) {
    console.error('❌ Could not restore package files:', error.message);
    return false;
  }
}

function restoreConfiguration() {
  try {
    console.log('\n⚙️ Restoring configuration files...');

    const configFiles = [
      'next.config.js',
      'tailwind.config.js',
      'tsconfig.json',
      'postcss.config.js',
      '.eslintrc.json'
    ];

    configFiles.forEach(file => {
      const backupFile = `${file}.backup`;
      if (fs.existsSync(backupFile)) {
        fs.copyFileSync(backupFile, file);
        console.log(`   ✅ ${file} restored`);
      }
    });

    return true;
  } catch (error) {
    console.error('❌ Could not restore configuration:', error.message);
    return false;
  }
}

function reinstallDependencies() {
  try {
    console.log('\n📥 Reinstalling dependencies...');

    // Remove current node_modules
    console.log('   🗑️ Removing current node_modules...');
    if (fs.existsSync('node_modules')) {
      fs.rmSync('node_modules', { recursive: true, force: true });
    }

    // Remove current package-lock.json
    if (fs.existsSync('package-lock.json')) {
      fs.unlinkSync('package-lock.json');
    }

    // Fresh install
    console.log('   📦 Fresh npm install...');
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

    console.log('   ✅ Dependencies reinstalled');
    return true;
  } catch (error) {
    console.error('❌ Could not reinstall dependencies:', error.message);
    return false;
  }
}

function testAfterRollback() {
  try {
    console.log('\n🧪 Testing after rollback...');

    // TypeScript check
    console.log('   📝 TypeScript compilation...');
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    console.log('   ✅ TypeScript OK');

    // Build test
    console.log('   🔨 Build test...');
    execSync('npm run build', { stdio: 'pipe' });
    console.log('   ✅ Build OK');

    return true;
  } catch (error) {
    console.error('❌ Tests failed after rollback:', error.message);
    return false;
  }
}

function generateRollbackReport() {
  try {
    const report = {
      rollbackDate: new Date().toISOString(),
      reason: process.argv[2] || 'Manual rollback requested',
      restoredFiles: [],
      testsPassed: false,
      warnings: []
    };

    // Check what was restored
    if (fs.existsSync('package.json.backup')) report.restoredFiles.push('package.json');
    if (fs.existsSync('package-lock.json.backup')) report.restoredFiles.push('package-lock.json');
    if (fs.existsSync('dependencies-backup.json')) report.restoredFiles.push('dependency-info');

    // Test the restored state
    report.testsPassed = testAfterRollback();

    if (!report.testsPassed) {
      report.warnings.push('Tests failed after rollback - manual intervention may be needed');
    }

    fs.writeFileSync('rollback-report.json', JSON.stringify(report, null, 2));
    console.log('\n📊 Rollback report generated: rollback-report.json');

    return report;
  } catch (error) {
    console.error('❌ Could not generate rollback report:', error.message);
    return null;
  }
}

function cleanupBackupFiles() {
  try {
    console.log('\n🧹 Cleaning up backup files...');

    const backupFiles = [
      'package.json.backup',
      'package-lock.json.backup',
      'yarn.lock.backup',
      'dependencies-backup.json',
      'system-snapshot.json'
    ];

    backupFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`   ✅ ${file} removed`);
      }
    });

    // Remove config backups
    const configFiles = [
      'next.config.js.backup',
      'tailwind.config.js.backup',
      'tsconfig.json.backup',
      'postcss.config.js.backup',
      '.eslintrc.json.backup'
    ];

    configFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

    console.log('   ✅ Backup cleanup complete');
  } catch (error) {
    console.error('❌ Could not clean up backups:', error.message);
  }
}

function main() {
  try {
    console.log('🔄 Story Haven - Dependency Rollback System\n');

    // Check available backups
    const availableBackups = checkBackupFiles();

    if (availableBackups.length === 0) {
      console.log('❌ No backup files found!');
      console.log('💡 Run "npm run backup-deps" before updating to create backups.');
      process.exit(1);
    }

    const reason = process.argv[2] || 'Manual rollback';
    console.log(`📋 Rollback reason: ${reason}\n`);

    let rollbackSuccessful = true;

    // Step 1: Restore package files
    if (!restorePackageFiles()) rollbackSuccessful = false;

    // Step 2: Restore configuration
    if (!restoreConfiguration()) rollbackSuccessful = false;

    // Step 3: Reinstall dependencies
    if (!reinstallDependencies()) rollbackSuccessful = false;

    // Step 4: Test
    const testsPassed = testAfterRollback();

    // Step 5: Generate report
    const report = generateRollbackReport();

    // Success/Failure
    if (rollbackSuccessful && testsPassed) {
      console.log('\n🎉 Rollback completed successfully!');
      console.log('✅ System restored to previous working state');

      cleanupBackupFiles();

      console.log('\n📋 Rollback Summary:');
      console.log('   ✅ Package files restored');
      console.log('   ✅ Dependencies reinstalled');
      console.log('   ✅ Tests passed');
      console.log('   ✅ Backup files cleaned up');
    } else {
      console.log('\n⚠️ Rollback completed with issues');
      console.log('📋 Check rollback-report.json for details');
      console.log('💡 Manual intervention may be required');
    }

  } catch (error) {
    console.error('\n💥 Rollback process failed:', error.message);
    process.exit(1);
  }
}

main();
