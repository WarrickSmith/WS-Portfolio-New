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
      'A card-based portfolio experience built to present selected projects, proof-linked skills, and a direct path to contact in a single polished frontend.',
    keyFeatures: [
      'Five-card landing layout with animated overlay expansions.',
      'Cross-card proof navigation that links About skills directly to Portfolio projects.',
      'Dockerized deployment with GitHub Actions publishing to a private registry.',
    ],
    techStack: [
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Framer Motion',
      'Webpack 5',
    ],
    liveDemoUrl: 'https://warricksmith.com',
    githubUrl: 'https://github.com/WarrickSmith/WS-Portfolio-New',
    image: portfolioImage,
    imageAlt:
      'WS Portfolio landing page showing the five-card layout and dark visual theme.',
  },
  {
    id: 'music-manager',
    title: 'Music Manager',
    summary:
      'A full-stack Ice Figureskating competition music management app for organising tracks, artists, and media assets through authenticated workflows backed by Appwrite.',
    keyFeatures: [
      'Appwrite authentication, database, and storage integrated into the core workflow.',
      'Next.js App Router implementation with server actions handling mutations.',
      'Dashboard-driven library management for content-heavy music administration tasks.',
    ],
    techStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Appwrite',
      'Server Actions',
    ],
    liveDemoUrl: 'https://mm.warricksmith.com',
    githubUrl: 'https://github.com/WarrickSmith/music-manager',
    image: musicManagerImage,
    imageAlt:
      'Music Manager dashboard showing the application interface for managing music content and assets.',
  },
  {
    id: 'race-day',
    title: 'RaceDay',
    summary:
      'A live race-day dashboard focused on surfacing event data, odds, and rapid updates in a streamlined interface for real-time monitoring.',
    keyFeatures: [
      'Live polling pipeline for race updates and changing market data.',
      'Appwrite-backed data and cloud-function workflows supporting the dashboard.',
      'Fast race-day views tuned for scanning multiple active events at once.',
    ],
    techStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Appwrite',
      'NZ TAB API',
    ],
    liveDemoUrl: 'https://raceday.wsapz.com',
    githubUrl: 'https://github.com/WarrickSmith/raceday',
    image: raceDayImage,
    imageAlt:
      'RaceDay dashboard displaying race listings, event details, and live market information.',
  },
]

export default portfolioData
