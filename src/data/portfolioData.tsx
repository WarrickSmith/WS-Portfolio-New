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
      'Five-card landing surface with animated overlay expansions and responsive content layouts.',
      'Cross-card proof navigation that jumps from About badges straight to relevant portfolio work.',
      'Docker deployment and GitHub Actions publishing aligned with the production container pipeline.',
    ],
    techStack: [
      'React 19',
      'TypeScript 6',
      'Tailwind CSS 4',
      'Framer Motion',
      'Webpack 5',
      'Docker',
    ],
    liveDemoUrl: 'https://warricksmith.com',
    githubUrl: 'https://github.com/WarrickSmith/WS-Portfolio-New',
    image: portfolioImage,
    imageAlt:
      'WS Portfolio landing page showing the five-card layout, dark visual theme, and expanded-content entry points.',
  },
  {
    id: 'music-manager',
    title: 'Music Manager',
    summary:
      'A competition music management app for ice skating events that lets competitors and admins manage uploads, grades, and music libraries through role-based workflows.',
    keyFeatures: [
      'Role-based competitor and admin experiences backed by Appwrite authentication and storage.',
      'Music file uploads, library organisation, and grade-aware competition management.',
      'Next.js App Router screens with form-driven admin tooling for content-heavy operations.',
    ],
    techStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Appwrite',
      'shadcn/ui',
      'React Hook Form',
    ],
    liveDemoUrl: 'https://mm.wsapz.com',
    githubUrl: 'https://github.com/WarrickSmith/music-manager',
    image: musicManagerImage,
    imageAlt:
      'Music Manager dashboard showing competition music administration, grade management, and upload workflows.',
  },
  {
    id: 'race-day',
    title: 'RaceDay',
    summary:
      'A live racing dashboard for monitoring meetings, race status, odds, and money flow with real-time updates surfaced from an Appwrite-backed data pipeline.',
    keyFeatures: [
      'Daily meeting imports and live NZ TAB race updates feed meeting and race views throughout the day.',
      'Dedicated race pages surface odds, pools, runners, and results in a scan-first layout.',
      'Adaptive polling and connection monitoring keep volatile race-day data current without overwhelming the UI.',
    ],
    techStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Appwrite',
      'Tailwind CSS',
      'NZ TAB API',
    ],
    liveDemoUrl: 'https://raceday.wsapz.com',
    githubUrl: 'https://github.com/WarrickSmith/raceday',
    image: raceDayImage,
    imageAlt:
      'RaceDay race view showing live odds, runners, and results panels for a harness race.',
  },
]

export default portfolioData
