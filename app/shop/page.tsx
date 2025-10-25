'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Headphones, Film, ShoppingCart, Filter } from 'lucide-react'

type Product = {
  id: string
  title: string
  type: 'story' | 'audio' | 'animation'
  genre: string
  price: number
  cover: string
}

export default function ShopPage() {
  const [filter, setFilter] = useState<'all' | 'story' | 'audio' | 'animation'>('all')
  const [sortBy, setSortBy] = useState('popular')
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const [storiesRes, audioRes, animRes] = await Promise.all([
          fetch('/api/stories'),
          fetch('/api/audio'),
          fetch('/api/animations')
        ])
        const [stories, audios, animations] = await Promise.all([
          storiesRes.ok ? storiesRes.json() : [],
          audioRes.ok ? audioRes.json() : [],
          animRes.ok ? animRes.json() : []
        ])

        const storyItems: Product[] = (stories || []).map((s: any) => ({
          id: s.id,
          title: s.title,
          type: 'story',
          genre: s.genre,
          price: Number(s.price || 0),
          cover: s.cover_url || '/Watermark.jpg'
        }))
        const audioItems: Product[] = (audios || []).map((a: any) => ({
          id: a.id,
          title: a.title,
          type: 'audio',
          genre: a.genre,
          price: Number(a.price || 0),
          cover: a.cover_url || '/Watermark.jpg'
        }))
        const animationItems: Product[] = (animations || []).map((v: any) => ({
          id: v.id,
          title: v.title,
          type: 'animation',
          genre: v.genre,
          price: Number(v.price || 0),
          cover: v.thumbnail_url || '/Watermark.jpg'
        }))

        setProducts([...storyItems, ...audioItems, ...animationItems])
      } catch (e) {
        console.error('Failed to load shop items', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredProducts = useMemo(() => {
    const base = filter === 'all' ? products : products.filter(p => p.type === filter)
    const sorted = [...base]
    if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price)
    return sorted
  }, [products, filter, sortBy])

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
            Shop All Content
          </h1>
          <p className="text-primary-gold-light/70 text-lg max-w-2xl mx-auto">
            Browse and purchase stories, audio tales, and animations
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Type Filters */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900'
                    : 'bg-dark-800 text-primary-gold-light hover:bg-dark-700 border border-primary-gold/30'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('story')}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full font-medium transition-all ${
                  filter === 'story'
                    ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900'
                    : 'bg-dark-800 text-primary-gold-light hover:bg-dark-700 border border-primary-gold/30'
                }`}
              >
                <BookOpen size={18} />
                <span>Stories</span>
              </button>
              <button
                onClick={() => setFilter('audio')}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full font-medium transition-all ${
                  filter === 'audio'
                    ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900'
                    : 'bg-dark-800 text-primary-gold-light hover:bg-dark-700 border border-primary-gold/30'
                }`}
              >
                <Headphones size={18} />
                <span>Audio</span>
              </button>
              <button
                onClick={() => setFilter('animation')}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full font-medium transition-all ${
                  filter === 'animation'
                    ? 'bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900'
                    : 'bg-dark-800 text-primary-gold-light hover:bg-dark-700 border border-primary-gold/30'
                }`}
              >
                <Film size={18} />
                <span>Animations</span>
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-primary-gold" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-dark-800 border border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {loading && (
          <div className="text-center text-primary-gold-light py-16">Loading products...</div>
        )}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center text-primary-gold-light/70 py-16">No products yet. Please check back soon.</div>
        )}
        {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card hover:scale-105 transition-transform duration-300 overflow-hidden">
                {/* Cover */}
                <div className="relative h-80 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={product.cover}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="bg-primary-gold text-dark-900 px-3 py-1 rounded-full text-xs font-semibold">
                      {product.genre}
                    </div>
                  </div>

                  {/* Type Icon */}
                  <div className="absolute bottom-4 left-4 bg-dark-900/80 backdrop-blur-sm p-2 rounded-full">
                    {product.type === 'story' && <BookOpen className="text-primary-gold" size={20} />}
                    {product.type === 'audio' && <Headphones className="text-primary-gold" size={20} />}
                    {product.type === 'animation' && <Film className="text-primary-gold" size={20} />}
                  </div>
                </div>

                {/* Product Info */}
                <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2 group-hover:text-accent-orange transition-colors">
                  {product.title}
                </h3>
                <p className="text-primary-gold-light/70 text-sm mb-4 capitalize">
                  {product.type}
                </p>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="text-primary-gold font-bold text-2xl">
                    ₵{product.price.toFixed(2)}
                  </div>
                  <Link
                    href={product.type === 'story' ? '/stories' : product.type === 'audio' ? '/audio' : '/animations'}
                    className="flex items-center space-x-2 btn-primary text-sm"
                  >
                    <ShoppingCart size={16} />
                    <span>Buy Now</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 card text-center max-w-3xl mx-auto"
        >
          <h2 className="font-playfair text-3xl font-bold text-primary-gold mb-4">
            Why Shop at Story Haven?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div>
              <div className="text-primary-gold font-bold text-4xl mb-2">100%</div>
              <p className="text-primary-gold-light/70">Original Content</p>
            </div>
            <div>
              <div className="text-primary-gold font-bold text-4xl mb-2">24/7</div>
              <p className="text-primary-gold-light/70">Instant Access</p>
            </div>
            <div>
              <div className="text-primary-gold font-bold text-4xl mb-2">∞</div>
              <p className="text-primary-gold-light/70">Unlimited Re-downloads</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
