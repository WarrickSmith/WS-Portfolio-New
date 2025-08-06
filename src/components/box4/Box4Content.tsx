import styled from 'styled-components'
import CardHeader from '../common/CardHeader'
import BulletPoints from '../common/BulletPoints'
import portfolioData from '../../data/portfolioData'
import FaIcon from '../common/FaIcon'

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  grid-template-rows: auto;
  justify-content: center;
  padding: 1.5rem;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ActionButton = styled.a`
  color: var(--color);
  background-color: var(--color-alt);
  margin-top: 1rem;
  padding: 1rem;
  font-size: var(--fs-xsm);
  font-weight: 500;
  text-decoration: none;
`

const ProjectContainer = styled.div`
  display: grid;
`

const ProjectTitle = styled.h3`
  color: var(--color-alt);
  text-align: center;
  text-transform: uppercase;
  justify-self: center;
`

const Box4Content = () => {
  return (
    <>
      <CardHeader words={['My', 'Portfolio']} icon={'faSuitcase'} />
      <ActionContainer>
        <ActionButton
          href={'https://github.com/WarrickSmith?tab=repositories'}
          target="_blank"
        >
          {`VIEW MY REPOS ON GITHUB' ${'\u00A0'}`} <FaIcon icon={'faGithub'} />
        </ActionButton>
      </ActionContainer>
      <ImageContainer>
        {portfolioData.map((data, index) => (
          <ProjectContainer key={`${data.title}_${index}`}>
            <ProjectTitle>{data.title}</ProjectTitle>
            <BulletPoints
              key={data.title}
              href={data.href}
              title={data.title}
              points={data.points}
              image={data.image}
              target="_blank"
            />
          </ProjectContainer>
        ))}
      </ImageContainer>
    </>
  )
}

export default Box4Content
