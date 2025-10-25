'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function QuickStats() {
  const [stats, setStats] = useState({ totalContent: 0, thisMonth: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuickStats = async () => {
      try {
        const [storiesRes, audioRes, animationsRes] = await Promise.all([
          fetch('/api/stories'),
          fetch('/api/audio'),
          fetch('/api/animations')
        ])

        const stories = storiesRes.ok ? await storiesRes.json() : []
        const audios = audioRes.ok ? await audioRes.json() : []
        const animations = animationsRes.ok ? await animationsRes.json() : []

        const totalContent = stories.length + audios.length + animations.length

        // Count items from this month
        const now = new Date()
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        
        const allContent = [...stories, ...audios, ...animations]
        const thisMonth = allContent.filter((item: any) => {
          const createdAt = new Date(item.created_at)
          return createdAt >= thisMonthStart
        }).length

        setStats({ totalContent, thisMonth })
      } catch (error) {
        console.error('Failed to fetch quick stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuickStats()
    // Refresh every 30 seconds
    const interval = setInterval(fetchQuickStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-6 z-50 bg-dark-800/95 backdrop-blur-sm border border-primary-gold/20 rounded-xl p-4 shadow-2xl"
    >
      <h3 className="text-primary-gold-light/70 text-sm font-semibold mb-3">
        Quick Stats
      </h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-primary-gold-light/60 text-sm">Total Content</span>
          <span className="text-primary-gold font-bold text-xl">{stats.totalContent}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-primary-gold-light/60 text-sm">This Month</span>
          <span className="text-green-400 font-bold text-lg">+{stats.thisMonth}</span>
        </div>
      </div>
    </motion.div>
  )
}
