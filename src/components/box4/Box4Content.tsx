import styled from 'styled-components'
import image1 from '../../assets/reservationizr.jpg'
import image2 from '../../assets/raceday.jpg'
import image3 from '../../assets/cat_couture.jpg'
import CardHeader from '../common/CardHeader'
import { motion } from 'framer-motion'

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

const Card = styled(motion.a)`
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &::before {
    content: attr(data-title);
    position: absolute;
    top: 100%;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background-color: orange;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--fs-med);
    transition: top 0.5s ease-in-out;
    transform: translateY(100%);
  }

  &:hover::before {
    top: -10px;
    transform: translateY(0%);
  }

  &:not(:hover)::before {
    background-color: transparent;
    color: transparent;
  }
`


const Box4Content = () => {
  return (
    <>
      <CardHeader words={['My', 'Portfolio']} icon={'faSuitcase'} />
      <ImageContainer>
        <Card
          href="https://warricksmith.com/reservationizr"
          data-title="Reservationizr"
        >
          <AppImage src={image1} />
        </Card>
        <Card href="https://warricksmith.com/raceday" data-title="Raceday">
          <AppImage src={image2} />
        </Card>
        <Card
          href="https://warricksmith.com/catcouture/"
          data-title="Cat Couture"
        >
          <AppImage src={image3} />
        </Card>
      </ImageContainer>
    </>
  )
}

export default Box4Content
