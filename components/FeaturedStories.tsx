'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Eye, Star, ArrowRight } from 'lucide-react'

interface Story {
  id: string
  title: string
  description: string
  genre: string
  cover_url: string
  price: number
  views: number
  rating: number
  author?: string
}

export default function FeaturedStories() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/stories')
        if (res.ok) {
          const data = await res.json()
          // Get top 3 stories by views/rating
          const featured = data
            .sort((a: Story, b: Story) => (b.views + b.rating * 10) - (a.views + a.rating * 10))
            .slice(0, 3)
          setStories(featured)
        }
      } catch (error) {
        console.error('Failed to fetch featured stories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="relative h-64 bg-dark-700 rounded-xl mb-4" />
            <div className="h-6 bg-dark-700 rounded mb-2" />
            <div className="h-4 bg-dark-700 rounded w-3/4" />
          </div>
        ))}
      </div>
    )
  }

  if (stories.length === 0) {
    return (
      <div className="card text-center py-16">
        <BookOpen size={48} className="text-primary-gold/30 mx-auto mb-4" />
        <p className="text-primary-gold-light/70">No stories available yet</p>
        <p className="text-primary-gold-light/50 text-sm mt-2">Check back soon for new content!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {stories.map((story, index) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <Link href="/stories">
            <div className="card overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
              {/* Story Cover */}
              <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                <Image
                  src={story.cover_url || '/Watermark.jpg'}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                
                {/* Genre Badge */}
                <div className="absolute top-4 right-4 bg-primary-gold text-dark-900 px-3 py-1 rounded-full text-xs font-semibold">
                  {story.genre}
                </div>

                {/* Stats Overlay */}
                <div className="absolute top-4 left-4 space-y-2">
                  <div className="flex items-center space-x-1 bg-dark-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    <Eye size={14} className="text-primary-gold" />
                    <span className="text-primary-gold-light">{story.views}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-dark-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    <Star size={14} className="text-primary-gold fill-primary-gold" />
                    <span className="text-primary-gold-light">{story.rating}</span>
                  </div>
                </div>
              </div>

              {/* Story Info */}
              <div>
                <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2 group-hover:text-accent-orange transition-colors">
                  {story.title}
                </h3>
                <p className="text-primary-gold-light/70 text-sm mb-4 line-clamp-2">
                  {story.description}
                </p>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-primary-gold/20">
                  <div className="text-primary-gold font-bold text-xl">
                    ₵{story.price.toFixed(2)}
                  </div>
                  <div className="flex items-center space-x-1 text-primary-gold text-sm font-medium group-hover:text-accent-orange transition-colors">
                    <span>Read More</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
