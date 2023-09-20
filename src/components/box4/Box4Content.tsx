import styled from 'styled-components'
import CardHeader from '../common/CardHeader'
import BulletPoints from '../common/BulletPoints'
import portfolioData from '../../data/portfolioData'

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Box4Content = () => {
  return (
    <>
      <CardHeader words={['My', 'Portfolio']} icon={'faSuitcase'} />
      <ImageContainer>
        {portfolioData.map((data) => (
          <BulletPoints
            key={data.title}
            href={data.href}
            title={data.title}
            points={data.points}
            image={data.image}
            target="_blank"
          />
        ))}
      </ImageContainer>
    </>
  )
}


export default Box4Content
