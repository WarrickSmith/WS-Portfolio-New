import styled from 'styled-components'
import { motion } from 'framer-motion'
import image1 from '../../assets/reservationizr.jpg'
import image2 from '../../assets/raceday.jpg'
import image3 from '../../assets/cat_couture.jpg'
import image4 from '../../assets/ws-portfolio.jpg'
import CardHeader from '../common/CardHeader'
import BulletPoints from '../common/BulletPoints'

const bulletPoints1 = [
  'Bullet point 1',
  'Bullet point 2',
  'Bullet point 3',
  'Bullet point 4',
]

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ImageCard = styled(motion.a)`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 0.5rem;
`

const Box4Content = () => {
  return (
    <>
      <CardHeader words={['My', 'Portfolio']} icon={'faSuitcase'} />
      <ImageContainer>
        {/* <ImageCard
          href="http://localhost:3000"
          data-title="This Portfolio Website"
        > */}
        <BulletPoints title={'Title 1'} points={bulletPoints1} image={image4} />
        {/* </ImageCard> */}
        {/* <ImageCard
          href="https://warricksmith.com/reservationizr"
          data-title="Reservationizr"
        > */}
        <BulletPoints title={'Title 1'} points={bulletPoints1} image={image1} />
        {/* </ImageCard> */}
        {/* <ImageCard href="https://warricksmith.com/raceday" data-title="Raceday"> */}
        <BulletPoints title={'Title 1'} points={bulletPoints1} image={image2} />
        {/* </ImageCard> */}
        {/* <ImageCard
          href="https://warricksmith.com/catcouture/"
          data-title="Cat Couture"
        > */}
        <BulletPoints title={'Title 1'} points={bulletPoints1} image={image3} />
        {/* </ImageCard> */}
      </ImageContainer>
    </>
  )
}

export default Box4Content
