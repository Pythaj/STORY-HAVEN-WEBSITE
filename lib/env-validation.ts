/**
 * Environment Variables Validation
 * Ensures all required environment variables are properly configured
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY',
  'PAYSTACK_SECRET_KEY',
  'NEXT_PUBLIC_ADMIN_USER',
  'NEXT_PUBLIC_ADMIN_HASH',
  'NEXT_PUBLIC_SALT',
  'ADMIN_SECRET_KEY',
  'NEXT_PUBLIC_SITE_URL'
]

const optionalEnvVars = [
  'MTN_MOMO_API_KEY',
  'MTN_MOMO_USER_ID',
  'MTN_MOMO_SUBSCRIPTION_KEY',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASSWORD'
]

export function validateEnvironmentVariables() {
  const missingRequired = []
  const missingOptional = []

  // Check required variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar] || process.env[envVar] === '') {
      missingRequired.push(envVar)
    }
  }

  // Check optional variables
  for (const envVar of optionalEnvVars) {
    if (!process.env[envVar] || process.env[envVar] === '') {
      missingOptional.push(envVar)
    }
  }

  return {
    isValid: missingRequired.length === 0,
    missingRequired,
    missingOptional,
    totalRequired: requiredEnvVars.length,
    totalOptional: optionalEnvVars.length
  }
}

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // During build time, provide fallback values to prevent build failures
  if (!url || !anonKey) {
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      console.warn('⚠️  Missing Supabase environment variables. Some features may not work correctly.')
      return {
        url: url || 'https://placeholder.supabase.co',
        anonKey: anonKey || 'placeholder-anon-key',
        serviceKey: serviceKey || anonKey || 'placeholder-service-key'
      }
    }
    throw new Error('Missing required Supabase environment variables')
  }

  return {
    url,
    anonKey,
    serviceKey: serviceKey || anonKey // Fallback to anon key if service key not available
  }
}

export function getCloudinaryConfig() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  // During build time, provide fallback values to prevent build failures
  if (!cloudName || !apiKey || !apiSecret) {
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      console.warn('⚠️  Missing Cloudinary environment variables. File uploads may not work correctly.')
      return {
        cloudName: cloudName || 'placeholder-cloud',
        apiKey: apiKey || 'placeholder-api-key',
        apiSecret: apiSecret || 'placeholder-api-secret'
      }
    }
    throw new Error('Missing required Cloudinary environment variables')
  }

  return {
    cloudName,
    apiKey,
    apiSecret
  }
}

export function getAdminConfig() {
  const adminUser = process.env.NEXT_PUBLIC_ADMIN_USER
  const adminHash = process.env.NEXT_PUBLIC_ADMIN_HASH
  const salt = process.env.NEXT_PUBLIC_SALT
  const secretKey = process.env.ADMIN_SECRET_KEY

  // During build time, provide fallback values to prevent build failures
  if (!adminUser || !adminHash || !salt || !secretKey) {
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      console.warn('⚠️  Missing admin environment variables. Admin features may not work correctly.')
      return {
        adminUser: adminUser || 'admin',
        adminHash: adminHash || 'placeholder-hash',
        salt: salt || 'placeholder-salt',
        secretKey: secretKey || 'placeholder-secret-key'
      }
    }
    throw new Error('Missing required admin environment variables')
  }

  return {
    adminUser,
    adminHash,
    salt,
    secretKey
  }
}
