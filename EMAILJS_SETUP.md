# EmailJS Setup Guide

## What I've Done

### 1. ✅ Replaced Resend with EmailJS
- Removed Resend dependency from `src/lib/contact-server.ts`
- Implemented EmailJS API integration using fetch (no need for external library)
- Updated environment variables in `.lovable/local.env`

### 2. ✅ Fixed Music Player
- Updated `src/components/portfolio/MusicPlayer.tsx` to use local file instead of CDN asset
- Music player now references: `/Pharrell Williams - Happy (Official Video).mp3`
- File is already in: `public/Pharrell Williams - Happy (Official Video).mp3`

### 3. ✅ Updated Favicon
- Favicon file located at: `public/favicon.png` (already in place)

---

## EmailJS Configuration Steps

You need to complete these setup steps for the contact form to work:

### Step 1: Get Your Service ID
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Email Services**
3. Add Gmail or create a new email service
4. Copy your **Service ID** (looks like: `service_xxxxx`)
5. Update in `.lovable/local.env`:
   ```
   EMAILJS_SERVICE_ID=service_xxxxx
   ```

### Step 2: Verify Template ID
✅ Already added to `.lovable/local.env`:
```
EMAILJS_TEMPLATE_ID=template_33drmlyno
```

### Step 3: Get Your Public Key
✅ Already added to `.lovable/local.env`:
```
EMAILJS_PUBLIC_KEY=KrIY0Q2p5Hu3Udaja
```

### Step 4: Get Your Private Key (for server-side)
1. In EmailJS Dashboard, go to **Account → API Keys**
2. Copy your **Private Key**
3. Update in `.lovable/local.env`:
   ```
   EMAILJS_PRIVATE_KEY=your_private_key_here
   ```

---

## Template Setup in EmailJS

Your EmailJS template should have these variables:

| Variable | Description |
|----------|-------------|
| `{{to_email}}` | Recipient email (uzairy099@gmail.com) |
| `{{from_name}}` | Client name |
| `{{from_email}}` | Client email (for reply-to) |
| `{{project_type}}` | Project type selected |
| `{{budget}}` | Budget range selected |
| `{{details}}` | Project details text |
| `{{file_info}}` | File attachment info (if any) |

### Sample Template HTML
```html
<h2>New Project Inquiry from {{from_name}}</h2>

<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Project Type:</strong> {{project_type}}</p>
<p><strong>Budget:</strong> {{budget}}</p>

<h3>Details:</h3>
<p>{{details}}</p>

{{#if file_info}}
<p><strong>📎 {{file_info}}</strong></p>
{{/if}}
```

---

## Updated .lovable/local.env

```env
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=template_33drmlyno
EMAILJS_PUBLIC_KEY=KrIY0Q2p5Hu3Udaja
EMAILJS_PRIVATE_KEY=your_private_key
```

---

## Testing

1. Fill out the contact form
2. Submit with a test message
3. Emails should arrive at **uzairy099@gmail.com**
4. Music button should appear in bottom-left (click to play/pause)

---

## File Locations

- **Contact Server**: `src/lib/contact-server.ts`
- **Music Player**: `src/components/portfolio/MusicPlayer.tsx`
- **Audio File**: `public/Pharrell Williams - Happy (Official Video).mp3` (3.72 MB)
- **Favicon**: `public/favicon.png`
- **Environment**: `.lovable/local.env`

---

## Notes

- EmailJS handles file attachments differently than Resend. Currently, file info is sent as text. If you need actual file attachments, let me know and I'll update it.
- The music player gracefully handles if the audio file is missing (button won't appear)
- All form validation remains the same
- Reply-to is automatically set to the client's email

Let me know if you hit any issues! 🚀
