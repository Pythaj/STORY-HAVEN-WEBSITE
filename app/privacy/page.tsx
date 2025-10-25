'use client'

import { motion } from 'framer-motion'
import { useSiteSettings } from '@/contexts/SiteContext'

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-primary-gold-light/70 mb-8">
            Last updated: January 2024
          </p>

          <div className="card space-y-8">
            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                1. Information We Collect
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed mb-4">
                We collect information to provide better services to our users. The types of information we collect include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary-gold-light/70">
                <li>Email address for account creation and communication</li>
                <li>Payment information (processed securely through MTN MoMo and Paystack)</li>
                <li>Usage data (pages viewed, content accessed, time spent)</li>
                <li>Device information (browser type, operating system)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed mb-4">
                We use the collected information for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary-gold-light/70">
                <li>Processing payments and providing access to purchased content</li>
                <li>Sending updates about new stories and releases (with your consent)</li>
                <li>Improving our platform and user experience</li>
                <li>Responding to customer support inquiries</li>
                <li>Preventing fraud and ensuring platform security</li>
              </ul>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                3. Payment Security
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed">
                All payment transactions are processed through secure, encrypted connections. We do not store your full payment card details or mobile money PIN. Payment information is handled directly by MTN Mobile Money and Paystack, which comply with international security standards.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                4. Data Sharing
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share information with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary-gold-light/70">
                <li>Payment processors (MTN MoMo, Paystack) to complete transactions</li>
                <li>Service providers who assist in platform operations</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                5. Cookies and Tracking
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed">
                We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze platform usage. You can control cookie settings through your browser, but some features may not function properly if cookies are disabled.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                6. Your Rights
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-primary-gold-light/70">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data in a portable format</li>
              </ul>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                7. Data Retention
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Purchased content remains accessible to you indefinitely unless you request account deletion.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                8. Children's Privacy
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed">
                Our platform is intended for users aged 13 and above. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                9. Changes to Privacy Policy
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of significant changes via email or through a notice on our platform.
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                10. Contact Us
              </h2>
              <p className="text-primary-gold-light/70 leading-relaxed">
                For privacy-related questions or to exercise your rights, contact us at:
              </p>
              <p className="text-primary-gold mt-2">
                Email: privacy@storyhaven.art
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
