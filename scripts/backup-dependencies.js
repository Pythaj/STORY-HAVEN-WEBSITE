#!/usr/bin/env node

/**
 * Dependency Backup Script
 * Creates comprehensive backups before updates
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('💾 Creating comprehensive backup before updates...\n');

function backupPackageFiles() {
  try {
    console.log('📦 Backing up package files...');

    // Backup package.json
    if (fs.existsSync('package.json')) {
      fs.copyFileSync('package.json', 'package.json.backup');
      console.log('   ✅ package.json backed up');
    }

    // Backup package-lock.json
    if (fs.existsSync('package-lock.json')) {
      fs.copyFileSync('package-lock.json', 'package-lock.json.backup');
      console.log('   ✅ package-lock.json backed up');
    }

    // Backup yarn.lock if exists
    if (fs.existsSync('yarn.lock')) {
      fs.copyFileSync('yarn.lock', 'yarn.lock.backup');
      console.log('   ✅ yarn.lock backed up');
    }

    return true;
  } catch (error) {
    console.error('❌ Could not backup package files:', error.message);
    return false;
  }
}

function backupNodeModulesInfo() {
  try {
    console.log('📋 Creating dependency information backup...');

    // Read current package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    const backupInfo = {
      timestamp: new Date().toISOString(),
      dependencies: packageJson.dependencies,
      devDependencies: packageJson.devDependencies,
      nodeVersion: process.version,
      npmVersion: execSync('npm --version', { encoding: 'utf8' }).trim(),
      platform: process.platform,
      architecture: process.arch
    };

    // Get installed versions
    try {
      const installed = execSync('npm list --depth=0 --json', { encoding: 'utf8' });
      backupInfo.installedVersions = JSON.parse(installed).dependencies;
    } catch (error) {
      console.log('   ⚠️ Could not get installed versions');
    }

    fs.writeFileSync('dependencies-backup.json', JSON.stringify(backupInfo, null, 2));
    console.log('   ✅ Dependency information backed up');

    return true;
  } catch (error) {
    console.error('❌ Could not create dependency backup:', error.message);
    return false;
  }
}

function backupConfiguration() {
  try {
    console.log('⚙️ Backing up configuration files...');

    const configFiles = [
      'next.config.js',
      'tailwind.config.js',
      'tsconfig.json',
      'postcss.config.js',
      '.eslintrc.json'
    ];

    configFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.copyFileSync(file, `${file}.backup`);
        console.log(`   ✅ ${file} backed up`);
      }
    });

    return true;
  } catch (error) {
    console.error('❌ Could not backup configuration:', error.message);
    return false;
  }
}

function createSystemSnapshot() {
  try {
    console.log('📸 Creating system snapshot...');

    const snapshot = {
      timestamp: new Date().toISOString(),
      system: {
        nodeVersion: process.version,
        npmVersion: execSync('npm --version', { encoding: 'utf8' }).trim(),
        platform: process.platform,
        architecture: process.arch,
        totalMemory: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB',
        uptime: process.uptime()
      },
      packageInfo: {},
      warnings: []
    };

    // Get package info
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      snapshot.packageInfo = {
        name: packageJson.name,
        version: packageJson.version,
        dependencies: Object.keys(packageJson.dependencies).length,
        devDependencies: Object.keys(packageJson.devDependencies).length
      };
    } catch (error) {
      snapshot.warnings.push('Could not read package.json');
    }

    // Check disk space
    try {
      const diskUsage = execSync('wmic logicaldisk where name="C:" get size,freespace', { encoding: 'utf8' });
      snapshot.system.diskSpace = diskUsage;
    } catch (error) {
      snapshot.warnings.push('Could not check disk space');
    }

    fs.writeFileSync('system-snapshot.json', JSON.stringify(snapshot, null, 2));
    console.log('   ✅ System snapshot created');

    return true;
  } catch (error) {
    console.error('❌ Could not create system snapshot:', error.message);
    return false;
  }
}

function main() {
  try {
    console.log('💾 Story Haven - Comprehensive Backup System\n');

    let allBackupsSuccessful = true;

    // Step 1: Package files
    if (!backupPackageFiles()) allBackupsSuccessful = false;

    // Step 2: Dependency information
    if (!backupNodeModulesInfo()) allBackupsSuccessful = false;

    // Step 3: Configuration
    if (!backupConfiguration()) allBackupsSuccessful = false;

    // Step 4: System snapshot
    if (!createSystemSnapshot()) allBackupsSuccessful = false;

    // Success message
    console.log('\n📋 Backup Summary:');
    console.log('   💾 package.json.backup');
    console.log('   💾 package-lock.json.backup');
    console.log('   📋 dependencies-backup.json');
    console.log('   ⚙️ Configuration files backed up');
    console.log('   📸 system-snapshot.json');

    if (allBackupsSuccessful) {
      console.log('\n✅ All backups created successfully!');
      console.log('🚀 Safe to proceed with updates');
      console.log('\n📝 Backup files created:');
      console.log('   - package.json.backup');
      console.log('   - package-lock.json.backup');
      console.log('   - dependencies-backup.json');
      console.log('   - system-snapshot.json');
      console.log('   - Configuration files (.backup)');
    } else {
      console.log('\n⚠️ Some backups failed. Proceed with caution.');
    }

  } catch (error) {
    console.error('\n💥 Backup process failed:', error.message);
    process.exit(1);
  }
}

main();
