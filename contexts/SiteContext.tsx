'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Site Settings Interface
interface SiteSettings {
  siteName: string
  tagline: string
  primaryColor: string
  accentColor: string
  heroTitle: string
  heroSubtitle: string
  aboutText: string
  contactEmail: string
  contactPhone: string
  contactLocation: string
  socialLinks: {
    facebook: string
    twitter: string
    instagram: string
    whatsapp: string
    tiktok: string
  }
  featuredStoryIds: number[]
  showOpeningAnimation: boolean
  watermarkOpacity: number
  // Payment Settings
  momoNumber: string
  momoName: string
  paystackPublicKey: string
  paystackSecretKey: string
  // Admin Settings
  adminEmail: string
  adminName: string
}

// Default Settings
const defaultSettings: SiteSettings = {
  siteName: 'STORY HAVEN',
  tagline: 'Where Stories Come Alive',
  primaryColor: '#D4AF37',
  accentColor: '#FF8C42',
  heroTitle: 'Welcome to Story Haven',
  heroSubtitle: 'Discover captivating tales, immersive audio stories, and stunning animations by Dray Harmony',
  aboutText: 'Story Haven is your gateway to a world of enchanting narratives. From written stories to audio tales and animated adventures, we bring you the finest storytelling experiences.',
  contactEmail: 'contact@storyhaven.art',
  contactPhone: '+233 XX XXX XXXX',
  contactLocation: 'Ghana, West Africa',
  socialLinks: {
    facebook: 'https://facebook.com/storyhaven',
    twitter: 'https://twitter.com/storyhaven',
    instagram: 'https://instagram.com/storyhaven',
    whatsapp: '+233XXXXXXXXX',
    tiktok: 'https://tiktok.com/@storyhaven'
  },
  featuredStoryIds: [1, 2, 3],
  showOpeningAnimation: true,
  watermarkOpacity: 0.12,
  // Payment Settings
  momoNumber: '',
  momoName: 'Dray Harmony',
  paystackPublicKey: '',
  paystackSecretKey: '',
  // Admin Settings
  adminEmail: 'admin@storyhaven.art',
  adminName: 'Dray Harmony'
}

// Context Type
interface SiteContextType {
  settings: SiteSettings
  updateSettings: (newSettings: Partial<SiteSettings>) => void
  resetSettings: () => void
}

// Create Context
const SiteContext = createContext<SiteContextType | undefined>(undefined)

// Provider Component
export function SiteProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('siteSettings')
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings)
          // Merge with defaults to ensure all new fields exist
          setSettings({ ...defaultSettings, ...parsed })
        } catch (error) {
          console.error('Error loading settings:', error)
        }
      }
    }
  }, [])

  // Update settings and save to localStorage
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings }
      if (typeof window !== 'undefined') {
        localStorage.setItem('siteSettings', JSON.stringify(updated))
      }
      return updated
    })
  }

  // Reset to default settings
  const resetSettings = () => {
    setSettings(defaultSettings)
    if (typeof window !== 'undefined') {
      localStorage.setItem('siteSettings', JSON.stringify(defaultSettings))
    }
  }

  return (
    <SiteContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SiteContext.Provider>
  )
}

// Custom Hook
export function useSiteSettings() {
  const context = useContext(SiteContext)
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteProvider')
  }
  return context
}
