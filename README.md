# 🌐 SHADOWTIPS

**ShadowTips** is a futuristic anonymous messaging platform built with a cyberpunk aesthetic. It enables users to send and receive anonymous messages through encrypted digital channels while maintaining complete privacy and anonymity.

### ✨ Core Features

- 🔐 **Anonymous Messaging**: Send messages without revealing your identity
- 🎭 **Digital Identity Management**: Secure user authentication with verification
- 🤖 **AI-Powered Message Generation**: Contextual message suggestions using Google's Gemini AI
- 🎨 **Cyberpunk UI/UX**: Immersive dark theme with neon accents
- 📱 **Responsive Design**: Optimized for all device types
- 🔄 **Real-time Updates**: Live message management and notifications
- 🛡️ **Security First**: JWT-based authentication with bcrypt password hashing

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.1.7 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom cyberpunk theme
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **State Management**: React hooks with NextAuth session

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with JWT strategy
- **AI Integration**: Google Generative AI (Gemini)
- **Email Service**: React Email with Nodemailer

### Additional Tools
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Carousel**: Embla Carousel
- **Type Safety**: Zod schema validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Google AI Studio API key
- Email service credentials (for verification)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/shubh-v21/shadowtips.git
cd shadowtips
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shadowtips

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-jwt-key
NEXTAUTH_URL=http://localhost:3000

# Google AI (Gemini)
GEMINI_API_KEY=your-gemini-api-key

# Email Service (Gmail example)
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

4. **Run the development server**
```bash
npm run dev
```

5. **Access the application**
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage Guide

### For Users

1. **Create Account**
   - Navigate to `/sign-up`
   - Enter username, email, and password
   - Verify email through sent verification code

2. **Dashboard Access**
   - View received anonymous messages
   - Toggle message reception on/off
   - Copy your profile link for sharing

3. **Receive Messages**
   - Share your profile URL (`/u/your-username`)
   - Others can send anonymous messages
   - Messages appear in your dashboard

### For Senders

1. **Send Anonymous Message**
   - Visit someone's profile URL
   - Type your message (10-300 characters)
   - Use AI suggestions for creative messages
   - Send without revealing identity

2. **AI Message Generation**
   - Configure tone (mysterious, friendly, philosophical, etc.)
   - Select topic domain (digital, future, society, etc.)
   - Choose tech niche (AI, cybersecurity, VR, etc.)
   - Generate contextual suggestions

## 🎨 Cyberpunk Design System

The application features a carefully crafted cyberpunk aesthetic:

- **Color Palette**: Deep blues, cyans, and slate grays
- **Typography**: Futuristic fonts with glowing effects
- **Components**: Neon borders, glass morphism, and subtle animations
- **Icons**: Tech-inspired iconography
- **Themes**: Consistent dark mode with electric accents

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure session management
- **Input Validation**: Zod schema validation
- **Rate Limiting**: AI API request throttling
- **CSRF Protection**: NextAuth built-in security
- **Data Sanitization**: Mongoose schema validation

## 🚀 Deployment

### Vercel/Netlify

1. **Connect Repository**
   - Import project to Vercel/Netlify
   - Configure environment variables
   - Deploy automatically

2. **Environment Variables**
   - Add all `.env.local` variables to Vercel/Netlify
   - Update `NEXTAUTH_URL` to production domain

## 🤝 Contributing

We welcome contributions to enhance ShadowTips! Here's how:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Maintain cyberpunk design consistency
- Add proper error handling
- Include Zod validation for new schemas
- Test responsive design across devices

## 📊 API Reference

### Authentication Endpoints
- `POST /api/sign-up` - User registration
- `POST /api/verify-code` - Email verification
- `POST /api/auth/signin` - User login

### Message Endpoints
- `POST /api/send-message` - Send anonymous message
- `GET /api/get-messages` - Retrieve user messages
- `DELETE /api/delete-message/[id]` - Delete message

### AI Integration
- `POST /api/suggest-messages` - Generate message suggestions

### Utility Endpoints
- `GET /api/check-username-unique` - Validate username availability
- `POST /api/accept-messages` - Toggle message reception

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Verify MongoDB URI in environment variables
- Check network access in MongoDB Atlas

**NextAuth Session Issues**
- Ensure NEXTAUTH_SECRET is properly set
- Verify NEXTAUTH_URL matches your domain

**AI Generation Not Working**
- Validate GEMINI_API_KEY
- Check API quota and rate limits

**Email Verification Failing**
- Configure email service credentials
- Check spam folder for verification emails

## 🌟 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Hosting and deployment platform
- **Radix UI** - Accessible component primitives
- **Google AI** - Generative AI capabilities
- **MongoDB** - Flexible database solution

---

<div align="center">

**Built with ⚡ by the digital shadows**

[Live Demo](https://shadowtips.netlify.app) • [Report Bug](https://github.com/shubh-v21/shadowtips/issues) • [Request Feature](https://github.com/shubh-v21/shadowtips/issues)

</div>
