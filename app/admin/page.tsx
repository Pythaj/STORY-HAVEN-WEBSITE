'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  BookOpen, 
  Headphones, 
  Film, 
  DollarSign, 
  Users, 
  User,
  TrendingUp,
  Upload,
  Settings,
  LogOut,
  Eye,
  Download,
  Calendar,
  Save,
  RefreshCw,
  CheckCircle,
  Check,
  ArrowLeft,
  Home,
  X,
  Share2
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import AdminLogin from '@/components/AdminLogin'
import DashboardStats from '@/components/DashboardStats'
import ContentManager from '@/components/ContentManager'
import WatermarkSettings from '@/components/WatermarkSettings'
import { useSiteSettings } from '@/contexts/SiteContext'
import { Purchase } from '@/lib/supabase'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({ totalContent: 0, thisMonth: 0 })
  const [statsLoading, setStatsLoading] = useState(true)

  // Load stats on component mount
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
        // Set default values
        setStats({ totalContent: 0, thisMonth: 0 })
      } finally {
        setStatsLoading(false)
      }
    }

    fetchQuickStats()
  }, [])

  // Hide navbar when in admin panel
  useEffect(() => {
    if (isAuthenticated) {
      document.body.classList.add('admin-mode')
    } else {
      document.body.classList.remove('admin-mode')
    }
    
    return () => {
      document.body.classList.remove('admin-mode')
    }
  }, [isAuthenticated])

  const handleExitAdmin = () => {
    document.body.classList.remove('admin-mode')
    router.push('/')
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'stories', name: 'Stories', icon: BookOpen },
    { id: 'audio', name: 'Audio', icon: Headphones },
    { id: 'animations', name: 'Animations', icon: Film },
    { id: 'watermark', name: 'Watermark', icon: Eye },
    { id: 'sales', name: 'Sales', icon: DollarSign },
    { id: 'settings', name: 'Settings', icon: Settings },
  ]

  // Tabs array initialized

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Admin Container - Isolated from other pages */}
      <div className="fixed inset-0 z-[90] bg-dark-900 pt-20">
        <div className="flex h-[calc(100vh-5rem)]">
          {/* Sidebar - Now contained within admin page only */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-72 bg-gradient-to-b from-dark-800 to-dark-900 border-r border-primary-gold/30 overflow-y-auto sidebar-scroll shadow-2xl shadow-primary-gold/10"
            style={{ height: '100%' }}
          >
            <div className="p-6">
              {/* Admin Header with Avatar */}
              <div className="mb-6 pb-4 border-b border-primary-gold/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-gold to-accent-orange flex items-center justify-center text-dark-900 font-bold text-2xl shadow-lg">
                    DH
                  </div>
                  <div>
                    <h2 className="font-playfair text-xl font-bold text-primary-gold">
                      Admin Panel
                    </h2>
                    <p className="text-primary-gold-light/70 text-sm">
                      Dray Harmony
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-primary-gold-light/50">
                  <span>Last login: Today</span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Online</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs - SIMPLE VERSION */}
            <div style={{ 
              padding: '0 24px 24px 24px',
              backgroundColor: '#1A1A1A'
            }}>
              {/* Header */}
              <div style={{
                padding: '12px 0',
                marginBottom: '16px',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
              }}>
                <p style={{
                  color: '#D4AF37',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  textTransform: 'uppercase'
                }}>
                  📍 NAVIGATION MENU ({tabs.length - 1} sections)
                </p>
              </div>
              
              {/* Simple Navigation Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'dashboard') {
                      e.currentTarget.style.background = '#3A3A3A'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'dashboard') {
                      e.currentTarget.style.background = '#2A2A2A'
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderRadius: '8px',
                    border: activeTab === 'dashboard' ? '2px solid #D4AF37' : 'none',
                    cursor: 'pointer',
                    background: activeTab === 'dashboard' ? 'linear-gradient(to right, #D4AF37, #FF8C42)' : '#2A2A2A',
                    color: activeTab === 'dashboard' ? '#0A0A0A' : '#F4E4B7',
                    fontWeight: activeTab === 'dashboard' ? '600' : '500',
                    fontSize: '14px',
                    boxShadow: activeTab === 'dashboard' ? '0 4px 12px rgba(212, 175, 55, 0.3)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('stories')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderRadius: '8px',
                    border: activeTab === 'stories' ? '2px solid #D4AF37' : 'none',
                    cursor: 'pointer',
                    background: activeTab === 'stories' ? 'linear-gradient(to right, #D4AF37, #FF8C42)' : '#2A2A2A',
                    color: activeTab === 'stories' ? '#0A0A0A' : '#F4E4B7',
                    fontWeight: activeTab === 'stories' ? '600' : '500',
                    fontSize: '14px',
                    boxShadow: activeTab === 'stories' ? '0 4px 12px rgba(212, 175, 55, 0.3)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <BookOpen size={20} />
                  <span>Stories</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('audio')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'audio' ? 'linear-gradient(to right, #D4AF37, #FF8C42)' : '#2A2A2A',
                    color: activeTab === 'audio' ? '#0A0A0A' : '#F4E4B7',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                >
                  <Headphones size={20} />
                  <span>Audio</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('animations')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'animations' ? 'linear-gradient(to right, #D4AF37, #FF8C42)' : '#2A2A2A',
                    color: activeTab === 'animations' ? '#0A0A0A' : '#F4E4B7',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                >
                  <Film size={20} />
                  <span>Animations</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('watermark')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'watermark' ? 'linear-gradient(to right, #D4AF37, #FF8C42)' : '#2A2A2A',
                    color: activeTab === 'watermark' ? '#0A0A0A' : '#F4E4B7',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                >
                  <Eye size={20} />
                  <span>Watermark</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('sales')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'sales' ? 'linear-gradient(to right, #D4AF37, #FF8C42)' : '#2A2A2A',
                    color: activeTab === 'sales' ? '#0A0A0A' : '#F4E4B7',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                >
                  <DollarSign size={20} />
                  <span>Sales</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === 'settings' ? 'linear-gradient(to right, #D4AF37, #FF8C42)' : '#2A2A2A',
                    color: activeTab === 'settings' ? '#0A0A0A' : '#F4E4B7',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {/* Exit Admin & Logout Buttons */}
            <div className="p-6 border-t border-primary-gold/10 space-y-2 bg-dark-900">
                {/* Exit to Website Button */}
                <button
                  onClick={() => router.push('/')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    cursor: 'pointer',
                    background: 'rgba(212, 175, 55, 0.1)',
                    color: '#D4AF37',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'
                  }}
                >
                  <Home size={20} />
                  <span>Exit to Website</span>
                  <ArrowLeft size={16} style={{ marginLeft: 'auto' }} />
                </button>

                {/* Logout Button */}
                <button
                  onClick={() => setIsAuthenticated(false)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    cursor: 'pointer',
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#EF4444',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
            </div>

            {/* Quick Stats */}
            <div className="px-6 pb-6">
              <div className="p-4 bg-dark-700/50 rounded-xl border border-primary-gold/10" style={{
                backgroundColor: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}>
                <p className="text-xs text-primary-gold-light/50 mb-3" style={{ color: 'rgba(212, 175, 55, 0.7)' }}>Quick Stats</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-gold-light/70">Total Content</span>
                    <span className="text-primary-gold font-semibold">{stats.totalContent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-gold-light/70">This Month</span>
                    <span className="text-green-400 font-semibold">+{stats.thisMonth}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto bg-dark-900">
            {/* Content Header with Breadcrumb */}
            <div className="sticky top-0 z-10 bg-dark-900/95 backdrop-blur-md border-b border-primary-gold/10 px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => router.push('/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-primary-gold/30 text-primary-gold hover:bg-primary-gold/10 hover:border-primary-gold/50 transition-all"
                    style={{
                      background: 'rgba(212, 175, 55, 0.1)'
                    }}
                  >
                    <Home size={18} />
                    <span>Exit to Website</span>
                    <ArrowLeft size={16} className="ml-1" />
                  </motion.button>
                  
                  {/* Back to Dashboard Button - Only show when not on dashboard */}
                  {activeTab !== 'dashboard' && (
                    <motion.button
                      onClick={() => setActiveTab('dashboard')}
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-gold/20 to-accent-orange/20 border border-primary-gold/30 text-primary-gold hover:from-primary-gold/30 hover:to-accent-orange/30 hover:border-primary-gold/50 transition-all group"
                    >
                      <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                      <span className="font-medium">Back to Dashboard</span>
                    </motion.button>
                  )}
                  
                  <div>
                    <div className="flex items-center space-x-2 text-sm text-primary-gold-light/50 mb-1">
                      <span>Admin Panel</span>
                      <span>/</span>
                      <span className="text-primary-gold capitalize flex items-center space-x-1">
                        <span>{activeTab}</span>
                        <div className="w-2 h-2 rounded-full bg-primary-gold animate-pulse"></div>
                      </span>
                    </div>
                    <h1 className="font-playfair text-3xl font-bold text-primary-gold capitalize flex items-center space-x-2">
                      <span>{activeTab}</span>
                      <span className="text-sm bg-primary-gold/20 text-primary-gold px-2 py-1 rounded-full font-medium">
                        Active
                      </span>
                    </h1>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-xs text-primary-gold-light/50">Current Time</p>
                    <p className="text-sm text-primary-gold font-medium">
                      {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'dashboard' && <DashboardStats onTabChange={setActiveTab} />}
                {activeTab === 'stories' && <ContentManager type="stories" />}
                {activeTab === 'audio' && <ContentManager type="audio" />}
                {activeTab === 'animations' && <ContentManager type="animations" />}
                {activeTab === 'watermark' && <WatermarkSettings />}
                {activeTab === 'sales' && <SalesManager />}
                {activeTab === 'settings' && <SettingsManager />}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function SalesManager() {
  // Real sales data will be fetched from /api/purchases when sales start
  const [salesData, setSalesData] = useState<Purchase[]>([])
  const [statsData, setStatsData] = useState({ totalRevenue: 0, totalSales: 0, byType: { story: 0, audio: 0, animation: 0 } })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch stats for summary cards (more efficient)
        const statsResponse = await fetch('/api/purchases/stats')
        if (statsResponse.ok) {
          const stats = await statsResponse.json()
          setStatsData(stats)
        }

        // Fetch all purchases for detailed table
        const purchasesResponse = await fetch('/api/purchases')
        if (purchasesResponse.ok) {
          const purchases = await purchasesResponse.json()
          setSalesData(purchases)
        }
      } catch (error) {
        console.error('Failed to fetch sales data:', error)
        setError('Unable to load sales data. Please check your database connection.')
      } finally {
        setLoading(false)
      }
    }

    fetchSalesData()
    const interval = setInterval(fetchSalesData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const totalRevenue = statsData.totalRevenue || 0
  const totalSales = statsData.totalSales || 0
  const averageSale = totalSales > 0 ? totalRevenue / totalSales : 0

  // Calculate this month's revenue from sales data
  const thisMonthRevenue = useMemo(() => {
    const now = new Date()
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    
    return salesData
      .filter(sale => {
        const saleDate = new Date(sale.created_at)
        return saleDate >= thisMonthStart && sale.status === 'completed'
      })
      .reduce((sum, sale) => sum + (sale.amount || 0), 0)
  }, [salesData])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-4xl font-bold text-primary-gold">
            Sales & Revenue
          </h1>
          <p className="text-primary-gold-light/70 mt-2">
            Real-time sales tracking - Production ready
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {error ? (
            <div className="px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
              <div className="text-red-400 text-sm font-medium flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>Database Connection Required</span>
              </div>
            </div>
          ) : (
            <div className="px-3 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
              <div className="text-green-400 text-sm font-medium flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Real-time Tracking Active</span>
              </div>
            </div>
          )}
          <button className="btn-primary flex items-center space-x-2">
            <Download size={20} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <p className="text-primary-gold-light/70 text-sm mb-2">Total Revenue</p>
          <p className="text-primary-gold font-bold text-3xl">₵{totalRevenue.toFixed(2)}</p>
          <p className="text-xs text-primary-gold-light/50 mt-1">All time earnings</p>
        </div>
        <div className="card">
          <p className="text-primary-gold-light/70 text-sm mb-2">Total Sales</p>
          <p className="text-primary-gold font-bold text-3xl">{totalSales}</p>
          <p className="text-xs text-primary-gold-light/50 mt-1">Successful transactions</p>
        </div>
        <div className="card">
          <p className="text-primary-gold-light/70 text-sm mb-2">Avg. Sale</p>
          <p className="text-primary-gold font-bold text-3xl">₵{averageSale.toFixed(2)}</p>
          <p className="text-xs text-primary-gold-light/50 mt-1">Average per transaction</p>
        </div>
        <div className="card">
          <p className="text-primary-gold-light/70 text-sm mb-2">This Month</p>
          <p className="text-primary-gold font-bold text-3xl">₵{thisMonthRevenue.toFixed(2)}</p>
          <p className="text-xs text-primary-gold-light/50 mt-1">Current month revenue</p>
        </div>
      </div>

      {/* Sales Status */}
      {loading ? (
        <div className="card p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto mb-4"></div>
          <p className="text-primary-gold-light">Loading sales data...</p>
        </div>
      ) : error ? (
        <div className="card p-8 text-center border-2 border-dashed border-red-500/30">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <X size={32} className="text-red-500" />
          </div>
          <h3 className="font-playfair text-2xl font-bold text-red-400 mb-2">
            Database Connection Required
          </h3>
          <p className="text-primary-gold-light/70 mb-4 max-w-md mx-auto">
            {error}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm max-w-lg mx-auto">
            <div className="p-3 bg-primary-gold/10 border border-primary-gold/30 rounded-lg text-center">
              <p className="text-primary-gold font-medium mb-1">Configure Supabase</p>
              <p className="text-primary-gold/70 text-xs">Set up your database connection</p>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
              <p className="text-green-400 font-medium mb-1">Payment Integration</p>
              <p className="text-green-400/70 text-xs">MTN MoMo & Paystack ready</p>
            </div>
          </div>
        </div>
      ) : totalSales === 0 ? (
        <div className="card p-8 text-center border-2 border-dashed border-primary-gold/30">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-gold/10 flex items-center justify-center">
            <DollarSign size={32} className="text-primary-gold" />
          </div>
          <h3 className="font-playfair text-2xl font-bold text-primary-gold mb-2">
            Ready for Sales
          </h3>
          <p className="text-primary-gold-light/70 mb-4 max-w-md mx-auto">
            Your payment system is configured and ready to receive real sales.
            All transactions will appear here automatically.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-400 font-medium">MTN MoMo</p>
              <p className="text-green-400/70">Ready</p>
            </div>
            <div className="p-3 bg-primary-gold/10 border border-primary-gold/30 rounded-lg">
              <p className="text-primary-gold font-medium">Paystack</p>
              <p className="text-primary-gold/70">Ready</p>
            </div>
            <div className="p-3 bg-accent-orange/10 border border-accent-orange/30 rounded-lg">
              <p className="text-accent-orange font-medium">Analytics</p>
              <p className="text-accent-orange/70">Real-time</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary-gold/20">
                  <th className="text-left py-4 px-4 text-primary-gold font-semibold">Date</th>
                  <th className="text-left py-4 px-4 text-primary-gold font-semibold">Item</th>
                  <th className="text-left py-4 px-4 text-primary-gold font-semibold">Type</th>
                  <th className="text-left py-4 px-4 text-primary-gold font-semibold">Customer</th>
                  <th className="text-left py-4 px-4 text-primary-gold font-semibold">Payment</th>
                  <th className="text-left py-4 px-4 text-primary-gold font-semibold">Status</th>
                  <th className="text-right py-4 px-4 text-primary-gold font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale, index) => (
                  <tr key={sale.id || index} className="border-b border-primary-gold/10 hover:bg-dark-700/50">
                    <td className="py-4 px-4 text-primary-gold-light">
                      {new Date(sale.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-primary-gold-light">{sale.content_id}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${sale.content_type === 'story' ? 'bg-primary-gold/20 text-primary-gold' : sale.content_type === 'audio' ? 'bg-green-500/20 text-green-400' : 'bg-accent-orange/20 text-accent-orange'}`}>
                        {sale.content_type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-primary-gold-light/70">
                      {sale.user_name || 'Anonymous'}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${sale.payment_method === 'momo' ? 'bg-green-500/20 text-green-400' : 'bg-primary-gold/20 text-primary-gold'}`}>
                        {sale.payment_method === 'momo' ? 'MTN MoMo' : 'Paystack'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${sale.status === 'completed' ? 'bg-green-500/20 text-green-400' : sale.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-primary-gold font-semibold">
                      ₵{(sale.amount || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
function SettingsManager() {
  const router = useRouter()
  const { settings, updateSettings, resetSettings } = useSiteSettings()
  const [saved, setSaved] = useState(false)
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    updateSettings(localSettings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    resetSettings()
    setLocalSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleWatermarkSettings = () => {
    router.push('/admin/watermark')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-4xl font-bold text-primary-gold">
            Site Settings
          </h1>
          <p className="text-primary-gold-light/70 mt-2">
            Changes will reflect immediately on the main website
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {saved && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
            >
              <Check size={20} />
              <span>Saved!</span>
            </motion.div>
          )}
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-primary-gold-light rounded-lg transition-all"
          >
            <RefreshCw size={20} />
            <span>Reset to Default</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="card">
          <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6 flex items-center space-x-2">
            <Settings size={24} />
            <span>General Settings</span>
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Site Name</label>
              <input
                type="text"
                value={localSettings.siteName}
                onChange={(e) => setLocalSettings({ ...localSettings, siteName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Tagline</label>
              <input
                type="text"
                value={localSettings.tagline}
                onChange={(e) => setLocalSettings({ ...localSettings, tagline: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Contact Email</label>
              <input
                type="email"
                value={localSettings.contactEmail}
                onChange={(e) => setLocalSettings({ ...localSettings, contactEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Contact Phone</label>
              <input
                type="tel"
                value={localSettings.contactPhone}
                onChange={(e) => setLocalSettings({ ...localSettings, contactPhone: e.target.value })}
                placeholder="+233 XX XXX XXXX"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
              <p className="text-xs text-primary-gold-light/50 mt-1">
                Will be displayed on contact page
              </p>
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Contact Location</label>
              <input
                type="text"
                value={localSettings.contactLocation}
                onChange={(e) => setLocalSettings({ ...localSettings, contactLocation: e.target.value })}
                placeholder="Ghana, West Africa"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
              <p className="text-xs text-primary-gold-light/50 mt-1">
                Your business location for visitors
              </p>
            </div>
          </div>
        </div>

        {/* Homepage Content */}
        <div className="card">
          <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6">
            Homepage Content
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Hero Title</label>
              <input
                type="text"
                value={localSettings.heroTitle}
                onChange={(e) => setLocalSettings({ ...localSettings, heroTitle: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Hero Subtitle</label>
              <textarea
                rows={3}
                value={localSettings.heroSubtitle}
                onChange={(e) => setLocalSettings({ ...localSettings, heroSubtitle: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">About Text</label>
              <textarea
                rows={4}
                value={localSettings.aboutText}
                onChange={(e) => setLocalSettings({ ...localSettings, aboutText: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="card">
          <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6">
            Appearance
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Show Opening Animation</label>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={localSettings.showOpeningAnimation}
                  onChange={(e) => setLocalSettings({ ...localSettings, showOpeningAnimation: e.target.checked })}
                  className="w-5 h-5 rounded bg-dark-700 border-primary-gold/30 text-primary-gold focus:ring-primary-gold"
                />
                <span className="text-primary-gold-light/70">Enable dramatic opening animation</span>
              </div>
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">
                Watermark Opacity: {(localSettings.watermarkOpacity * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0.05"
                max="0.30"
                step="0.01"
                value={localSettings.watermarkOpacity}
                onChange={(e) => setLocalSettings({ ...localSettings, watermarkOpacity: parseFloat(e.target.value) })}
                className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-primary-gold-light/50 mt-1">
                Adjust watermark visibility on content previews
              </p>
            </div>
            
            {/* Advanced Watermark Settings Button */}
            <div className="pt-4 border-t border-primary-gold/20">
              <button
                onClick={handleWatermarkSettings}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-gold/30 transition-all"
              >
                <Settings size={20} />
                <span>Advanced Watermark Settings</span>
              </button>
              <p className="text-xs text-primary-gold-light/50 mt-2 text-center">
                Customize text, position, blur, rotation & more
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="card border-2 border-primary-gold/30">
          <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6 flex items-center space-x-2">
            <Share2 size={24} />
            <span>Social Media & Marketing</span>
          </h2>
          <div className="p-3 bg-primary-gold/5 border border-primary-gold/20 rounded-lg mb-6">
            <p className="text-sm text-primary-gold-light/80">
              📱 <strong>Marketing Power:</strong> Add your social media links to automatically share new content across all platforms. When you upload a new story, send preview links to WhatsApp, Facebook, TikTok, and Instagram!
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <div className="block text-primary-gold-light mb-2 font-medium flex items-center space-x-2">
                <span className="text-blue-500">📘</span>
                <span>Facebook Page URL</span>
              </div>
              <input
                type="url"
                value={localSettings.socialLinks.facebook}
                onChange={(e) => setLocalSettings({ 
                  ...localSettings, 
                  socialLinks: { ...localSettings.socialLinks, facebook: e.target.value }
                })}
                placeholder="https://facebook.com/yourusername"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
              <p className="text-xs text-primary-gold-light/50 mt-1">
                Your Facebook page or profile URL
              </p>
            </div>
            <div>
              <div className="block text-primary-gold-light mb-2 font-medium flex items-center space-x-2">
                <span className="text-sky-500">🐦</span>
                <span>Twitter/X Profile</span>
              </div>
              <input
                type="url"
                value={localSettings.socialLinks.twitter}
                onChange={(e) => setLocalSettings({ 
                  ...localSettings, 
                  socialLinks: { ...localSettings.socialLinks, twitter: e.target.value }
                })}
                placeholder="https://twitter.com/yourusername"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
              <p className="text-xs text-primary-gold-light/50 mt-1">
                Your Twitter or X profile URL
              </p>
            </div>
            <div>
              <div className="block text-primary-gold-light mb-2 font-medium flex items-center space-x-2">
                <span className="text-pink-500">📸</span>
                <span>Instagram Handle</span>
              </div>
              <input
                type="url"
                value={localSettings.socialLinks.instagram}
                onChange={(e) => setLocalSettings({ 
                  ...localSettings, 
                  socialLinks: { ...localSettings.socialLinks, instagram: e.target.value }
                })}
                placeholder="https://instagram.com/yourusername"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
              <p className="text-xs text-primary-gold-light/50 mt-1">
                Your Instagram profile URL
              </p>
            </div>
            <div>
              <div className="block text-primary-gold-light mb-2 font-medium flex items-center space-x-2">
                <span className="text-green-500">💬</span>
                <span>WhatsApp Number</span>
              </div>
              <input
                type="tel"
                value={localSettings.socialLinks.whatsapp}
                onChange={(e) => setLocalSettings({ 
                  ...localSettings, 
                  socialLinks: { ...localSettings.socialLinks, whatsapp: e.target.value }
                })}
                placeholder="+233XXXXXXXXX"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all font-mono"
              />
              <p className="text-xs text-primary-gold-light/50 mt-1">
                Your WhatsApp business number (format: +233XXXXXXXXX)
              </p>
            </div>
            <div>
              <div className="block text-primary-gold-light mb-2 font-medium flex items-center space-x-2">
                <span>🎵</span>
                <span>TikTok Username</span>
              </div>
              <input
                type="url"
                value={localSettings.socialLinks.tiktok}
                onChange={(e) => setLocalSettings({ 
                  ...localSettings, 
                  socialLinks: { ...localSettings.socialLinks, tiktok: e.target.value }
                })}
                placeholder="https://tiktok.com/@yourusername"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
              <p className="text-xs text-primary-gold-light/50 mt-1">
                Your TikTok profile URL
              </p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <p className="text-sm text-green-400 font-medium mb-2">💡 Marketing Tip:</p>
            <p className="text-xs text-primary-gold-light/70">
              Complete all social media fields to enable one-click sharing of new content. When you upload a new story, you'll be able to instantly share preview links to all your platforms, maximizing your reach and engagement!
            </p>
          </div>
        </div>

        {/* Payment Settings - MTN MoMo */}
        <div className="card border-2 border-accent-orange/30">
          <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6 flex items-center space-x-2">
            <DollarSign size={24} />
            <span>MTN Mobile Money</span>
          </h2>
          <div className="space-y-4">
            <div className="p-3 bg-accent-orange/10 border border-accent-orange/30 rounded-lg mb-4">
              <p className="text-sm text-primary-gold-light">
                💡 <strong>Important:</strong> Your MoMo number will be used to receive payments from customers
              </p>
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">MoMo Number</label>
              <input
                type="tel"
                value={localSettings.momoNumber}
                onChange={(e) => setLocalSettings({ ...localSettings, momoNumber: e.target.value })}
                placeholder="024XXXXXXX"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all font-mono text-lg"
              />
              <p className="text-xs text-primary-gold-light/50 mt-1">
                Format: 024XXXXXXX or 055XXXXXXX
              </p>
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Account Name</label>
              <input
                type="text"
                value={localSettings.momoName}
                onChange={(e) => setLocalSettings({ ...localSettings, momoName: e.target.value })}
                placeholder="Dray Harmony"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
              <p className="text-xs text-primary-gold-light/50 mt-1">
                Name registered with your MoMo account
              </p>
            </div>
          </div>
        </div>

        {/* Payment Settings - Paystack */}
        <div className="card border-2 border-primary-gold/30">
          <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6 flex items-center space-x-2">
            <DollarSign size={24} />
            <span>Paystack Integration</span>
          </h2>
          <div className="space-y-4">
            <div className="p-3 bg-primary-gold/10 border border-primary-gold/30 rounded-lg mb-4">
              <p className="text-sm text-primary-gold-light">
                🔒 <strong>Secure:</strong> Your API keys are stored locally and never shared
              </p>
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Public Key</label>
              <input
                type="text"
                value={localSettings.paystackPublicKey}
                onChange={(e) => setLocalSettings({ ...localSettings, paystackPublicKey: e.target.value })}
                placeholder="pk_test_xxxxxxxxxxxxx"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all font-mono text-sm"
              />
              <p className="text-xs text-primary-gold-light/50 mt-1">
                Get from: <a href="https://dashboard.paystack.com/#/settings/developer" target="_blank" className="text-primary-gold hover:underline">Paystack Dashboard</a>
              </p>
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Secret Key</label>
              <input
                type="password"
                value={localSettings.paystackSecretKey}
                onChange={(e) => setLocalSettings({ ...localSettings, paystackSecretKey: e.target.value })}
                placeholder="sk_test_xxxxxxxxxxxxx"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all font-mono text-sm"
              />
              <p className="text-xs text-primary-gold-light/50 mt-1">
                Keep this secret! Never share with anyone
              </p>
            </div>
          </div>
        </div>

        {/* Admin Profile */}
        <div className="card border-2 border-green-500/30">
          <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6 flex items-center space-x-2">
            <User size={24} />
            <span>Admin Profile</span>
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Admin Name</label>
              <input
                type="text"
                value={localSettings.adminName}
                onChange={(e) => setLocalSettings({ ...localSettings, adminName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Admin Email</label>
              <input
                type="email"
                value={localSettings.adminEmail}
                onChange={(e) => setLocalSettings({ ...localSettings, adminEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
            </div>
          </div>
        </div>

        {/* Security - Password Change */}
        <div className="card border-2 border-red-500/30">
          <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6 flex items-center space-x-2">
            <Settings size={24} />
            <span>Security</span>
          </h2>
          <div className="space-y-4">
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
              <p className="text-sm text-primary-gold-light">
                🔐 <strong>Password Change:</strong> For demo purposes, password is: <code className="bg-dark-700 px-2 py-1 rounded">storyhaven2024</code>
              </p>
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
            </div>
            <div>
              <label className="block text-primary-gold-light mb-2 font-medium">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
              />
            </div>
            <button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-3 rounded-lg border border-red-500/50 transition-all font-medium">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Save Button - Sticky at bottom */}
      <div className="sticky bottom-0 mt-8 p-6 bg-dark-800/95 backdrop-blur-md border-t border-primary-gold/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-gold font-semibold">Ready to apply changes?</p>
            <p className="text-sm text-primary-gold-light/70">Changes will be visible immediately on the main website</p>
          </div>
          <button
            onClick={handleSave}
            className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
          >
            <Save size={24} />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>
    </div>
  )
}
function QuickStatsWidget() {
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
    const interval = setInterval(fetchQuickStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="mt-8 p-4 bg-dark-700/50 rounded-xl border border-primary-gold/10 animate-pulse">
        <p className="text-xs text-primary-gold-light/50 mb-3">Loading...</p>
      </div>
    )
  }

  return (
    <div className="mt-8 p-4 bg-dark-700/50 rounded-xl border border-primary-gold/10">
      <p className="text-xs text-primary-gold-light/50 mb-3">Quick Stats</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-primary-gold-light/70">Total Content</span>
          <span className="text-primary-gold font-semibold">{stats.totalContent}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-primary-gold-light/70">This Month</span>
          <span className="text-green-400 font-semibold">+{stats.thisMonth}</span>
        </div>
      </div>
    </div>
  )
}
