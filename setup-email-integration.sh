#!/bin/bash
# Email Integration Setup Script for Story Haven Contact Form

echo "🚀 Setting up email integration for Story Haven Contact Form..."
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    touch .env.local
fi

echo "✅ Contact form system is ready!"
echo ""
echo "📧 To complete email functionality, choose one of these options:"
echo ""
echo "1️⃣  SendGrid (Recommended for production):"
echo "   - Sign up at https://sendgrid.com"
echo "   - Get your API key from dashboard"
echo "   - Add to .env.local: SENDGRID_API_KEY=your_api_key_here"
echo ""
echo "2️⃣  Nodemailer (For custom SMTP):"
echo "   - Add to .env.local:"
echo "     EMAIL_HOST=smtp.gmail.com"
echo "     EMAIL_PORT=587"
echo "     EMAIL_USER=your-email@gmail.com"
echo "     EMAIL_PASS=your-app-password"
echo ""
echo "3️⃣  EmailJS (Simple client-side solution):"
echo "   - Sign up at https://emailjs.com"
echo "   - Get service ID, template ID, and public key"
echo "   - Update contact form to use EmailJS"
echo ""
echo "📋 Current Contact Form Features:"
echo "   ✅ Form validation and error handling"
echo "   ✅ Real-time settings integration"
echo "   ✅ Professional UI with loading states"
echo "   ✅ API endpoint ready for email service"
echo "   ✅ Success/error feedback for users"
echo ""
echo "🎯 Test your setup:"
echo "   1. Update admin settings with your real email"
echo "   2. Submit contact form"
echo "   3. Check if email arrives at your configured address"
echo ""
echo "🎉 Your contact form is ready for production!"
echo "📧 Messages will be sent to the email you configure in admin settings."
