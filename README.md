# Sarvam - Real Estate Platform

A modern Next.js-based real estate platform with admin panel, property management, and contact features.

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/bhuvi12a/sarvam.git
   cd sarvam
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Update with your MongoDB connection string
   ```bash
   cp .env.example .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to http://localhost:3000

## 📦 Build & Deploy

### Build Locally

```bash
npm run build
npm start
```

### Deploy to Vercel

> **⚠️ IMPORTANT: See [VERCEL_DEPLOYMENT_CHECKLIST.md](./VERCEL_DEPLOYMENT_CHECKLIST.md) for complete deployment instructions!**

Quick steps:
1. Configure environment variables in Vercel dashboard
2. Set Root Directory to `.` (not `re-main`)
3. Deploy from GitHub
4. Update environment variables with production URLs

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
sarvam/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── admin/        # Admin panel
│   │   ├── api/          # API routes
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   ├── projects/     # Projects page
│   │   ├── properties/   # Properties listing
│   │   ├── services/     # Services page
│   │   └── property-types/ # Property types page
│   ├── components/       # Reusable components
│   ├── lib/             # Utility functions
│   └── data/            # Static data
├── public/              # Static assets
└── data/                # JSON data files
```

## 🔑 Environment Variables

Required environment variables (see `.env.example`):

- `MONGODB_URI` - MongoDB connection string
- `NEXT_PUBLIC_API_BASE_URL` - API base URL
- `NEXT_PUBLIC_BASE_URL` - Application base URL

## 📚 Documentation

- [Vercel Deployment Checklist](./VERCEL_DEPLOYMENT_CHECKLIST.md) - Complete deployment guide
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Legacy deployment notes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

Private project - All rights reserved
