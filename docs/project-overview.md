# WS-Portfolio-New — Project Overview

## Executive Summary

WS-Portfolio-New is a personal portfolio website for Warrick Smith, a full-stack developer based in Auckland, New Zealand. The site showcases professional experience, education, skills, and portfolio projects through an interactive card-based grid layout. It is a React/TypeScript rewrite of a former PHP portfolio site.

**Live URL:** [warricksmith.com](https://warricksmith.com)

## Purpose

- Present professional profile, experience, and skills
- Showcase portfolio projects with links to live demos and GitHub repos
- Provide a contact form for prospective employers and collaborators
- Track visitor activity via email notifications (privacy-compliant)

## Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| UI Framework | React + ReactDOM | 19.2.3 |
| Language | TypeScript | 5.9.2 (strict mode) |
| Build Tool | Webpack | 5.101.0 |
| Styling | styled-components | 6.1.19 |
| Animation | Framer Motion | 12.23.12 |
| Icons | FontAwesome | 6.4.2 |
| Email Service | @emailjs/browser | 3.11.0 |
| Spam Protection | react-google-recaptcha | 3.1.0 |
| Runtime | Node.js Alpine | 22.x |
| Static Server | serve | latest |

## Architecture Overview

- **Type:** Single-page application (SPA) — monolith
- **Pattern:** Card-based grid layout with modal expansion
- **State Management:** Local component state only (`useState`)
- **Styling:** styled-components with CSS variables and Framer Motion
- **Deployment:** Docker container (Node.js 22 Alpine) serving static files on port 3000
- **Hosting:** Behind Nginx Proxy Manager via Portainer

## Repository Structure

- **Repository Type:** Monolith
- **Primary Language:** TypeScript
- **License:** MIT
- **GitHub:** [github.com/WarrickSmith/ws-portfolio-new](https://github.com/WarrickSmith/ws-portfolio-new)

## Key Features

1. **Interactive Card Grid** — 3x2 grid (desktop) with hover effects and neon glow animations
2. **Modal Card Expansion** — Cards 3-5 expand into full-screen overlays with smooth Framer Motion transitions
3. **About Me Section** (Card 3) — Personal info, experience timeline, education, skills, and learning adaptability
4. **Portfolio Section** (Card 4) — Project showcase with image hover-to-details animation
5. **Contact Form** (Card 5) — EmailJS-powered contact form with reCAPTCHA protection
6. **Visitor Tracking** — Automatic IP geolocation and email notifications with 5-minute rate limiting
7. **Responsive Design** — Breakpoints at 768px and 1000px; Card 1 (background image) hidden on mobile
