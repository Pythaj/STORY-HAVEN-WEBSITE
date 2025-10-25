'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Download, Share2, Eye, Star, Lock, ChevronLeft, ChevronRight } from 'lucide-react'
import PaymentModal from '@/components/PaymentModal'
import ContentWatermark from '@/components/ContentWatermark'
import ShareModal from '@/components/ShareModal'

export default function StoryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [story, setStory] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [isPurchased, setIsPurchased] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [readingMode, setReadingMode] = useState<'light' | 'dark'>('dark')
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    const fetchStory = async () => {
      const { id } = await params
      try {
        const response = await fetch(`/api/stories/${id}`)
        if (response.ok) {
          const storyData = await response.json()
          setStory(storyData)
          setFormattedDate(new Date(storyData.publishDate).toLocaleDateString())
        }
      } catch (error) {
        console.error('Error fetching story:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStory()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-primary-gold-light">Loading story...</p>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold text-primary-gold mb-4">Story Not Found</h1>
          <p className="text-primary-gold-light mb-8">The story you're looking for doesn't exist or has been removed.</p>
          <Link href="/stories" className="btn-primary inline-flex items-center space-x-2">
            <ArrowLeft size={20} />
            <span>Back to Library</span>
          </Link>
        </div>
      </div>
    )
  }

  const canViewPage = (pageIndex: number) => {
    return story.content[pageIndex]?.isFree || isPurchased
  }

  const handleNextPage = () => {
    if (currentPage < story.content.length - 1) {
      if (canViewPage(currentPage + 1)) {
        setCurrentPage(currentPage + 1)
      } else {
        setShowPaymentModal(true)
      }
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePurchaseSuccess = () => {
    setIsPurchased(true)
    setShowPaymentModal(false)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/stories"
          className="inline-flex items-center space-x-2 text-primary-gold hover:text-primary-gold-light transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Library</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="card sticky top-28">
              {/* Cover Image */}
              <div className="relative h-96 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={story.cover}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title and Author */}
              <h1 className="font-playfair text-3xl font-bold text-primary-gold mb-2">
                {story.title}
              </h1>
              <p className="text-primary-gold-light mb-4">
                by <span className="font-semibold">{story.author}</span>
              </p>

              {/* Stats */}
              <div className="flex items-center space-x-4 mb-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="text-primary-gold fill-primary-gold" size={16} />
                  <span className="text-primary-gold-light">{story.rating}</span>
                  <span className="text-primary-gold-light/50">({story.reviews})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="text-primary-gold" size={16} />
                  <span className="text-primary-gold-light">{story.views}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-primary-gold-light/70 mb-6 leading-relaxed">
                {story.description}
              </p>

              {/* Details */}
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-gold-light/70">Genre:</span>
                  <span className="text-primary-gold font-semibold">{story.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-gold-light/70">Pages:</span>
                  <span className="text-primary-gold-light">{story.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-gold-light/70">Language:</span>
                  <span className="text-primary-gold-light">{story.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-gold-light/70">Published:</span>
                  <span className="text-primary-gold-light">
                    {formattedDate || story.publishDate}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-dark-700 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary-gold-light">Price:</span>
                  <span className="text-primary-gold font-bold text-2xl">
                    ₵{story.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-primary-gold-light/50 text-xs">
                  First page free • Pay to unlock full story
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!isPurchased ? (
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Lock size={20} />
                    <span>Buy Full Story</span>
                  </button>
                ) : (
                  <>
                    <button className="w-full btn-primary flex items-center justify-center space-x-2">
                      <Download size={20} />
                      <span>Download PDF</span>
                    </button>
                    <div className="text-center text-primary-gold text-sm">
                      ✓ Purchased
                    </div>
                  </>
                )}
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                  <Share2 size={20} />
                  <span>Share Story</span>
                </button>
              </div>

              {/* Reading Mode Toggle */}
              <div className="mt-6 pt-6 border-t border-primary-gold/20">
                <p className="text-primary-gold-light/70 text-sm mb-3">Reading Mode:</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setReadingMode('light')}
                    className={`flex-1 py-2 rounded-lg transition-colors ${
                      readingMode === 'light'
                        ? 'bg-primary-gold text-dark-900'
                        : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setReadingMode('dark')}
                    className={`flex-1 py-2 rounded-lg transition-colors ${
                      readingMode === 'dark'
                        ? 'bg-primary-gold text-dark-900'
                        : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600'
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Flipbook Reader */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="card">
              {/* Reader Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary-gold/20">
                <div className="flex items-center space-x-2 text-primary-gold">
                  <BookOpen size={20} />
                  <span className="font-semibold">Interactive Reader</span>
                </div>
                <div className="text-primary-gold-light text-sm">
                  Page {currentPage + 1} of {story.content.length}
                </div>
              </div>

              {/* Book Page */}
              <div
                className={`relative min-h-[600px] rounded-lg p-8 md:p-12 shadow-2xl transition-colors duration-300 overflow-hidden ${
                  readingMode === 'light'
                    ? 'bg-amber-50 text-gray-900'
                    : 'bg-dark-700 text-primary-gold-light'
                }`}
              >
                {/* Watermark Overlay - Shows on all pages until purchased */}
                <ContentWatermark 
                  isPurchased={isPurchased} 
                  position="center"
                  opacity={0.15}
                />

                {/* Page Content */}
                <div className="prose prose-lg max-w-none relative z-20">
                  {canViewPage(currentPage) ? (
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="whitespace-pre-wrap font-serif leading-relaxed"
                    >
                      {story.content[currentPage].text}
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-6">
                      <Lock size={64} className="text-primary-gold/50" />
                      <h3 className="font-playfair text-2xl font-bold text-primary-gold text-center">
                        This Page is Locked
                      </h3>
                      <p className="text-center text-primary-gold-light/70 max-w-md">
                        Purchase the full story to continue reading this amazing tale
                      </p>
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Lock size={20} />
                      <span>Unlock Full Story - ₵{story.price.toFixed(2)}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Page Number */}
                <div className="absolute bottom-8 right-12 text-sm opacity-50">
                  {story.content[currentPage].pageNumber}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                    currentPage === 0
                      ? 'bg-dark-700/50 text-primary-gold-light/30 cursor-not-allowed'
                      : 'bg-dark-700 text-primary-gold hover:bg-dark-600'
                  }`}
                >
                  <ChevronLeft size={20} />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-2">
                  {story.content.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => canViewPage(index) && setCurrentPage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentPage
                          ? 'bg-primary-gold w-8'
                          : canViewPage(index)
                          ? 'bg-primary-gold/50 hover:bg-primary-gold/70'
                          : 'bg-primary-gold/20'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === story.content.length - 1 && isPurchased}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                    currentPage === story.content.length - 1 && isPurchased
                      ? 'bg-dark-700/50 text-primary-gold-light/30 cursor-not-allowed'
                      : 'bg-dark-700 text-primary-gold hover:bg-dark-600'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          title={story.title}
          price={story.price}
          type="story"
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePurchaseSuccess}
        />
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={story.title}
        description={story.description}
      />
    </div>
  )
}
