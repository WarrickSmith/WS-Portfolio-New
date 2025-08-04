# Project Brief: Portfolio Refactor

## Executive Summary

This project will strategically overhaul an existing personal portfolio to enhance personal privacy and broaden its appeal to a wider range of technology roles, including technical support and data analysis. The project involves removing detailed personal data (CV, phone number, specific address, social media) and replacing technology-specific lists with a consolidated summary that highlights adaptability, problem-solving, and rapid learning skills. A key feature will be a visitor notification system that captures publicly available data to provide insights into portfolio traffic, helping to correlate activity with recruitment and application efforts. The goal is to transform the website into a dynamic tool for career development that emphasizes versatile skills over a static list of technologies.

## Problem Statement

The current portfolio website is misaligned with modern career objectives. It over-exposes sensitive personal information (CV, contact details), creating privacy risks and attracting unsolicited contact. Its content is overly specific, focusing on a narrow set of technologies, which may not appeal to a broader range of roles like technical support or data analysis. Furthermore, it lacks any mechanism to provide feedback on who is viewing the portfolio, making it a static, passive asset. This leaves a significant gap in understanding which applications or networking efforts are driving engagement from potential employers.

## Proposed Solution

The proposed solution is to redevelop the portfolio into a streamlined, privacy-conscious, and adaptable career tool. This involves two main initiatives:

1.  **Content and Privacy Overhaul:** The site's content will be rewritten to de-emphasize specific technologies and instead highlight core competencies like rapid learning, adaptability, and cross-functional problem-solving. All downloadable documents (CV), direct contact details (phone), and superfluous personal information (specific address, social media links) will be removed to protect privacy.

2.  **Visitor Insights System:** A non-intrusive tracking system will be implemented. Upon a visitor landing on the homepage, the system will automatically send an email alert containing publicly available, non-personally identifiable information (e.g., IP-based geolocation, timestamp, user-agent). This provides valuable, passive intelligence for correlating portfolio views with job application activities without compromising visitor privacy.

This dual approach transforms the website from a static resume into a dynamic, secure platform for professional positioning.

## Target Users

### Primary User Segment: Recruiters & Hiring Managers

*   **Profile:** Professionals working for technology companies, recruitment agencies, or HR departments. They are tasked with identifying and vetting potential candidates for a variety of technical and tech-adjacent roles (e.g., Software Developer, Technical Support, Data Analyst, IT Project Coordinator).
*   **Behaviors & Workflows:** They are time-poor and scan dozens or hundreds of profiles daily. They typically spend less than a minute on a portfolio or resume, looking for quick signals of competence, professionalism, and fit. They use keywords, past job titles, and project summaries to quickly assess a candidate's potential.
*   **Needs & Pain Points:** They need to quickly understand a candidate's core skills and experience without wading through dense, irrelevant information. They are often frustrated by outdated or overly-specific resumes that don't map to their open roles. They value clear, concise communication and evidence of adaptability.
*   **Goals:** Their primary goal is to efficiently create a shortlist of qualified candidates who seem like a good fit for an initial conversation. They are looking for reasons to *include* a candidate, not exclude them.

## Goals & Success Metrics

### Business Objectives
*   **Increase Privacy:** Significantly reduce the public exposure of sensitive personal information on the portfolio website.
*   **Broaden Career Appeal:** Reposition the portfolio to attract opportunities across a wider range of technology roles, not just pure development.
*   **Gain Market Insight:** Establish a system to understand the source and nature of traffic to the portfolio, providing data to inform the job search strategy.

### User Success Metrics
*   Recruiters can determine core competencies and adaptability within 60 seconds of landing on the page.
*   The portfolio's content successfully piques the interest of hiring managers for roles other than just software development.

### Key Performance Indicators (KPIs)
*   **Visitor Notifications:** Receive at least 5 visitor notification emails per week during an active job search.
*   **Interview Correlation:** Successfully correlate at least 3 interview requests with preceding visitor notifications within a 3-month period.
*   **Reduction in Unsolicited Contact:** Decrease in non-relevant, unsolicited emails/calls by 90% compared to the previous portfolio version.

## MVP Scope

### Core Features (Must Have)
*   **Privacy Content Scrub:** All instances of the downloadable CV, phone number, specific street address, and social media links will be removed from the website.
*   **Consolidated Skills Summary:** The existing "Experience," "Education," and "Skills" sections/tabs will be removed and replaced with a single, concise summary that highlights adaptability, problem-solving, and key technical competencies.
*   **Visitor Email Notification:** An automated system will be implemented that, upon a page load of the main site, triggers an email to a specified address. This email will contain basic, publicly available visitor information.
*   **Retain Contact Form:** The existing "Contact Me" email form will be preserved and will serve as the sole method for visitors to initiate contact through the site.

