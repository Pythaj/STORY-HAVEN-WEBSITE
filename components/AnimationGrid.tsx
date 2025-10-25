'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Lock, Clock, Film } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AnimationGrid() {
  const [animations, setAnimations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnimations = async () => {
      try {
        const response = await fetch('/api/animations')
        if (response.ok) {
          const data = await response.json()
          setAnimations(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Failed to load animations:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAnimations()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto mb-4"></div>
        <p className="text-primary-gold-light">Loading animations...</p>
      </div>
    )
  }

  if (animations.length === 0) {
    return (
      <div className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-gold/10 flex items-center justify-center">
            <Film size={48} className="text-primary-gold/50" />
          </div>
          <h3 className="font-playfair text-2xl font-bold text-primary-gold mb-3">
            No Animations Yet
          </h3>
          <p className="text-primary-gold-light/70 mb-6">
            Amazing animated stories coming soon! Check back later for breathtaking visual adventures.
          </p>
          <Link href="/stories" className="btn-secondary inline-block">
            Browse Stories Instead
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {animations.map((animation, index) => (
        <motion.div
          key={animation.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="card overflow-hidden hover:scale-105 transition-transform duration-300">
            {/* Video Thumbnail */}
            <div className="relative h-56 mb-4 rounded-lg overflow-hidden">
              <Image
                src={animation.thumbnail_url || '/Watermark.jpg'}
                alt={animation.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-dark-900/40 group-hover:bg-dark-900/20 transition-colors" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary-gold/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                  <Play size={32} className="text-dark-900 ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-dark-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <Clock size={14} className="text-primary-gold" />
                <span className="text-primary-gold-light text-sm">{animation.duration}</span>
              </div>
            </div>

            {/* Animation Info */}
            <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">
              {animation.title}
            </h3>
            <p className="text-primary-gold-light/70 text-sm mb-4 line-clamp-2">
              {animation.description}
            </p>

            {/* Price and Action */}
            <div className="flex items-center justify-between">
              <div className="text-primary-gold font-bold text-xl">
                ₵{Number(animation.price || 0).toFixed(2)}
              </div>
              <Link
                href="/animations"
                className="flex items-center space-x-2 btn-primary text-sm"
              >
                <Play size={16} />
                <span>Preview</span>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
