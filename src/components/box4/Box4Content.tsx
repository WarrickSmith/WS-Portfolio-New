import styled from 'styled-components'
import image1 from '../../assets/reservationizr.jpg'
import image2 from '../../assets/raceday.jpg'
import image3 from '../../assets/cat_couture.jpg'
import CardHeader from '../common/CardHeader'

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-top: 4rem;
  }
`
const AppImage = styled.img`
  padding: 1rem;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 1.5rem;
  cursor: pointer;
`
const Box4Content = () => {
  return (
    <>
      <CardHeader words={['My', 'Portfolio']} icon={'faSuitcase'} />
      <ImageContainer>
        <a href="https://warricksmith.com/reservationizr">
          <AppImage src={image1} />
        </a>
        <a href="https://warricksmith.com/raceday">
          <AppImage src={image2} />
        </a>
        <a href="https://warricksmith.com/catcouture/">
          <AppImage src={image3} />
        </a>
      </ImageContainer>
    </>
  )
}

export default Box4Content
