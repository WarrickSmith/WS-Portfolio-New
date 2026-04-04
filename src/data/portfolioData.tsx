import portfolioImage from '../assets/ws-portfolio.jpg?url'
import musicManagerImage from '../assets/music-manager.jpg?url'
import raceDayImage from '../assets/raceday.png?url'

export type PortfolioProjectId = 'portfolio-site' | 'music-manager' | 'race-day'

export interface PortfolioProject {
  id: PortfolioProjectId
  href: string
  title: string
  points: string[]
  image: string
}

const portfolioPoints = [
  'Personal Website',
  'React, Typescript',
  'Styled Components, CSS, Framer-Motion',
  'Javascript, Webpack',
]

const musicManagerPoints = [
  'Music Manager App',
  'Next.js 15.2.4, React 19, Node 22.14.0',
  'Appwrite Auth, Database & Storage',
  'Server Actions',
]

const raceDayPoints = [
  'RaceDay Dashboard',
  'Next.js 15+, React 19, TypeScript',
  'Appwrite Cloud Functions & Database',
  'Live polling with NZ TAB API',
]

const portfolioData: PortfolioProject[] = [
  {
    id: 'portfolio-site',
    href: 'https://warricksmith.com',
    title: 'Portfolio Project',
    points: portfolioPoints,
    image: portfolioImage,
  },
  {
    id: 'music-manager',
    href: 'https://mm.warricksmith.com',
    title: 'Music Manager Project',
    points: musicManagerPoints,
    image: musicManagerImage,
  },
  {
    id: 'race-day',
    href: 'https://raceday.wsapz.com',
    title: 'RaceDay Project',
    points: raceDayPoints,
    image: raceDayImage,
  },
]

export default portfolioData
