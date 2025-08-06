# Visitor Email Notification Testing Guide

## Pre-Testing Setup

### 1. Environment Variables

Ensure the following environment variables are set in your `.env` file:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 2. EmailJS Template Setup

- [ ] Create template in EmailJS dashboard using the configuration from `docs/email-templates/visitor-notification-template.md`
- [ ] Verify template variables match exactly: `visitor_ip`, `visitor_city`, `visitor_region`, `visitor_country`, `visit_time`, `visit_time_formatted`, `user_agent`
- [ ] Test template with sample data

## Testing Checklist

### Unit Tests

#### 1. Type Definitions

- [ ] Verify `VisitorGeolocation` interface has all required fields
- [ ] Verify `VisitorData` interface structure
- [ ] Verify `EmailJSParams` interface matches template variables

#### 2. Geolocation Service

- [ ] Test successful geolocation fetch
- [ ] Test error handling with fallback data
- [ ] Test network failure scenarios
- [ ] Verify response structure matches `VisitorGeolocation`

#### 3. useVisitorTracker Hook

- [ ] Test rate limiting (5-minute window)
- [ ] Test localStorage key generation
- [ ] Test EmailJS integration
- [ ] Test error states
- [ ] Test loading states

#### 4. VisitorTracker Component

- [ ] Verify component renders null (non-visual)
- [ ] Test component mounting triggers tracking
- [ ] Test development mode logging

### Integration Tests

#### 1. End-to-End Flow

1. [ ] Clear browser localStorage
2. [ ] Visit portfolio
3. [ ] Verify geolocation API call
4. [ ] Verify EmailJS email sent
5. [ ] Verify rate limiting prevents duplicate emails within 5 minutes
6. [ ] Verify second visit after 5 minutes triggers new email

#### 2. Browser Compatibility

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

#### 3. Network Conditions

- [ ] Fast connection
- [ ] Slow connection
- [ ] Offline (should gracefully degrade)
- [ ] API failures (ipapi.co down)

### Manual Testing Steps

#### 1. Local Development

```bash
# Start development server
npm run dev

# Open browser console to see debug logs
# Visit http://localhost:5173
```

#### 2. Verify Console Output

Expected console logs in development mode:

```
VisitorTracker Status: {isLoading: true, error: null, isRateLimited: false}
VisitorTracker Status: {isLoading: false, error: null, isRateLimited: false}
```

#### 3. Check Email Delivery

- [ ] Check email inbox for notification
- [ ] Verify all template variables populated correctly
- [ ] Verify email formatting

#### 4. Rate Limiting Test

1. [ ] Visit portfolio
2. [ ] Wait for email
3. [ ] Refresh page within 5 minutes
4. [ ] Verify no second email sent
5. [ ] Clear localStorage or wait 5+ minutes
6. [ ] Visit again and verify new email sent

### Error Scenarios

#### 1. Missing Environment Variables

- [ ] Remove VITE_EMAILJS_SERVICE_ID - should log error
- [ ] Remove VITE_EMAILJS_TEMPLATE_ID - should log error
- [ ] Remove VITE_EMAILJS_PUBLIC_KEY - should log error

#### 2. Invalid EmailJS Configuration

- [ ] Use invalid service ID - should handle gracefully
- [ ] Use invalid template ID - should handle gracefully
- [ ] Use invalid public key - should handle gracefully

#### 3. Geolocation API Failure

- [ ] Block ipapi.co requests - should use fallback data
- [ ] Verify fallback data structure

### Performance Testing

#### 1. Load Time Impact

- [ ] Measure page load time without VisitorTracker
- [ ] Measure page load time with VisitorTracker
- [ ] Verify no blocking behavior

#### 2. Memory Usage

- [ ] Check for memory leaks in useEffect
- [ ] Verify localStorage cleanup

### Privacy Compliance Testing

#### 1. GDPR Compliance

- [ ] Verify no PII stored
- [ ] Verify no cookies used
- [ ] Verify IP address not persisted

#### 2. CCPA Compliance

- [ ] Verify no personal information sold/shared
- [ ] Verify no persistent tracking

### Debug Mode

Enable debug mode by adding to `.env`:

```bash
VITE_DEBUG_VISITOR_TRACKING=true
```

This will add additional console logging for troubleshooting.

### Troubleshooting Common Issues

#### 1. No Email Received

- [ ] Check spam folder
- [ ] Verify EmailJS service configuration
- [ ] Check browser console for errors
- [ ] Verify environment variables

#### 2. Rate Limiting Not Working

- [ ] Check localStorage for `visitorTracker_lastVisit` key
- [ ] Verify timestamp format
- [ ] Check if localStorage is disabled

#### 3. Geolocation Data Missing

- [ ] Check ipapi.co service status
- [ ] Verify network connectivity
- [ ] Check browser dev tools network tab

### Production Testing

#### 1. Build and Deploy

```bash
npm run build
npm run preview
```

#### 2. Verify in Production

- [ ] Test on deployed URL
- [ ] Verify HTTPS requirements
- [ ] Check CSP headers if applicable

### Test Results Template

```
Test Date: [YYYY-MM-DD]
Test Environment: [local/staging/production]
Browser: [browser and version]
Test Results:
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual tests pass
- [ ] Email delivery successful
- [ ] Rate limiting works
- [ ] Error handling works
- [ ] Privacy compliance verified

Issues Found:
[List any issues discovered]

Notes:
[Additional observations]
```
