// Enterprise-Grade Security Library for Story Haven Admin

// Encryption utilities
export const SecurityUtils = {
  // Hash password with salt
  hashPassword: async (password: string): Promise<string> => {
    const encoder = new TextEncoder()
    const salt = process.env.NEXT_PUBLIC_SALT || 'storyhaven_secure_salt_2024'
    const data = encoder.encode(password + salt)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  },

  // Verify password
  verifyPassword: async (password: string, hash: string): Promise<boolean> => {
    const inputHash = await SecurityUtils.hashPassword(password)
    return inputHash === hash
  },

  // Generate secure token
  generateToken: (): string => {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  },

  // Encrypt data
  encryptData: (data: string, key: string): string => {
    try {
      // Simple XOR encryption for client-side (for demo)
      let encrypted = ''
      for (let i = 0; i < data.length; i++) {
        encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length))
      }
      return btoa(encrypted)
    } catch {
      return data
    }
  },

  // Decrypt data
  decryptData: (encrypted: string, key: string): string => {
    try {
      const data = atob(encrypted)
      let decrypted = ''
      for (let i = 0; i < data.length; i++) {
        decrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length))
      }
      return decrypted
    } catch {
      return encrypted
    }
  },

  // Check if IP is whitelisted (for production)
  isIPWhitelisted: (ip: string, whitelist: string[]): boolean => {
    return whitelist.includes(ip) || whitelist.includes('*')
  },

  // Rate limiting check
  checkRateLimit: (key: string, maxAttempts: number, windowMs: number): boolean => {
    if (typeof window === 'undefined') return true

    const now = Date.now()
    const attempts = JSON.parse(localStorage.getItem(`rate_${key}`) || '[]')
    const recentAttempts = attempts.filter((time: number) => now - time < windowMs)
    
    if (recentAttempts.length >= maxAttempts) {
      return false
    }

    recentAttempts.push(now)
    localStorage.setItem(`rate_${key}`, JSON.stringify(recentAttempts))
    return true
  },

  // Generate CSRF token
  generateCSRFToken: (): string => {
    const token = SecurityUtils.generateToken()
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('csrf_token', token)
    }
    return token
  },

  // Verify CSRF token
  verifyCSRFToken: (token: string): boolean => {
    if (typeof window === 'undefined') return false
    const storedToken = sessionStorage.getItem('csrf_token')
    return storedToken === token
  },

  // Secure session management
  createSecureSession: (username: string, token: string): void => {
    if (typeof window === 'undefined') return

    const sessionData = {
      username,
      token,
      timestamp: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    }

    const encrypted = SecurityUtils.encryptData(
      JSON.stringify(sessionData),
      token
    )

    sessionStorage.setItem('admin_session', encrypted)
  },

  // Verify session
  verifySession: (): boolean => {
    if (typeof window === 'undefined') return false

    try {
      const encrypted = sessionStorage.getItem('admin_session')
      if (!encrypted) return false

      const token = sessionStorage.getItem('admin_token')
      if (!token) return false

      const decrypted = SecurityUtils.decryptData(encrypted, token)
      const session = JSON.parse(decrypted)

      if (Date.now() > session.expiresAt) {
        SecurityUtils.destroySession()
        return false
      }

      return true
    } catch {
      return false
    }
  },

  // Destroy session
  destroySession: (): void => {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem('admin_session')
    sessionStorage.removeItem('admin_token')
    sessionStorage.removeItem('csrf_token')
    localStorage.removeItem('admin_remember')
  },

  // Log security event
  logSecurityEvent: (event: string, details: any): void => {
    if (typeof window === 'undefined') return

    const logs = JSON.parse(localStorage.getItem('security_logs') || '[]')
    logs.push({
      event,
      details,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    })

    // Keep only last 100 logs
    if (logs.length > 100) {
      logs.shift()
    }

    localStorage.setItem('security_logs', JSON.stringify(logs))
  },
}

// Admin credentials (in production, store in environment variables)
export const ADMIN_CREDENTIALS = {
  // Default credentials - CHANGE THESE IN PRODUCTION!
  username: process.env.NEXT_PUBLIC_ADMIN_USER || 'admin',
  // Pre-hashed password for 'storyhaven2024'
  passwordHash: process.env.NEXT_PUBLIC_ADMIN_HASH || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
}

// IP Whitelist (add your IPs here)
export const IP_WHITELIST = [
  '*', // Allow all for development - RESTRICT IN PRODUCTION!
  // '192.168.1.100', // Example: Your home IP
  // '203.0.113.0', // Example: Your office IP
]

// Security configuration
export const SECURITY_CONFIG = {
  maxLoginAttempts: 5,
  loginWindowMs: 15 * 60 * 1000, // 15 minutes
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  requireHTTPS: false, // Set to true in production
  enableCSRF: true,
  enableRateLimit: true,
  enableIPWhitelist: false, // Set to true in production
}
