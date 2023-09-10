import styled, { css } from 'styled-components'
import CardHeader from '../common/CardHeader'
import FaIcon from '../common/FaIcon'

const Box3Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
  grid-template-rows: auto;
  justify-content: center;
  align-items: flex-start;
  padding: 1.5rem;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  h3 {
    font-size: var(--fs-sm);
    color: var(--color-alt);
    font-weight: 500;
    margin-top: 0;
  }

  p {
    font-size: var(--fs-xsm);
    color: var(--color);
    font-weight: 400;
    margin: 0 0 1rem 0;
  }
`
const MainText = styled.div`
  grid-column: span 3;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1300px) {
    grid-column: span;
  }
  @media (max-width: 768px) {
    grid-column: span 1;
  }
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  .fa-icon {
    margin: 0 0.5rem 1rem 0;
  }
`

const Box3Content = () => {
  return (
    <>
      <CardHeader words={['About', 'Me']} icon={'faIdCard'} />
      <Box3Container>
        <MainText>
          <FlexContainer>
            <FaIcon icon={'faUser'} className="fa-icon" />
            <h3>PERSONAL INFORMATION</h3>
          </FlexContainer>
          <p>
            I am a Full Stack Web Developer based in Auckland, New Zealand. My
            passion is for all things technology and I am a continous learner.
          </p>
        </MainText>
        <p>Stuff</p>
        <p>Stuff</p>
        <p>Stuff</p>
        <p>Stuff</p>
        <p>Stuff</p>
      </Box3Container>
    </>
  )
}

export default Box3Content
