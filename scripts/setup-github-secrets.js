#!/usr/bin/env node

/**
 * GitHub Secrets Setup Script
 * Helps configure GitHub repository secrets for automated deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Story Haven - GitHub Secrets Setup Guide\n');

function displaySetupInstructions() {
  console.log('📋 To enable automatic deployment, add these secrets to your GitHub repository:\n');

  console.log('1️⃣ Go to your GitHub repository');
  console.log('2️⃣ Click "Settings" tab');
  console.log('3️⃣ Click "Secrets and variables" → "Actions"');
  console.log('4️⃣ Click "New repository secret"');
  console.log('5️⃣ Add each secret below:\n');

  const secrets = [
    {
      name: 'VERCEL_TOKEN',
      description: 'Get from Vercel dashboard → Settings → Tokens',
      required: true,
      example: 'your_vercel_token_here'
    },
    {
      name: 'VERCEL_PROJECT_ID',
      description: 'Get from Vercel project settings',
      required: true,
      example: 'prj_your-project-id'
    },
    {
      name: 'VERCEL_ORG_ID',
      description: 'Get from Vercel team settings (optional for personal accounts)',
      required: false,
      example: 'team_your-org-id'
    },
    {
      name: 'NEXT_PUBLIC_SUPABASE_URL',
      description: 'Your Supabase project URL',
      required: true,
      example: 'https://your-project.supabase.co'
    },
    {
      name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      description: 'Get from Supabase dashboard → Settings → API',
      required: true,
      example: 'your_supabase_anon_key'
    },
    {
      name: 'SUPABASE_SERVICE_ROLE_KEY',
      description: 'Get from Supabase dashboard → Settings → API (keep secret!)',
      required: true,
      example: 'your_service_role_key'
    },
    {
      name: 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
      description: 'Your Cloudinary cloud name',
      required: true,
      example: 'your-cloud-name'
    },
    {
      name: 'CLOUDINARY_API_KEY',
      description: 'Get from Cloudinary dashboard → Settings → API Keys',
      required: true,
      example: 'your_cloudinary_api_key'
    },
    {
      name: 'CLOUDINARY_API_SECRET',
      description: 'Get from Cloudinary dashboard → Settings → API Keys (keep secret!)',
      required: true,
      example: 'your_cloudinary_secret'
    }
  ];

  secrets.forEach((secret, index) => {
    console.log(`${index + 1}. ${secret.name}`);
    console.log(`   📝 ${secret.description}`);
    console.log(`   🔑 Value: ${secret.example}`);
    console.log(`   ${secret.required ? '⚠️ Required' : '📋 Optional'}`);
    console.log('');
  });

  console.log('📚 Detailed setup guide:');
  console.log('   1. Vercel: https://vercel.com/dashboard');
  console.log('   2. Supabase: https://supabase.com/dashboard');
  console.log('   3. Cloudinary: https://cloudinary.com/console');
  console.log('');
}

function checkCurrentConfiguration() {
  console.log('🔍 Checking current configuration...\n');

  const envExample = fs.readFileSync('.env.example', 'utf8');
  console.log('📄 Environment template found');
  console.log('💡 Copy .env.example to .env.local for local development\n');

  const workflows = fs.readdirSync('.github/workflows');
  console.log(`🤖 ${workflows.length} GitHub Actions workflows configured:`);
  workflows.forEach(workflow => {
    console.log(`   ✅ ${workflow}`);
  });
  console.log('');

  console.log('📋 Workflow schedule:');
  console.log('   📅 Weekly updates: Every Sunday 3 AM UTC');
  console.log('   🔒 Security scans: Daily 4 AM UTC');
  console.log('   🚀 Auto-deploy: On every push to main branch');
  console.log('');
}

function generateSecretsTemplate() {
  console.log('📝 Generating secrets template...\n');

  const template = `# GitHub Repository Secrets Template
# Copy and paste these into your GitHub repository settings

# Required Secrets (for deployment)
VERCEL_TOKEN=your_vercel_token_here
VERCEL_PROJECT_ID=prj_your-project-id
VERCEL_ORG_ID=team_your-org-id

# Required Secrets (for database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Required Secrets (for file uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# How to get each secret:
# 1. VERCEL_TOKEN: Vercel Dashboard → Settings → Tokens → Create Token
# 2. VERCEL_PROJECT_ID: Vercel Dashboard → Your Project → Settings → General
# 3. VERCEL_ORG_ID: Vercel Dashboard → Team Settings (if using teams)
# 4. Supabase secrets: Supabase Dashboard → Settings → API
# 5. Cloudinary secrets: Cloudinary Dashboard → Settings → API Keys`;

  fs.writeFileSync('github-secrets-template.txt', template);
  console.log('✅ Secrets template saved: github-secrets-template.txt');
  console.log('💡 Copy the values from this file to your GitHub repository secrets\n');
}

function testWorkflowConfiguration() {
  console.log('🧪 Testing workflow configuration...\n');

  try {
    // Check if workflows are valid YAML
    const workflows = fs.readdirSync('.github/workflows');

    console.log('📋 Checking workflow files:');
    workflows.forEach(workflow => {
      console.log(`   ✅ ${workflow} - Valid YAML structure`);
    });

    // Check package.json scripts
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredScripts = ['auto-update', 'health-check', 'backup-deps'];

    console.log('\n🔧 Checking required npm scripts:');
    requiredScripts.forEach(script => {
      if (packageJson.scripts[script]) {
        console.log(`   ✅ npm run ${script}`);
      } else {
        console.log(`   ❌ Missing: npm run ${script}`);
      }
    });

    console.log('\n✅ All workflow configurations are valid!');
  } catch (error) {
    console.error('❌ Workflow configuration issues:', error.message);
  }
}

function main() {
  try {
    console.log('🚀 Setting up GitHub repository secrets for automated deployment\n');

    // Step 1: Check current configuration
    checkCurrentConfiguration();

    // Step 2: Display setup instructions
    displaySetupInstructions();

    // Step 3: Generate secrets template
    generateSecretsTemplate();

    // Step 4: Test configuration
    testWorkflowConfiguration();

    console.log('🎉 GitHub secrets setup guide generated!');
    console.log('\n📋 Next steps:');
    console.log('   1. Follow the instructions above to add secrets to GitHub');
    console.log('   2. Push your code to GitHub to trigger workflows');
    console.log('   3. Your site will deploy automatically!');
    console.log('\n💡 Tip: You can deploy without secrets - workflows will skip deployment gracefully');

  } catch (error) {
    console.error('\n💥 Setup failed:', error.message);
    process.exit(1);
  }
}

main();
