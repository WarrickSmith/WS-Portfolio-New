# External API Integration

### EmailJS API

- **Purpose:** Email delivery service for visitor notifications and contact form
- **Documentation:** https://www.emailjs.com/docs/
- **Base URL:** https://api.emailjs.com/api/v1.0/
- **Authentication:** Public key authentication (3HyPrrduysCbj5IZK)
- **Integration Method:** Direct browser integration via @emailjs/browser library

**Key Endpoints Used:**

- `POST /email/send` - Send visitor notification emails
- `POST /email/send-form` - Send contact form submissions

**Error Handling:** Console logging with graceful degradation for visitor tracking
