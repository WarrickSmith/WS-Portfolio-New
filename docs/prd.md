# Product Requirements Document: Portfolio Refactor

## 1. Introduction

This document outlines the requirements for the strategic overhaul of a personal portfolio website. The goal is to transform the site from a static, developer-focused resume into a dynamic, privacy-conscious career tool that appeals to a broader range of technology roles.

### 1.1. Problem Statement

The current portfolio over-exposes sensitive personal information, creating privacy risks. Its content is too narrowly focused on specific technologies, limiting its appeal for diverse roles like technical support or data analysis. Furthermore, it lacks any mechanism to track visitor engagement, making it impossible to correlate portfolio views with job application efforts.

## 2. Goals and Objectives

### 2.1. Business Objectives

- **Increase Privacy:** Significantly reduce the public exposure of sensitive personal information.
- **Broaden Career Appeal:** Reposition the portfolio to attract opportunities across a wider range of technology roles.
- **Gain Market Insight:** Establish a system to understand the source and nature of portfolio traffic.

### 2.2. Success Metrics

- **Visitor Notifications:** Receive at least 5 visitor notification emails per week during an active job search.
- **Interview Correlation:** Correlate at least 3 interview requests with preceding visitor notifications within a 3-month period.
- **Reduction in Unsolicited Contact:** Decrease non-relevant, unsolicited contact by 90%.

## 3. Target Audience

### 3.1. Primary User: Recruiters & Hiring Managers

- **Needs:** Quickly understand a candidate's core competencies, adaptability, and professionalism without wading through dense information.
- **Goals:** Efficiently create a shortlist of qualified candidates for an initial conversation.

## 4. Features and Requirements

### 4.1. MVP Scope

#### 4.1.1. Privacy Content Scrub

- **Requirement:** All instances of the downloadable CV, phone number, specific street address, and social media links must be removed from the website.

#### 4.1.2. Consolidated Skills Summary

- **Requirement:** The existing "Experience," "Education," and "Skills" sections will be replaced with a single, concise summary.
- **Details:** The summary will highlight adaptability, problem-solving, and key technical competencies, framed as a one-page CV for a general Developer or IT audience.

#### 4.1.3. Visitor Email Notification

- **Requirement:** An automated system will trigger an email to a specified address upon the main page loading.
- **Details:** The email will contain publicly available visitor information (IP-based geolocation, timestamp, user-agent, and a `whois` lookup on the IP).
- **Email Subject:** `*ALERT - PROFILE SITE VISITED`

#### 4.1.4. Retain Contact Form

- **Requirement:** The existing "Contact Me" email form will be preserved as the sole method for initiating contact.

### 4.2. Out of Scope for MVP

- User-facing prompts or cookie consent banners.
- A dashboard or UI to view visitor analytics.
- Detailed project pages or case studies.

## 5. Post-MVP Vision

- **Phase 2:** Develop a private analytics dashboard, implement A/B testing for content, and explore dynamic content personalization.
- **Long-term:** Evolve the portfolio into an intelligent, semi-automated career development platform.
