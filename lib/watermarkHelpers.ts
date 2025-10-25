// Watermark Helpers for Content Upload

export interface WatermarkConfig {
  enabled: boolean
  useCustomImage: boolean
  customImageUrl: string
  text: string
  subtitle: string
  opacity: number
  position: 'center' | 'top-right' | 'bottom-right' | 'diagonal'
  size: 'small' | 'medium' | 'large'
}

export const getWatermarkSettings = (contentType: 'story' | 'audio' | 'animation'): WatermarkConfig => {
  if (typeof window === 'undefined') {
    return getDefaultWatermark(contentType)
  }

  try {
    const saved = localStorage.getItem('watermarkSettings')
    if (saved) {
      const settings = JSON.parse(saved)
      return settings[contentType] || getDefaultWatermark(contentType)
    }
  } catch (error) {
    console.error('Error loading watermark settings:', error)
  }

  return getDefaultWatermark(contentType)
}

export const getDefaultWatermark = (contentType: 'story' | 'audio' | 'animation'): WatermarkConfig => {
  const defaults = {
    story: {
      enabled: true,
      useCustomImage: false,
      customImageUrl: '',
      text: 'STORY HAVEN',
      subtitle: 'PREVIEW',
      opacity: 15,
      position: 'center' as const,
      size: 'large' as const
    },
    audio: {
      enabled: true,
      useCustomImage: false,
      customImageUrl: '',
      text: 'STORY HAVEN AUDIO',
      subtitle: 'PREVIEW',
      opacity: 20,
      position: 'center' as const,
      size: 'medium' as const
    },
    animation: {
      enabled: true,
      useCustomImage: false,
      customImageUrl: '',
      text: 'STORY HAVEN',
      subtitle: 'PREVIEW',
      opacity: 10,
      position: 'center' as const,
      size: 'large' as const
    }
  }

  return defaults[contentType]
}

export const renderWatermarkStyles = (config: WatermarkConfig) => {
  if (!config.enabled) return null

  const sizeClasses = {
    small: 'text-4xl md:text-5xl lg:text-6xl',
    medium: 'text-5xl md:text-6xl lg:text-7xl',
    large: 'text-6xl md:text-7xl lg:text-8xl'
  }

  const positionClasses = {
    center: 'items-center justify-center',
    'top-right': 'items-start justify-end p-8',
    'bottom-right': 'items-end justify-end p-8',
    diagonal: 'items-center justify-center -rotate-12'
  }

  return {
    opacity: config.opacity / 100,
    sizeClass: sizeClasses[config.size],
    positionClass: positionClasses[config.position],
    text: config.text,
    subtitle: config.subtitle,
    useImage: config.useCustomImage,
    imageUrl: config.customImageUrl
  }
}

// Generate watermark HTML for PDF/Image overlay
export const generateWatermarkOverlay = (config: WatermarkConfig): string => {
  if (!config.enabled) return ''

  const opacity = config.opacity / 100
  const rotation = config.position === 'diagonal' ? 'transform: rotate(-12deg);' : ''
  
  const positionStyles = {
    center: 'top: 50%; left: 50%; transform: translate(-50%, -50%);',
    'top-right': 'top: 2rem; right: 2rem;',
    'bottom-right': 'bottom: 2rem; right: 2rem;',
    diagonal: 'top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-12deg);'
  }

  const sizeStyles = {
    small: 'font-size: 3rem;',
    medium: 'font-size: 4.5rem;',
    large: 'font-size: 6rem;'
  }

  if (config.useCustomImage && config.customImageUrl) {
    return `
      <div style="position: absolute; ${positionStyles[config.position]} opacity: ${opacity}; pointer-events: none; z-index: 1000;">
        <img src="${config.customImageUrl}" alt="Watermark" style="width: 200px; height: auto;" />
      </div>
    `
  }

  return `
    <div style="position: absolute; ${positionStyles[config.position]} opacity: ${opacity}; pointer-events: none; text-align: center; user-select: none; z-index: 1000; ${rotation}">
      <div style="${sizeStyles[config.size]} font-family: serif; font-weight: bold; color: #D4AF37;">
        ${config.text}
      </div>
      <div style="font-size: 2rem; color: #C4A962; margin-top: 0.5rem;">
        ${config.subtitle}
      </div>
    </div>
  `
}
