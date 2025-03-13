import image1 from '../assets/reservationizr-img.jpg?url'
import image2 from '../assets/raceday-img.jpg?url'
import image3 from '../assets/cat_couture.jpg?url'
import image4 from '../assets/ws-portfolio.jpg?url'
import image5 from '../assets/raceday-api-img.jpg?url'
import image6 from '../assets/tic-tac-toe.png?url'
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

const racedayPoints = [
  'Live Racing Data',
  'MERN Stack',
  'Jest, Supertest',
  'MongoDB',
]

const racedayApiPoints = [
  'RaceDay API Definition',
  'Swagger UI Express Server',
  'OpenApi 3.0.1',
]

const musicManagerPoints = [
  'Music Manager App',
  'Nex.js 15.2, React 19, Node 22.14.0',
  'Appwrite Auth, Database & Storage',
  'Server Actions',
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
    href: 'https://warricksmith.com/raceday',
    title: 'RaceDay Project',
    points: racedayPoints,
    image: image2,
  },
  {
    href: 'https://warricksmith.com/server/',
    title: 'RaceDay API Spec',
    points: racedayApiPoints,
    image: image5,
  },
  {
    href: 'https://mm.warricksmith.com',
    title: 'Music Manager Project',
    points: musicManagerPoints,
    image: image7,
  },
]

export default portfolioData
