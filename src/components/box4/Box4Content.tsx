import styled from 'styled-components'
import CardHeader from '../common/CardHeader'
import BulletPoints from '../common/BulletPoints'
import portfolioData from '../../data/portfolioData'
import sendEmail from '../common/sendEmail'
import FaIcon from '../common/FaIcon'

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

const ActionButton = styled.a`
  display: inline-block;
  color: var(--color);
  background-color: var(--color-alt);
  text-align: center;
  padding: 1rem;
  font-size: var(--fs-xsm);
  font-weight: 500;
  text-decoration: none;
`
const Box4Content = () => {
  return (
    <>
      <CardHeader words={['My', 'Portfolio']} icon={'faSuitcase'} />
      <ImageContainer>
        <ActionButton
          href={'https://github.com/WarrickSmith?tab=repositories'}
          target="_blank"
          onClick={() => sendEmail('github')}
        >
          {`VIEW MY REPOS ON GITHUB' ${'\u00A0'}`} <FaIcon icon={'faGithub'} />
        </ActionButton>
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
