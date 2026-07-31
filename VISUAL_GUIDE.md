# 🎯 Visual Guide: Get Your EmailJS Credentials

## Where to Find Each Credential

### 1️⃣ Service ID & Template ID

Go to: **https://dashboard.emailjs.com/**

**To find Service ID:**
```
Dashboard → Email Services (left menu)
┌─────────────────────────────────┐
│ Your Services                   │
├─────────────────────────────────┤
│ • Gmail (service_r7njwzo) ← HERE │
│ • Outlook                       │
└─────────────────────────────────┘
```

**To find Template ID:**
```
Dashboard → Email Templates (left menu)
┌──────────────────────────────────┐
│ Your Templates                   │
├──────────────────────────────────┤
│ • Contact Form (template_33drmlyno) ← HERE │
│ • Newsletter                      │
└──────────────────────────────────┘
```

### 2️⃣ Public Key

Go to: **https://dashboard.emailjs.com/admin/account**

```
Account → API Keys
┌────────────────────────────────────────┐
│ API Keys                               │
├────────────────────────────────────────┤
│ Public Key: U1BblSYSqzcjWm3RO  ← COPY  │
│ Access Token: ••••••••••••••••         │
└────────────────────────────────────────┘
```

---

## Copy-Paste Template

Once you find your credentials, copy them here:

```
My Service ID:        _______________________________
My Template ID:       _______________________________
My Public Key:        _______________________________
My Private Key:       _______________________________
```

Then paste into all three files:
1. `.env`
2. `.env.local`
3. `.lovable/local.env`

---

## How It Works

```
User fills form → Submit
         ↓
Your Server reads .env files
         ↓
Calls EmailJS API with credentials
         ↓
EmailJS checks credentials (403 = wrong!)
         ↓
Email sent to uzairy099@gmail.com ✅
```

---

## Quick Checklist

- [ ] Logged into EmailJS Dashboard
- [ ] Found Service ID
- [ ] Found Template ID  
- [ ] Confirmed template has all required variables
- [ ] Copied Public Key
- [ ] Updated `.env` file
- [ ] Updated `.env.local` file
- [ ] Updated `.lovable/local.env` file
- [ ] Saved all files
- [ ] Ran `bun run dev`
- [ ] Tested contact form

---

## Template Variables Required

Your EmailJS template MUST have these exact variable names:

```
{{to_email}}        → Recipient (uzairy099@gmail.com)
{{from_name}}       → Visitor name
{{from_email}}      → Visitor email
{{project_type}}    → Project type
{{budget}}          → Budget range
{{details}}         → Project details
{{file_info}}       → File info (if attached)
{{reply_to}}        → Reply-to address
```

Example template body:
```html
<h2>New Project from {{from_name}}</h2>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Type:</strong> {{project_type}}</p>
<p><strong>Budget:</strong> {{budget}}</p>
<p><strong>Details:</strong></p>
<p>{{details}}</p>
{{#if file_info}}
<p><strong>File:</strong> {{file_info}}</p>
{{/if}}
```

