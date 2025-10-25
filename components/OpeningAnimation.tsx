'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useSiteSettings } from '@/contexts/SiteContext'

export default function OpeningAnimation() {
  const { settings } = useSiteSettings()
  const [showOpening, setShowOpening] = useState(true)
  const [animationStage, setAnimationStage] = useState(0)
  const [isAdminPage, setIsAdminPage] = useState(false)

  useEffect(() => {
    // Check if on admin page or animation disabled
    if (typeof window !== 'undefined') {
      const isAdmin = window.location.pathname.startsWith('/admin')
      setIsAdminPage(isAdmin)

      // Don't show animation if disabled in settings or on admin pages
      if (isAdmin || !settings.showOpeningAnimation) {
        setShowOpening(false)
      }
    }
  }, [settings.showOpeningAnimation])

  useEffect(() => {
    // Don't run animation on admin pages
    if (isAdminPage || !settings.showOpeningAnimation) {
      setShowOpening(false)
      return
    }

    // Beautiful animation sequence - plays on every page load
    const timers = [
      setTimeout(() => setAnimationStage(1), 200),   // Show particles (0.2s)
      setTimeout(() => setAnimationStage(2), 600),   // Show logo (0.6s)
      setTimeout(() => setAnimationStage(3), 1200),  // Show text (1.2s)
      setTimeout(() => setAnimationStage(4), 3000),  // Expand reveal (3s)
      setTimeout(() => {
        setShowOpening(false)
      }, 4000),  // Total: 4 seconds
    ]

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [isAdminPage, settings.showOpeningAnimation])

  // Don't show animation if dismissed or on admin page
  if (!showOpening) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-900 overflow-hidden"
      >
        {/* Animated Background Gradient */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: animationStage >= 1 ? 1.5 : 0.8,
            opacity: animationStage >= 1 ? 1 : 0,
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, rgba(10, 10, 10, 1) 70%)',
          }}
        />

        {/* Floating Particles - Reduced for performance */}
        {animationStage >= 1 && (
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => {
              const randomX = Math.random() * 100
              const randomColor = Math.random() > 0.5 ? '#D4AF37' : '#FF8C42'
              const randomDuration = Math.random() * 3 + 2
              const randomDelay = Math.random() * 0.5

              return (
                <motion.div
                  key={i}
                  initial={{
                    x: `${randomX}vw`,
                    y: '100vh',
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    y: '-100px',
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: randomDuration,
                    delay: randomDelay,
                    ease: 'easeOut',
                  }}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${randomColor}, transparent)`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              )
            })}
          </div>
        )}

        {/* Rotating Rings */}
        {animationStage >= 1 && (
          <>
            <motion.div
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                scale: animationStage >= 2 ? 1 : 0,
                rotate: 360,
                opacity: animationStage >= 2 ? 0.3 : 0,
              }}
              transition={{ duration: 3, ease: 'easeOut' }}
              className="absolute w-96 h-96 border-2 border-primary-gold rounded-full"
            />
            <motion.div
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                scale: animationStage >= 2 ? 1.3 : 0,
                rotate: -360,
                opacity: animationStage >= 2 ? 0.2 : 0,
              }}
              transition={{ duration: 3.5, ease: 'easeOut', delay: 0.2 }}
              className="absolute w-96 h-96 border-2 border-accent-orange rounded-full"
            />
          </>
        )}

        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col items-center" style={{ perspective: '1000px' }}>
          {/* Logo with Dramatic Entrance */}
          <motion.div
            initial={{ scale: 0, rotateY: -180, rotateZ: -180, opacity: 0, y: 0 }}
            animate={{
              scale: animationStage >= 2 ? 1 : 0,
              rotateY: animationStage >= 2 ? 0 : -180,
              rotateZ: animationStage >= 2 ? 0 : -180,
              opacity: animationStage >= 2 ? 1 : 0,
              y: animationStage >= 2 ? [0, -10, 0] : 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1], // Smooth easeOutExpo
              scale: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.2
              },
            }}
            className="relative mb-8"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              animate={{
                boxShadow: animationStage >= 2
                  ? [
                      '0 0 20px rgba(212, 175, 55, 0.5)',
                      '0 0 60px rgba(212, 175, 55, 0.8)',
                      '0 0 20px rgba(212, 175, 55, 0.5)',
                    ]
                  : '0 0 0px rgba(212, 175, 55, 0)',
                scale: animationStage >= 2 ? [1, 1.05, 1] : 1,
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-primary-gold/30"
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <Image
                src="/Logo.jpg"
                alt="Story Haven"
                fill
                className="object-cover"
                priority
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              />
            </motion.div>

            {/* Orbiting Stars with Smooth Animation */}
            {animationStage >= 2 && [...Array(12)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 12
              const radius = 100
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.2, 1, 1.2, 0],
                    opacity: [0, 1, 1, 1, 0],
                    x: [
                      Math.cos(angle) * radius,
                      Math.cos(angle + Math.PI / 6) * radius,
                      Math.cos(angle + Math.PI / 3) * radius,
                      Math.cos(angle + Math.PI / 2) * radius,
                      Math.cos(angle + Math.PI * 2 / 3) * radius,
                    ],
                    y: [
                      Math.sin(angle) * radius,
                      Math.sin(angle + Math.PI / 6) * radius,
                      Math.sin(angle + Math.PI / 3) * radius,
                      Math.sin(angle + Math.PI / 2) * radius,
                      Math.sin(angle + Math.PI * 2 / 3) * radius,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.08,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${i % 2 === 0 ? '#D4AF37' : '#FF8C42'}, transparent)`,
                    boxShadow: `0 0 10px ${i % 2 === 0 ? '#D4AF37' : '#FF8C42'}`,
                    top: '50%',
                    left: '50%',
                  }}
                />
              )
            })}
          </motion.div>

          {/* Title with Letter Animation */}
          {animationStage >= 3 && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex space-x-2">
                {settings.siteName.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 50, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="font-playfair text-6xl md:text-7xl font-bold text-primary-gold"
                    style={{
                      textShadow: '0 0 30px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4)',
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="text-primary-gold-light text-xl md:text-2xl text-center"
                style={{
                  textShadow: '0 0 20px rgba(244, 228, 183, 0.5)',
                }}
              >
                {settings.tagline}
              </motion.p>
            </div>
          )}

          {/* Loading Bar */}
          {animationStage >= 3 && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '300px', opacity: 1 }}
              transition={{ duration: 1.5, delay: 2 }}
              className="mt-12 h-1 bg-gradient-to-r from-primary-gold via-accent-orange to-primary-gold rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent"
                style={{ filter: 'blur(8px)' }}
              />
            </motion.div>
          )}
        </div>

        {/* Expanding Circle Transition */}
        {animationStage >= 4 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 10 }}
            transition={{ duration: 1, ease: 'easeIn' }}
            className="absolute inset-0 bg-dark-900 rounded-full"
            style={{ transformOrigin: 'center' }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
