# EmailJS Credentials Issue

## Current Problem
Getting `403 Forbidden` error from EmailJS API with credentials:
- Service ID: `service_r7njwzo`
- Template ID: `template_33drmlyno`
- Public Key: `U1BblSYSqzcjWm3RO`

## What You Need to Do

### Step 1: Verify Your EmailJS Account
Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/) and:

1. **Check Email Service**:
   - Click "Email Services" on the left
   - Is `service_r7njwzo` listed there?
   - If not, what's the correct Service ID?

2. **Check Template**:
   - Click "Email Templates"
   - Is `template_33drmlyno` listed there?
   - If not, what's the correct Template ID?

3. **Check API Keys**:
   - Click "Account" → "API Keys"
   - What is your **Public Key** (the long alphanumeric string)?
   - Current value: `U1BblSYSqzcjWm3RO` (correct?)

### Step 2: Verify Your Template Has These Variables
Your EmailJS template must include these placeholder variables:

```
{{to_email}}
{{from_name}}
{{from_email}}
{{project_type}}
{{budget}}
{{details}}
{{file_info}}
{{reply_to}}
```

If your template doesn't have these exact names, the email won't send.

### Step 3: Update Files
Once you verify the correct credentials:

**File 1: `.env.local`**
```
EMAILJS_SERVICE_ID=your_actual_service_id
EMAILJS_TEMPLATE_ID=your_actual_template_id
EMAILJS_PUBLIC_KEY=your_actual_public_key
EMAILJS_PRIVATE_KEY=your_actual_private_key
```

**File 2: `.env`**
```
EMAILJS_SERVICE_ID=your_actual_service_id
EMAILJS_TEMPLATE_ID=your_actual_template_id
EMAILJS_PUBLIC_KEY=your_actual_public_key
EMAILJS_PRIVATE_KEY=your_actual_private_key
```

**File 3: `.lovable/local.env`**
```
EMAILJS_SERVICE_ID=your_actual_service_id
EMAILJS_TEMPLATE_ID=your_actual_template_id
EMAILJS_PUBLIC_KEY=your_actual_public_key
EMAILJS_PRIVATE_KEY=your_actual_private_key
```

---

## Troubleshooting

### Error: 403 Forbidden
- Public Key is wrong
- Service ID doesn't exist
- Template ID doesn't exist

### Error: 400 Bad Request
- Template variables don't match (e.g., `{{from_name}}` vs `{{name}}`)
- Template doesn't exist

### Error: 401 Unauthorized
- Public Key is missing or invalid

---

## Quick Verification Command

Once you update credentials and restart dev server, test with:

```bash
bun run dev
# Then fill form and submit
# Check console for: ✅ Email sent successfully via EmailJS
```

