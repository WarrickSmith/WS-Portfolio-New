import portfolioImage from '../assets/ws-portfolio.png?url'
import musicManagerImage from '../assets/music-manager.png?url'
import raceDayImage from '../assets/raceday.png?url'

export type PortfolioProjectId = 'portfolio-site' | 'music-manager' | 'race-day'

export interface PortfolioProject {
  id: PortfolioProjectId
  title: string
  summary: string
  keyFeatures: string[]
  techStack: string[]
  liveDemoUrl: string
  githubUrl: string
  image: string
  imageAlt: string
}

const portfolioData: PortfolioProject[] = [
  {
    id: 'portfolio-site',
    title: 'WS Portfolio',
    summary:
      'A modern single-page portfolio that packages selected work, proof-linked skills, and contact details into a polished card-expansion experience built for a fast recruiter scan.',
    keyFeatures: [
      'Five-card desktop surface with a responsive mobile stack, animated overlay expansions, and cross-card proof navigation.',
      'Cross-card proof navigation that jumps from About badges straight to relevant portfolio work.',
      'Docker deployment and GitHub Actions publishing aligned with the production container pipeline.',
    ],
    techStack: [
      'React 19.2.4',
      'TypeScript 6.0.2',
      'Tailwind CSS 4.2.2',
      'Framer Motion 12.38.0',
      'Webpack 5.105.4',
      'EmailJS 4.4.1',
      'Docker / Node 24',
    ],
    liveDemoUrl: 'https://ws.wsapz.com',
    githubUrl: 'https://github.com/WarrickSmith/WS-Portfolio-New',
    image: portfolioImage,
    imageAlt:
      'WS Portfolio landing page showing the five-card desktop layout, dark visual theme, and expanded-content entry points.',
  },
  {
    id: 'music-manager',
    title: 'Music Manager',
    summary:
      'A competition music management app for ice skating events, refreshed onto Next.js 16, React 19, TypeScript 6, and Tailwind CSS 4.2 with a default dark theme and streamlined role-based workflows for competitors and admins.',
    keyFeatures: [
      'Role-based competitor and admin experiences backed by Appwrite auth, database, and storage services.',
      'Competition, grade, and music-library management with upload flows, metadata extraction, and standardised file naming.',
      'Default dark-theme UI with a persisted light/dark toggle across the landing page, auth screens, and dashboards.',
    ],
    techStack: [
      'Next.js 16.2.3',
      'React 19.2.5',
      'TypeScript 6.0.2',
      'Tailwind CSS 4.2.2',
      'Appwrite SDK 23.1.0',
      'React Hook Form 7.72.1',
      'Zod 4.3.6',
      'shadcn/ui + Radix UI',
    ],
    liveDemoUrl: 'https://mm.wsapz.com',
    githubUrl: 'https://github.com/WarrickSmith/music-manager',
    image: musicManagerImage,
    imageAlt:
      'Music Manager home page in the default dark theme, showing upload, organise, and preview feature panels.',
  },
  {
    id: 'race-day',
    title: 'RaceDay',
    summary:
      'A live racing dashboard for monitoring meetings, race status, odds, and money flow with real-time updates served through a Fastify + Next.js stack backed by PostgreSQL.',
    keyFeatures: [
      'TABNZ Affiliates API polling feeds a Fastify ingest pipeline that persists race state and money-flow history to PostgreSQL 18.',
      'Next.js 16 route handlers and same-origin SSE proxy routes surface meetings, race views, and livestream workflows.',
      'Adaptive polling, LISTEN/NOTIFY fan-out, and client connection monitoring keep volatile race-day data current without overwhelming the UI.',
    ],
    techStack: [
      'Next.js 16.2.1',
      'React 19.2.4',
      'TypeScript 6.0.2',
      'Tailwind CSS 4.2.2',
      'Fastify 5.8.4',
      'PostgreSQL 18',
      'Zod 4.3.6',
      'hls.js 1.6.15',
    ],
    liveDemoUrl: 'https://raceday.wsapz.com',
    githubUrl: 'https://github.com/WarrickSmith/raceday',
    image: raceDayImage,
    imageAlt:
      'RaceDay race view showing live odds, runners, and results panels for a harness race.',
  },
]

export default portfolioData
