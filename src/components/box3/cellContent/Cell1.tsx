import sendEmail from '../../common/sendEmail'
import styled from 'styled-components'
import FaIcon from '../../common/FaIcon'
import resume from '../../../assets/WSmith_Technical_Resume_v4.pdf'

const ActionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`

const ActionButton = styled.a`
  color: var(--color);
  background-color: var(--color-alt);
  text-align: left;
  padding: 1rem;
  font-size: var(--fs-xsm);
  font-weight: 500;
  text-decoration: none;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    text-align: center;
  }
`
const Cell1 = () => {
  return (
    <ActionContainer>
      <ActionButton
        href={resume}
        target="_blank"
        onClick={() => sendEmail('download')}
      >
        {`DOWNLOAD RESUME ${'\u00A0'}`}
        <FaIcon icon={'faDownload'} />
      </ActionButton>
      <ActionButton
        href={'https://github.com/WarrickSmith?tab=repositories'}
        target="_blank"
        onClick={() => sendEmail('github')}
      >
        {`MY GITHUB REPOS' ${'\u00A0'}`} <FaIcon icon={'faGithub'} />
      </ActionButton>
    </ActionContainer>
  )
}

export default Cell1
