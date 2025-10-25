'use client'

import { motion } from 'framer-motion'
import { Shield, Copyright as CopyrightIcon, AlertTriangle, CheckCircle, Mail, Scale } from 'lucide-react'
import Link from 'next/link'

export default function CopyrightPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-gold to-accent-orange flex items-center justify-center">
            <CopyrightIcon size={40} className="text-dark-900" />
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary-gold glow-text mb-4">
            Copyright Policy
          </h1>
          <p className="text-primary-gold-light/70 text-lg">
            Protecting creative rights and intellectual property
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Overview */}
          <div className="card">
            <div className="flex items-start space-x-4 mb-4">
              <Shield className="text-primary-gold mt-1" size={24} />
              <div>
                <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                  Copyright Protection
                </h2>
                <p className="text-primary-gold-light/80 leading-relaxed mb-4">
                  All content on Story Haven, including but not limited to stories, audio recordings, 
                  animations, graphics, and designs, are the exclusive property of Dray Harmony and 
                  are protected by international copyright laws.
                </p>
                <p className="text-primary-gold-light/70">
                  Last Updated: January 2024
                </p>
              </div>
            </div>
          </div>

          {/* Protected Content */}
          <div className="card">
            <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6 flex items-center space-x-2">
              <Scale size={24} />
              <span>Protected Content</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-primary-gold font-semibold mb-1">Written Stories</h3>
                  <p className="text-primary-gold-light/70 text-sm">
                    All text content, narratives, characters, and plot elements are original works protected by copyright.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-primary-gold font-semibold mb-1">Audio Recordings</h3>
                  <p className="text-primary-gold-light/70 text-sm">
                    Voice recordings, sound effects, music, and audio production are protected intellectual property.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-primary-gold font-semibold mb-1">Animations & Visual Content</h3>
                  <p className="text-primary-gold-light/70 text-sm">
                    All animations, graphics, illustrations, and visual designs are copyrighted materials.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-primary-gold font-semibold mb-1">Branding & Design</h3>
                  <p className="text-primary-gold-light/70 text-sm">
                    The Story Haven name, logo, and website design are protected trademarks and copyrighted materials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prohibited Activities */}
          <div className="card border-2 border-red-500/30">
            <h2 className="font-playfair text-2xl font-bold text-red-400 mb-6 flex items-center space-x-2">
              <AlertTriangle size={24} />
              <span>Prohibited Activities</span>
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ❌ <strong>Unauthorized Reproduction:</strong> Copying, duplicating, or reproducing any content without written permission.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ❌ <strong>Distribution & Sharing:</strong> Sharing purchased content with others or distributing it through any platform.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ❌ <strong>Commercial Use:</strong> Using any content for commercial purposes without explicit authorization.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ❌ <strong>Modification:</strong> Editing, remixing, or creating derivative works from protected content.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ❌ <strong>Removal of Watermarks:</strong> Removing, altering, or obscuring watermarks or copyright notices.
                </p>
              </div>
            </div>
          </div>

          {/* Permitted Use */}
          <div className="card border-2 border-green-500/30">
            <h2 className="font-playfair text-2xl font-bold text-green-400 mb-6 flex items-center space-x-2">
              <CheckCircle size={24} />
              <span>Permitted Personal Use</span>
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ✅ <strong>Personal Enjoyment:</strong> Purchased content may be used for personal, non-commercial enjoyment.
                </p>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ✅ <strong>Single User License:</strong> Content is licensed for use by the purchaser only.
                </p>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ✅ <strong>Personal Devices:</strong> You may download content to your personal devices for offline access.
                </p>
              </div>
            </div>
          </div>

          {/* DMCA Policy */}
          <div className="card">
            <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
              DMCA Takedown Policy
            </h2>
            <p className="text-primary-gold-light/80 mb-4">
              If you believe your copyrighted work has been infringed upon, please provide:
            </p>
            <ul className="space-y-2 text-primary-gold-light/70 ml-6 list-disc">
              <li>Identification of the copyrighted work</li>
              <li>Description of the infringing material and its location</li>
              <li>Your contact information</li>
              <li>A statement of good faith belief</li>
              <li>Electronic or physical signature</li>
            </ul>
          </div>

          {/* Enforcement */}
          <div className="card bg-primary-gold/5 border-2 border-primary-gold/30">
            <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
              Copyright Enforcement
            </h2>
            <p className="text-primary-gold-light/80 mb-4">
              We take copyright infringement seriously. Violations may result in:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-dark-800 rounded-lg">
                <p className="text-primary-gold-light/80">
                  • Account suspension or termination
                </p>
              </div>
              <div className="p-4 bg-dark-800 rounded-lg">
                <p className="text-primary-gold-light/80">
                  • Legal action and damages
                </p>
              </div>
              <div className="p-4 bg-dark-800 rounded-lg">
                <p className="text-primary-gold-light/80">
                  • Statutory damages up to $150,000 per work
                </p>
              </div>
              <div className="p-4 bg-dark-800 rounded-lg">
                <p className="text-primary-gold-light/80">
                  • Attorney fees and court costs
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="card text-center">
            <Mail className="w-12 h-12 text-primary-gold mx-auto mb-4" />
            <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
              Copyright Questions?
            </h2>
            <p className="text-primary-gold-light/70 mb-6">
              For licensing inquiries or copyright concerns, please contact us.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center space-x-2">
              <Mail size={20} />
              <span>Contact Us</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
