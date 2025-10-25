'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Upload, Eye, EyeOff, Settings, Image as ImageIcon, Type, Droplets } from 'lucide-react'

export default function WatermarkSettings() {
  // Watermark settings for different content types
  const [storySettings, setStorySettings] = useState({
    enabled: true,
    text: 'STORY HAVEN',
    subtitle: 'PREVIEW',
    opacity: 6,
    blur: 0.5,
    rotation: -12,
    fontSize: 'large', // small, medium, large, xlarge
    position: 'center', // center, diagonal, corners
    color: '#D4AF37' // primary-gold
  })

  const [animationSettings, setAnimationSettings] = useState({
    enabled: true,
    text: 'STORY HAVEN',
    subtitle: 'PREVIEW',
    opacity: 8,
    blur: 0.5,
    rotation: -12,
    fontSize: 'large',
    position: 'center',
    color: '#D4AF37'
  })

  const [audioSettings, setAudioSettings] = useState({
    enabled: false,
    text: 'STORY HAVEN AUDIO',
    subtitle: 'PREVIEW',
    opacity: 10,
    blur: 0,
    rotation: 0,
    fontSize: 'medium',
    position: 'center',
    color: '#D4AF37'
  })

  const [customLogo, setCustomLogo] = useState<string | null>(null)
  const [useCustomLogo, setUseCustomLogo] = useState(false)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCustomLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveSettings = () => {
    // Save to localStorage or API
    const settings = {
      story: storySettings,
      animation: animationSettings,
      audio: audioSettings,
      customLogo,
      useCustomLogo
    }
    localStorage.setItem('watermarkSettings', JSON.stringify(settings))
    alert('✅ Watermark settings saved successfully!')
  }

  const fontSizeMap = {
    small: { mobile: 'text-3xl', tablet: 'text-5xl', desktop: 'text-6xl' },
    medium: { mobile: 'text-4xl', tablet: 'text-6xl', desktop: 'text-7xl' },
    large: { mobile: 'text-5xl', tablet: 'text-7xl', desktop: 'text-8xl' },
    xlarge: { mobile: 'text-6xl', tablet: 'text-8xl', desktop: 'text-9xl' }
  }

  return (
    <div className="min-h-screen bg-dark-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-playfair text-4xl font-bold text-primary-gold mb-2">
            🎨 Watermark Management
          </h1>
          <p className="text-primary-gold-light/70">
            Control watermark settings for all content types
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Story Watermark Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-2xl font-bold text-primary-gold flex items-center">
                <Type size={24} className="mr-2" />
                Story Watermark
              </h2>
              <button
                onClick={() => setStorySettings({ ...storySettings, enabled: !storySettings.enabled })}
                className={`p-2 rounded-lg transition-colors ${
                  storySettings.enabled
                    ? 'bg-primary-gold text-dark-900'
                    : 'bg-dark-700 text-primary-gold-light'
                }`}
              >
                {storySettings.enabled ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <div className="space-y-4">
              {/* Main Text */}
              <div>
                <label className="block text-primary-gold-light text-sm mb-2">Main Text</label>
                <input
                  type="text"
                  value={storySettings.text}
                  onChange={(e) => setStorySettings({ ...storySettings, text: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-700 border border-primary-gold/30 rounded-lg text-primary-gold-light focus:outline-none focus:border-primary-gold"
                  placeholder="STORY HAVEN"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-primary-gold-light text-sm mb-2">Subtitle</label>
                <input
                  type="text"
                  value={storySettings.subtitle}
                  onChange={(e) => setStorySettings({ ...storySettings, subtitle: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-700 border border-primary-gold/30 rounded-lg text-primary-gold-light focus:outline-none focus:border-primary-gold"
                  placeholder="PREVIEW"
                />
              </div>

              {/* Opacity */}
              <div>
                <label className="block text-primary-gold-light text-sm mb-2">
                  Opacity: {storySettings.opacity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={storySettings.opacity}
                  onChange={(e) => setStorySettings({ ...storySettings, opacity: Number(e.target.value) })}
                  className="w-full accent-primary-gold"
                />
              </div>

              {/* Blur */}
              <div>
                <label className="block text-primary-gold-light text-sm mb-2">
                  Blur: {storySettings.blur}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={storySettings.blur}
                  onChange={(e) => setStorySettings({ ...storySettings, blur: Number(e.target.value) })}
                  className="w-full accent-primary-gold"
                />
              </div>

              {/* Rotation */}
              <div>
                <label className="block text-primary-gold-light text-sm mb-2">
                  Rotation: {storySettings.rotation}°
                </label>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={storySettings.rotation}
                  onChange={(e) => setStorySettings({ ...storySettings, rotation: Number(e.target.value) })}
                  className="w-full accent-primary-gold"
                />
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-primary-gold-light text-sm mb-2">Font Size</label>
                <select
                  value={storySettings.fontSize}
                  onChange={(e) => setStorySettings({ ...storySettings, fontSize: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-700 border border-primary-gold/30 rounded-lg text-primary-gold-light focus:outline-none focus:border-primary-gold"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xlarge">Extra Large</option>
                </select>
              </div>

              {/* Position */}
              <div>
                <label className="block text-primary-gold-light text-sm mb-2">Position</label>
                <select
                  value={storySettings.position}
                  onChange={(e) => setStorySettings({ ...storySettings, position: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-700 border border-primary-gold/30 rounded-lg text-primary-gold-light focus:outline-none focus:border-primary-gold"
                >
                  <option value="center">Center</option>
                  <option value="diagonal">Diagonal Pattern</option>
                  <option value="corners">Four Corners</option>
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="block text-primary-gold-light text-sm mb-2">Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={storySettings.color}
                    onChange={(e) => setStorySettings({ ...storySettings, color: e.target.value })}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={storySettings.color}
                    onChange={(e) => setStorySettings({ ...storySettings, color: e.target.value })}
                    className="flex-1 px-4 py-2 bg-dark-700 border border-primary-gold/30 rounded-lg text-primary-gold-light focus:outline-none focus:border-primary-gold"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Animation Watermark Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-2xl font-bold text-primary-gold flex items-center">
                <ImageIcon size={24} className="mr-2" />
                Animation Watermark
              </h2>
              <button
                onClick={() => setAnimationSettings({ ...animationSettings, enabled: !animationSettings.enabled })}
                className={`p-2 rounded-lg transition-colors ${
                  animationSettings.enabled
                    ? 'bg-primary-gold text-dark-900'
                    : 'bg-dark-700 text-primary-gold-light'
                }`}
              >
                {animationSettings.enabled ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <div className="space-y-4">
              {/* Same controls as Story */}
              <div>
                <label className="block text-primary-gold-light text-sm mb-2">Main Text</label>
                <input
                  type="text"
                  value={animationSettings.text}
                  onChange={(e) => setAnimationSettings({ ...animationSettings, text: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-700 border border-primary-gold/30 rounded-lg text-primary-gold-light focus:outline-none focus:border-primary-gold"
                />
              </div>

              <div>
                <label className="block text-primary-gold-light text-sm mb-2">Subtitle</label>
                <input
                  type="text"
                  value={animationSettings.subtitle}
                  onChange={(e) => setAnimationSettings({ ...animationSettings, subtitle: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-700 border border-primary-gold/30 rounded-lg text-primary-gold-light focus:outline-none focus:border-primary-gold"
                />
              </div>

              <div>
                <label className="block text-primary-gold-light text-sm mb-2">
                  Opacity: {animationSettings.opacity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={animationSettings.opacity}
                  onChange={(e) => setAnimationSettings({ ...animationSettings, opacity: Number(e.target.value) })}
                  className="w-full accent-primary-gold"
                />
              </div>

              <div>
                <label className="block text-primary-gold-light text-sm mb-2">
                  Blur: {animationSettings.blur}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={animationSettings.blur}
                  onChange={(e) => setAnimationSettings({ ...animationSettings, blur: Number(e.target.value) })}
                  className="w-full accent-primary-gold"
                />
              </div>

              <div>
                <label className="block text-primary-gold-light text-sm mb-2">
                  Rotation: {animationSettings.rotation}°
                </label>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={animationSettings.rotation}
                  onChange={(e) => setAnimationSettings({ ...animationSettings, rotation: Number(e.target.value) })}
                  className="w-full accent-primary-gold"
                />
              </div>

              <div>
                <label className="block text-primary-gold-light text-sm mb-2">Font Size</label>
                <select
                  value={animationSettings.fontSize}
                  onChange={(e) => setAnimationSettings({ ...animationSettings, fontSize: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-700 border border-primary-gold/30 rounded-lg text-primary-gold-light focus:outline-none focus:border-primary-gold"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xlarge">Extra Large</option>
                </select>
              </div>

              <div>
                <label className="block text-primary-gold-light text-sm mb-2">Position</label>
                <select
                  value={animationSettings.position}
                  onChange={(e) => setAnimationSettings({ ...animationSettings, position: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-700 border border-primary-gold/30 rounded-lg text-primary-gold-light focus:outline-none focus:border-primary-gold"
                >
                  <option value="center">Center</option>
                  <option value="diagonal">Diagonal Pattern</option>
                  <option value="corners">Four Corners</option>
                </select>
              </div>

              <div>
                <label className="block text-primary-gold-light text-sm mb-2">Color</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={animationSettings.color}
                    onChange={(e) => setAnimationSettings({ ...animationSettings, color: e.target.value })}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={animationSettings.color}
                    onChange={(e) => setAnimationSettings({ ...animationSettings, color: e.target.value })}
                    className="flex-1 px-4 py-2 bg-dark-700 border border-primary-gold/30 rounded-lg text-primary-gold-light focus:outline-none focus:border-primary-gold"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Audio & Custom Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Audio Settings */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair text-2xl font-bold text-primary-gold flex items-center">
                  <Droplets size={24} className="mr-2" />
                  Audio Watermark
                </h2>
                <button
                  onClick={() => setAudioSettings({ ...audioSettings, enabled: !audioSettings.enabled })}
                  className={`p-2 rounded-lg transition-colors ${
                    audioSettings.enabled
                      ? 'bg-primary-gold text-dark-900'
                      : 'bg-dark-700 text-primary-gold-light'
                  }`}
                >
                  {audioSettings.enabled ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-primary-gold-light text-sm mb-2">Main Text</label>
                  <input
                    type="text"
                    value={audioSettings.text}
                    onChange={(e) => setAudioSettings({ ...audioSettings, text: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-700 border border-primary-gold/30 rounded-lg text-primary-gold-light focus:outline-none focus:border-primary-gold"
                  />
                </div>

                <div>
                  <label className="block text-primary-gold-light text-sm mb-2">
                    Opacity: {audioSettings.opacity}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={audioSettings.opacity}
                    onChange={(e) => setAudioSettings({ ...audioSettings, opacity: Number(e.target.value) })}
                    className="w-full accent-primary-gold"
                  />
                </div>
              </div>
            </div>

            {/* Custom Logo Upload */}
            <div className="card">
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4 flex items-center">
                <Upload size={24} className="mr-2" />
                Custom Logo
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    checked={useCustomLogo}
                    onChange={(e) => setUseCustomLogo(e.target.checked)}
                    className="w-5 h-5 accent-primary-gold"
                  />
                  <label className="text-primary-gold-light">Use custom logo instead of text</label>
                </div>

                <div className="border-2 border-dashed border-primary-gold/30 rounded-lg p-6 text-center">
                  {customLogo ? (
                    <div className="space-y-4">
                      <img src={customLogo} alt="Custom Logo" className="max-h-32 mx-auto" />
                      <button
                        onClick={() => setCustomLogo(null)}
                        className="text-accent-orange hover:text-accent-orange/80 text-sm"
                      >
                        Remove Logo
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload size={48} className="mx-auto text-primary-gold/50 mb-2" />
                      <p className="text-primary-gold-light mb-2">Upload Logo</p>
                      <p className="text-primary-gold-light/50 text-xs">PNG, JPG up to 2MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveSettings}
              className="w-full btn-primary flex items-center justify-center space-x-2 py-4"
            >
              <Save size={20} />
              <span>Save All Settings</span>
            </button>
          </motion.div>
        </div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 card"
        >
          <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6 flex items-center">
            <Settings size={24} className="mr-2" />
            Live Preview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Story Preview */}
            <div className="bg-dark-700 rounded-lg p-6 relative overflow-hidden min-h-[300px]">
              <p className="text-primary-gold-light text-sm mb-2 relative z-30">Story Preview:</p>
              <div className="text-primary-gold-light/70 text-xs relative z-30">
                Sample story text content...
              </div>
              {storySettings.enabled && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <div
                    className="text-center"
                    style={{
                      opacity: storySettings.opacity / 100,
                      filter: `blur(${storySettings.blur}px)`,
                      transform: `rotate(${storySettings.rotation}deg)`,
                      color: storySettings.color
                    }}
                  >
                    <p className={`font-playfair font-bold ${fontSizeMap[storySettings.fontSize as keyof typeof fontSizeMap].mobile}`}>
                      {storySettings.text}
                    </p>
                    <p className="text-xl mt-2">{storySettings.subtitle}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Animation Preview */}
            <div className="bg-dark-700 rounded-lg p-6 relative overflow-hidden min-h-[300px]">
              <p className="text-primary-gold-light text-sm mb-2 relative z-30">Animation Preview:</p>
              <div className="bg-dark-800 rounded h-40 relative z-30"></div>
              {animationSettings.enabled && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <div
                    className="text-center"
                    style={{
                      opacity: animationSettings.opacity / 100,
                      filter: `blur(${animationSettings.blur}px)`,
                      transform: `rotate(${animationSettings.rotation}deg)`,
                      color: animationSettings.color
                    }}
                  >
                    <p className={`font-playfair font-bold ${fontSizeMap[animationSettings.fontSize as keyof typeof fontSizeMap].mobile}`}>
                      {animationSettings.text}
                    </p>
                    <p className="text-xl mt-2">{animationSettings.subtitle}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Audio Preview */}
            <div className="bg-dark-700 rounded-lg p-6 relative overflow-hidden min-h-[300px]">
              <p className="text-primary-gold-light text-sm mb-2 relative z-30">Audio Preview:</p>
              <div className="bg-dark-800 rounded h-40 flex items-center justify-center relative z-30">
                <p className="text-primary-gold-light/50">Audio Player</p>
              </div>
              {audioSettings.enabled && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <div
                    className="text-center"
                    style={{
                      opacity: audioSettings.opacity / 100,
                      color: audioSettings.color
                    }}
                  >
                    <p className="font-playfair font-bold text-2xl">
                      {audioSettings.text}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 card bg-gradient-to-r from-primary-gold/10 to-accent-orange/10 border-primary-gold/30"
        >
          <h3 className="font-playfair text-xl font-bold text-primary-gold mb-4">📝 Instructions</h3>
          <div className="space-y-2 text-primary-gold-light/80 text-sm">
            <p>• <strong>Enable/Disable:</strong> Toggle watermarks on/off for each content type</p>
            <p>• <strong>Text:</strong> Customize the main watermark text and subtitle</p>
            <p>• <strong>Opacity:</strong> Control visibility (0-50% recommended)</p>
            <p>• <strong>Blur:</strong> Add soft edges for subtle appearance</p>
            <p>• <strong>Rotation:</strong> Angle the watermark (-45° to 45°)</p>
            <p>• <strong>Position:</strong> Choose center, diagonal pattern, or four corners</p>
            <p>• <strong>Custom Logo:</strong> Upload your own logo to replace text watermark</p>
            <p>• <strong>Live Preview:</strong> See changes in real-time before saving</p>
            <p className="text-accent-orange mt-4">💡 <strong>Tip:</strong> Keep opacity low (6-10%) for best reading experience</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
