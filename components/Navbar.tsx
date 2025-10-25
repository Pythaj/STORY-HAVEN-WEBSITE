'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, BookOpen, Headphones, Film, ShoppingBag, User } from 'lucide-react'
import { useSiteSettings } from '@/contexts/SiteContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { settings } = useSiteSettings()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Secret admin access: Triple-click logo
  useEffect(() => {
    if (logoClicks >= 3) {
      console.log('🔐 Admin access triggered - navigating to /admin')
      router.push('/admin')
      setLogoClicks(0)
    }
    
    // Reset clicks after 2 seconds
    const timer = setTimeout(() => {
      if (logoClicks > 0 && logoClicks < 3) {
        setLogoClicks(0)
      }
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [logoClicks, router])

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const newClicks = logoClicks + 1
    setLogoClicks(newClicks)
    console.log(`Logo clicked: ${newClicks} time(s)`)
    
    if (newClicks < 3) {
      // Navigate to home on first click
      if (newClicks === 1) {
        router.push('/')
      }
    }
  }

  const navLinks = [
    { name: 'Home', href: '/', icon: null },
    { name: 'Stories', href: '/stories', icon: BookOpen },
    { name: 'Audio', href: '/audio', icon: Headphones },
    { name: 'Animations', href: '/animations', icon: Film },
    { name: 'Shop', href: '/shop', icon: ShoppingBag },
    { name: 'Contact', href: '/contact', icon: null },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/95 backdrop-blur-md shadow-lg shadow-primary-gold/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 group cursor-pointer relative"
          >
            <div className="relative w-12 h-12 overflow-hidden rounded-full ring-2 ring-primary-gold/50 group-hover:ring-primary-gold transition-all group-hover:scale-110">
              <Image
                src="/Logo.jpg"
                alt="Story Haven Logo"
                fill
                className="object-cover"
              />
              {/* Secret admin indicator */}
              {logoClicks > 0 && (
                <div className="absolute inset-0 bg-primary-gold/20 animate-pulse" />
              )}
            </div>
            <span className="font-playfair text-2xl font-bold text-primary-gold glow-text hidden sm:block">
              {settings.siteName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center space-x-2 text-primary-gold-light hover:text-primary-gold transition-colors duration-200 font-medium"
              >
                {link.icon && <link.icon size={18} />}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-gold hover:text-primary-gold-light transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-900/98 backdrop-blur-lg border-t border-primary-gold/20">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 text-primary-gold-light hover:text-primary-gold transition-colors py-3 px-4 rounded-lg hover:bg-dark-800"
              >
                {link.icon && <link.icon size={20} />}
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
