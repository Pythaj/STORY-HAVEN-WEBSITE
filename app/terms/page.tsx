'use client'

import { motion } from 'framer-motion'
import { useSiteSettings } from '@/contexts/SiteContext'

export default function TermsPage() {
  const { settings } = useSiteSettings()
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-playfair text-5xl font-bold text-primary-gold glow-text mb-4">
            Terms of Use
          </h1>
          <p className="text-primary-gold-light/70 mb-8">
            Last updated: January 2024
          </p>

          <div className="card space-y-8">
            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed">
                By accessing and using Story Haven, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this platform.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                2. Content Access and Usage
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed mb-4">
                Story Haven provides access to original stories, audio content, and animations created by Dray Harmony. All content is protected by copyright law.
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary-gold-light/70">
                <li>You may read the first page of any story for free</li>
                <li>Full access requires payment via MTN MoMo or Paystack</li>
                <li>Downloaded content is for personal use only</li>
                <li>Sharing, reproducing, or distributing content without permission is prohibited</li>
              </ul>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                3. Payment and Refunds
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed mb-4">
                All payments are processed securely through MTN Mobile Money or Paystack. Prices are displayed in Ghanaian Cedis (₵).
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary-gold-light/70">
                <li>All sales are final once content is accessed</li>
                <li>Refunds may be issued for technical issues preventing access</li>
                <li>Refund requests must be submitted within 48 hours of purchase</li>
                <li>Contact {settings.contactEmail} for refund inquiries</li>
              </ul>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                4. User Conduct
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed mb-4">
                Users agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary-gold-light/70">
                <li>Use the platform for lawful purposes only</li>
                <li>Not attempt to circumvent payment systems</li>
                <li>Not share login credentials or purchased content</li>
                <li>Not engage in any activity that disrupts the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed">
                All content on Story Haven, including stories, audio, animations, graphics, and logos, is the exclusive property of Dray Harmony and is protected by international copyright laws. Unauthorized use, reproduction, or distribution of any content is strictly prohibited and may result in legal action.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed">
                Story Haven and Dray Harmony shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the platform or content.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                7. Changes to Terms
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the platform after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                8. Contact Information
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed">
                For questions about these terms, please contact us at:
              </p>
              <p className="text-primary-gold mt-2">
                Email: legal@storyhaven.art
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
