# 🚀 Uzair Portfolio

A modern, full-stack portfolio website built with **TanStack Start**, **React 19**, **TypeScript**, and **Tailwind CSS**. Features a smooth user experience with animations, a fully functional contact form with EmailJS integration, and background music.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![React](https://img.shields.io/badge/React-19.2-61dafb)

---

## ✨ Features

- 🎨 **Modern Design** - Dark theme with smooth animations (Framer Motion, GSAP)
- 📧 **Contact Form** - Fully functional with server-side validation and EmailJS integration
- 🎵 **Music Player** - Background music with play/pause controls
- 📱 **Responsive** - Mobile-first design with Tailwind CSS
- ♿ **Accessible** - WCAG compliant with Radix UI components
- ⚡ **Fast** - Built with Vite and TanStack Start for optimal performance
- 🔒 **Secure** - Server-side form validation and secure API handling

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **TanStack Router** 1.170.16 - File-based routing
- **Tailwind CSS** 4.2.1 - Styling
- **Radix UI** - Accessible component library
- **Framer Motion** 12.43.0 - Animations
- **GSAP** 3.15.0 - Advanced animations
- **TypeScript** 5.8.3 - Type safety

### Backend
- **TanStack Start** 1.168.26 - Full-stack framework
- **Nitro** - Server runtime (Cloudflare Workers)
- **EmailJS** - Email service

### Development
- **Vite** 8.1.5 - Build tool
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Bun** - Package manager

---

## 📋 Quick Start

### Prerequisites
- Node.js 18+ or Bun installed
- EmailJS account (https://emailjs.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/uzair0100/uzair-portfolio.git
cd uzair-portfolio

# Install dependencies
bun install
# or
npm install

# Create environment variables
cp .env.example .env.local
# Edit .env.local with your EmailJS credentials
```

### Environment Setup

1. Go to https://dashboard.emailjs.com/admin/account
2. Copy your **Service ID**, **Template ID**, **Public Key**, and **Private Key**
3. Update `.env.local`:

```env
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key
```

### Running Locally

```bash
# Start development server
bun run dev

# Server runs at: http://localhost:8081/
```

### Build for Production

```bash
# Build
bun run build

# Preview production build
bun run preview
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── portfolio/           # Portfolio sections
│   │   ├── Contact.tsx      # Contact form
│   │   ├── MusicPlayer.tsx  # Music player
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── ...
│   └── ui/                  # Reusable components
├── lib/
│   └── contact-server.ts    # EmailJS integration
├── routes/
│   ├── index.tsx            # Home page
│   └── __root.tsx           # Root layout
├── assets/                  # Images and assets
└── styles/                  # Global styles

public/
├── Pharrell Williams - Happy (Official Video).mp3
├── favicon.png
└── uploads/                 # Project images
```

---

## 🎯 Core Functionalities

### Contact Form
- Full name (required)
- Email address (required, validated)
- Project type selector
- Budget range selector
- Project details textarea
- File attachment support (max 5MB)
- Real-time validation
- Server-side email sending to `uzairy099@gmail.com`

**Supported file types:** PDF, DOC, DOCX, TXT, PNG, JPG, WEBP

### Music Player
- Play/Pause button (bottom-left corner)
- Background music: "Pharrell Williams - Happy"
- Volume: 40%
- Auto-loop enabled
- Graceful fallback if audio file missing

### Portfolio Sections
- Hero introduction
- Tech stack showcase
- Projects portfolio
- About/Fun facts
- Statistics
- Smooth navigation

---

## 📧 Email Integration

### How It Works
1. User fills contact form
2. Form validates on client and server
3. Server sends to EmailJS API
4. Email delivered to `uzairy099@gmail.com`
5. Reply-to set to visitor's email

### EmailJS Template Variables
```
- {{from_name}}: Client's name
- {{from_email}}: Client's email
- {{project_type}}: Project type
- {{budget}}: Budget range
- {{details}}: Project details
- {{file_info}}: File attachment info
```

### Configuration
- **Service:** Gmail
- **Recipient:** uzairy099@gmail.com
- **Security:** Private key required for server calls (non-browser API access enabled)

---

## 🚀 Deployment

### Cloudflare Workers
```bash
# Build for Cloudflare
bun run build

# Deploy (requires wrangler setup)
npx wrangler deploy
```

### Environment Variables for Deployment
Set these in your deployment platform:
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_PRIVATE_KEY`

---

## 🔐 Security

- ✅ Private API keys never exposed to client
- ✅ Server-side form validation
- ✅ File type and size validation
- ✅ CORS handled by EmailJS
- ✅ Email validation regex
- ✅ Accessibility features (ARIA labels)
- ✅ No sensitive data in client code

**Important:** Never commit `.env` files. Use `.env.example` as template.

---

## 🧪 Testing

### Test Contact Form
1. Go to http://localhost:8081/
2. Scroll to "Hire Me" section
3. Fill form with test data
4. Click "Send Message"
5. Check email at `uzairy099@gmail.com`

### Test Music Player
1. Click music button (bottom-left)
2. Listen for music
3. Toggle play/pause

---

## 📝 Available Scripts

```bash
# Development
bun run dev          # Start dev server

# Building
bun run build        # Production build
bun run build:dev    # Development build

# Code Quality
bun run lint         # Run ESLint
bun run format       # Format with Prettier

# Preview
bun run preview      # Preview production build
```

---

## ⚙️ Configuration Files

- **`vite.config.ts`** - Vite configuration
- **`tsconfig.json`** - TypeScript configuration
- **`tailwind.config.ts`** - Tailwind CSS configuration
- **`eslint.config.js`** - ESLint rules
- **`.prettierrc`** - Prettier formatting rules

---

## 🐛 Known Issues

1. **File Attachments:** EmailJS REST API doesn't support actual file uploads. File info is sent as text. Users can request files separately or use cloud storage links.

2. **Music Loading:** If audio file isn't in `public/` directory, the music button won't appear. Ensure `public/Pharrell Williams - Happy (Official Video).mp3` exists.

---

## 📚 Documentation

See [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md) for detailed project documentation including:
- Full tech stack breakdown
- Detailed feature descriptions
- Deployment instructions
- Security notes
- Performance considerations

---

## 🔗 Links

- **GitHub:** https://github.com/uzair0100/uzair-portfolio
- **Live Site:** https://uzairyounis.com
- **EmailJS Docs:** https://www.emailjs.com/docs/
- **TanStack Docs:** https://tanstack.com/start/latest
- **Tailwind Docs:** https://tailwindcss.com/docs

---

## 📄 License

MIT License - Feel free to use this as a template!

```
MIT License

Copyright (c) 2026 Uzair Younis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👤 Author

**Uzair Younis**
- Email: uzairy099@gmail.com
- GitHub: [@uzair0100](https://github.com/uzair0100)
- LinkedIn: [Uzair Younis](https://www.linkedin.com/in/uzair-younis-347438364/)

---

## 🙏 Acknowledgments

- Built with [TanStack Start](https://tanstack.com/start)
- UI components from [Radix UI](https://radix-ui.com)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Animations powered by [Framer Motion](https://www.framer.com/motion) and [GSAP](https://gsap.com)
- Email service by [EmailJS](https://emailjs.com)

---

**Last Updated:** July 31, 2026
**Status:** ✅ Production Ready
