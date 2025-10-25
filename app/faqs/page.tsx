'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Phone, CreditCard, BookOpen, Headphones, Film, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { useSiteSettings } from '@/contexts/SiteContext'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I purchase and access content?',
    answer: 'To purchase content, browse our stories, audio, or animations and click the "Purchase" button. You can pay using MTN Mobile Money or Paystack. Once payment is confirmed, you\'ll have immediate access to the full content.',
    category: 'Purchasing',
    tags: ['payment', 'access', 'purchase', 'buy']
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer: 'We accept payments through MTN Mobile Money and Paystack (credit/debit cards). Both methods are secure and encrypted. MTN MoMo is processed instantly, while card payments may take a few minutes to confirm.',
    category: 'Payment',
    tags: ['momo', 'paystack', 'cards', 'payment methods']
  },
  {
    id: '3',
    question: 'Can I access purchased content on multiple devices?',
    answer: 'Yes! Once you purchase content, you can access it from any device by logging into your account. Your purchases are linked to your account, not your device.',
    category: 'Access',
    tags: ['multiple devices', 'account', 'login', 'sync']
  },
  {
    id: '4',
    question: 'How do I download content for offline reading?',
    answer: 'Currently, our platform is designed for online streaming and reading. We\'re working on offline download features for premium subscribers. Check back soon for updates!',
    category: 'Features',
    tags: ['offline', 'download', 'streaming', 'premium']
  },
  {
    id: '5',
    question: 'What is the difference between free and paid content?',
    answer: 'Free content includes the first page of every story, sample audio clips, and preview animations. Paid content gives you full access to complete stories, full audio narrations, and complete animations.',
    category: 'Content',
    tags: ['free', 'paid', 'preview', 'full access']
  },
  {
    id: '6',
    question: 'How do I contact customer support?',
    answer: 'You can reach our support team through the contact form on our website, or email us directly at our support email. We typically respond within 24 hours during business days.',
    category: 'Support',
    tags: ['support', 'contact', 'email', 'help']
  },
  {
    id: '7',
    question: 'Can I get a refund for purchased content?',
    answer: 'Refunds are available within 48 hours of purchase if you experience technical issues preventing access. All sales are final once content has been accessed. Contact support for refund requests.',
    category: 'Refunds',
    tags: ['refund', 'policy', 'technical issues', 'support']
  },
  {
    id: '8',
    question: 'How do I change my account information?',
    answer: 'You can update your account information in the admin panel settings. Changes will be reflected immediately across the platform. Contact support if you need help with account modifications.',
    category: 'Account',
    tags: ['account', 'settings', 'update', 'profile']
  },
  {
    id: '9',
    question: 'Are there different quality options for audio and video?',
    answer: 'Yes! Audio stories are available in high-quality MP3 format, and animations are streamed in HD quality. We automatically adjust quality based on your internet connection for optimal experience.',
    category: 'Quality',
    tags: ['audio quality', 'video quality', 'HD', 'MP3']
  },
  {
    id: '10',
    question: 'How do I share content with others?',
    answer: 'You can share links to our content, but each person needs their own purchase to access full content. We\'re working on referral programs and sharing features for premium users.',
    category: 'Sharing',
    tags: ['share', 'referral', 'links', 'social']
  }
]

const categories = [
  'All',
  'Purchasing',
  'Payment',
  'Access',
  'Features',
  'Content',
  'Support',
  'Refunds',
  'Account',
  'Quality',
  'Sharing'
]

export default function FAQPage() {
  const { settings } = useSiteSettings()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesSearch = searchTerm === '' ||
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary-gold glow-text mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-primary-gold-light/70 text-lg max-w-2xl mx-auto mb-8">
            Find answers to common questions about Story Haven, payments, and content access
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-gold-light/50" size={20} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary-gold text-dark-900 shadow-lg shadow-primary-gold/30'
                  : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <Phone className="w-16 h-16 text-primary-gold/30 mx-auto mb-4" />
              <p className="text-primary-gold-light/70 text-lg">No FAQs found matching your search.</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="mt-4 text-primary-gold hover:text-primary-gold-light transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card hover:shadow-lg hover:shadow-primary-gold/10 transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex-1">
                    <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">
                      {faq.question}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        faq.category === 'Payment' ? 'bg-green-500/20 text-green-400' :
                        faq.category === 'Purchasing' ? 'bg-primary-gold/20 text-primary-gold' :
                        faq.category === 'Support' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-accent-orange/20 text-accent-orange'
                      }`}>
                        {faq.category}
                      </span>
                      <span className="text-primary-gold-light/50">•</span>
                      <span className="text-primary-gold-light/70">
                        {faq.tags.slice(0, 2).join(', ')}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="text-primary-gold" size={24} />
                    ) : (
                      <ChevronDown className="text-primary-gold" size={24} />
                    )}
                  </div>
                </button>

                {expandedItems.has(faq.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="border-t border-primary-gold/20 pt-4">
                      <p className="text-primary-gold-light/80 leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSearchTerm(tag)}
                            className="px-2 py-1 bg-dark-700 text-primary-gold-light/70 rounded text-xs hover:bg-primary-gold/20 hover:text-primary-gold transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="card">
            <h2 className="font-playfair text-3xl font-bold text-primary-gold mb-4">
              Still need help?
            </h2>
            <p className="text-primary-gold-light/70 mb-6 max-w-md mx-auto">
              Can't find the answer you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>Contact Support</span>
              </a>
              <a
                href="/payment-guide"
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <CreditCard size={20} />
                <span>Payment Guide</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
