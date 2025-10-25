'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  Search,
  BookOpen,
  Video,
  MessageSquare,
  Mail,
  FileText,
  CreditCard,
  Shield,
  Users,
  Clock,
  Star,
  ChevronRight,
  Play,
  Download,
  ExternalLink,
  Check,
  X
} from 'lucide-react'
import { useSiteSettings } from '@/contexts/SiteContext'

interface HelpCategory {
  id: string
  title: string
  description: string
  icon: any
  color: string
  articles: number
}

interface HelpArticle {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
}

const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using Story Haven',
    icon: BookOpen,
    color: 'from-primary-gold to-primary-gold-dark',
    articles: 8
  },
  {
    id: 'payments',
    title: 'Payments & Billing',
    description: 'Payment methods, refunds, and billing questions',
    icon: CreditCard,
    color: 'from-green-500 to-emerald-600',
    articles: 12
  },
  {
    id: 'content',
    title: 'Content & Access',
    description: 'Stories, audio, animations, and access issues',
    icon: FileText,
    color: 'from-accent-orange to-primary-gold-dark',
    articles: 10
  },
  {
    id: 'technical',
    title: 'Technical Support',
    description: 'Troubleshooting and technical issues',
    icon: Shield,
    color: 'from-blue-500 to-purple-600',
    articles: 15
  },
  {
    id: 'account',
    title: 'Account Management',
    description: 'Profile, settings, and account security',
    icon: Users,
    color: 'from-purple-500 to-pink-600',
    articles: 6
  }
]

const helpArticles: HelpArticle[] = [
  {
    id: '1',
    title: 'How to Create an Account',
    excerpt: 'Step-by-step guide to creating your Story Haven account and getting started with premium content.',
    category: 'getting-started',
    readTime: '3 min',
    difficulty: 'Beginner',
    tags: ['account', 'registration', 'setup']
  },
  {
    id: '2',
    title: 'Understanding Content Types',
    excerpt: 'Learn about the different types of content available: stories, audio narrations, and animations.',
    category: 'content',
    readTime: '5 min',
    difficulty: 'Beginner',
    tags: ['stories', 'audio', 'animations', 'content types']
  },
  {
    id: '3',
    title: 'MTN MoMo Payment Setup',
    excerpt: 'Complete guide to setting up and using MTN Mobile Money for payments on Story Haven.',
    category: 'payments',
    readTime: '4 min',
    difficulty: 'Beginner',
    tags: ['momo', 'payment', 'setup', 'mobile money']
  },
  {
    id: '4',
    title: 'Card Payment Issues',
    excerpt: 'Troubleshooting common issues with credit and debit card payments through Paystack.',
    category: 'technical',
    readTime: '6 min',
    difficulty: 'Intermediate',
    tags: ['cards', 'paystack', 'payment issues', 'troubleshooting']
  },
  {
    id: '5',
    title: 'Content Not Loading',
    excerpt: 'Solutions for when stories, audio, or animations fail to load properly.',
    category: 'technical',
    readTime: '4 min',
    difficulty: 'Beginner',
    tags: ['loading', 'content', 'technical issues', 'browser']
  },
  {
    id: '6',
    title: 'Refund Policy Explained',
    excerpt: 'Understanding our refund policy and how to request refunds for purchased content.',
    category: 'payments',
    readTime: '3 min',
    difficulty: 'Beginner',
    tags: ['refunds', 'policy', 'money back', 'support']
  },
  {
    id: '7',
    title: 'Audio Quality Settings',
    excerpt: 'How to adjust audio quality settings and troubleshoot audio playback issues.',
    category: 'content',
    readTime: '4 min',
    difficulty: 'Intermediate',
    tags: ['audio', 'quality', 'playback', 'settings']
  },
  {
    id: '8',
    title: 'Account Security Best Practices',
    excerpt: 'Tips for keeping your Story Haven account secure and protecting your purchases.',
    category: 'account',
    readTime: '5 min',
    difficulty: 'Beginner',
    tags: ['security', 'account', 'password', 'protection']
  }
]

