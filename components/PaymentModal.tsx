'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Smartphone, CheckCircle, Loader } from 'lucide-react'
import { useSiteSettings } from '@/contexts/SiteContext'

interface PaymentModalProps {
  title: string
  price: number
  type: 'story' | 'audio' | 'animation'
  onClose: () => void
  onSuccess: () => void
}

export default function PaymentModal({ title, price, type, onClose, onSuccess }: PaymentModalProps) {
  const { settings } = useSiteSettings()
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'paystack'>('momo')
  const [momoNumber, setMomoNumber] = useState(settings.momoNumber || '')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Hide navbar when payment modal is open
  useEffect(() => {
    // Add class to body to hide navbar
    document.body.classList.add('payment-modal-open')
    console.log('✅ Payment modal opened - navbar should be hidden')

    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    return () => {
      // Remove class and restore scroll when modal closes
      document.body.classList.remove('payment-modal-open')
      document.body.style.overflow = 'unset'
      console.log('✅ Payment modal closed - navbar restored')
    }
  }, [settings.momoNumber])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)

      // Call success callback after showing success message
      setTimeout(() => {
        onSuccess()
      }, 2000)
    }, 3000)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop - Enhanced for focus */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="absolute inset-0 bg-dark-900/95 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl border-2 border-primary-gold/40 max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/5 via-transparent to-accent-orange/5 pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-dark-700/80 backdrop-blur-sm text-primary-gold-light hover:text-primary-gold hover:bg-dark-700 hover:scale-110 transition-all duration-200 border border-primary-gold/20"
          >
            <X size={20} />
          </button>

          <div className="relative p-6">

          {!paymentSuccess ? (
            <>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-5 pr-10"
              >
                <h2 className="font-playfair text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-accent-orange mb-2">
                  Complete Your Purchase
                </h2>
                <p className="text-primary-gold-light/80 text-sm">
                  Unlock <span className="text-primary-gold font-bold">{title}</span>
                </p>
              </motion.div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-dark-700 to-dark-800 rounded-xl p-4 mb-5 border border-primary-gold/20 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-primary-gold-light text-sm font-medium">Total Amount:</span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="text-primary-gold font-bold text-3xl tracking-tight"
                  >
                    ₵{price.toFixed(2)}
                  </motion.span>
                </div>
              </motion.div>

              {/* Payment Method Selection */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-5"
              >
                <p className="text-primary-gold-light mb-3 font-semibold text-sm">Select Payment Method:</p>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPaymentMethod('momo')}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === 'momo'
                        ? 'border-primary-gold bg-gradient-to-br from-primary-gold/20 to-primary-gold/10 shadow-lg shadow-primary-gold/20'
                        : 'border-primary-gold/30 hover:border-primary-gold/60 bg-dark-700/50'
                    }`}
                  >
                    {paymentMethod === 'momo' && (
                      <motion.div
                        layoutId="activePayment"
                        className="absolute inset-0 bg-gradient-to-br from-primary-gold/10 to-transparent rounded-xl"
                      />
                    )}
                    <Smartphone className="mx-auto mb-1.5 text-primary-gold" size={24} />
                    <p className="text-primary-gold-light font-bold text-xs">MTN MoMo</p>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPaymentMethod('paystack')}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === 'paystack'
                        ? 'border-primary-gold bg-gradient-to-br from-primary-gold/20 to-primary-gold/10 shadow-lg shadow-primary-gold/20'
                        : 'border-primary-gold/30 hover:border-primary-gold/60 bg-dark-700/50'
                    }`}
                  >
                    {paymentMethod === 'paystack' && (
                      <motion.div
                        layoutId="activePayment"
                        className="absolute inset-0 bg-gradient-to-br from-primary-gold/10 to-transparent rounded-xl"
                      />
                    )}
                    <CreditCard className="mx-auto mb-1.5 text-primary-gold" size={24} />
                    <p className="text-primary-gold-light font-bold text-xs">Paystack</p>
                  </motion.button>
                </div>
              </motion.div>

              {/* Payment Form */}
              <form onSubmit={handlePayment}>
                <motion.div
                  key={paymentMethod}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {paymentMethod === 'momo' ? (
                    <div className="mb-5">
                      <label className="block text-primary-gold-light mb-2 font-semibold text-sm">
                        Mobile Money Number
                      </label>
                      <input
                        type="tel"
                        value={momoNumber}
                        onChange={(e) => setMomoNumber(e.target.value)}
                        placeholder="024XXXXXXX"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-dark-700 border-2 border-primary-gold/30 text-primary-gold-light focus:outline-none focus:border-primary-gold focus:ring-2 focus:ring-primary-gold/20 transition-all text-base font-mono"
                      />
                      {/* Show configured MoMo info if available */}
                      {settings.momoNumber && settings.momoName && (
                        <div className="mt-3 p-3 bg-primary-gold/10 border border-primary-gold/30 rounded-lg">
                          <p className="text-primary-gold-light/80 text-xs mb-1">
                            <span className="text-primary-gold">💰</span> Payment will be sent to:
                          </p>
                          <p className="text-primary-gold font-medium text-sm font-mono">
                            {settings.momoNumber}
                          </p>
                          <p className="text-primary-gold-light/70 text-xs">
                            Account: {settings.momoName}
                          </p>
                        </div>
                      )}
                      <p className="text-primary-gold-light/60 text-xs mt-2 flex items-start space-x-1.5">
                        <span className="text-primary-gold mt-0.5">💡</span>
                        <span>You will receive a prompt on your phone to approve the payment</span>
                      </p>
                    </div>
                  ) : (
                    <div className="mb-5 p-4 bg-dark-700/50 rounded-xl border border-primary-gold/20">
                      <p className="text-primary-gold-light/80 text-xs flex items-start space-x-1.5">
                        <span className="text-primary-gold text-sm mt-0.5">🔒</span>
                        <span>You will be redirected to Paystack to complete your payment securely</span>
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                  type="submit"
                  disabled={isProcessing || (paymentMethod === 'momo' && !momoNumber)}
                  className="w-full bg-gradient-to-r from-primary-gold to-accent-orange text-dark-900 font-bold text-base py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-gold/30 disabled:hover:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay ₵{price.toFixed(2)}</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Security Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-primary-gold-light/60 text-xs text-center mt-4 flex items-center justify-center space-x-1.5"
              >
                <span className="text-green-500">🔒</span>
                <span>Your payment is secure and encrypted</span>
              </motion.p>
            </>
          ) : (
            /* Success Message */
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.8, bounce: 0.5 }}
                className="mb-6"
              >
                <div className="relative inline-block">
                  <CheckCircle className="text-green-500" size={80} />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                    className="absolute inset-0 bg-green-500/30 rounded-full blur-xl"
                  />
                </div>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-playfair text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-primary-gold mb-3"
              >
                Payment Successful!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-primary-gold-light/80 mb-6 text-base"
              >
                You now have full access to <span className="text-primary-gold font-bold">{title}</span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center space-x-3 text-green-400 bg-green-500/10 py-3 px-6 rounded-full inline-flex"
              >
                <Loader className="animate-spin" size={20} />
                <span className="font-medium">Unlocking content...</span>
              </motion.div>
            </div>
          )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
