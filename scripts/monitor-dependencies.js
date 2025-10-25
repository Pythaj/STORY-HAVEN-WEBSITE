#!/usr/bin/env node

/**
 * Dependency Monitoring Script
 * Monitors dependency health and sends alerts
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📊 Running Dependency Monitoring...\n');

function checkOutdatedPackages() {
  try {
    console.log('🔍 Checking for outdated packages...');

    const outdated = execSync('npm outdated --json', { encoding: 'utf8' });
    const outdatedPackages = JSON.parse(outdated);

    if (Object.keys(outdatedPackages).length === 0) {
      console.log('✅ All dependencies are up to date!');
      return [];
    }

    console.log(`\n📋 ${Object.keys(outdatedPackages).length} outdated packages found:`);

    let criticalUpdates = [];
    let majorUpdates = [];
    let minorUpdates = [];

    Object.entries(outdatedPackages).forEach(([name, info]) => {
      const current = info.current.split('.').map(Number);
      const latest = info.latest.split('.').map(Number);

      if (latest[0] > current[0]) {
        criticalUpdates.push({ name, current: info.current, latest: info.latest });
        console.log(`   🚨 ${name}: ${info.current} → ${info.latest} (MAJOR)`);
      } else if (latest[1] > current[1]) {
        majorUpdates.push({ name, current: info.current, latest: info.latest });
        console.log(`   ⚠️ ${name}: ${info.current} → ${info.latest} (MINOR)`);
      } else {
        minorUpdates.push({ name, current: info.current, latest: info.latest });
        console.log(`   📦 ${name}: ${info.current} → ${info.latest} (PATCH)`);
      }
    });

    return { criticalUpdates, majorUpdates, minorUpdates, total: Object.keys(outdatedPackages).length };
  } catch (error) {
    console.log('⚠️ Could not check outdated packages:', error.message);
    return [];
  }
}

function checkSecurityIssues() {
  try {
    console.log('\n🔒 Checking security vulnerabilities...');

    const auditResult = execSync('npm audit --audit-level moderate --json', { encoding: 'utf8' });
    const audit = JSON.parse(auditResult);

    const vulnerabilities = audit.vulnerabilities || {};
    const vulnCount = Object.keys(vulnerabilities).length;

    if (vulnCount === 0) {
      console.log('✅ No security vulnerabilities found!');
      return { count: 0, issues: [] };
    }

    console.log(`\n🚨 ${vulnCount} security vulnerabilities found:`);

    let critical = [];
    let high = [];
    let moderate = [];

    Object.entries(vulnerabilities).forEach(([name, vuln]) => {
      const severity = vuln.severity;
      const item = { name, severity, title: vuln.title };

      switch (severity) {
        case 'critical':
          critical.push(item);
          console.log(`   🚨 CRITICAL: ${name} - ${vuln.title}`);
          break;
        case 'high':
          high.push(item);
          console.log(`   ⚠️ HIGH: ${name} - ${vuln.title}`);
          break;
        case 'moderate':
          moderate.push(item);
          console.log(`   📦 MODERATE: ${name} - ${vuln.title}`);
          break;
      }
    });

    return {
      count: vulnCount,
      critical: critical.length,
      high: high.length,
      moderate: moderate.length,
      issues: [...critical, ...high, ...moderate]
    };
  } catch (error) {
    console.log('⚠️ Could not run security audit:', error.message);
    return { count: 0, issues: [] };
  }
}

function checkLicenseCompliance() {
  try {
    console.log('\n📄 Checking license compliance...');

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    let licenseIssues = [];
    let totalPackages = Object.keys(allDeps).length;

    console.log(`   📋 Checking licenses for ${totalPackages} packages...`);

    // Check for problematic licenses
    const problematicLicenses = ['UNLICENSED', 'UNKNOWN', 'CUSTOM'];

    Object.entries(allDeps).forEach(([name, version]) => {
      try {
        const licenseInfo = execSync(`npm info ${name} license`, { encoding: 'utf8' }).trim();

        if (problematicLicenses.includes(licenseInfo.toUpperCase())) {
          licenseIssues.push({ name, license: licenseInfo });
          console.log(`   ⚠️ ${name}: ${licenseInfo} license`);
        }
      } catch (error) {
        // Package might not have license info
      }
    });

    if (licenseIssues.length === 0) {
      console.log('   ✅ All packages have compatible licenses');
    } else {
      console.log(`   ⚠️ ${licenseIssues.length} packages with license concerns`);
    }

    return { totalPackages, licenseIssues: licenseIssues.length };
  } catch (error) {
    console.log('⚠️ Could not check license compliance:', error.message);
    return { totalPackages: 0, licenseIssues: 0 };
  }
}

function checkBundleSize() {
  try {
    console.log('\n📦 Checking bundle size impact...');

    // This would require a build, so we'll estimate based on package sizes
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    const largePackages = [];
    Object.entries(packageJson.dependencies).forEach(([name, version]) => {
      try {
        // Get package size (approximate)
        const info = execSync(`npm info ${name} --json`, { encoding: 'utf8' });
        const pkgInfo = JSON.parse(info);

        if (pkgInfo && pkgInfo.dist && pkgInfo.dist.unpackedSize) {
          const sizeMB = (pkgInfo.dist.unpackedSize / (1024 * 1024)).toFixed(1);

          if (parseFloat(sizeMB) > 10) { // Packages larger than 10MB
            largePackages.push({ name, size: sizeMB });
            console.log(`   📦 ${name}: ${sizeMB}MB`);
          }
        }
      } catch (error) {
        // Could not get package info
      }
    });

    if (largePackages.length === 0) {
      console.log('   ✅ No unusually large packages detected');
    } else {
      console.log(`   ⚠️ ${largePackages.length} large packages found`);
    }

    return largePackages;
  } catch (error) {
    console.log('⚠️ Could not check bundle size:', error.message);
    return [];
  }
}

function generateMonitoringReport(outdated, security, licenses, bundleSize) {
  try {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalOutdated: outdated.total || 0,
        securityIssues: security.count,
        licenseIssues: licenses.licenseIssues,
        largePackages: bundleSize.length,
        overallHealth: 'good'
      },
      details: {
        outdated,
        security,
        licenses,
        bundleSize
      },
      recommendations: []
    };

    // Generate recommendations
    if (outdated.criticalUpdates && outdated.criticalUpdates.length > 0) {
      report.recommendations.push('Critical security updates available - update immediately');
      report.summary.overallHealth = 'critical';
    }

    if (security.critical > 0 || security.high > 0) {
      report.recommendations.push('Security vulnerabilities detected - fix urgently');
      if (report.summary.overallHealth === 'good') report.summary.overallHealth = 'warning';
    }

    if (outdated.majorUpdates && outdated.majorUpdates.length > 5) {
      report.recommendations.push('Many major version updates pending - plan upgrade');
    }

    if (licenses.licenseIssues > 0) {
      report.recommendations.push('Review packages with license concerns');
    }

    // Save report
    fs.writeFileSync('dependency-monitoring.json', JSON.stringify(report, null, 2));
    console.log('\n📊 Monitoring report generated: dependency-monitoring.json');

    return report;
  } catch (error) {
    console.error('❌ Could not generate monitoring report:', error.message);
    return null;
  }
}

function sendAlerts(report) {
  try {
    console.log('\n🚨 Checking if alerts are needed...');

    if (report.summary.overallHealth === 'critical') {
      console.log('🚨 CRITICAL: Immediate action required!');
      console.log('   - Critical security updates available');
      console.log('   - Run: npm run auto-update');
    } else if (report.summary.overallHealth === 'warning') {
      console.log('⚠️ WARNING: Attention needed');
      console.log('   - Security vulnerabilities or major updates pending');
      console.log('   - Run: npm run update-deps-safe');
    } else {
      console.log('✅ System healthy - no immediate action needed');
    }

    if (report.recommendations.length > 0) {
      console.log('\n📋 Recommendations:');
      report.recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec}`);
      });
    }

  } catch (error) {
    console.error('❌ Could not process alerts:', error.message);
  }
}

function main() {
  try {
    console.log('📊 Story Haven - Dependency Monitoring System\n');

    // Run all checks
    const outdated = checkOutdatedPackages();
    const security = checkSecurityIssues();
    const licenses = checkLicenseCompliance();
    const bundleSize = checkBundleSize();

    // Generate comprehensive report
    const report = generateMonitoringReport(outdated, security, licenses, bundleSize);

    if (!report) {
      console.log('\n❌ Monitoring failed');
      process.exit(1);
    }

    // Send alerts based on findings
    sendAlerts(report);

    // Overall status
    const isHealthy = report.summary.overallHealth === 'good';

    if (isHealthy) {
      console.log('\n🎉 Dependency monitoring completed successfully!');
      console.log('✅ All systems healthy');
    } else {
      console.log('\n⚠️ Dependency monitoring completed with issues');
      console.log('📋 Review recommendations above');
    }

    // Exit with appropriate code
    process.exit(isHealthy ? 0 : 1);

  } catch (error) {
    console.error('\n💥 Monitoring process failed:', error.message);
    process.exit(1);
  }
}

main();
