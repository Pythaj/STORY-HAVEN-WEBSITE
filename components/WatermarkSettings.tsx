'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Upload, Eye, Settings, Image as ImageIcon, RefreshCw, Check } from 'lucide-react'
import Image from 'next/image'

interface WatermarkConfig {
  enabled: boolean
  useCustomImage: boolean
  customImageUrl: string
  text: string
  subtitle: string
  opacity: number
  position: 'center' | 'top-right' | 'bottom-right' | 'diagonal'
  size: 'small' | 'medium' | 'large'
}

export default function WatermarkSettings() {
  const [storyWatermark, setStoryWatermark] = useState<WatermarkConfig>({
    enabled: true,
    useCustomImage: false,
    customImageUrl: '',
    text: 'STORY HAVEN',
    subtitle: 'PREVIEW',
    opacity: 15,
    position: 'center',
    size: 'large'
  })

  const [audioWatermark, setAudioWatermark] = useState<WatermarkConfig>({
    enabled: true,
    useCustomImage: false,
    customImageUrl: '',
    text: 'STORY HAVEN AUDIO',
    subtitle: 'PREVIEW',
    opacity: 20,
    position: 'center',
    size: 'medium'
  })

  const [animationWatermark, setAnimationWatermark] = useState<WatermarkConfig>({
    enabled: true,
    useCustomImage: false,
    customImageUrl: '',
    text: 'STORY HAVEN',
    subtitle: 'PREVIEW',
    opacity: 10,
    position: 'center',
    size: 'large'
  })

  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('watermarkSettings')
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      if (parsed.story) setStoryWatermark(parsed.story)
      if (parsed.audio) setAudioWatermark(parsed.audio)
      if (parsed.animation) setAnimationWatermark(parsed.animation)
    }
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, contentType: 'story' | 'audio' | 'animation') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // Upload to Cloudinary
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'story_haven')
      formData.append('folder', 'watermarks')

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      )

      if (response.ok) {
        const data = await response.json()
        const imageUrl = data.secure_url

        // Update the appropriate watermark config
        if (contentType === 'story') {
          setStoryWatermark(prev => ({ ...prev, customImageUrl: imageUrl, useCustomImage: true }))
        } else if (contentType === 'audio') {
          setAudioWatermark(prev => ({ ...prev, customImageUrl: imageUrl, useCustomImage: true }))
        } else if (contentType === 'animation') {
          setAnimationWatermark(prev => ({ ...prev, customImageUrl: imageUrl, useCustomImage: true }))
        }
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload watermark image')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = () => {
    const settings = {
      story: storyWatermark,
      audio: audioWatermark,
      animation: animationWatermark
    }
    localStorage.setItem('watermarkSettings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const renderWatermarkPreview = (config: WatermarkConfig, type: string) => (
    <div className="relative w-full h-64 bg-dark-700 rounded-lg overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-600 to-dark-800" />
      
      {/* Preview Content */}
      <div className="relative z-10 text-center text-primary-gold-light/30 text-sm">
        {type} Content Preview
      </div>

      {/* Watermark Preview */}
      {config.enabled && (
        <div 
          className={`absolute inset-0 flex items-center justify-center pointer-events-none z-20 ${
            config.position === 'diagonal' ? 'rotate-[-12deg]' : ''
          } ${
            config.position === 'top-right' ? 'justify-end items-start p-8' : ''
          } ${
            config.position === 'bottom-right' ? 'justify-end items-end p-8' : ''
          }`}
          style={{ opacity: config.opacity / 100 }}
        >
          {config.useCustomImage && config.customImageUrl ? (
            <div className="relative w-48 h-48">
              <Image 
                src={config.customImageUrl} 
                alt="Watermark" 
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="text-center select-none">
              <p className={`font-playfair font-bold text-primary-gold ${
                config.size === 'small' ? 'text-4xl' : 
                config.size === 'medium' ? 'text-6xl' : 'text-8xl'
              }`}>
                {config.text}
              </p>
              <p className={`text-primary-gold-light mt-2 ${
                config.size === 'small' ? 'text-xl' : 
                config.size === 'medium' ? 'text-2xl' : 'text-3xl'
              }`}>
                {config.subtitle}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderSettings = (
    config: WatermarkConfig, 
    setConfig: React.Dispatch<React.SetStateAction<WatermarkConfig>>,
    type: 'story' | 'audio' | 'animation',
    label: string
  ) => (
    <div className="card">
      <h3 className="font-playfair text-2xl font-bold text-primary-gold mb-6">{label} Watermark</h3>
      
      {/* Preview */}
      <div className="mb-6">
        {renderWatermarkPreview(config, label)}
      </div>

      {/* Enable/Disable */}
      <div className="flex items-center justify-between mb-6 p-4 bg-dark-700/50 rounded-lg">
        <span className="text-primary-gold-light font-medium">Enable Watermark</span>
        <button
          onClick={() => setConfig(prev => ({ ...prev, enabled: !prev.enabled }))}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            config.enabled ? 'bg-green-500' : 'bg-dark-600'
          }`}
        >
          <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
            config.enabled ? 'translate-x-7' : ''
          }`} />
        </button>
      </div>

      {config.enabled && (
        <div className="space-y-4">
          {/* Custom Image Upload */}
          <div>
            <label className="block text-primary-gold-light mb-2 font-medium">Custom Watermark Image</label>
            <div className="flex items-center space-x-3">
              <label className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light hover:bg-dark-600 transition-all cursor-pointer">
                <Upload size={18} />
                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, type)}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              {config.customImageUrl && (
                <button
                  onClick={() => setConfig(prev => ({ ...prev, useCustomImage: !prev.useCustomImage }))}
                  className={`px-4 py-3 rounded-lg border transition-all ${
                    config.useCustomImage 
                      ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                      : 'bg-dark-700 border-primary-gold/30 text-primary-gold-light'
                  }`}
                >
                  {config.useCustomImage ? <Check size={18} /> : <ImageIcon size={18} />}
                </button>
              )}
            </div>
            <p className="text-xs text-primary-gold-light/50 mt-1">
              Upload a PNG/SVG with transparent background for best results
            </p>
          </div>

          {!config.useCustomImage && (
            <>
              {/* Text */}
              <div>
                <label className="block text-primary-gold-light mb-2 font-medium">Watermark Text</label>
                <input
                  type="text"
                  value={config.text}
                  onChange={(e) => setConfig(prev => ({ ...prev, text: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-primary-gold-light mb-2 font-medium">Subtitle</label>
                <input
                  type="text"
                  value={config.subtitle}
                  onChange={(e) => setConfig(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-all"
                />
              </div>
            </>
          )}

          {/* Opacity */}
          <div>
            <label className="block text-primary-gold-light mb-2 font-medium">
              Opacity: {config.opacity}%
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={config.opacity}
              onChange={(e) => setConfig(prev => ({ ...prev, opacity: Number(e.target.value) }))}
              className="w-full"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-primary-gold-light mb-2 font-medium">Position</label>
            <div className="grid grid-cols-2 gap-2">
              {['center', 'top-right', 'bottom-right', 'diagonal'].map((pos) => (
                <button
                  key={pos}
                  onClick={() => setConfig(prev => ({ ...prev, position: pos as any }))}
                  className={`px-4 py-2 rounded-lg transition-all capitalize ${
                    config.position === pos
                      ? 'bg-primary-gold text-dark-900 font-semibold'
                      : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600'
                  }`}
                >
                  {pos.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="block text-primary-gold-light mb-2 font-medium">Size</label>
            <div className="grid grid-cols-3 gap-2">
              {['small', 'medium', 'large'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setConfig(prev => ({ ...prev, size: sz as any }))}
                  className={`px-4 py-2 rounded-lg transition-all capitalize ${
                    config.size === sz
                      ? 'bg-primary-gold text-dark-900 font-semibold'
                      : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-4xl font-bold text-primary-gold mb-2">
            🎨 Watermark Settings
          </h1>
          <p className="text-primary-gold-light/70">
            Customize watermarks for your content to prevent unauthorized copying
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={saved}
          className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 font-semibold hover:shadow-lg transition-all"
        >
          {saved ? (
            <>
              <Check size={20} />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save size={20} />
              <span>Save Settings</span>
            </>
          )}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {renderSettings(storyWatermark, setStoryWatermark, 'story', 'Story')}
        {renderSettings(audioWatermark, setAudioWatermark, 'audio', 'Audio')}
        {renderSettings(animationWatermark, setAnimationWatermark, 'animation', 'Animation')}
      </div>
    </div>
  )
}
