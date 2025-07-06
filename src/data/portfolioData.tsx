import image1 from '../assets/reservationizr-img.jpg?url'
import image4 from '../assets/ws-portfolio.jpg?url'
import image6 from '../assets/tic-tac-toe.jpg?url'
import image7 from '../assets/music-manager.jpg?url'

const portfolioPoints = [
  'Personal Website',
  'React, Typescript',
  'Styled Components, CSS, Framer-Motion',
  'Javascript, Vite',
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
    href: 'https://ttt.warricksmith.com',
    title: 'Tic Tac Toe Project',
    points: ticTacToePoints,
    image: image6,
  },
]

export default portfolioData