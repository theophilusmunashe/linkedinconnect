import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { feedback, email } = await request.json()

    if (!feedback || !email) {
      return NextResponse.json(
        { error: 'Feedback and email are required' },
        { status: 400 }
      )
    }

    // Check if environment variables are loaded
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('Email configuration missing - Check .env.local file')
      return NextResponse.json(
        { error: 'Email configuration missing' },
        { status: 500 }
      )
    }

    // Create a transporter using Gmail SMTP with explicit configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Email to Theo
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'theophilusmunashe694@gmail.com',
      subject: 'New Connection Feedback from LinkedIn Connect',
      html: `
        <h2>New Connection Feedback Received</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Feedback:</strong></p>
        <p>${feedback}</p>
        <hr>
        <p><em>Sent from LinkedIn Connect App</em></p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Feedback sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send feedback' },
      { status: 500 }
    )
  }
}
