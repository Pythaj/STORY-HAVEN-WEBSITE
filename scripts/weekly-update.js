#!/usr/bin/env node

/**
 * Weekly Automated Update Script
 * Designed to run automatically on a schedule
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📅 Running Weekly Automated Update...\n');

// Check if this is a safe time to update
function checkSafeUpdateTime() {
  const now = new Date();
  const hour = now.getHours();

  // Only update during low-traffic hours (2 AM - 6 AM)
  if (hour >= 2 && hour <= 6) {
    console.log(`🕐 Current time: ${now.toLocaleTimeString()} - Safe for updates`);
    return true;
  } else {
    console.log(`🕐 Current time: ${now.toLocaleTimeString()} - Not safe for updates`);
    console.log('💡 Updates only run between 2 AM - 6 AM to avoid disrupting users');
    return false;
  }
}

// Check system load
function checkSystemLoad() {
  try {
    console.log('🔍 Checking system load...');

    // Check if dev server is running
    try {
      execSync('tasklist | findstr "node" | findstr "next" >nul 2>&1');
      console.log('   ⚠️ Development server is running');
      console.log('   💡 Please stop the dev server before running updates');
      return false;
    } catch (error) {
      console.log('   ✅ No development server running');
    }

    // Check available disk space
    try {
      const diskSpace = execSync('wmic logicaldisk where name="C:" get freespace', { encoding: 'utf8' });
      const freeBytes = parseInt(diskSpace.split('\n')[1].trim());
      const freeGB = freeBytes / (1024 * 1024 * 1024);

      if (freeGB < 1) {
        console.log(`   ❌ Not enough disk space: ${freeGB.toFixed(1)}GB available`);
        return false;
      } else {
        console.log(`   ✅ Sufficient disk space: ${freeGB.toFixed(1)}GB available`);
      }
    } catch (error) {
      console.log('   ⚠️ Could not check disk space');
    }

    return true;
  } catch (error) {
    console.error('❌ System load check failed:', error.message);
    return false;
  }
}

// Pre-flight checks
function runPreFlightChecks() {
  console.log('✈️ Running pre-flight checks...\n');

  // Check safe time
  if (!checkSafeUpdateTime()) {
    console.log('\n⏰ Update cancelled: Not safe time');
    return false;
  }

  // Check system load
  if (!checkSystemLoad()) {
    console.log('\n🛑 Update cancelled: System not ready');
    return false;
  }

  // Check internet connection
  try {
    console.log('🌐 Checking internet connection...');
    execSync('ping -n 1 google.com >nul 2>&1');
    console.log('   ✅ Internet connection available');
  } catch (error) {
    console.log('   ❌ No internet connection');
    return false;
  }

  return true;
}

// Update process
function runUpdateProcess() {
  try {
    console.log('\n🚀 Starting update process...\n');

    // Step 1: Backup
    console.log('📦 Creating comprehensive backup...');
    execSync('node scripts/backup-dependencies.js', { stdio: 'inherit' });

    // Step 2: Safe update
    console.log('\n🔄 Running safe dependency update...');
    execSync('node scripts/safe-update.js', { stdio: 'inherit' });

    // Step 3: Test
    console.log('\n🧪 Testing after update...');
    execSync('node scripts/health-check.js', { stdio: 'inherit' });

    // Step 4: Generate report
    console.log('\n📊 Generating weekly report...');
    generateWeeklyReport();

    console.log('\n🎉 Weekly update completed successfully!');

    return true;
  } catch (error) {
    console.error('\n❌ Weekly update failed:', error.message);

    // Attempt rollback
    console.log('\n🔄 Attempting automatic rollback...');
    try {
      execSync('node scripts/rollback-dependencies.js "Weekly update failed"', { stdio: 'inherit' });
      console.log('✅ Automatic rollback completed');
    } catch (rollbackError) {
      console.error('❌ Rollback also failed:', rollbackError.message);
    }

    return false;
  }
}

// Generate weekly report
function generateWeeklyReport() {
  try {
    const report = {
      type: 'weekly-update',
      timestamp: new Date().toISOString(),
      success: true,
      summary: 'Automated weekly dependency update completed',
      nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      recommendations: [
        'Monitor application for any issues over the next 24 hours',
        'Check logs for any new warnings or errors',
        'Test all major features after the update'
      ]
    };

    fs.writeFileSync('weekly-update-report.json', JSON.stringify(report, null, 2));
    console.log('   📊 Weekly report saved: weekly-update-report.json');

  } catch (error) {
    console.error('❌ Could not generate weekly report:', error.message);
  }
}

// Schedule next update
function scheduleNextUpdate() {
  try {
    console.log('\n📅 Scheduling next update...');

    const nextUpdate = new Date();
    nextUpdate.setDate(nextUpdate.getDate() + 7); // Next week
    nextUpdate.setHours(3, 0, 0, 0); // 3 AM next week

    const scheduleInfo = {
      nextUpdate: nextUpdate.toISOString(),
      frequency: 'weekly',
      time: '3:00 AM',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    fs.writeFileSync('update-schedule.json', JSON.stringify(scheduleInfo, null, 2));
    console.log(`   ✅ Next update scheduled for: ${nextUpdate.toLocaleDateString()} at ${nextUpdate.toLocaleTimeString()}`);

  } catch (error) {
    console.error('❌ Could not schedule next update:', error.message);
  }
}

function main() {
  try {
    console.log('📅 Story Haven - Weekly Automated Update\n');

    // Pre-flight checks
    if (!runPreFlightChecks()) {
      console.log('\n⏰ Update cancelled - System not ready');
      process.exit(0); // Exit successfully, not an error
    }

    // Run update
    const updateSuccess = runUpdateProcess();

    if (updateSuccess) {
      // Schedule next update
      scheduleNextUpdate();

      console.log('\n🎉 Weekly update cycle completed!');
      console.log('📋 Next update: 7 days from now');
      console.log('💡 Monitor the application and report any issues');
    } else {
      console.log('\n❌ Weekly update failed');
      console.log('📋 Check the logs for detailed error information');
      console.log('💡 Manual intervention may be required');
    }

  } catch (error) {
    console.error('\n💥 Weekly update process failed:', error.message);
    process.exit(1);
  }
}

main();
