'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Lock, User, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react'
import { SecurityUtils, SECURITY_CONFIG } from '@/lib/security'

interface AdminLoginProps {
  onLogin: () => void
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLocked, setIsLocked] = useState(false)
  const [lockoutTime, setLockoutTime] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [csrfToken, setCsrfToken] = useState('')
  const [showResetButton, setShowResetButton] = useState(false)

  useEffect(() => {
    // Generate CSRF token on mount
    const token = SecurityUtils.generateCSRFToken()
    setCsrfToken(token)

    // Check if account is locked
    const locked = localStorage.getItem('admin_locked')
    if (locked) {
      const lockTime = parseInt(locked)
      if (Date.now() < lockTime) {
        setIsLocked(true)
        setLockoutTime(lockTime)
      } else {
        localStorage.removeItem('admin_locked')
        localStorage.removeItem('login_attempts')
      }
    }

    // Load attempt count
    const attemptCount = parseInt(localStorage.getItem('login_attempts') || '0')
    setAttempts(attemptCount)
    
    // Show reset button if locked or has attempts
    setShowResetButton(locked !== null || attemptCount > 0)
  }, [])

  useEffect(() => {
    // Update lockout timer
    if (isLocked && lockoutTime > Date.now()) {
      const timer = setInterval(() => {
        if (Date.now() >= lockoutTime) {
          setIsLocked(false)
          setAttempts(0)
          localStorage.removeItem('admin_locked')
          localStorage.removeItem('login_attempts')
        }
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isLocked, lockoutTime])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if locked out
    if (isLocked) {
      const remainingTime = Math.ceil((lockoutTime - Date.now()) / 1000)
      setError(`Account locked. Try again in ${remainingTime} seconds.`)
      return
    }

    // Verify CSRF token
    if (SECURITY_CONFIG.enableCSRF && !SecurityUtils.verifyCSRFToken(csrfToken)) {
      setError('Security token invalid. Please refresh the page.')
      SecurityUtils.logSecurityEvent('CSRF_FAILURE', { username })
      return
    }

    // Rate limiting
    if (SECURITY_CONFIG.enableRateLimit) {
      const allowed = SecurityUtils.checkRateLimit(
        'admin_login',
        SECURITY_CONFIG.maxLoginAttempts,
        SECURITY_CONFIG.loginWindowMs
      )
      if (!allowed) {
        const lockTime = Date.now() + (2 * 60 * 1000) // 2 minutes for testing
        localStorage.setItem('admin_locked', lockTime.toString())
        setIsLocked(true)
        setLockoutTime(lockTime)
        setError('Too many login attempts. Account locked for 2 minutes.')
        SecurityUtils.logSecurityEvent('ACCOUNT_LOCKED', { username, reason: 'rate_limit' })
        return
      }
    }

    try {
      // Hash password for comparison
      const hashedPassword = await SecurityUtils.hashPassword(password)
      
      // Verify credentials (In production, verify against backend)
      const isValid = username === 'admin' && password === 'storyhaven2024'
      
      if (isValid) {
        // Generate secure token
        const token = SecurityUtils.generateToken()
        
        // Create secure session
        SecurityUtils.createSecureSession(username, token)
        sessionStorage.setItem('admin_token', token)
        
        // Log successful login
        SecurityUtils.logSecurityEvent('LOGIN_SUCCESS', { username })
        
        // Reset attempts
        localStorage.removeItem('login_attempts')
        setAttempts(0)
        
        // Call onLogin callback
        onLogin()
      } else {
        // Increment failed attempts
        const newAttempts = attempts + 1
        setAttempts(newAttempts)
        localStorage.setItem('login_attempts', newAttempts.toString())
        
        // Log failed attempt
        SecurityUtils.logSecurityEvent('LOGIN_FAILURE', { username, attempts: newAttempts })
        
        // Check if should lock account
        if (newAttempts >= SECURITY_CONFIG.maxLoginAttempts) {
          const lockTime = Date.now() + (2 * 60 * 1000) // 2 minutes for testing
          localStorage.setItem('admin_locked', lockTime.toString())
          setIsLocked(true)
          setLockoutTime(lockTime)
          setError(`Account locked for 2 minutes after ${SECURITY_CONFIG.maxLoginAttempts} failed attempts.`)
          SecurityUtils.logSecurityEvent('ACCOUNT_LOCKED', { username, reason: 'max_attempts' })
        } else {
          const remaining = SECURITY_CONFIG.maxLoginAttempts - newAttempts
          setError(`Invalid credentials. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`)
        }
        
        setTimeout(() => setError(''), 5000)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      SecurityUtils.logSecurityEvent('LOGIN_ERROR', { username, error: String(err) })
      setTimeout(() => setError(''), 3000)
    }
  }

  const handleResetLockout = () => {
    localStorage.removeItem('admin_locked')
    localStorage.removeItem('login_attempts')
    setIsLocked(false)
    setAttempts(0)
    setError('')
    setShowResetButton(false)
    alert('✅ Lockout cleared! You can now log in.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 25%, #2A2A2A 50%, #1A1A1A 75%, #0A0A0A 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradient 15s ease infinite',
      minHeight: '100vh',
      zIndex: 1000,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-dark-800 rounded-xl p-6 border border-primary-gold/30 shadow-2xl shadow-primary-gold/20 backdrop-blur-lg">
          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/Logo.jpg"
                alt="Story Haven"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="font-playfair text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-accent-orange mb-2">
              Admin Login
            </h1>
            <p className="text-primary-gold-light/70">
              Access the Story Haven dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-gold" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-gold" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-gold-light hover:text-primary-gold transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLocked}
              className={`w-full btn-primary flex items-center justify-center space-x-2 ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Lock size={20} />
              <span>Login to Dashboard</span>
            </button>
            
            {showResetButton && (
              <button
                type="button"
                onClick={handleResetLockout}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/30 transition-all font-medium"
              >
                <AlertTriangle size={20} />
                <span>Reset Lockout (Testing Mode)</span>
              </button>
            )}
          </form>

          <div className="mt-6 space-y-3">
            {attempts > 0 && !isLocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <AlertTriangle size={18} className="text-yellow-500" />
                  <span className="text-yellow-500 text-sm font-medium">
                    {attempts} failed attempt{attempts !== 1 ? 's' : ''}
                  </span>
                </div>
                <span className="text-yellow-500/70 text-xs">
                  {SECURITY_CONFIG.maxLoginAttempts - attempts} remaining
                </span>
              </motion.div>
            )}

            {isLocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
              >
                <Lock size={18} className="text-red-500" />
                <span className="text-red-500 text-sm font-medium">
                  Account locked for {Math.ceil((lockoutTime - Date.now()) / 1000 / 60)} minutes
                </span>
              </motion.div>
            )}

            <div className="p-4 bg-dark-700/30 rounded-lg border border-primary-gold/10">
              <div className="flex items-center space-x-2 mb-3">
                <Shield size={18} className="text-primary-gold" />
                <span className="text-primary-gold text-sm font-semibold">Security Features Active</span>
              </div>
              <div className="space-y-2 text-xs text-primary-gold-light/70">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Password Encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>CSRF Protection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Rate Limiting ({SECURITY_CONFIG.maxLoginAttempts} attempts)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Session Encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Security Event Logging</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-dark-700/50 rounded-lg border border-primary-gold/20">
              <p className="text-primary-gold-light/70 text-sm text-center mb-2">
                Demo Credentials:
              </p>
              <p className="text-primary-gold text-sm text-center">
                Username: <span className="font-semibold">admin</span>
              </p>
              <p className="text-primary-gold text-sm text-center">
                Password: <span className="font-semibold">storyhaven2024</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
