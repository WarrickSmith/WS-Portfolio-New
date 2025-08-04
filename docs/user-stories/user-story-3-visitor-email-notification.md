# User Story 3: Visitor Email Notification

- **As a** site owner,
- **I want** to automatically receive an email notification containing publicly available visitor data (IP-based geolocation, timestamp, user-agent) whenever the main page is loaded,
- **so that** I can gain insight into who is viewing my portfolio and correlate this traffic with my job application activities.

**Acceptance Criteria:**

- Given the system is live,
- When a visitor loads the main page,
- Then an email is immediately sent to the owner's specified address.
- And the email subject line is exactly `*ALERT - PROFILE SITE VISITED`.
- And the email body contains the visitor's IP-based geolocation, timestamp, and user-agent information.
- And the data collection and notification process must be compliant with relevant privacy regulations (e.g., GDPR, CCPA), including provisions for user consent where applicable.
- And the email will be sent via a third-party email service to be specified during technical design.
