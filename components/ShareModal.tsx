'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, MessageCircle, Check } from 'lucide-react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  url?: string
}

export default function ShareModal({ isOpen, onClose, title, description, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = description || title

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
    },
  ]

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[120]"
          >
            <div className="card mx-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair text-2xl font-bold text-primary-gold">
                  Share This Story
                </h2>
                <button
                  onClick={onClose}
                  className="text-primary-gold-light hover:text-primary-gold transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Story Title */}
              <div className="mb-6 pb-6 border-b border-primary-gold/20">
                <p className="text-primary-gold-light font-medium">
                  {title}
                </p>
              </div>

              {/* Share Buttons */}
              <div className="grid grid-cols-5 gap-3 mb-6">
                {shareLinks.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => handleShare(platform.url)}
                    className={`${platform.color} text-white p-4 rounded-xl transition-all transform hover:scale-105 flex flex-col items-center justify-center space-y-2 group`}
                    title={`Share on ${platform.name}`}
                  >
                    <platform.icon size={24} />
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {platform.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Copy Link */}
              <div className="bg-dark-700 rounded-lg p-4">
                <p className="text-primary-gold-light/70 text-sm mb-3">Or copy link:</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-4 py-2 rounded-lg bg-dark-800 border border-primary-gold/30 text-primary-gold-light text-sm focus:outline-none focus:border-primary-gold"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-primary-gold text-dark-900 hover:bg-primary-gold-light'
                    }`}
                  >
                    {copied ? (
                      <Check size={20} />
                    ) : (
                      <LinkIcon size={20} />
                    )}
                  </button>
                </div>
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-sm mt-2 flex items-center space-x-1"
                  >
                    <Check size={16} />
                    <span>Link copied to clipboard!</span>
                  </motion.p>
                )}
              </div>

              {/* Share Tips */}
              <div className="mt-6 p-4 bg-primary-gold/5 border border-primary-gold/20 rounded-lg">
                <p className="text-primary-gold-light/70 text-sm">
                  💡 <strong>Help us grow!</strong> Share Story Haven with your friends and family. 
                  Every share helps support independent storytelling.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
