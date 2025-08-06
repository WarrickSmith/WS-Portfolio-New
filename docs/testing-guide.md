# Visitor Email Notification - Testing Guide

## 🧪 Quick Testing Steps

### 1. Reset Rate Limiting (Critical!)

The system has rate limiting enabled (5-minute window). To test immediately:

**Option A: Browser Dev Tools**

1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Find Local Storage → your site
4. Delete the key: `visitor_notification_sent`

**Option B: Console Command**

```javascript
localStorage.removeItem('visitor_notification_sent')
location.reload()
```

### 2. Enable Debug Mode

Update your `.env` file:

```bash
VITE_DEBUG_VISITOR_TRACKING=true
```

### 3. Check Console Logs

Open browser DevTools → Console tab. You should see:

- "Visitor tracking initialized"
- "Collecting visitor data..."
- "Sending visitor notification..."
- "Visitor notification sent successfully" (or error details)

### 4. Verify EmailJS Configuration

Check these environment variables match your EmailJS dashboard:

- `VITE_EMAILJS_SERVICE_ID` = your actual service ID
- `VITE_EMAILJS_TEMPLATE_ID` = your actual template ID
- `VITE_EMAILJS_PUBLIC_KEY` = your actual public key

### 5. Test Email Delivery

1. Clear localStorage (step 1)
2. Reload the page
3. Check your email (including spam folder)
4. Look for subject: "New Visitor Alert - BayBox Portfolio"

## 🔍 Troubleshooting

### Common Issues:

**No Email Received:**

- Check spam/junk folder
- Verify EmailJS template has correct "To Email" address
- Ensure template variables match exactly (case-sensitive)

**Console Shows "Rate limited":**

- Wait 5 minutes OR clear localStorage
- Check `localStorage.getItem('visitor_notification_sent')`

**"EmailJS configuration missing":**

- Restart dev server after `.env` changes
- Verify all 3 environment variables are set

**"Failed to collect visitor data":**

- Check internet connection
- Verify ipapi.co is accessible
- Check browser console for CORS errors

### Debug Commands:

```javascript
// Check current state
console.log('Rate limited:', localStorage.getItem('visitor_notification_sent'))
console.log('Environment:', {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
})

// Force test
localStorage.removeItem('visitor_notification_sent')
location.reload()
```

## ✅ Verification Checklist

- [ ] Email received at ws@baybox.co.nz
- [ ] Email contains visitor IP, location, and timestamp
- [ ] No duplicate emails within 5 minutes
- [ ] Console shows success messages
- [ ] No errors in browser console
- [ ] Template variables populated correctly

## 🔄 Continuous Testing

For ongoing testing, you can:

1. Use incognito/private browsing mode
2. Clear localStorage between tests
3. Test from different networks (mobile hotspot, VPN)
4. Verify location accuracy from different locations
