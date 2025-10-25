'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Loader, AlertTriangle } from 'lucide-react'
import { useSiteSettings } from '@/contexts/SiteContext'

export default function ContactPage() {
  const { settings } = useSiteSettings()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: settings.contactEmail,
          adminEmail: settings.adminEmail
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary-gold glow-text mb-4">
            Get in Touch
          </h1>
          <p className="text-primary-gold-light/70 text-lg max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-primary-gold-light mb-2 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-primary-gold-light mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-primary-gold-light mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-primary-gold-light mb-2 font-medium">
                  Message
                </label>
                <textarea
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold disabled:opacity-50"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start space-x-3">
                  <Check className="text-green-400 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-green-400 font-semibold">Message Sent Successfully!</p>
                    <p className="text-primary-gold-light/70 text-sm mt-1">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start space-x-3">
                  <AlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-red-400 font-semibold">Failed to Send Message</p>
                    <p className="text-primary-gold-light/70 text-sm mt-1">
                      Please try again or contact us directly via email.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-gold to-accent-orange flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-dark-900" />
                  </div>
                  <div>
                    <h3 className="text-primary-gold font-semibold mb-1">Email</h3>
                    <a href={`mailto:${settings.contactEmail}`} className="text-primary-gold-light/70 hover:text-primary-gold transition-colors">
                      {settings.contactEmail}
                    </a>
                    <p className="text-primary-gold-light/50 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-orange to-primary-gold-dark flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-dark-900" />
                  </div>
                  <div>
                    <h3 className="text-primary-gold font-semibold mb-1">Phone</h3>
                    <a href={`tel:${settings.contactPhone}`} className="text-primary-gold-light/70 hover:text-primary-gold transition-colors">
                      {settings.contactPhone}
                    </a>
                    <p className="text-primary-gold-light/50 text-sm mt-1">Mon-Fri, 9AM-6PM GMT</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-gold-dark to-accent-orange flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-dark-900" />
                  </div>
                  <div>
                    <h3 className="text-primary-gold font-semibold mb-1">Location</h3>
                    <p className="text-primary-gold-light/70">{settings.contactLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                Quick Support
              </h2>
              <p className="text-primary-gold-light/70 mb-6">
                Need immediate assistance? Check out our help resources:
              </p>
              <div className="space-y-3">
                <a href="/faqs" className="block p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="text-primary-gold" size={20} />
                    <span className="text-primary-gold-light font-medium">FAQs</span>
                  </div>
                </a>
                <a href="/payment-guide" className="block p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="text-primary-gold" size={20} />
                    <span className="text-primary-gold-light font-medium">Payment Guide</span>
                  </div>
                </a>
                <a href="/help" className="block p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="text-primary-gold" size={20} />
                    <span className="text-primary-gold-light font-medium">Help Center</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
