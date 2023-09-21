import image1 from '../assets/reservationizr.jpg'
import image2 from '../assets/raceday.jpg'
import image3 from '../assets/cat_couture.jpg'
import image4 from '../assets/ws-portfolio.jpg'
import image5 from '../assets/raceday-api.jpg'

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

const catcouturePoints = [
  'Mock Web Store Front',
  'React, Node, Express',
  'PostgreSQL, Auth0',
  'Jest, Supertest',
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
    href: 'https://warricksmith.com/catcouture',
    title: 'Cat Couture Project',
    points: catcouturePoints,
    image: image3,
  },
]

export default portfolioData
