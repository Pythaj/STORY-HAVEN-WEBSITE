'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ContentWatermarkProps {
  isPurchased: boolean
  position?: 'center' | 'diagonal' | 'corners' | 'repeated'
  opacity?: number
}

export default function ContentWatermark({ 
  isPurchased, 
  position = 'diagonal',
  opacity = 0.15 
}: ContentWatermarkProps) {
  // Don't show watermark if content is purchased
  if (isPurchased) return null

  const renderWatermark = () => {
    switch (position) {
      case 'center':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ zIndex: 10 }}
          >
            <div className="text-center opacity-[0.06] blur-[0.5px]">
              <p className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-primary-gold transform -rotate-12">
                STORY HAVEN
              </p>
              <p className="text-xl md:text-3xl lg:text-4xl text-primary-gold-light mt-4">
                PREVIEW
              </p>
            </div>
          </motion.div>
        )

      case 'diagonal':
        return (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity, rotate: -45 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="absolute pointer-events-none select-none"
                style={{
                  top: `${i * 25}%`,
                  left: `${i * 20}%`,
                  zIndex: 10,
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 opacity-20">
                    <Image
                      src="/Watermark.jpg"
                      alt="Watermark"
                      fill
                      className="object-contain"
                      draggable={false}
                    />
                  </div>
                  <p className="text-primary-gold-light/40 text-xs font-bold whitespace-nowrap mt-1">
                    STORY HAVEN
                  </p>
                </div>
              </motion.div>
            ))}
          </>
        )

      case 'corners':
        return (
          <>
            {/* Top Left */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={{ opacity, x: 0, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-4 left-4 pointer-events-none select-none"
              style={{ zIndex: 10 }}
            >
              <div className="relative w-24 h-24 opacity-25">
                <Image src="/Watermark.jpg" alt="Watermark" fill className="object-contain" draggable={false} />
              </div>
            </motion.div>

            {/* Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute top-4 right-4 pointer-events-none select-none"
              style={{ zIndex: 10 }}
            >
              <div className="relative w-24 h-24 opacity-25">
                <Image src="/Watermark.jpg" alt="Watermark" fill className="object-contain" draggable={false} />
              </div>
            </motion.div>

            {/* Bottom Left */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-4 left-4 pointer-events-none select-none"
              style={{ zIndex: 10 }}
            >
              <div className="relative w-24 h-24 opacity-25">
                <Image src="/Watermark.jpg" alt="Watermark" fill className="object-contain" draggable={false} />
              </div>
            </motion.div>

            {/* Bottom Right */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-4 right-4 pointer-events-none select-none"
              style={{ zIndex: 10 }}
            >
              <div className="relative w-24 h-24 opacity-25">
                <Image src="/Watermark.jpg" alt="Watermark" fill className="object-contain" draggable={false} />
              </div>
            </motion.div>
          </>
        )

      case 'repeated':
        return (
          <div className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: 10 }}>
            <div className="grid grid-cols-3 gap-8 h-full p-8">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: opacity * 0.8, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex items-center justify-center"
                >
                  <div className="relative w-28 h-28 opacity-20">
                    <Image
                      src="/Watermark.jpg"
                      alt="Watermark"
                      fill
                      className="object-contain"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {renderWatermark()}
      
      {/* Watermark Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none select-none"
        style={{ zIndex: 11 }}
      >
        <div className="bg-dark-900/80 backdrop-blur-sm border border-primary-gold/30 rounded-full px-6 py-2">
          <p className="text-primary-gold-light/70 text-sm font-medium flex items-center space-x-2">
            <span className="w-2 h-2 bg-accent-orange rounded-full animate-pulse" />
            <span>Watermarked Preview • Purchase to unlock full content</span>
          </p>
        </div>
      </motion.div>
    </>
  )
}
