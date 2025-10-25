'use client'

import { motion } from 'framer-motion'
import { RefreshCw, Clock, CheckCircle, XCircle, Mail, AlertCircle, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function RefundPage() {
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
            <RefreshCw size={40} className="text-dark-900" />
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary-gold glow-text mb-4">
            Refund Policy
          </h1>
          <p className="text-primary-gold-light/70 text-lg">
            Fair and transparent refund terms for your purchases
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
              <DollarSign className="text-primary-gold mt-1" size={24} />
              <div>
                <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                  Our Refund Commitment
                </h2>
                <p className="text-primary-gold-light/80 leading-relaxed mb-4">
                  We stand behind the quality of our content. If you're not satisfied with your purchase, 
                  we offer a fair refund policy to ensure your peace of mind.
                </p>
                <p className="text-primary-gold-light/70">
                  Last Updated: January 2024
                </p>
              </div>
            </div>
          </div>

          {/* Refund Timeline */}
          <div className="card border-2 border-primary-gold/30">
            <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6 flex items-center space-x-2">
              <Clock size={24} />
              <span>Refund Eligibility Period</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">24 Hours</div>
                <p className="text-primary-gold-light/70">Written Stories</p>
                <p className="text-xs text-primary-gold-light/50 mt-2">Full refund available</p>
              </div>
              
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">48 Hours</div>
                <p className="text-primary-gold-light/70">Audio Stories</p>
                <p className="text-xs text-primary-gold-light/50 mt-2">Full refund available</p>
              </div>
              
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">72 Hours</div>
                <p className="text-primary-gold-light/70">Animations</p>
                <p className="text-xs text-primary-gold-light/50 mt-2">Full refund available</p>
              </div>
            </div>
          </div>

          {/* Eligible for Refund */}
          <div className="card border-2 border-green-500/30">
            <h2 className="font-playfair text-2xl font-bold text-green-400 mb-6 flex items-center space-x-2">
              <CheckCircle size={24} />
              <span>Eligible for Refund</span>
            </h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-primary-gold font-semibold mb-1">Technical Issues</h3>
                  <p className="text-primary-gold-light/70 text-sm">
                    Content fails to download or is corrupted, and we cannot resolve the issue.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-primary-gold font-semibold mb-1">Wrong Content Delivered</h3>
                  <p className="text-primary-gold-light/70 text-sm">
                    You received different content than what was advertised or ordered.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-primary-gold font-semibold mb-1">Duplicate Purchase</h3>
                  <p className="text-primary-gold-light/70 text-sm">
                    You accidentally purchased the same content twice.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-primary-gold font-semibold mb-1">Unsatisfactory Quality</h3>
                  <p className="text-primary-gold-light/70 text-sm">
                    Content quality is significantly below description within eligibility period.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-primary-gold font-semibold mb-1">Payment Error</h3>
                  <p className="text-primary-gold-light/70 text-sm">
                    You were charged incorrectly or multiple times for a single purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Not Eligible */}
          <div className="card border-2 border-red-500/30">
            <h2 className="font-playfair text-2xl font-bold text-red-400 mb-6 flex items-center space-x-2">
              <XCircle size={24} />
              <span>Not Eligible for Refund</span>
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ❌ <strong>After Eligibility Period:</strong> Refund requests made after the specified time period has expired.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ❌ <strong>Change of Mind:</strong> Personal preference or change of mind after viewing content in full.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ❌ <strong>Shared Content:</strong> Content that has been shared with others or distributed.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ❌ <strong>Promotional Sales:</strong> Content purchased during special promotions or discounts (unless technical issues).
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-primary-gold-light/80">
                  ❌ <strong>Subscription Bundles:</strong> Partially consumed bundle packages or subscription services.
                </p>
              </div>
            </div>
          </div>

          {/* Refund Process */}
          <div className="card">
            <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-6">
              How to Request a Refund
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary-gold text-dark-900 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-primary-gold font-semibold mb-2">Contact Support</h3>
                  <p className="text-primary-gold-light/70">
                    Send an email to our support team with your purchase details and reason for refund.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary-gold text-dark-900 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-primary-gold font-semibold mb-2">Provide Information</h3>
                  <p className="text-primary-gold-light/70">
                    Include your transaction ID, purchase date, and detailed explanation of the issue.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary-gold text-dark-900 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-primary-gold font-semibold mb-2">Review Process</h3>
                  <p className="text-primary-gold-light/70">
                    We'll review your request within 24-48 hours and respond with a decision.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary-gold text-dark-900 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-primary-gold font-semibold mb-2">Refund Processing</h3>
                  <p className="text-primary-gold-light/70">
                    Approved refunds will be processed within 3-5 business days to your original payment method.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Refunds */}
          <div className="card">
            <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
              Refund by Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-dark-800 rounded-lg border border-primary-gold/30">
                <h3 className="text-primary-gold font-semibold mb-2">MTN Mobile Money</h3>
                <p className="text-primary-gold-light/70 text-sm mb-2">
                  Refunds credited directly to your MoMo wallet within 24 hours.
                </p>
                <p className="text-xs text-primary-gold-light/50">Processing time: 1 business day</p>
              </div>

              <div className="p-4 bg-dark-800 rounded-lg border border-primary-gold/30">
                <h3 className="text-primary-gold font-semibold mb-2">Paystack (Card/Bank)</h3>
                <p className="text-primary-gold-light/70 text-sm mb-2">
                  Refunds returned to your card or bank account.
                </p>
                <p className="text-xs text-primary-gold-light/50">Processing time: 5-10 business days</p>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="card bg-accent-orange/5 border-2 border-accent-orange/30">
            <div className="flex items-start space-x-4">
              <AlertCircle className="text-accent-orange mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="font-playfair text-2xl font-bold text-accent-orange mb-4">
                  Important Notes
                </h2>
                <ul className="space-y-2 text-primary-gold-light/70">
                  <li>• Refund eligibility is determined on a case-by-case basis</li>
                  <li>• Processing times may vary depending on your payment provider</li>
                  <li>• Transaction fees are non-refundable</li>
                  <li>• Refunded content access will be revoked immediately</li>
                  <li>• Fraudulent refund requests may result in account suspension</li>
                  <li>• We reserve the right to refuse refunds for policy violations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="card text-center">
            <Mail className="w-12 h-12 text-primary-gold mx-auto mb-4" />
            <h2 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
              Need Help with a Refund?
            </h2>
            <p className="text-primary-gold-light/70 mb-6">
              Our support team is here to assist you with any refund inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center space-x-2">
                <Mail size={20} />
                <span>Contact Support</span>
              </Link>
              <Link href="/faqs" className="btn-secondary inline-flex items-center justify-center space-x-2">
                <AlertCircle size={20} />
                <span>View FAQs</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
