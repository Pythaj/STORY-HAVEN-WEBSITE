'use client'

import { motion } from 'framer-motion'
import {
  CreditCard,
  Smartphone,
  Shield,
  Clock,
  Check,
  X,
  Phone,
  Mail,
  DollarSign,
  ArrowRight,
  Info,
  Star
} from 'lucide-react'
import { useSiteSettings } from '@/contexts/SiteContext'

export default function PaymentGuidePage() {
  const { settings } = useSiteSettings()

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary-gold glow-text mb-4">
            Payment Guide
          </h1>
          <p className="text-primary-gold-light/70 text-lg max-w-2xl mx-auto">
            Complete guide to making secure payments on Story Haven
          </p>
        </motion.div>

        {/* Quick Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-gold to-accent-orange flex items-center justify-center">
              <Smartphone className="text-dark-900" size={32} />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">MTN MoMo</h3>
            <p className="text-primary-gold-light/70 text-sm">Instant payment processing</p>
          </div>
          <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent-orange to-primary-gold-dark flex items-center justify-center">
              <CreditCard className="text-dark-900" size={32} />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">Paystack</h3>
            <p className="text-primary-gold-light/70 text-sm">Secure card payments</p>
          </div>
          <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-gold-dark to-accent-orange flex items-center justify-center">
              <Shield className="text-dark-900" size={32} />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary-gold mb-2">100% Secure</h3>
            <p className="text-primary-gold-light/70 text-sm">Encrypted transactions</p>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="font-playfair text-3xl font-bold text-primary-gold mb-8 text-center">
            Payment Methods
          </h2>

          <div className="space-y-8">
            {/* MTN MoMo */}
            <div className="card border-2 border-accent-orange/30">
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-accent-orange to-primary-gold-dark flex items-center justify-center flex-shrink-0">
                  <Smartphone className="text-dark-900" size={40} />
                </div>
                <div className="flex-1">
                  <h3 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                    MTN Mobile Money
                  </h3>
                  <p className="text-primary-gold-light/80 mb-6">
                    The fastest and most convenient way to pay in Ghana. MTN MoMo payments are processed instantly.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-primary-gold mb-3">How to Pay:</h4>
                      <ol className="space-y-2 text-primary-gold-light/70">
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>Select content and click "Purchase"</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>Choose MTN MoMo as payment method</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>Enter your MoMo number</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>Approve payment on your phone</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>Access content immediately</span>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-gold mb-3">Requirements:</h4>
                      <ul className="space-y-2 text-primary-gold-light/70">
                        <li className="flex items-center space-x-2">
                          <Info className="text-primary-gold" size={16} />
                          <span>Active MTN SIM card</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Info className="text-primary-gold" size={16} />
                          <span>Sufficient MoMo balance</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Info className="text-primary-gold" size={16} />
                          <span>MoMo app or USSD access</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-accent-orange/10 border border-accent-orange/30 rounded-lg p-4">
                    <p className="text-accent-orange font-semibold mb-2">💡 Pro Tip:</p>
                    <p className="text-primary-gold-light/80">
                      Make sure your MoMo number is registered and active. You can check your balance by dialing *170# before making a payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Paystack */}
            <div className="card border-2 border-primary-gold/30">
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary-gold to-accent-orange flex items-center justify-center flex-shrink-0">
                  <CreditCard className="text-dark-900" size={40} />
                </div>
                <div className="flex-1">
                  <h3 className="font-playfair text-2xl font-bold text-primary-gold mb-4">
                    Paystack (Credit/Debit Cards)
                  </h3>
                  <p className="text-primary-gold-light/80 mb-6">
                    Secure card payments processed through Paystack. Accepted cards include Visa, MasterCard, and local Ghanaian cards.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-primary-gold mb-3">How to Pay:</h4>
                      <ol className="space-y-2 text-primary-gold-light/70">
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>Select content and click "Purchase"</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>Choose Paystack as payment method</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>Enter your card details securely</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>Complete 3D Secure verification</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>Access content immediately</span>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-gold mb-3">Accepted Cards:</h4>
                      <ul className="space-y-2 text-primary-gold-light/70">
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>Visa (all types)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>MasterCard (all types)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>Ghanaian bank cards</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="text-green-400" size={16} />
                          <span>International cards</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-primary-gold/10 border border-primary-gold/30 rounded-lg p-4">
                    <p className="text-primary-gold font-semibold mb-2">🔒 Security Note:</p>
                    <p className="text-primary-gold-light/80">
                      Your card details are encrypted and processed securely by Paystack. We never store your full card information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Security & Support */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-playfair text-3xl font-bold text-primary-gold mb-8 text-center">
            Security & Support
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card border-2 border-green-500/30">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Shield className="text-green-400" size={24} />
                </div>
                <h3 className="font-playfair text-xl font-bold text-primary-gold">100% Secure</h3>
              </div>
              <ul className="space-y-3 text-primary-gold-light/70">
                <li className="flex items-center space-x-2">
                  <Check className="text-green-400" size={16} />
                  <span>SSL encryption on all transactions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="text-green-400" size={16} />
                  <span>PCI DSS compliant payment processing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="text-green-400" size={16} />
                  <span>No storage of sensitive payment data</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="text-green-400" size={16} />
                  <span>Bank-level security standards</span>
                </li>
              </ul>
            </div>

            <div className="card border-2 border-primary-gold/30">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary-gold/20 flex items-center justify-center">
                  <Clock className="text-primary-gold" size={24} />
                </div>
                <h3 className="font-playfair text-xl font-bold text-primary-gold">24/7 Support</h3>
              </div>
              <ul className="space-y-3 text-primary-gold-light/70">
                <li className="flex items-center space-x-2">
                  <Check className="text-green-400" size={16} />
                  <span>Response within 24 hours</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="text-green-400" size={16} />
                  <span>Payment troubleshooting assistance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="text-green-400" size={16} />
                  <span>Refund processing support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="text-green-400" size={16} />
                  <span>Multiple contact channels</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Troubleshooting */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-playfair text-3xl font-bold text-primary-gold mb-8 text-center">
            Troubleshooting
          </h2>

          <div className="space-y-6">
            <div className="card border-2 border-yellow-500/30">
              <div className="flex items-start space-x-4">
                <X className="text-yellow-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-primary-gold mb-2">Payment Failed?</h3>
                  <p className="text-primary-gold-light/70 mb-3">
                    If your payment fails, check the following:
                  </p>
                  <ul className="space-y-1 text-primary-gold-light/60 text-sm">
                    <li>• Ensure sufficient balance in your MoMo wallet or card</li>
                    <li>• Verify your card details are correct</li>
                    <li>• Check your internet connection</li>
                    <li>• Try a different payment method</li>
                    <li>• Contact your bank if card payments fail</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card border-2 border-red-500/30">
              <div className="flex items-start space-x-4">
                <X className="text-red-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-primary-gold mb-2">Content Not Accessible?</h3>
                  <p className="text-primary-gold-light/70 mb-3">
                    If you can't access purchased content:
                  </p>
                  <ul className="space-y-1 text-primary-gold-light/60 text-sm">
                    <li>• Refresh the page and try again</li>
                    <li>• Clear your browser cache</li>
                    <li>• Check if payment was successful</li>
                    <li>• Contact support with payment reference</li>
                    <li>• Verify you're logged into the correct account</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <div className="card">
            <h2 className="font-playfair text-3xl font-bold text-primary-gold mb-6">
              Need More Help?
            </h2>
            <p className="text-primary-gold-light/70 mb-8 max-w-md mx-auto">
              Our support team is ready to assist you with any payment or access issues.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <a
                href="/contact"
                className="flex items-center justify-center space-x-2 p-4 bg-primary-gold/10 hover:bg-primary-gold/20 rounded-lg border border-primary-gold/30 transition-all"
              >
                <Mail className="text-primary-gold" size={20} />
                <span className="text-primary-gold font-medium">Email Support</span>
              </a>

              <a
                href="/faqs"
                className="flex items-center justify-center space-x-2 p-4 bg-primary-gold/10 hover:bg-primary-gold/20 rounded-lg border border-primary-gold/30 transition-all"
              >
                <Phone className="text-primary-gold" size={20} />
                <span className="text-primary-gold font-medium">Browse FAQs</span>
              </a>

              <a
                href="/help"
                className="flex items-center justify-center space-x-2 p-4 bg-primary-gold/10 hover:bg-primary-gold/20 rounded-lg border border-primary-gold/30 transition-all"
              >
                <Star className="text-primary-gold" size={20} />
                <span className="text-primary-gold font-medium">Help Center</span>
              </a>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-primary-gold/10 to-accent-orange/10 rounded-lg border border-primary-gold/20">
              <p className="text-primary-gold font-semibold mb-2">💰 Payment Information:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-gold-light/70">Support Email:</span>
                  <span className="text-primary-gold font-medium">{settings.contactEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-gold-light/70">Response Time:</span>
                  <span className="text-primary-gold font-medium">Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
