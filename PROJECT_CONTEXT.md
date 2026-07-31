# Uzair Portfolio - Project Context

**Last Updated:** July 31, 2026
**Status:** ✅ Fully Functional

---

## 📋 Project Overview

A modern, full-stack portfolio website built with TanStack Start, TypeScript, and Tailwind CSS. The portfolio showcases projects, skills, and includes a fully functional contact form with email integration via EmailJS.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19.2.0
- **Router:** TanStack React Router 1.170.16
- **Build Tool:** Vite 8.1.5
- **Styling:** Tailwind CSS 4.2.1 + Radix UI components
- **Animations:** Framer Motion 12.43.0, GSAP 3.15.0, Lenis 1.3.25
- **Form Handling:** React Hook Form 7.71.2
- **UI Components:** Radix UI (extensive suite)
- **Icons:** Lucide React 0.575.0
- **Data Visualization:** Recharts 2.15.4

### Backend
- **Server Framework:** TanStack Start 1.168.26
- **Runtime:** Nitro 3.0.260603-beta
- **Email Service:** EmailJS (REST API)
- **HTTP Client:** Fetch API (native)

### Development
- **Language:** TypeScript 5.8.3
- **Linting:** ESLint 9.32.0
- **Formatting:** Prettier 3.7.3
- **Package Manager:** Bun

### Deployment
- **Target:** Cloudflare Workers (via Nitro)
- **Build Output:** `.output` directory

---

## 📂 Project Structure

```
fin/
├── src/
│   ├── components/
│   │   ├── portfolio/
│   │   │   ├── Contact.tsx          # Contact form component
│   │   │   ├── MusicPlayer.tsx      # Music player with local audio
│   │   │   ├── Projects.tsx         # Projects showcase
│   │   │   ├── Hero.tsx             # Hero section
│   │   │   ├── BackgroundFX.tsx     # Background effects
│   │   │   ├── TechMarquee.tsx      # Tech stack marquee
│   │   │   ├── Stats.tsx            # Statistics section
│   │   │   ├── FunFacts.tsx         # Fun facts about me
│   │   │   └── [other components]
│   │   └── ui/                      # Reusable UI components (Radix + Tailwind)
│   ├── lib/
│   │   ├── contact-server.ts        # EmailJS integration (server function)
│   │   └── utils.ts
│   ├── assets/
│   │   └── [asset files]
│   ├── styles/
│   │   └── globals.css
│   ├── routes/
│   │   ├── index.tsx                # Home page
│   │   └── __root.tsx               # Root layout
│   └── server.ts                    # Server entry point
├── public/
│   ├── Pharrell Williams - Happy (Official Video).mp3  # Background music
│   ├── favicon.png
│   └── uploads/                     # Project images
├── .env                             # Production environment variables
├── .env.local                       # Local development environment variables
├── .lovable/local.env              # Lovable IDE environment variables
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## ✨ Core Functionalities

### 1. **Contact Form** ✅
- **Location:** `src/components/portfolio/Contact.tsx`
- **Features:**
  - Full name (required)
  - Email address (required, validated)
  - Project type selector (Fullstack, AI Automation, Full-time Hire)
  - Budget range selector ($1k-$5k, $5k-$15k, $15k+)
  - Project details textarea
  - File attachment support (max 5MB)
  - Allowed file types: PDF, DOC, DOCX, TXT, PNG, JPG, WEBP
  - Real-time validation
  - Loading and success states
  - Error handling with user-friendly messages

**Server Function:** `src/lib/contact-server.ts`
- Validates form data server-side
- Sends emails via EmailJS REST API
- Recipient: `uzairy099@gmail.com`
- Reply-to: Visitor's email address
- File attachment info included in email (file data not attached - EmailJS REST API limitation)

### 2. **Music Player** ✅
- **Location:** `src/components/portfolio/MusicPlayer.tsx`
- **Features:**
  - Play/Pause button
  - Fixed position (bottom-left corner)
  - Background music: "Pharrell Williams - Happy (Official Video).mp3"
  - Volume: 40% (configurable)
  - Auto-loop enabled
  - Graceful fallback (button hidden if file missing)
  - Accessibility features (ARIA labels, keyboard support)
  - Reduced motion support

**Audio File:**
- Location: `public/Pharrell Williams - Happy (Official Video).mp3`
- Size: 3.72 MB
- Format: MP3
- Duration: ~3 minutes

### 3. **Portfolio Sections** ✅
- **Hero Section:** Introduction with animations
- **Tech Stack:** Marquee display of technologies
- **Projects:** Showcase of completed projects with descriptions
- **About/Fun Facts:** Personal insights
- **Statistics:** Project counts, experience metrics
- **Navigation:** Sticky header with smooth scrolling

### 4. **Design & UX** ✅
- **Color Scheme:** Dark theme (#0f0f12 background, violet accents #a63d40)
- **Animations:** Framer Motion, GSAP, CSS animations
- **Smooth Scrolling:** Lenis integration
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Accessibility:** WCAG compliant components (Radix UI)
- **Loading States:** Visual feedback for async operations

---

## 📧 Email Integration (EmailJS)

### Setup
- **Service ID:** `service_h4kb33o`
- **Template ID:** `template_4sdswol`
- **Public Key:** `VWeA_NMi3haSG5ANp`
- **Private Key:** `9AQ59AcLzL8RobMqtrQ7j` (server-side only)

### Configuration
- **Non-browser API access:** Enabled
- **Strict mode:** Enabled (requires private key for server calls)
- **Email Service:** Gmail (connected as `uzairy099@gmail.com`)

### Template
```
Subject: New Project Inquiry from {{from_name}}

