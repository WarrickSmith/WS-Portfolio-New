# User Stories: Portfolio Refactor

## MVP Features

### User Story 1: Privacy Content Scrub

- **As a** site owner,
- **I want** all personal contact information (phone number, specific address, social media links) and my downloadable CV removed from the website,
- **so that** I can protect my privacy and prevent unsolicited contact.

**Acceptance Criteria:**

- Given the website is loaded,
- When I inspect the page content and source code,
- Then there must be no phone number, specific street address, or social media links present.
- And there must be no link to download a CV.

### User Story 2: Consolidated Skills Summary

- **As a** recruiter,
- **I want** to view a single, consolidated summary of the candidate's skills, experience, and core competencies,
- **so that** I can quickly assess their suitability for a range of technical and IT-related roles without needing to navigate multiple sections.

**Acceptance Criteria:**

- Given the website is loaded,
- When I view the main content area,
- Then the previous "Experience," "Education," and "Skills" sections are no longer present.
- And they are replaced by a single, unified summary section.

### User Story 3: Visitor Email Notification

- **As a** site owner,
- **I want** to automatically receive an email notification containing publicly available visitor data (IP-based geolocation, timestamp, user-agent, `whois` info) whenever the main page is loaded,
- **so that** I can gain insight into who is viewing my portfolio and correlate this traffic with my job application activities.

**Acceptance Criteria:**

- Given the system is live,
- When a visitor loads the main page,
- Then an email is immediately sent to the owner's specified address.
- And the email subject line is exactly `*ALERT - PROFILE SITE VISITED`.
- And the email body contains the visitor's IP-based geolocation, timestamp, user-agent, and `whois` information.

### User Story 4: Retain Contact Form

- **As a** recruiter or hiring manager,
- **I want** to be able to use the existing contact form to send a message,
- **so that** I have a clear and simple way to initiate contact after reviewing the portfolio.

**Acceptance Criteria:**

- Given a visitor is on the website,
- When they navigate to the contact section,
- Then they can successfully fill out and submit the contact form.
- And a test submission is successfully received at the owner's specified email address.
