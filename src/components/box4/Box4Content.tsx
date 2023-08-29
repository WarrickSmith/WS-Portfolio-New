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

const AppImage = styled.img`
  padding: 1rem;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 1.5rem;
`

const ImageCard = styled(motion.a)`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 0.5rem;

  &::before {
    background-color: orange;
    color: var(--color);
    content: attr(data-title);
    position: absolute;
    top: 110%;
    left: 1rem;
    right: 0;
    bottom: 0;
    width: calc(100% - 2rem);
    height: calc(100% - 1rem);
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: var(--fs-med);
    transition: top 0.5s ease-in-out;
    border-radius: 0.5rem;
  }

  &:hover::before {
    color: var(--color);
    top: 1rem;
    transition: top 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
`

const Box4Content = () => {
  return (
    <>
      <CardHeader words={['My', 'Portfolio']} icon={'faSuitcase'} />
      <ImageContainer>
        <ImageCard
          href="http://localhost:3000"
          data-title="This Portfolio Website"
        >
          <AppImage src={image4} />
          <BulletPoints bulletPoints={bulletPoints1} />

        </ImageCard>
        <ImageCard
          href="https://warricksmith.com/reservationizr"
          data-title="Reservationizr"
        >
          <AppImage src={image1} />
          <BulletPoints bulletPoints={bulletPoints1} />
        </ImageCard>
        <ImageCard href="https://warricksmith.com/raceday" data-title="Raceday">
          <AppImage src={image2} />
          <BulletPoints bulletPoints={bulletPoints1} />
        </ImageCard>
        <ImageCard
          href="https://warricksmith.com/catcouture/"
          data-title="Cat Couture"
        >
          <AppImage src={image3} />
          <BulletPoints bulletPoints={bulletPoints1} />
        </ImageCard>
      </ImageContainer>
    </>
  )
}

export default Box4Content