export default function HelpCenterPage() {
  const { settings } = useSiteSettings()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null)

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = searchTerm === '' ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'Advanced': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary-gold glow-text mb-4">
            Help Center
          </h1>
          <p className="text-primary-gold-light/70 text-lg max-w-2xl mx-auto mb-8">
            Find comprehensive guides, tutorials, and support resources for Story Haven
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-gold-light/50" size={20} />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`card text-center hover:scale-105 transition-all duration-300 ${
              selectedCategory === 'all' ? 'ring-2 ring-primary-gold shadow-lg shadow-primary-gold/30' : ''
            }`}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-gold to-accent-orange flex items-center justify-center">
              <Phone className="text-dark-900" size={32} />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">All Articles</h3>
            <p className="text-primary-gold-light/70 text-sm">{helpArticles.length} articles</p>
          </button>

          {helpCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`card text-center hover:scale-105 transition-all duration-300 ${
                selectedCategory === category.id ? 'ring-2 ring-primary-gold shadow-lg shadow-primary-gold/30' : ''
              }`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <category.icon className="text-dark-900" size={32} />
              </div>
              <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">{category.title}</h3>
              <p className="text-primary-gold-light/70 text-sm">{category.articles} articles</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Articles List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-3xl font-bold text-primary-gold">
              Help Articles
            </h2>
            <span className="text-primary-gold-light/70">
              {filteredArticles.length} articles found
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <Phone className="w-16 h-16 text-primary-gold/30 mx-auto mb-4" />
              <p className="text-primary-gold-light/70 text-lg">No articles found matching your search.</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="mt-4 text-primary-gold hover:text-primary-gold-light transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card hover:shadow-lg hover:shadow-primary-gold/10 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                      {article.difficulty}
                    </div>
                    <span className="text-primary-gold-light/50 text-sm">{article.readTime}</span>
                  </div>

                  <h3 className="font-playfair text-xl font-bold text-primary-gold mb-3 group-hover:text-primary-gold-light transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-primary-gold-light/70 text-sm mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-dark-700 text-primary-gold-light/60 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <ChevronRight className="text-primary-gold group-hover:translate-x-1 transition-transform" size={20} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <div className="card text-center hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-gold/20 flex items-center justify-center">
              <MessageSquare className="text-primary-gold" size={24} />
            </div>
            <h3 className="font-semibold text-primary-gold mb-2">Live Chat</h3>
            <p className="text-primary-gold-light/70 text-sm mb-3">Get instant help</p>
            <button className="text-primary-gold hover:text-primary-gold-light text-sm font-medium">
              Start Chat
            </button>
          </div>

          <div className="card text-center hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <Phone className="text-green-400" size={24} />
            </div>
            <h3 className="font-semibold text-primary-gold mb-2">Phone Support</h3>
            <p className="text-primary-gold-light/70 text-sm mb-3">Call us directly</p>
            <a href={`tel:${settings.contactPhone}`} className="text-primary-gold hover:text-primary-gold-light text-sm font-medium">
              {settings.contactPhone}
            </a>
          </div>

          <div className="card text-center hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent-orange/20 flex items-center justify-center">
              <Mail className="text-accent-orange" size={24} />
            </div>
            <h3 className="font-semibold text-primary-gold mb-2">Email Support</h3>
            <p className="text-primary-gold-light/70 text-sm mb-3">Send us a message</p>
            <a href={`mailto:${settings.contactEmail}`} className="text-primary-gold hover:text-primary-gold-light text-sm font-medium">
              {settings.contactEmail}
            </a>
          </div>

          <div className="card text-center hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-gold/20 flex items-center justify-center">
              <Video className="text-primary-gold" size={24} />
            </div>
            <h3 className="font-semibold text-primary-gold mb-2">Video Guides</h3>
            <p className="text-primary-gold-light/70 text-sm mb-3">Watch tutorials</p>
            <button className="text-primary-gold hover:text-primary-gold-light text-sm font-medium">
              Coming Soon
            </button>
          </div>
        </motion.div>

        {/* Support Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="card">
            <h2 className="font-playfair text-3xl font-bold text-primary-gold mb-6">
              We're Here to Help
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Clock className="text-green-400" size={32} />
                </div>
                <h3 className="font-semibold text-primary-gold mb-2">24 Hour Response</h3>
                <p className="text-primary-gold-light/70 text-sm">We respond to all inquiries within 24 hours</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-gold/20 flex items-center justify-center">
                  <Check className="text-primary-gold" size={32} />
                </div>
                <h3 className="font-semibold text-primary-gold mb-2">98% Satisfaction</h3>
                <p className="text-primary-gold-light/70 text-sm">Our users love our support service</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-orange/20 flex items-center justify-center">
                  <Users className="text-accent-orange" size={32} />
                </div>
                <h3 className="font-semibold text-primary-gold mb-2">Expert Team</h3>
                <p className="text-primary-gold-light/70 text-sm">Professional support specialists</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <MessageSquare size={20} />
                <span>Contact Support</span>
              </a>
              <a
                href="/faqs"
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>Browse FAQs</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
