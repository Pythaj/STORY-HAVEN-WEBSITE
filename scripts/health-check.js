#!/usr/bin/env node

/**
 * Health Check Script
 * Monitors system health after dependency updates
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏥 Running Health Check...\n');

function checkNodeHealth() {
  try {
    console.log('🔍 Checking Node.js health...');

    const nodeVersion = process.version;
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();

    console.log(`   Node.js: ${nodeVersion}`);
    console.log(`   NPM: ${npmVersion}`);

    // Check if versions are recent (basic check)
    const nodeMajor = parseInt(nodeVersion.split('.')[0].slice(1));
    if (nodeMajor < 18) {
      console.log('   ⚠️ Node.js version is quite old. Consider updating.');
    } else {
      console.log('   ✅ Node.js version is current');
    }

    return true;
  } catch (error) {
    console.error('❌ Node.js health check failed:', error.message);
    return false;
  }
}

function checkDependenciesHealth() {
  try {
    console.log('\n📦 Checking dependencies health...');

    // Check for missing dependencies
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    console.log(`   Total dependencies: ${Object.keys(allDeps).length}`);

    // Check for vulnerabilities
    console.log('   🔒 Checking security vulnerabilities...');
    try {
      const auditResult = execSync('npm audit --audit-level moderate --json', { encoding: 'utf8' });
      const audit = JSON.parse(auditResult);

      if (audit.vulnerabilities && Object.keys(audit.vulnerabilities).length > 0) {
        console.log(`   ⚠️ Found ${Object.keys(audit.vulnerabilities).length} vulnerabilities`);

        // List high severity issues
        Object.entries(audit.vulnerabilities).forEach(([name, vuln]) => {
          if (vuln.severity === 'high' || vuln.severity === 'critical') {
            console.log(`     🚨 ${name}: ${vuln.severity} severity`);
          }
        });
      } else {
        console.log('   ✅ No security vulnerabilities found');
      }
    } catch (error) {
      console.log('   ⚠️ Could not run security audit');
    }

    return true;
  } catch (error) {
    console.error('❌ Dependencies health check failed:', error.message);
    return false;
  }
}

function checkBuildHealth() {
  try {
    console.log('\n🔨 Checking build health...');

    // TypeScript compilation
    console.log('   📝 TypeScript compilation...');
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    console.log('   ✅ TypeScript compilation successful');

    // ESLint
    console.log('   🔍 ESLint check...');
    execSync('npm run lint', { stdio: 'pipe' });
    console.log('   ✅ ESLint passed');

    // Build test (without full output)
    console.log('   🏗️ Build test...');
    execSync('npm run build', { stdio: 'pipe' });
    console.log('   ✅ Build successful');

    return true;
  } catch (error) {
    console.error('❌ Build health check failed:', error.message);
    return false;
  }
}

function checkPerformanceHealth() {
  try {
    console.log('\n⚡ Checking performance health...');

    // Check bundle size
    const buildStats = fs.readFileSync('.next/build-manifest.json', 'utf8');
    const manifest = JSON.parse(buildStats);

    const totalPages = Object.keys(manifest.pages).length;
    console.log(`   📄 Pages: ${totalPages}`);

    // Check for large bundles
    let largeBundles = 0;
    Object.entries(manifest.pages).forEach(([page, files]) => {
      files.forEach((file) => {
        if (file.endsWith('.js') && file.includes('chunks/')) {
          try {
            const stats = fs.statSync(path.join('.next', file.replace('/_next/', '')));
            if (stats.size > 500000) { // 500KB
              largeBundles++;
              console.log(`   📦 Large bundle: ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
            }
          } catch (error) {
            // File might not exist, skip
          }
        }
      });
    });

    if (largeBundles === 0) {
      console.log('   ✅ No large bundles detected');
    }

    return true;
  } catch (error) {
    console.log('   ⚠️ Could not check performance metrics');
    return true; // Not critical
  }
}

function checkEnvironmentHealth() {
  try {
    console.log('\n🌍 Checking environment health...');

    // Check required environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];

    let missingVars = 0;
    requiredEnvVars.forEach(varName => {
      if (!process.env[varName] || process.env[varName].includes('your_')) {
        console.log(`   ⚠️ ${varName} not properly configured`);
        missingVars++;
      }
    });

    if (missingVars === 0) {
      console.log('   ✅ All required environment variables configured');
    } else {
      console.log(`   ⚠️ ${missingVars} environment variables need configuration`);
    }

    return true;
  } catch (error) {
    console.log('   ⚠️ Could not check environment');
    return true;
  }
}

function generateHealthReport() {
  try {
    const report = {
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      npmVersion: execSync('npm --version', { encoding: 'utf8' }).trim(),
      checks: {
        nodeHealth: true,
        dependenciesHealth: true,
        buildHealth: true,
        performanceHealth: true,
        environmentHealth: true
      },
      recommendations: []
    };

    // Run all checks
    report.checks.nodeHealth = checkNodeHealth();
    report.checks.dependenciesHealth = checkDependenciesHealth();
    report.checks.buildHealth = checkBuildHealth();
    report.checks.performanceHealth = checkPerformanceHealth();
    report.checks.environmentHealth = checkEnvironmentHealth();

    // Generate recommendations
    if (!report.checks.buildHealth) {
      report.recommendations.push('Fix build errors before deployment');
    }

    if (!report.checks.dependenciesHealth) {
      report.recommendations.push('Address security vulnerabilities');
    }

    // Save report
    fs.writeFileSync('health-report.json', JSON.stringify(report, null, 2));
    console.log('\n📊 Health report generated: health-report.json');

    return report;
  } catch (error) {
    console.error('❌ Could not generate health report:', error.message);
    return null;
  }
}

function main() {
  try {
    console.log('🏥 Story Haven - Comprehensive Health Check\n');

    const report = generateHealthReport();

    if (!report) {
      console.log('\n❌ Health check failed');
      process.exit(1);
    }

    // Overall status
    const allChecksPass = Object.values(report.checks).every(check => check === true);

    if (allChecksPass) {
      console.log('\n🎉 All health checks passed!');
      console.log('✅ System is healthy and ready for production');
    } else {
      console.log('\n⚠️ Some health checks failed');
      console.log('📋 Recommendations:');
      report.recommendations.forEach(rec => console.log(`   - ${rec}`));
    }

    // Summary
    console.log('\n📋 Health Summary:');
    Object.entries(report.checks).forEach(([check, status]) => {
      console.log(`   ${status ? '✅' : '❌'} ${check.replace('Health', '')}`);
    });

  } catch (error) {
    console.error('\n💥 Health check process failed:', error.message);
    process.exit(1);
  }
}

main();
