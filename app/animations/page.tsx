'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Play, Lock, Clock, Eye, Heart, Download, Share2, X } from 'lucide-react'
import PaymentModal from '@/components/PaymentModal'


export default function AnimationsPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAnimation, setSelectedAnimation] = useState<any | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [previewingId, setPreviewingId] = useState<number | null>(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)
  const [videoError, setVideoError] = useState(false)
  const [narratorVoice, setNarratorVoice] = useState<'male' | 'female'>('male')
  const [showNarratorControls, setShowNarratorControls] = useState(true)
  const [previewTime, setPreviewTime] = useState(0)
  const [previewLimitReached, setPreviewLimitReached] = useState(false)
  const PREVIEW_LIMIT = 15 // 15 seconds preview

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/animations')
        if (res.ok) {
          const data = await res.json()
          setItems(Array.isArray(data) ? data : [])
        }
      } catch (e) {
        console.error('Failed to load animations', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleWatch = (animation: any) => {
    setSelectedAnimation(animation)
    setShowPaymentModal(true)
  }

  const handlePreview = (animation: any) => {
    setSelectedAnimation(animation)
    setPreviewingId(animation.id)
    setShowPreviewModal(true)
    setVideoLoading(true)
    setVideoError(false)
  }

  const closePreview = () => {
    setShowPreviewModal(false)
    setPreviewingId(null)
    setSelectedAnimation(null)
    setVideoLoading(true)
    setVideoError(false)
    setPreviewTime(0)
    setPreviewLimitReached(false)
  }

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    const currentTime = Math.floor(video.currentTime)
    setPreviewTime(currentTime)
    
    // Pause at 15 seconds for preview
    if (currentTime >= PREVIEW_LIMIT && !previewLimitReached) {
      video.pause()
      setPreviewLimitReached(true)
    }
  }

  const handleDownload = (animation: any) => {
    // Show payment modal for download
    setSelectedAnimation(animation)
    setShowPaymentModal(true)
  }

  const handleShare = (animation: any) => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: animation.title,
        text: `Check out this amazing animation: ${animation.title}`,
        url: window.location.href
      }).catch(() => {
        // Fallback to clipboard
        copyToClipboard(animation)
      })
    } else {
      copyToClipboard(animation)
    }
  }

  const copyToClipboard = (animation: any) => {
    const shareText = `🎬 ${animation.title}\n${animation.description}\n\nWatch on Story Haven: ${window.location.origin}/animations`
    navigator.clipboard.writeText(shareText).then(() => {
      alert('✅ Link copied to clipboard! Share it with your friends.')
    })
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary-gold glow-text mb-4">
            Animated Tales
          </h1>
          <p className="text-primary-gold-light/70 text-lg max-w-2xl mx-auto">
            Watch stories unfold in breathtaking visual splendor
          </p>
        </motion.div>

        {/* Animations Grid */}
        {loading && (
          <div className="text-center text-primary-gold-light py-16">Loading animations...</div>
        )}
        {!loading && items.length === 0 && (
          <div className="text-center text-primary-gold-light/70 py-16">No animations yet. Please check back soon.</div>
        )}
        {!loading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((animation, index) => (
            <motion.div
              key={animation.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card overflow-hidden hover:scale-105 transition-transform duration-300">
                {/* Video Thumbnail */}
                <div className="relative group">
                  <div 
                    className="relative h-64 rounded-xl overflow-hidden mb-4 cursor-pointer"
                    onClick={() => handlePreview(animation)}
                  >
                    <Image
                      src={animation.thumbnail_url || '/Watermark.jpg'}
                      alt={animation.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-dark-900/40 group-hover:bg-dark-900/20 transition-colors" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 rounded-full bg-primary-gold/90 backdrop-blur-sm flex items-center justify-center transition-transform cursor-pointer shadow-2xl"
                      >
                        <Play size={32} className="text-dark-900 ml-1" fill="currentColor" />
                      </motion.div>
                    </div>
                    
                    {/* Preview Label */}
                    <div className="absolute top-4 left-4 bg-accent-orange text-dark-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      🎬 Click to Preview
                    </div>

                    {/* Genre Badge */}
                    <div className="absolute top-4 right-4 bg-primary-gold text-dark-900 px-3 py-1 rounded-full text-xs font-semibold">
                      {animation.genre}
                    </div>

                    {/* Duration and Resolution */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center space-x-1 bg-dark-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Clock size={14} className="text-primary-gold" />
                        <span className="text-primary-gold-light text-sm">{animation.duration}</span>
                      </div>
                      <div className="bg-dark-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-primary-gold-light text-xs">
                        {animation.resolution || 'HD'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animation Info */}
                <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">{animation.title}</h3>
                <p className="text-primary-gold-light/70 text-sm mb-4 line-clamp-2">{animation.description}</p>

                {/* Stats */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-primary-gold-light/70">
                  <div className="flex items-center space-x-1">
                    <Eye size={14} />
                    <span>{Number(animation.views || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart size={14} />
                    <span>{Number(animation.likes || 0).toLocaleString()}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-primary-gold/20">
                  <div className="text-primary-gold font-bold text-xl">
                    ₵{Number(animation.price || 0).toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleWatch(animation)}
                    className="flex items-center space-x-2 btn-primary text-sm"
                  >
                    <Lock size={16} />
                    <span>Watch Full</span>
                  </button>
                </div>

                {/* Preview Note */}
                <p className="text-primary-gold-light/50 text-xs mt-3 text-center">
                  🎬 15-second preview available
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {/* Features Section - Interactive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* HD Quality - Play First Animation */}
          <motion.button
            onClick={() => items[0] && handlePreview(items[0])}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="card text-center cursor-pointer hover:border-primary-gold/60 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-gold to-accent-orange flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Play size={28} className="text-dark-900" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">
              HD Quality
            </h3>
            <p className="text-primary-gold-light/70 text-sm mb-3">
              All animations in stunning 1080p HD with crystal-clear visuals
            </p>
            <span className="text-accent-orange text-xs font-semibold">
              👆 Click to preview
            </span>
          </motion.button>

          {/* Download & Keep - Purchase First Animation */}
          <motion.button
            onClick={() => items[0] && handleDownload(items[0])}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="card text-center cursor-pointer hover:border-primary-gold/60 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-orange to-primary-gold-dark flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Download size={28} className="text-dark-900" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">
              Download & Keep
            </h3>
            <p className="text-primary-gold-light/70 text-sm mb-3">
              Download once and watch offline anytime, anywhere
            </p>
            <span className="text-accent-orange text-xs font-semibold">
              👆 Click to purchase
            </span>
          </motion.button>

          {/* Share the Magic - Share First Animation */}
          <motion.button
            onClick={() => items[0] && handleShare(items[0])}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="card text-center cursor-pointer hover:border-primary-gold/60 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-gold-dark to-accent-orange flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Share2 size={28} className="text-dark-900" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">
              Share the Magic
            </h3>
            <p className="text-primary-gold-light/70 text-sm mb-3">
              Share previews with friends and family on social media
            </p>
            <span className="text-accent-orange text-xs font-semibold">
              👆 Click to share
            </span>
          </motion.button>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 card text-center max-w-3xl mx-auto"
        >
          <h2 className="font-playfair text-3xl font-bold text-primary-gold mb-4">
            Cinematic Storytelling
          </h2>
          <p className="text-primary-gold-light/70 leading-relaxed">
            Each animation is crafted with meticulous attention to detail, blending traditional African
            art styles with modern animation techniques. Experience stories that celebrate culture,
            inspire imagination, and touch the heart.
          </p>
        </motion.div>
      </div>

      {/* Preview Modal - Full Screen Story Format */}
      {showPreviewModal && selectedAnimation && (
        <div className="fixed inset-0 z-[200] bg-dark-900">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-full flex flex-col"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-dark-800 to-dark-900 border-b border-primary-gold/20">
              <div className="flex-1">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-accent-orange">
                  {selectedAnimation.title}
                </h2>
                <p className="text-primary-gold-light/70 text-sm mt-1">
                  {selectedAnimation?.genre} • {selectedAnimation?.duration} • {selectedAnimation?.resolution || 'HD'}
                </p>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closePreview}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-700/80 backdrop-blur-sm text-primary-gold-light hover:text-primary-gold hover:bg-dark-700 hover:scale-110 transition-all duration-200 border border-primary-gold/20 ml-4"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Left Side - Video Player */}
              <div className="flex-1 flex flex-col p-6 lg:p-8">
                {/* Video Player */}
                <div className="relative aspect-video bg-dark-900 rounded-xl overflow-hidden shadow-2xl">
                {/* Loading Spinner */}
                {videoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-dark-900 z-10">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-primary-gold/30 border-t-primary-gold rounded-full mx-auto mb-4"
                      />
                      <p className="text-primary-gold-light text-sm">Loading preview...</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-dark-900 z-10">
                    <div className="text-center p-6">
                      <p className="text-accent-orange text-lg mb-2">⚠️ Video failed to load</p>
                      <p className="text-primary-gold-light/70 text-sm">Please check your internet connection and try again</p>
                    </div>
                  </div>
                )}

                {/* Large Centered Watermark - Behind Video */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="text-center opacity-[0.08] blur-[0.5px] select-none">
                    <p className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-primary-gold transform -rotate-12">
                      STORY HAVEN
                    </p>
                    <p className="text-xl md:text-3xl lg:text-4xl text-primary-gold-light mt-4">
                      PREVIEW
                    </p>
                  </div>
                </div>

                <video
                  className="w-full h-full object-contain relative z-20"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  controlsList="nodownload"
                  poster={selectedAnimation?.thumbnail_url || '/Watermark.jpg'}
                  style={{ backgroundColor: '#0A0A0A' }}
                  onLoadedData={() => setVideoLoading(false)}
                  onCanPlay={() => setVideoLoading(false)}
                  onError={() => {
                    setVideoLoading(false)
                    setVideoError(true)
                  }}
                  onWaiting={() => setVideoLoading(true)}
                  onPlaying={() => setVideoLoading(false)}
                  onTimeUpdate={handleVideoTimeUpdate}
                >
                  <source src={selectedAnimation?.video_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Preview Limit Overlay */}
                {previewLimitReached && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-dark-900/95 backdrop-blur-md flex items-center justify-center z-30"
                  >
                    <div className="text-center px-6 py-8 max-w-lg">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-gold to-accent-orange flex items-center justify-center"
                      >
                        <Lock size={40} className="text-dark-900" />
                      </motion.div>
                      <h3 className="font-playfair text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-accent-orange mb-4">
                        Preview Complete!
                      </h3>
                      <p className="text-primary-gold-light/80 text-lg mb-2">
                        You've watched the 15-second preview
                      </p>
                      <p className="text-primary-gold-light/60 text-sm mb-8">
                        Purchase the full HD animation to continue watching this amazing story
                      </p>
                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            closePreview()
                            handleWatch(selectedAnimation)
                          }}
                          className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-3"
                        >
                          <Lock size={24} />
                          <span>Unlock Full Animation</span>
                          <span className="text-2xl font-bold">₵{Number(selectedAnimation?.price || 0).toFixed(2)}</span>
                        </button>
                        <button
                          onClick={closePreview}
                          className="w-full btn-secondary py-3"
                        >
                          Browse More Animations
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Preview Timer Display */}
                {!previewLimitReached && previewTime > 0 && (
                  <div className="absolute top-4 right-4 z-30 bg-dark-900/90 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-gold/30">
                    <p className="text-primary-gold-light text-sm font-medium">
                      Preview: <span className="text-primary-gold font-bold">{previewTime}</span>/{PREVIEW_LIMIT}s
                    </p>
                  </div>
                )}
              </div>

              </div>

              {/* Right Side - Story Controls & Info */}
              <div className="lg:w-96 bg-gradient-to-br from-dark-800 to-dark-900 border-l border-primary-gold/20 p-6 lg:p-8 overflow-y-auto">
                {/* Narrator Voice Selection */}
                <div className="mb-8">
                  <h3 className="font-playfair text-xl font-bold text-primary-gold mb-4 flex items-center">
                    <span className="mr-2">🎙️</span> Narrator Voice
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setNarratorVoice('male')}
                      className={`p-4 rounded-xl font-medium transition-all duration-300 ${
                        narratorVoice === 'male'
                          ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 shadow-lg shadow-primary-gold/30 scale-105'
                          : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600 border border-primary-gold/20'
                      }`}
                    >
                      <div className="text-2xl mb-1">👨</div>
                      <div className="text-sm font-semibold">Male Voice</div>
                      <div className="text-xs opacity-70 mt-1">Deep & Powerful</div>
                    </button>
                    <button
                      onClick={() => setNarratorVoice('female')}
                      className={`p-4 rounded-xl font-medium transition-all duration-300 ${
                        narratorVoice === 'female'
                          ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 shadow-lg shadow-primary-gold/30 scale-105'
                          : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600 border border-primary-gold/20'
                      }`}
                    >
                      <div className="text-2xl mb-1">👩</div>
                      <div className="text-sm font-semibold">Female Voice</div>
                      <div className="text-xs opacity-70 mt-1">Warm & Soothing</div>
                    </button>
                  </div>
                  <p className="text-primary-gold-light/60 text-xs mt-3 text-center">
                    ✨ Choose your preferred narrator for the story
                  </p>
                </div>

                {/* Story Description */}
                <div className="mb-6">
                  <h3 className="font-playfair text-lg font-bold text-primary-gold mb-3">📖 Story</h3>
                  <p className="text-primary-gold-light/80 text-sm leading-relaxed">
                    {selectedAnimation?.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="bg-dark-700/50 rounded-lg p-3 border border-primary-gold/10">
                    <div className="flex items-center space-x-2 text-primary-gold-light/70 text-xs mb-1">
                      <Clock size={14} />
                      <span>Duration</span>
                    </div>
                    <div className="text-primary-gold font-semibold">{selectedAnimation?.duration}</div>
                  </div>
                  <div className="bg-dark-700/50 rounded-lg p-3 border border-primary-gold/10">
                    <div className="flex items-center space-x-2 text-primary-gold-light/70 text-xs mb-1">
                      <Eye size={14} />
                      <span>Views</span>
                    </div>
                    <div className="text-primary-gold font-semibold">{Number(selectedAnimation?.views || 0).toLocaleString()}</div>
                  </div>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => {
                    closePreview()
                    handleWatch(selectedAnimation)
                  }}
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-4 text-lg"
                >
                  <Lock size={22} />
                  <span>Purchase Full HD</span>
                </button>
                <div className="text-center mt-3">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-accent-orange">
                    ₵{Number(selectedAnimation?.price || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedAnimation && (
        <PaymentModal
          title={selectedAnimation.title}
          price={selectedAnimation.price}
          type="animation"
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {
            setShowPaymentModal(false)
            // Handle successful purchase
          }}
        />
      )}
    </div>
  )
}