Variables:
- {{from_name}}: Client's name
- {{from_email}}: Client's email
- {{project_type}}: Project type selected
- {{budget}}: Budget range selected
- {{details}}: Project details/description
- {{file_info}}: File attachment info (text only, no actual file)

Recipient: uzairy099@gmail.com (hardcoded in template)
```

### Email Sending Flow
```
User fills form → Server validates → EmailJS API call → Gmail delivery → uzairy099@gmail.com
```

---

## 🔐 Environment Variables

### `.env` (Production)
```env
EMAILJS_SERVICE_ID=service_h4kb33o
EMAILJS_TEMPLATE_ID=template_4sdswol
EMAILJS_PUBLIC_KEY=VWeA_NMi3haSG5ANp
EMAILJS_PRIVATE_KEY=9AQ59AcLzL8RobMqtrQ7j
```

### `.env.local` (Local Development)
Same as `.env` - used by Bun/Node for local testing

### `.lovable/local.env` (Lovable IDE)
Same as `.env` - used by Lovable development environment

### Security Notes
- ✅ Private key only used server-side (never exposed to client)
- ✅ Public key used for template identification only
- ✅ EmailJS credentials are application-specific (not reusable elsewhere)
- ⚠️ Never commit real env files to public repositories
- ✅ Use GitHub Secrets for deployment

---

## 🚀 How to Run

### Development
```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Server runs on: http://localhost:8081/
```

### Build
```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

### Lint & Format
```bash
# Run ESLint
bun run lint

# Format code with Prettier
bun run format
```

---

## 📝 Key Files Modified/Created

| File | Purpose | Status |
|------|---------|--------|
| `src/lib/contact-server.ts` | EmailJS integration | ✅ Complete |
| `src/components/portfolio/Contact.tsx` | Contact form UI | ✅ Complete |
| `src/components/portfolio/MusicPlayer.tsx` | Music player component | ✅ Complete |
| `.env` | Production env vars | ✅ Configured |
| `.env.local` | Development env vars | ✅ Configured |
| `.lovable/local.env` | Lovable IDE env vars | ✅ Configured |

---

## 🧪 Testing

### Contact Form
1. Navigate to http://localhost:8081/
2. Scroll to "Hire Me" section
3. Fill form with test data
4. Click "Send Message"
5. Check email at `uzairy099@gmail.com`

**Expected Behavior:**
- Form validates all fields
- Shows loading spinner while sending
- Shows success message
- Email arrives with all form data

### Music Player
1. Click music button (bottom-left corner)
2. Listen for music
3. Click again to pause
4. Verify volume at 40%

---

## ⚠️ Known Limitations

1. **File Attachments:** EmailJS REST API doesn't support actual file attachments. File info is sent as text only.
   - **Workaround:** Users can upload to cloud storage and send link, or recipient can request file separately.

2. **Email Recipient:** Currently hardcoded to `uzairy099@gmail.com`. To change:
   - Update EmailJS template recipient
   - Or modify `src/lib/contact-server.ts`

3. **Form Attachment Size:** Limited to 5MB (EmailJS limitation)

---

## 🔄 Deployment

### Cloudflare Workers (Current Target)
```bash
# Build for Cloudflare
bun run build

# Output in .output/server/ ready for deployment
```

### Environment Variables for Deployment
Set these in your deployment platform (GitHub Actions, Cloudflare, etc.):
```
EMAILJS_SERVICE_ID
EMAILJS_TEMPLATE_ID
EMAILJS_PUBLIC_KEY
EMAILJS_PRIVATE_KEY
```

---

## 📊 Performance

- **Framework:** TanStack Start (optimized for islands architecture)
- **Bundle Size:** Minimized via Vite
- **Code Splitting:** Automatic route-based splitting
- **Server Functions:** Streamed server-side rendering
- **Animations:** GPU-accelerated (Framer Motion + GSAP)

---

## 🛡️ Security

- ✅ Server-side form validation
- ✅ Private API keys never exposed to client
- ✅ CORS handled by EmailJS
- ✅ File type validation
- ✅ File size limits
- ✅ Email validation regex
- ✅ ARIA labels and accessibility features
- ✅ No sensitive data in client code

---

## 📞 Contact Form Workflow

```
┌─────────────────────┐
│  User fills form    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Client-side validat │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Send to server fn  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│Server-side validat  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Call EmailJS API   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Email to Gmail     │
└─────────────────────┘
```

---

## 🎯 Next Steps / Future Enhancements

1. **File Attachments:** Implement cloud storage (AWS S3, Google Cloud Storage) for actual file uploads
2. **Email Templates:** Add more email templates (confirmation, follow-up)
3. **Rate Limiting:** Add rate limiting to prevent spam
4. **Notifications:** Discord/Slack webhook for instant notifications
5. **Analytics:** Track form submissions, page views
6. **Testing:** Add unit and integration tests
7. **CI/CD:** Automated testing and deployment pipeline
8. **Monitoring:** Error tracking with Sentry

---

## 🔗 Links

- **GitHub:** [Uzair Portfolio](https://github.com/uzair0100/uzair-portfolio)
- **Live Site:** [uzairyounis.com](https://uzairyounis.com)
- **EmailJS Docs:** https://www.emailjs.com/docs/
- **TanStack Start Docs:** https://tanstack.com/start/latest

---

## 👤 Author

**Uzair Younis**
- Email: `uzairy099@gmail.com`
- GitHub: `uzair0100`
- LinkedIn: `linkedin.com/in/uzair-younis-347438364/`

---

## 📄 License

MIT License - Feel free to use this as a template for your portfolio!

---

**Generated:** July 31, 2026
**Last Maintained:** July 31, 2026