### Out of Scope for MVP
*   User-facing prompts or cookie consent banners (initial implementation will focus on server-side data for the visitor notification).
*   A dashboard or UI to view visitor analytics (email is the sole delivery method for MVP).
*   Detailed project pages or case studies.

### MVP Success Criteria
The MVP will be considered successful when:
1.  A full review of the live website confirms all specified personal information has been removed.
2.  The new consolidated skills summary is live and replaces the old sections.
3.  A test visit to the homepage successfully and immediately triggers a correctly formatted visitor notification email.
4.  The "Contact Me" form is confirmed to be working by sending a test message.

## Post-MVP Vision

### Phase 2 Features
*   **Simple Analytics Dashboard:** Develop a private, web-based dashboard to view visitor analytics over time, allowing for filtering and sorting of the notification data without relying on email.
*   **A/B Testing Content:** Implement functionality to test different versions of the skills summary or project descriptions to see which ones generate more inbound contact.
*   **Dynamic Content Personalization:** Subtly tailor the content shown to a visitor based on their inferred industry or location (e.g., emphasizing financial tech experience if the visitor appears to be from a bank).

### Long-term Vision
*   Evolve the portfolio into an intelligent, semi-automated career development platform that actively helps in identifying and securing new opportunities by providing actionable insights on market trends and company interests.

### Expansion Opportunities
*   Integrate with a professional networking API (like LinkedIn) to enrich visitor data (with consent) to provide a fuller picture of who is viewing the profile.
*   Create a "smart" resume generator that builds a tailored PDF resume on the fly based on the requirements of a specific job description pasted into a form.

## Technical Considerations

### Platform Requirements
*   **Target Platforms:** Modern desktop and mobile web browsers (latest 2 versions of Chrome, Firefox, Safari, Edge).
*   **Performance Requirements:** The page should be lightweight and achieve a Google PageSpeed Insights score of 90+ for mobile.

### Technology Preferences
*   **Frontend:** Continue using the existing stack: React, TypeScript, and Vite. The current visual design, including layout, color scheme, and animations, will be preserved.
*   **Backend (for email notifications):** The existing serverless backend function and integrated third-party email service will be extended to handle the new visitor notification logic.
*   **Email Service:** No new service is required. The project will continue to use the existing, integrated email service for both the contact form and the new visitor alerts.

### Architecture Considerations
*   **Repository Structure:** The project will remain a monorepo containing the frontend application.
*   **Service Architecture:** The application will remain a Single Page Application (SPA). The frontend will be modified to call the backend API on page load to trigger the visitor notification email.
*   **Security/Compliance:** The contact form backend must include validation and sanitization. The visitor notification service must be designed to not log or store any personally identifiable information (PII).

## Constraints & Assumptions

### Constraints
*   **Budget:** This is a personal project with a budget of $0. All solutions must rely on free-tier services.
*   **Timeline:** The core MVP should be completed within one week.
*   **Technology:** The project must use the existing technology stack (React, TypeScript, Vite, existing serverless backend). No major new technologies or frameworks should be introduced.
*   **Design:** The existing visual design, branding, and animations must be maintained.

### Key Assumptions
*   The existing third-party email service's free tier is sufficient to handle the volume of both contact form submissions and new visitor notification emails.
*   It is technically feasible to gather meaningful, non-personally identifiable information about a visitor (like IP-based location, user agent) from the serverless backend environment without violating any service's terms of use.
*   The effort to refactor the content (removing personal info, creating the new summary) is minimal and can be done quickly.
*   The user has access to and can modify the existing backend service to add the new notification functionality.

## Risks & Open Questions

### Key Risks
*   **Visitor Data Quality:** The information obtainable from a simple page load (IP address, user agent) may be of low quality or misleading. VPNs can obscure location, and user agent strings can be generic. The value of this data for correlating with job applications might be lower than anticipated.
*   **Email Fatigue:** During an active job search, the volume of visitor notification emails could become overwhelming and create noise, making it difficult to spot meaningful signals.
*   **Content Generalization:** In making the content more general to appeal to a wider audience, it might become too vague to capture the interest of recruiters looking for specific, high-demand skills.

### Resolved Questions & Specifications
*   **Visitor Data Points:** The system should capture as many data points as possible, including a `whois` lookup on the visitor's IP address if feasible.
*   **Email Subject Line:** The notification email subject line will be `*ALERT - PROFILE SITE VISITED`.
*   **Skills Summary Guidance:** The new, consolidated skills summary should be conceptualized as a simple, one-page CV targeted at a general Developer or IT audience.
