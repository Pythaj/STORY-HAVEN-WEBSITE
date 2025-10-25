import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, to, adminEmail } = body

    // Validate required fields
    if (!name || !email || !subject || !message || !to) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Here you would integrate with an email service like:
    // - SendGrid
    // - Nodemailer
    // - EmailJS
    // - Resend
    // For now, we'll simulate email sending

    console.log('📧 Contact Form Submission:', {
      name,
      email,
      subject,
      message,
      to,
      adminEmail,
      timestamp: new Date().toISOString()
    })

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In a real implementation, you would send the email here
    // Example with Nodemailer:
    /*
    const nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransporter({
      // email service configuration
    })

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to,
      cc: adminEmail,
      subject: `Story Haven Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })
    */

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
