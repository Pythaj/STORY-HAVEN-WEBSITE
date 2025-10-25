'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Headphones, Film, ArrowRight, Sparkles, Star } from 'lucide-react'
import { useSiteSettings } from '@/contexts/SiteContext'

// Lazy load heavy components for better performance
const FeaturedStories = lazy(() => import('@/components/FeaturedStories'))
const AudioCarousel = lazy(() => import('@/components/AudioCarousel'))
const AnimationGrid = lazy(() => import('@/components/AnimationGrid'))

// Generate consistent particle data - reduced for performance
const generateParticles = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: (i * 8.5 + (i % 3) * 10) % 100, // Deterministic positioning
    width: 2 + (i % 3),
    height: 2 + ((i + 1) % 3),
    delay: (i * 0.8) % 10,
    duration: 10 + (i % 10),
  }))
}

export default function Home() {
  const { settings } = useSiteSettings()
  const [particles, setParticles] = useState(generateParticles())

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animated-gradient">
          <div className="particles">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="particle"
                style={{
                  left: `${particle.left}%`,
                  width: `${particle.width}px`,
                  height: `${particle.height}px`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative w-32 h-32 mx-auto mb-8 animate-float">
              <Image
                src="/Logo.jpg"
                alt="Story Haven"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-playfair text-5xl md:text-7xl font-bold text-primary-gold glow-text mb-6"
          >
            {settings.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-primary-gold-light mb-4"
          >
            {settings.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-primary-gold-light/70 mb-12 max-w-2xl mx-auto"
          >
            {settings.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/stories" className="btn-primary flex items-center space-x-2">
              <BookOpen size={20} />
              <span>Explore Stories</span>
              <ArrowRight size={20} />
            </Link>
            <Link href="/audio" className="btn-secondary flex items-center space-x-2">
              <Headphones size={20} />
              <span>Listen Now</span>
            </Link>
            <Link href="/animations" className="btn-secondary flex items-center space-x-2">
              <Film size={20} />
              <span>Watch Animations</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-gold rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-gold mb-4">
              Choose Your Experience
            </h2>
            <p className="text-primary-gold-light/70 text-lg">
              Discover stories in the format that speaks to you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Read Stories',
                description: 'Immerse yourself in beautifully crafted narratives with our interactive flipbook reader',
                color: 'from-primary-gold to-primary-gold-dark',
                href: '/stories',
              },
              {
                icon: Headphones,
                title: 'Listen to Audio',
                description: 'Experience stories through captivating narration and atmospheric soundscapes',
                color: 'from-accent-orange to-accent-orange-dark',
                href: '/audio',
              },
              {
                icon: Film,
                title: 'Watch Animations',
                description: 'Witness tales come alive with stunning visuals and cinematic storytelling',
                color: 'from-primary-gold-dark to-accent-orange',
                href: '/animations',
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link href={category.href}>
                  <div className="card group hover:scale-105 transition-transform duration-300 h-full cursor-pointer">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:animate-glow`}>
                      <category.icon size={32} className="text-dark-900" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-primary-gold mb-3">
                      {category.title}
                    </h3>
                    <p className="text-primary-gold-light/70 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-primary-gold group-hover:translate-x-2 transition-transform">
                      <span className="font-semibold">Explore</span>
                      <ArrowRight size={20} className="ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="text-primary-gold fill-primary-gold" size={24} />
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-gold">
                Featured Stories
              </h2>
              <Star className="text-primary-gold fill-primary-gold" size={24} />
            </div>
            <p className="text-primary-gold-light/70 text-lg">
              Handpicked tales that will captivate your imagination
            </p>
          </motion.div>
          <Suspense fallback={<div className="text-center text-primary-gold-light">Loading stories...</div>}>
            <FeaturedStories />
          </Suspense>
        </div>
      </section>

      {/* Audio Stories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-gold mb-4">
              Latest Audio Stories
            </h2>
            <p className="text-primary-gold-light/70 text-lg">
              Close your eyes and let the stories transport you
            </p>
          </motion.div>
          <Suspense fallback={<div className="text-center text-primary-gold-light">Loading audio...</div>}>
            <AudioCarousel />
          </Suspense>
        </div>
      </section>

      {/* Animations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-gold mb-4">
              Animated Tales
            </h2>
            <p className="text-primary-gold-light/70 text-lg">
              Watch stories unfold in breathtaking visual splendor
            </p>
          </motion.div>
          <Suspense fallback={<div className="text-center text-primary-gold-light">Loading animations...</div>}>
            <AnimationGrid />
          </Suspense>
        </div>
      </section>

      {/* About Dray Harmony Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-8 rounded-full ring-4 ring-primary-gold overflow-hidden">
              <Image
                src="/Watermark.jpg"
                alt="Dray Harmony"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-gold mb-6">
              About Dray Harmony
            </h2>
            <p className="text-primary-gold-light/70 text-lg leading-relaxed mb-6">
              Dray Harmony is a visionary storyteller, weaving tales that blend African heritage
              with universal themes of love, adventure, and the human spirit. Through words, sounds,
              and motion, Dray creates immersive experiences that resonate across cultures and generations.
            </p>
            <p className="text-primary-gold-light/70 text-lg leading-relaxed mb-8">
              Every story is a journey, every audio tale a symphony, and every animation a masterpiece.
              Welcome to a world where imagination knows no bounds.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="text-primary-gold" size={20} />
              <span className="text-primary-gold font-semibold text-lg">
                Creator • Publisher • Storyteller
              </span>
              <Sparkles className="text-primary-gold" size={20} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card glow-box"
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary-gold mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-primary-gold-light/70 text-lg mb-8">
              Join thousands of readers, listeners, and viewers experiencing the magic of Story Haven
            </p>
            <Link href="/stories" className="btn-primary inline-flex items-center space-x-2">
              <span>Start Exploring</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
