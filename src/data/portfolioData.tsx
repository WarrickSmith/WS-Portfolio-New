import image1 from '../assets/reservationizr-img.jpg?url'
import image4 from '../assets/ws-portfolio.jpg?url'
import image6 from '../assets/tic-tac-toe.jpg?url'
import image7 from '../assets/music-manager.jpg?url'
import image8 from '../assets/raceday.png?url'

const portfolioPoints = [
  'Personal Website',
  'React, Typescript',
  'Styled Components, CSS, Framer-Motion',
  'Javascript, Webpack',
]

const reservationizrPoints = [
  'Restaurant Reservations',
  'MERN Stack',
  'Jest, Supertest',
  'Auth0',
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

const ticTacToePoints = [
  'Tic Tac Toe App',
  'Next.js 15.2.4',
  'React 19, Node 22.14.0',
  'Google Gemini 2.0 Pro API',
]

const portfolioData = [
  {
    href: 'https://warricksmith.com',
    title: 'Portfolio Project',
    points: portfolioPoints,
    image: image4,
  },
  {
    href: 'https://warricksmith.com/reservationizr',
    title: 'Reservations Project',
    points: reservationizrPoints,
    image: image1,
  },
  {
    href: 'https://mm.warricksmith.com',
    title: 'Music Manager Project',
    points: musicManagerPoints,
    image: image7,
  },
  {
    href: 'https://raceday.wsapz.com',
    title: 'RaceDay Project',
    points: raceDayPoints,
    image: image8,
  },
  {
    href: 'https://ttt.warricksmith.com',
    title: 'Tic Tac Toe Project',
    points: ticTacToePoints,
    image: image6,
  },
]

export default portfolioData
