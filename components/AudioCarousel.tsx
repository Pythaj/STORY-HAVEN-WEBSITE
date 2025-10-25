'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Lock, Clock } from 'lucide-react'
import Link from 'next/link'

function formatDuration(seconds?: number | null) {
  const total = Number(seconds || 0)
  const m = Math.floor(total / 60)
  const s = Math.floor(total % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function AudioCarousel() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/audio')
        if (res.ok) {
          const data = await res.json()
          setItems(Array.isArray(data) ? data.slice(0, 4) : [])
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="text-center text-primary-gold-light">Loading audio...</div>
  }

  if (!items.length) {
    return <div className="text-center text-primary-gold-light/70">No audio yet. Check back soon!</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((audio, index) => (
        <motion.div
          key={audio.id}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="card group hover:scale-105 transition-transform duration-300"
        >
          {/* Audio Visualizer Placeholder */}
          <div
            className="relative h-48 mb-4 rounded-lg bg-gradient-to-br from-accent-orange/20 to-primary-gold/20 flex items-center justify-center overflow-hidden"
            style={{ backgroundImage: audio?.cover_url ? `url(${audio.cover_url})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-primary-gold to-accent-orange rounded-full"
                  animate={{
                    height: [
                      `${Math.random() * 60 + 20}%`,
                      `${Math.random() * 60 + 20}%`,
                      `${Math.random() * 60 + 20}%`,
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
            <div className="relative z-10 w-16 h-16 rounded-full bg-primary-gold flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
              <Play size={28} className="text-dark-900 ml-1" fill="currentColor" />
            </div>
          </div>

          {/* Audio Info */}
          <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">{audio.title}</h3>
          <p className="text-primary-gold-light/70 text-sm mb-3 line-clamp-2">{audio.description}</p>

          {/* Duration and Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-primary-gold-light">
              <Clock size={16} />
              <span className="text-sm">{formatDuration(audio.duration)}</span>
            </div>
            <div className="text-primary-gold font-bold">₵{Number(audio.price || 0).toFixed(2)}</div>
          </div>

          {/* Actions */}
          <Link href={`/audio`} className="w-full flex items-center justify-center space-x-2 btn-primary text-sm">
            <Lock size={16} />
            <span>Unlock Full Audio</span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
