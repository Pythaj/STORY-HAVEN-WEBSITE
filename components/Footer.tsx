'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, MessageCircle, Music } from 'lucide-react'
import { useSiteSettings } from '@/contexts/SiteContext'

export default function Footer() {
  const { settings } = useSiteSettings()
  const [currentYear, setCurrentYear] = useState(2024)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || subscribing) return

    setSubscribing(true)
    
    // Simulate subscription (in production, this would call an API)
    setTimeout(() => {
      setSubscribed(true)
      setEmail('')
      setSubscribing(false)
      
      // Reset after 3 seconds
      setTimeout(() => setSubscribed(false), 3000)
    }, 1000)
  }

  const footerLinks = {
    explore: [
      { name: 'All Stories', href: '/stories' },
      { name: 'Audio Stories', href: '/audio' },
      { name: 'Animations', href: '/animations' },
      { name: 'Shop', href: '/shop' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Help Center', href: '/help' },
      { name: 'Payment Guide', href: '/payment-guide' },
      { name: 'FAQs', href: '/faqs' },
    ],
    legal: [
      { name: 'Terms of Use', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Copyright Policy', href: '/copyright' },
      { name: 'Refund Policy', href: '/refund' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: settings.socialLinks.facebook, color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: Instagram, href: settings.socialLinks.instagram, color: 'hover:text-pink-500' },
    { name: 'Twitter', icon: Twitter, href: settings.socialLinks.twitter, color: 'hover:text-sky-500' },
    { name: 'WhatsApp', icon: MessageCircle, href: `https://wa.me/${settings.socialLinks.whatsapp?.replace(/\+/g, '')}`, color: 'hover:text-green-500' },
    { name: 'TikTok', icon: Music, href: settings.socialLinks.tiktok, color: 'hover:text-purple-500' },
  ]

  return (
    <footer className="bg-dark-900 border-t border-primary-gold/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="relative w-16 h-16 overflow-hidden rounded-full ring-2 ring-primary-gold/50">
                <Image
                  src="/Logo.jpg"
                  alt="Story Haven Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-playfair text-2xl font-bold text-primary-gold glow-text">
                {settings.siteName}
              </span>
            </Link>
            <p className="text-primary-gold-light/70 mb-6 max-w-sm">
              {settings.aboutText || 'Experience the Magic of Words, Sounds, and Motion. Premium storytelling by Dray Harmony.'}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-primary-gold-light ${social.color} transition-colors p-2 rounded-full bg-dark-800 hover:bg-dark-700`}
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-primary-gold mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-gold-light/70 hover:text-primary-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-primary-gold mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-gold-light/70 hover:text-primary-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-primary-gold mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-gold-light/70 hover:text-primary-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-primary-gold/20 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-playfair text-xl font-semibold text-primary-gold mb-2">
              Stay Updated
            </h3>
            <p className="text-primary-gold-light/70 mb-4">
              Get notified about new stories and exclusive releases
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={subscribing || subscribed}
                className="flex-1 px-4 py-2 rounded-lg bg-dark-800 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={subscribing || subscribed}
                className="btn-primary disabled:opacity-50"
              >
                {subscribing ? 'Subscribing...' : subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-primary-gold/20 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-8 text-primary-gold-light/70">
            <div className="flex items-center space-x-2">
              <Mail size={18} className="text-primary-gold" />
              <span>{settings.contactEmail}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={18} className="text-primary-gold" />
              <span>{settings.contactPhone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={18} className="text-primary-gold" />
              <span>Ghana, West Africa</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-gold/20 pt-8 text-center">
          <p className="text-primary-gold-light/70">
            © {currentYear} {settings.siteName}. All Rights Reserved. Created by{' '}
            <span className="text-primary-gold font-semibold">{settings.adminName}</span>
          </p>
          <p className="text-primary-gold-light/50 text-sm mt-2">
            All stories, audio, and animations are protected by copyright law.
          </p>
        </div>
      </div>
    </footer>
  )
}
