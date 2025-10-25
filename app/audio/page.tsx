'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Lock, Clock, Download, Share2, Heart } from 'lucide-react'
import PaymentModal from '@/components/PaymentModal'

const audioStories = [
  {
    id: 1,
    title: 'Moonlight Serenade',
    duration: '45:30',
    price: 3.00,
    description: 'A romantic audio journey under the stars, narrated with emotion and accompanied by atmospheric music.',
    genre: 'Romance',
    narrator: 'Dray Harmony',
    releaseDate: '2024-01-20',
    plays: 2345,
    likes: 456,
  },
  {
    id: 2,
    title: 'Echoes of the Past',
    duration: '52:15',
    price: 3.00,
    description: 'Historical tales brought to life through sound, featuring authentic African instruments and ambient soundscapes.',
    genre: 'Historical',
    narrator: 'Dray Harmony',
    releaseDate: '2024-01-15',
    plays: 3421,
    likes: 678,
  },
  {
    id: 3,
    title: 'The Midnight Chronicles',
    duration: '38:45',
    price: 3.00,
    description: 'Mystery and suspense in audio form, with dramatic narration and spine-tingling sound effects.',
    genre: 'Mystery',
    narrator: 'Dray Harmony',
    releaseDate: '2024-01-10',
    plays: 1987,
    likes: 389,
  },
  {
    id: 4,
    title: 'Tales from the Village',
    duration: '41:20',
    price: 3.00,
    description: 'Authentic African folklore narrated beautifully, preserving oral traditions for modern audiences.',
    genre: 'Folklore',
    narrator: 'Dray Harmony',
    releaseDate: '2024-01-05',
    plays: 4123,
    likes: 892,
  },
  {
    id: 5,
    title: 'The Warrior\'s Song',
    duration: '48:30',
    price: 3.00,
    description: 'An epic tale of courage and honor, told through powerful narration and traditional drumming.',
    genre: 'Adventure',
    narrator: 'Dray Harmony',
    releaseDate: '2023-12-28',
    plays: 2876,
    likes: 543,
  },
  {
    id: 6,
    title: 'Whispers in the Wind',
    duration: '35:15',
    price: 3.00,
    description: 'A gentle story of love and loss, narrated with tender emotion and soft musical accompaniment.',
    genre: 'Drama',
    narrator: 'Dray Harmony',
    releaseDate: '2023-12-20',
    plays: 3654,
    likes: 721,
  },
]

