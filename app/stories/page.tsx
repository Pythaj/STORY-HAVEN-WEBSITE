'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, BookOpen, Lock, Eye, Star, Loader2 } from 'lucide-react'

interface Story {
  id: string
  title: string
  genre: string
  description: string
  cover_url: string
  price: number
  views: number
  rating: number
  language: string
}

const genres = ['All', 'Romance', 'Thriller', 'Educational', 'Bedtime', 'Moral', 'Adventure', 'African Legends', 'Drama']
const sortOptions = ['Newest', 'Popular', 'Highest Rated', 'Price: Low to High']

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [sortBy, setSortBy] = useState('Newest')
  const [liked, setLiked] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchStories()
  }, [selectedGenre, searchQuery])

  // Restore liked stories
  useEffect(() => {
    try {
      const raw = localStorage.getItem('liked_story_ids')
      if (raw) setLiked(new Set(JSON.parse(raw)))
    } catch {}
  }, [])

  const persistLiked = (next: Set<string>) => {
    try { localStorage.setItem('liked_story_ids', JSON.stringify(Array.from(next))) } catch {}
  }

  const fetchStories = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedGenre !== 'All') params.append('genre', selectedGenre)
      if (searchQuery) params.append('search', searchQuery)

      const response = await fetch(`/api/stories?${params}`)
      if (response.ok) {
        const data = await response.json()
        setStories(data)
      }
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  const sortedStories = [...stories].sort((a, b) => {
    switch (sortBy) {
      case 'Popular':
        return b.views - a.views
      case 'Highest Rated':
        return b.rating - a.rating
      case 'Price: Low to High':
        return a.price - b.price
      default:
        return 0
    }
  })

  const handleLike = async (story: Story) => {
    const id = String(story.id)
    if (liked.has(id)) return
    try {
      const res = await fetch(`/api/stories/${id}/like`, { method: 'POST' })
      if (res.ok) {
        const next = new Set(liked)
        next.add(id)
        setLiked(next)
        persistLiked(next)
        setStories(prev => prev.map(s => s.id === story.id ? { ...s, rating: Number(s.rating || 0) + 1 } as Story : s))
      }
    } catch (e) {
      console.error('story like failed', e)
    }
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
            Story Library
          </h1>
          <p className="text-primary-gold-light/70 text-lg max-w-2xl mx-auto">
            Explore our complete collection of captivating tales by Dray Harmony
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-gold" size={20} />
            <input
              type="text"
              placeholder="Search stories by title, genre, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-dark-800 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold transition-colors"
            />
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedGenre === genre
                    ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900'
                    : 'bg-dark-800 text-primary-gold-light hover:bg-dark-700 border border-primary-gold/30'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-primary-gold-light">
              <Filter size={20} />
              <span className="font-medium">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg bg-dark-800 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-primary-gold animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && stories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-primary-gold-light text-xl">No stories found. Check back soon!</p>
          </div>
        )}

        {/* Stories Grid */}
        {!loading && stories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card hover:scale-105 transition-transform duration-300 overflow-hidden h-full flex flex-col">
                {/* Book Cover */}
                <div className="relative h-80 mb-4 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={story.cover_url || '/Watermark.jpg'}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                  
                  {/* Genre Badge */}
                  <div className="absolute top-4 right-4 bg-primary-gold text-dark-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {story.genre}
                  </div>

                  {/* Stats */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="flex items-center space-x-1 bg-dark-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      <Eye size={16} className="text-primary-gold" />
                      <span className="text-primary-gold-light">{story.views}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleLike(story)}
                      className={`flex items-center space-x-1 bg-dark-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm ${liked.has(String(story.id)) ? 'text-accent-orange' : ''}`}
                      title={liked.has(String(story.id)) ? 'Liked' : 'Like this story'}
                    >
                      <Star size={16} className={`${liked.has(String(story.id)) ? 'text-accent-orange fill-accent-orange' : 'text-primary-gold fill-primary-gold'}`} />
                      <span className="text-primary-gold-light">{Number(story.rating || 0).toFixed(1)}</span>
                    </button>
                  </div>
                </div>

                {/* Story Info */}
                <div className="flex-grow flex flex-col">
                  <h3 className="font-playfair text-2xl font-bold text-primary-gold mb-2 group-hover:text-accent-orange transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-primary-gold-light/70 mb-4 line-clamp-2 flex-grow">
                    {story.description}
                  </p>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-primary-gold font-bold text-xl">
                      ₵{story.price.toFixed(2)}
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/stories/${story.id}`}
                        className="flex items-center space-x-2 bg-dark-700 hover:bg-dark-600 text-primary-gold px-4 py-2 rounded-lg transition-colors"
                      >
                        <BookOpen size={18} />
                        <span>Preview</span>
                      </Link>
                      <Link
                        href={`/stories/${story.id}?buy=true`}
                        className="flex items-center space-x-2 btn-primary text-sm"
                      >
                        <Lock size={18} />
                        <span>Buy</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
