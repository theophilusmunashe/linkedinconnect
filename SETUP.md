# Email Setup Instructions

To enable the feedback email functionality, you need to set up environment variables:

1. Create a file named `.env.local` in the root directory
2. Add the following content to `.env.local`:

```
# Gmail configuration for nodemailer
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```

3. Replace `your-email@gmail.com` with your Gmail address
4. Replace `your-app-password` with a Gmail App Password (not your regular password)

## How to get Gmail App Password:

1. Go to your Google Account settings
2. Enable 2-factor authentication if not already enabled
3. Go to Security → App passwords
4. Generate a new app password for "Mail" on "Other device"
5. Use that 16-character password in the GMAIL_PASS field

The feedback will be sent to: theophilusmunashe694@gmail.com