export default function AudioPage() {
  const [playingId, setPlayingId] = useState<string | number | null>(null)
  const [audios, setAudios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAudio, setSelectedAudio] = useState<any | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState<'male' | 'female'>('male')
  const [volume, setVolume] = useState(70)
  const [playbackRate, setPlaybackRate] = useState(1.0) // Tempo (0.5x to 2.0x)
  const [pitch, setPitch] = useState<'low' | 'normal' | 'high'>('normal')
  const [tone, setTone] = useState<'warm' | 'balanced' | 'bright'>('balanced')
  const [showAdvancedControls, setShowAdvancedControls] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null)
  const lowShelfRef = useRef<BiquadFilterNode | null>(null)
  const peakingRef = useRef<BiquadFilterNode | null>(null)
  const highShelfRef = useRef<BiquadFilterNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const previewSeconds = 30
  const currentItemRef = useRef<any | null>(null)
  const [liked, setLiked] = useState<Set<string>>(new Set())

  // Sample preview audio URLs for different voices
  // Replace with your own audio files
  const audioUrls = {
    male: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    female: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  }
  
  const previewAudioUrl = audioUrls[selectedVoice]

  const formatDuration = (seconds: number | string) => {
    const total = Number(seconds) || 0
    const m = Math.floor(total / 60)
    const s = Math.floor(total % 60)
    return `${m}:${String(s).padStart(2, '0')}`
  }

  const ensureAudioGraph = () => {
    const el = audioRef.current
    if (!el) return
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    const ctx = audioContextRef.current
    if (!sourceNodeRef.current) {
      try {
        el.crossOrigin = 'anonymous'
        const src = ctx.createMediaElementSource(el)
        const low = ctx.createBiquadFilter()
        low.type = 'lowshelf'
        low.frequency.value = 500
        const peak = ctx.createBiquadFilter()
        peak.type = 'peaking'
        peak.frequency.value = 1500
        peak.Q.value = 1
        const high = ctx.createBiquadFilter()
        high.type = 'highshelf'
        high.frequency.value = 3000
        const gain = ctx.createGain()
        gain.gain.value = volume / 100
        // Connect chain
        src.connect(low).connect(peak).connect(high).connect(gain).connect(ctx.destination)
        // Save refs
        sourceNodeRef.current = src
        lowShelfRef.current = low
        peakingRef.current = peak
        highShelfRef.current = high
        gainNodeRef.current = gain
      } catch (e) {
        console.error('Audio graph error:', e)
      }
    }
  }

  const updateFilters = () => {
    // Tone
    if (lowShelfRef.current && highShelfRef.current) {
      if (tone === 'warm') {
        lowShelfRef.current.gain.value = 4
        highShelfRef.current.gain.value = 0
      } else if (tone === 'bright') {
        lowShelfRef.current.gain.value = 0
        highShelfRef.current.gain.value = 4
      } else {
        lowShelfRef.current.gain.value = 0
        highShelfRef.current.gain.value = 0
      }
    }
    // Pitch perception EQ
    if (peakingRef.current) {
      if (pitch === 'low') {
        peakingRef.current.frequency.value = 1000
        peakingRef.current.gain.value = -2
      } else if (pitch === 'high') {
        peakingRef.current.frequency.value = 3000
        peakingRef.current.gain.value = 3
      } else {
        peakingRef.current.gain.value = 0
      }
    }
  }

  // Voice preset maps to tone/pitch
  useEffect(() => {
    if (selectedVoice === 'male') {
      setTone('warm')
      setPitch('low')
    } else {
      setTone('bright')
      setPitch('high')
    }
  }, [selectedVoice])

  // Apply filters when tone/pitch change
  useEffect(() => {
    ensureAudioGraph()
    updateFilters()
  }, [tone, pitch])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/audio')
        if (res.ok) {
          const data = await res.json()
          setAudios(Array.isArray(data) ? data : [])
        }
      } catch (e) {
        console.error('Failed to load audio stories', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Restore liked items from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('liked_audio_ids')
      if (raw) setLiked(new Set(JSON.parse(raw)))
    } catch {}
  }, [])

  const persistLiked = (next: Set<string>) => {
    try { localStorage.setItem('liked_audio_ids', JSON.stringify(Array.from(next))) } catch {}
  }

  const markPlayedOnce = async (id: string) => {
    const key = `played_audio_${id}`
    if (typeof window !== 'undefined' && !localStorage.getItem(key)) {
      try {
        const res = await fetch(`/api/audio/${id}/play`, { method: 'POST' })
        if (res.ok) {
          const data = await res.json()
          const newPlays = Number(data?.plays || 0)
          setAudios(prev => prev.map(a => String(a.id) === id ? { ...a, plays: newPlays } : a))
        }
      } catch {}
      try { localStorage.setItem(key, '1') } catch {}
    }
  }

  const handlePlay = (item: any) => {
    if (playingId === item.id) {
      // Pause audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      setPlayingId(null)
    } else {
      // Play audio
      setPlayingId(item.id)
      currentItemRef.current = item
      if (audioRef.current) {
        ensureAudioGraph()
        audioContextRef.current?.resume().catch(() => {})
        audioRef.current.src = item?.audio_url || previewAudioUrl
        audioRef.current.play().catch(error => {
          console.error('Audio play failed:', error)
          alert('Audio playback failed. Please check your browser settings or add an audio file to /public/audio/preview.mp3')
        })
      }
      // Count play once
      if (item?.id) markPlayedOnce(String(item.id))
    }
  }

  const handleLike = async (item: any) => {
    const id = String(item.id)
    if (liked.has(id)) return
    try {
      const res = await fetch(`/api/audio/${id}/like`, { method: 'POST' })
      if (res.ok) {
        const next = new Set(liked)
        next.add(id)
        setLiked(next)
        persistLiked(next)
        // Optimistically bump rating locally
        setAudios((prev) => prev.map(a => a.id === item.id ? { ...a, rating: Number(a.rating || 0) + 1 } : a))
      }
    } catch (e) {
      console.error('like failed', e)
    }
  }

  // Stop audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Handle audio end, volume, and playback rate changes
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleEnded = () => setPlayingId(null)
      const handleTimeUpdate = () => {
        if (playingId !== null && audio.currentTime >= previewSeconds) {
          audio.pause()
          setPlayingId(null)
          if (currentItemRef.current) {
            setSelectedAudio(currentItemRef.current)
            setShowPaymentModal(true)
          }
          audio.currentTime = 0
        }
      }
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      
      // Set volume
      audio.volume = volume / 100
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = volume / 100
      }
      
      // Set playback rate (tempo)
      audio.playbackRate = playbackRate
      
      return () => {
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [volume, playbackRate, playingId])

  // Update audio source when voice changes
  useEffect(() => {
    if (audioRef.current && playingId === null) {
      const wasPlaying = !audioRef.current.paused
      audioRef.current.src = previewAudioUrl
      audioRef.current.load()
      if (wasPlaying) {
        audioRef.current.play().catch(console.error)
      }
    }
  }, [selectedVoice, playingId])

  const handleUnlock = (audio: typeof audioStories[0]) => {
    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setPlayingId(null)
    setSelectedAudio(audio)
    setShowPaymentModal(true)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={previewAudioUrl}
        preload="auto"
        crossOrigin="anonymous"
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary-gold glow-text mb-4">
            Audio Stories
          </h1>
          <p className="text-primary-gold-light/70 text-lg max-w-2xl mx-auto">
            Close your eyes and let the stories transport you to magical worlds
          </p>
        </motion.div>

        {/* Voice & Volume Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12 bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl border-2 border-primary-gold/30 p-6 shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voice Selection */}
            <div>
              <label className="block text-primary-gold-light font-semibold mb-3 text-sm">
                🎙️ Narrator Voice
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedVoice('male')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    selectedVoice === 'male'
                      ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 shadow-lg shadow-primary-gold/30'
                      : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600 border border-primary-gold/20'
                  }`}
                >
                  👨 Male
                </button>
                <button
                  onClick={() => setSelectedVoice('female')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    selectedVoice === 'female'
                      ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 shadow-lg shadow-primary-gold/30'
                      : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600 border border-primary-gold/20'
                  }`}
                >
                  👩 Female
                </button>
              </div>
            </div>

            {/* Volume Control */}
            <div>
              <label className="block text-primary-gold-light font-semibold mb-3 text-sm">
                🔊 Volume: {volume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-gold"
                style={{
                  background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${volume}%, #2A2A2A ${volume}%, #2A2A2A 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-primary-gold-light/60 mt-2">
                <span>🔇 Mute</span>
                <span>🔊 Max</span>
              </div>
            </div>
          </div>

          {/* Advanced Controls Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAdvancedControls(!showAdvancedControls)}
              className="text-primary-gold-light hover:text-primary-gold transition-colors text-sm font-medium flex items-center justify-center mx-auto gap-2"
            >
              <span>{showAdvancedControls ? '▼' : '▶'}</span>
              <span>Advanced Audio Controls (Tempo, Pitch, Tone)</span>
            </button>
          </div>

          {/* Advanced Controls */}
          {showAdvancedControls && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-primary-gold/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tempo Control */}
                <div>
                  <label className="block text-primary-gold-light font-semibold mb-3 text-sm">
                    ⏱️ Tempo (Speed): {playbackRate.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(Number(e.target.value))}
                    className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #FF8C42 0%, #FF8C42 ${((playbackRate - 0.5) / 1.5) * 100}%, #2A2A2A ${((playbackRate - 0.5) / 1.5) * 100}%, #2A2A2A 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-primary-gold-light/60 mt-2">
                    <span>🐢 0.5x Slow</span>
                    <span>1.0x Normal</span>
                    <span>🐇 2.0x Fast</span>
                  </div>
                </div>

                {/* Pitch Control */}
                <div>
                  <label className="block text-primary-gold-light font-semibold mb-3 text-sm">
                    🎵 Pitch: {pitch.charAt(0).toUpperCase() + pitch.slice(1)}
                  </label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setPitch('low')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                        pitch === 'low'
                          ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 font-medium shadow-lg'
                          : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600 border border-primary-gold/20'
                      }`}
                    >
                      ⬇️ Low
                    </button>
                    <button 
                      onClick={() => setPitch('normal')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                        pitch === 'normal'
                          ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 font-medium shadow-lg'
                          : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600 border border-primary-gold/20'
                      }`}
                    >
                      ➡️ Normal
                    </button>
                    <button 
                      onClick={() => setPitch('high')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                        pitch === 'high'
                          ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 font-medium shadow-lg'
                          : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600 border border-primary-gold/20'
                      }`}
                    >
                      ⬆️ High
                    </button>
                  </div>
                  <p className="text-xs text-primary-gold-light/60 mt-2 text-center">
                    ✨ Adjusts voice frequency
                  </p>
                </div>

                {/* Tone Control */}
                <div>
                  <label className="block text-primary-gold-light font-semibold mb-3 text-sm">
                    🎼 Tone: {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setTone('warm')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                        tone === 'warm'
                          ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 font-medium shadow-lg'
                          : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600 border border-primary-gold/20'
                      }`}
                    >
                      🎸 Warm
                    </button>
                    <button 
                      onClick={() => setTone('balanced')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                        tone === 'balanced'
                          ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 font-medium shadow-lg'
                          : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600 border border-primary-gold/20'
                      }`}
                    >
                      🎹 Balanced
                    </button>
                    <button 
                      onClick={() => setTone('bright')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                        tone === 'bright'
                          ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 font-medium shadow-lg'
                          : 'bg-dark-700 text-primary-gold-light hover:bg-dark-600 border border-primary-gold/20'
                      }`}
                    >
                      🎺 Bright
                    </button>
                  </div>
                  <p className="text-xs text-primary-gold-light/60 mt-2 text-center">
                    ✨ Adjusts audio character
                  </p>
                </div>
              </div>

              {/* Reset Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setVolume(70)
                    setPlaybackRate(1.0)
                    setPitch('normal')
                    setTone('balanced')
                  }}
                  className="px-6 py-2 rounded-xl bg-dark-700 text-primary-gold-light hover:bg-dark-600 border border-primary-gold/30 transition-all font-medium"
                >
                  🔄 Reset All Settings
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Audio Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && (
            <div className="col-span-full text-center text-primary-gold-light/70">Loading audio stories...</div>
          )}
          {!loading && audios.length === 0 && (
            <div className="col-span-full card text-center py-16">
              <p className="text-primary-gold-light/70">No audio stories yet. Please upload from the admin panel.</p>
            </div>
          )}
          {audios.map((audio, index) => (
            <motion.div
              key={audio.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group hover:scale-105 transition-transform duration-300"
            >
              {/* Audio Visualizer */}
              <div className="relative h-48 mb-4 rounded-lg bg-gradient-to-br from-accent-orange/20 to-primary-gold/20 flex items-center justify-center overflow-hidden" style={{ backgroundImage: audio?.cover_url ? `url(${audio.cover_url})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-gradient-to-t from-primary-gold to-accent-orange rounded-full"
                      animate={
                        playingId === audio.id
                          ? {
                              height: [
                                `${Math.random() * 60 + 20}%`,
                                `${Math.random() * 60 + 20}%`,
                                `${Math.random() * 60 + 20}%`,
                              ],
                            }
                          : { height: '20%' }
                      }
                      transition={{
                        duration: 1.5,
                        repeat: playingId === audio.id ? Infinity : 0,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>

                {/* Play/Pause Button */}
                <button
                  onClick={() => handlePlay(audio)}
                  className="relative z-10 w-16 h-16 rounded-full bg-primary-gold flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer shadow-lg"
                >
                  {playingId === audio.id ? (
                    <Pause size={28} className="text-dark-900" fill="currentColor" />
                  ) : (
                    <Play size={28} className="text-dark-900 ml-1" fill="currentColor" />
                  )}
                </button>

                {/* Genre Badge */}
                <div className="absolute top-4 right-4 bg-primary-gold text-dark-900 px-3 py-1 rounded-full text-xs font-semibold">
                  {audio.genre}
                </div>
              </div>

              {/* Audio Info */}
              <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">{audio.title}</h3>
              <p className="text-primary-gold-light/70 text-sm mb-3 line-clamp-2">
                {audio.description}
              </p>

              {/* Stats */}
              <div className="flex items-center space-x-4 mb-4 text-sm text-primary-gold-light/70">
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{formatDuration(audio.duration)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Play size={14} />
                  <span>{audio.plays}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleLike(audio)}
                  className={`flex items-center space-x-1 ${liked.has(String(audio.id)) ? 'text-accent-orange' : ''}`}
                  title={liked.has(String(audio.id)) ? 'Liked' : 'Like this audio'}
                >
                  <Heart size={14} className={liked.has(String(audio.id)) ? 'fill-current' : ''} />
                  <span>{Number(audio.rating || 0).toFixed(1)}</span>
                </button>
              </div>

              {/* Narrator */}
              <p className="text-primary-gold-light/70 text-sm mb-4">Language <span className="text-primary-gold font-semibold">{audio.language || 'English'}</span></p>

              {/* Price and Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-primary-gold/20">
                <div className="text-primary-gold font-bold text-xl">
                  ₵{audio.price.toFixed(2)}
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleUnlock(audio)} className="flex items-center space-x-2 btn-primary text-sm">
                    <Lock size={16} />
                    <span>Unlock</span>
                  </button>
                </div>
              </div>

              {/* Preview Note */}
              <p className="text-primary-gold-light/50 text-xs mt-3 text-center">
                🎧 30-second preview available
              </p>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 card text-center max-w-3xl mx-auto"
        >
          <h2 className="font-playfair text-3xl font-bold text-primary-gold mb-4">
            Premium Audio Experience
          </h2>
          <p className="text-primary-gold-light/70 leading-relaxed mb-6">
            Each audio story is professionally narrated by Dray Harmony, featuring high-quality sound design,
            atmospheric music, and authentic African instruments. Download and listen offline, or stream
            directly from your device.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 text-primary-gold">
              <Download size={18} />
              <span>Download & Keep Forever</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-gold">
              <Play size={18} />
              <span>Stream Anytime</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-gold">
              <Share2 size={18} />
              <span>Share with Friends</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedAudio && (
        <PaymentModal
          title={selectedAudio.title}
          price={selectedAudio.price}
          type="audio"
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
