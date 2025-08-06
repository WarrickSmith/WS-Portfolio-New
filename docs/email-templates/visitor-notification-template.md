# EmailJS Template: Portfolio Visitor Notification

## Template Configuration

### Template Details

- **Service ID**: `YOUR_EMAILJS_SERVICE_ID`
- **Template ID**: `YOUR_EMAILJS_TEMPLATE_ID`
- **Template Name**: Portfolio Visitor Alert

### Template Variables

The following variables are passed from the application:

| Variable               | Description                   | Example                                        |
| ---------------------- | ----------------------------- | ---------------------------------------------- |
| `visitor_ip`           | Visitor's IP address          | `203.0.113.42`                                 |
| `visitor_city`         | City from geolocation         | `Auckland`                                     |
| `visitor_region`       | Region/state from geolocation | `Auckland`                                     |
| `visitor_country`      | Country from geolocation      | `New Zealand`                                  |
| `visit_time`           | ISO timestamp of visit        | `2024-08-06T10:15:31.349Z`                     |
| `visit_time_formatted` | Human-readable timestamp      | `Aug 6, 2024 at 10:15 AM NZST`                 |
| `user_agent`           | Browser user agent string     | `Mozilla/5.0 (Windows NT 10.0; Win64; x64)...` |

### Email Template HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio Visitor Alert</title>
  </head>
  <body
    style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;"
  >
    <div
      style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;"
    >
      <h1 style="color: white; margin: 0; font-size: 24px;">
        🎯 Portfolio Visitor Alert
      </h1>
    </div>

    <div
      style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;"
    >
      <p style="font-size: 18px; margin-bottom: 20px;">
        Someone just visited your portfolio!
      </p>

      <div
        style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;"
      >
        <h3 style="margin-top: 0; color: #667eea;">📍 Location Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 30%;">
              City:
            </td>
            <td style="padding: 8px 0;">{{visitor_city}}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Region:</td>
            <td style="padding: 8px 0;">{{visitor_region}}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Country:</td>
            <td style="padding: 8px 0;">{{visitor_country}}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">IP Address:</td>
            <td
              style="padding: 8px 0; font-family: monospace; background: #f5f5f5; padding: 4px 8px; border-radius: 4px;"
            >
              {{visitor_ip}}
            </td>
          </tr>
        </table>
      </div>

      <div
        style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #764ba2;"
      >
        <h3 style="margin-top: 0; color: #764ba2;">⏰ Visit Details</h3>
        <p style="margin: 0;">
          <strong>Time:</strong> {{visit_time_formatted}}
        </p>
      </div>

      <div
        style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;"
      >
        <p>
          <strong>Note:</strong> This notification is sent for privacy-compliant
          visitor tracking. No personal data is stored.
        </p>
      </div>
    </div>
  </body>
</html>
```

### Plain Text Version

```
Portfolio Visitor Alert

Someone just visited your portfolio!

Location Details:
- City: {{visitor_city}}
- Region: {{visitor_region}}
- Country: {{visitor_country}}
- IP Address: {{visitor_ip}}

Visit Details:
- Time: {{visit_time_formatted}}

This notification is sent for privacy-compliant visitor tracking. No personal data is stored.
```

### EmailJS Dashboard Setup Instructions

1. **Log into EmailJS Dashboard**: https://dashboard.emailjs.com

2. **Create New Template**:

   - Click "Email Templates" → "Create New Template"
   - Template name: "Portfolio Visitor Alert"
   - Subject: "🎯 New Portfolio Visitor from {{visitor_city}}"

3. **Configure Email Content**:

   - Paste the HTML template above into the HTML content field
   - Paste the plain text version into the plain text field

4. **Set Template Variables**:

   - Ensure all variables listed in the table above are available
   - Variables are case-sensitive and must match exactly

5. **Test Template**:
   - Use the "Send Test Email" feature
   - Fill in sample data for all variables

### Security Notes

- No sensitive data is transmitted
- IP addresses are included for informational purposes only
- No cookies or tracking pixels are used
- Compliant with GDPR and CCPA regulations
