import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Eye, BookOpen, Headphones, Film, DollarSign, TrendingUp, RefreshCcw, AlertTriangle } from 'lucide-react'

interface DashboardStatsProps {
  onTabChange: (tab: string) => void
}

interface ContentStats {
  storiesCount: number
  audioCount: number
  animationsCount: number
  totalViews: number
  totalLikes: number
  totalRevenue: number
  thisMonthRevenue?: number
}

export default function DashboardStats({ onTabChange }: DashboardStatsProps) {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<ContentStats>({
    storiesCount: 0,
    audioCount: 0,
    animationsCount: 0,
    totalViews: 0,
    totalLikes: 0,
    totalRevenue: 0,
    thisMonthRevenue: 0
  })
  const [recentContent, setRecentContent] = useState<any[]>([])
  const [topContent, setTopContent] = useState<any[]>([])
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetting, setResetting] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [storiesRes, audioRes, animationsRes, purchasesRes, purchasesDataRes] = await Promise.all([
          fetch('/api/stories'),
          fetch('/api/audio'),
          fetch('/api/animations'),
          fetch('/api/purchases/stats'),
          fetch('/api/purchases')
        ])

        const stories = storiesRes.ok ? await storiesRes.json() : []
        const audios = audioRes.ok ? await audioRes.json() : []
        const animations = animationsRes.ok ? await animationsRes.json() : []
        const purchasesStats = purchasesRes.ok ? await purchasesRes.json() : { totalRevenue: 0, totalSales: 0 }
        const salesData = purchasesDataRes.ok ? await purchasesDataRes.json() : []

        // Calculate content totals
        const totalViews =
          (stories.reduce((sum: number, s: any) => sum + Number(s.views || 0), 0)) +
          (audios.reduce((sum: number, a: any) => sum + Number(a.plays || 0), 0)) +
          (animations.reduce((sum: number, an: any) => sum + Number(an.views || 0), 0))

        const totalLikes =
          (stories.reduce((sum: number, s: any) => sum + Number(s.rating || 0), 0)) +
          (audios.reduce((sum: number, a: any) => sum + Number(a.rating || 0), 0)) +
          (animations.reduce((sum: number, an: any) => sum + Number(an.likes || 0), 0))

        // Use real sales data instead of estimated revenue
        const realRevenue = purchasesStats.totalRevenue || 0
        const realSales = purchasesStats.totalSales || 0

        // Calculate this month's revenue from real sales data
        const now = new Date()
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const thisMonthRevenue = salesData
          .filter((sale: any) => new Date(sale.created_at) >= thisMonthStart)
          .reduce((sum: number, sale: any) => sum + (sale.amount || 0), 0)

        setStats({
          storiesCount: stories.length,
          audioCount: audios.length,
          animationsCount: animations.length,
          totalViews,
          totalLikes,
          totalRevenue: realRevenue,
          thisMonthRevenue: thisMonthRevenue
        })

        // Get recent content (last 5 items sorted by created_at)
        const allContent = [
          ...stories.map((s: any) => ({ ...s, type: 'Story', icon: 'story' })),
          ...audios.map((a: any) => ({ ...a, type: 'Audio', icon: 'audio' })),
          ...animations.map((an: any) => ({ ...an, type: 'Animation', icon: 'animation' }))
        ]
        allContent.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        setRecentContent(allContent.slice(0, 5))

        // Get top performers by views/plays
        const topByViews = [...allContent]
          .sort((a, b) => (Number(b.views || b.plays || 0)) - (Number(a.views || a.plays || 0)))
          .slice(0, 3)
        setTopContent(topByViews)

      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Refresh every 30 seconds - same as sales tab
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffMins > 0) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
    return 'Just now'
  }

  const dashboardStats = [
    { label: 'Total Likes/Loves', value: formatNumber(stats.totalLikes), icon: Heart, change: `${stats.totalLikes}`, color: 'from-pink-500 to-red-600' },
    { label: 'Total Views/Plays', value: formatNumber(stats.totalViews), icon: Eye, change: `${stats.totalViews}`, color: 'from-indigo-500 to-purple-600' },
    { label: 'Stories Published', value: stats.storiesCount.toString(), icon: BookOpen, change: `+${stats.storiesCount}`, color: 'from-blue-500 to-cyan-600' },
    { label: 'Audio Stories', value: stats.audioCount.toString(), icon: Headphones, change: `+${stats.audioCount}`, color: 'from-purple-500 to-pink-600' },
    { label: 'Animations', value: stats.animationsCount.toString(), icon: Film, change: `+${stats.animationsCount}`, color: 'from-red-500 to-orange-600' },
    { label: 'Sales', value: `₵${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, change: '', color: 'from-green-500 to-emerald-600' },
    { label: 'This Month', value: `₵${(stats.thisMonthRevenue || 0).toFixed(2)}`, icon: TrendingUp, change: '', color: 'from-blue-500 to-purple-600' },
  ]

  const handleResetStats = async () => {
    setResetting(true)
    try {
      const res = await fetch('/api/admin/reset-stats', { method: 'POST' })
      if (res.ok) {
        // Refresh the page to show updated stats
        window.location.reload()
      } else {
        alert('Failed to reset stats. Please try again.')
      }
    } catch (error) {
      console.error('Reset error:', error)
      alert('An error occurred while resetting stats.')
    } finally {
      setResetting(false)
      setShowResetModal(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-primary-gold mb-2">
              Dashboard Overview
            </h1>
            <p className="text-primary-gold-light/70">
              Welcome back, Dray Harmony! Here's what's happening with your content.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowResetModal(true)}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
          >
            <RefreshCcw size={20} />
            <span className="font-medium">Reset All Stats</span>
          </motion.button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 border-2 border-red-500/50 rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} className="text-red-400" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-3">
                Reset All Statistics?
              </h2>
              <p className="text-primary-gold-light/70 mb-6">
                This will permanently reset all views, plays, and likes to <strong className="text-red-400">zero</strong> for all content. This action cannot be undone.
              </p>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-400">
                  ⚠️ <strong>Testing Mode:</strong> Use this feature while testing. Once you go live, avoid using this to preserve authentic engagement data.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowResetModal(false)}
                  disabled={resetting}
                  className="flex-1 px-6 py-3 rounded-lg bg-dark-700 text-primary-gold-light hover:bg-dark-600 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetStats}
                  disabled={resetting}
                  className="flex-1 px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all font-medium flex items-center justify-center space-x-2"
                >
                  {resetting ? (
                    <>
                      <RefreshCcw size={18} className="animate-spin" />
                      <span>Resetting...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCcw size={18} />
                      <span>Yes, Reset All</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Stats Grid */}
      {loading ? (
        <div className="text-center text-primary-gold-light py-16">Loading dashboard...</div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="card group hover:scale-105 transition-transform"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} className="text-white" />
              </div>
              {stat.change && <span className="text-primary-gold text-sm font-semibold">{stat.change}</span>}
            </div>
            <p className="text-primary-gold-light/70 text-sm mb-1">{stat.label}</p>
            <p className="text-primary-gold font-bold text-3xl">{stat.value}</p>
          </motion.div>
        ))}
      </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Content Uploaded */}
        <div className="card">
          <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6">
            Recent Uploads
          </h2>
          <div className="space-y-4">
            {recentContent.length === 0 ? (
              <p className="text-primary-gold-light/50 text-center py-8">No content uploaded yet</p>
            ) : (
              recentContent.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-primary-gold/10 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === 'Story' ? 'bg-blue-500/20' :
                      item.type === 'Audio' ? 'bg-purple-500/20' :
                      'bg-red-500/20'
                    }`}>
                      {item.type === 'Story' && <BookOpen size={18} className="text-blue-400" />}
                      {item.type === 'Audio' && <Headphones size={18} className="text-purple-400" />}
                      {item.type === 'Animation' && <Film size={18} className="text-red-400" />}
                    </div>
                    <div>
                      <p className="text-primary-gold-light font-medium">{item.title}</p>
                      <p className="text-primary-gold-light/50 text-sm">{getTimeAgo(item.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 rounded-full text-xs bg-primary-gold/20 text-primary-gold">
                      {item.type}
                    </span>
                    <p className="text-primary-gold-light/70 text-xs mt-1">
                      <Heart size={12} className="inline mr-1" />{Number(item.rating || item.likes || 0)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Performers by Views/Plays */}
        <div className="card">
          <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6">
            Most Popular Content
          </h2>
          <div className="space-y-4">
            {topContent.length === 0 ? (
              <p className="text-primary-gold-light/50 text-center py-8">No content yet</p>
            ) : (
              topContent.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-primary-gold font-semibold truncate flex-1 mr-2">{item.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs bg-primary-gold/20 text-primary-gold whitespace-nowrap">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-gold-light/70">
                      <Eye size={14} className="inline mr-1" />
                      {formatNumber(Number(item.views || item.plays || 0))} {item.type === 'Audio' ? 'plays' : 'views'}
                    </span>
                    <span className="text-primary-gold-light/70">
                      <Heart size={14} className="inline mr-1" />
                      {Number(item.rating || item.likes || 0)} likes
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.button
          onClick={() => onTabChange('stories')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="card hover:shadow-xl hover:shadow-primary-gold/20 transition-all text-center cursor-pointer group"
        >
          <BookOpen size={32} className="text-primary-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-playfair text-lg font-bold text-primary-gold mb-1">
            Upload Story
          </h3>
          <p className="text-primary-gold-light/70 text-sm">
            Add a new story to your library
          </p>
        </motion.button>
        <motion.button
          onClick={() => onTabChange('audio')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="card hover:shadow-xl hover:shadow-primary-gold/20 transition-all text-center cursor-pointer group"
        >
          <Headphones size={32} className="text-primary-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-playfair text-lg font-bold text-primary-gold mb-1">
            Upload Audio
          </h3>
          <p className="text-primary-gold-light/70 text-sm">
            Add a new audio story
          </p>
        </motion.button>
        <motion.button
          onClick={() => onTabChange('animations')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="card hover:shadow-xl hover:shadow-primary-gold/20 transition-all text-center cursor-pointer group"
        >
          <Film size={32} className="text-primary-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-playfair text-lg font-bold text-primary-gold mb-1">
            Upload Animation
          </h3>
          <p className="text-primary-gold-light/70 text-sm">
            Add a new animated tale
          </p>
        </motion.button>
      </div>
    </div>
  )
}
