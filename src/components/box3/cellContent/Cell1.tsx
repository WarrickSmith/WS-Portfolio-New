import emailjs from '@emailjs/browser'
import styled from 'styled-components'
import FaIcon from '../../common/FaIcon'
import resume from '../../../assets/WSmith_Technical_Resume_v4.pdf'

const Container = styled.div`
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
const sendEmail = (button: string) => {

  const message=button==='download'?'Your CV has been downloaded from warricksmith.com!':'Someone has clicked through to your GITHUB Repos!'

  // Get user's IP address
  const ipAddress = window?.location?.hostname || 'Unknown IP Address'

  // Get other user information
  const userAgent = navigator.userAgent || 'Unknown User Agent'
  const language = navigator.language || 'Unknown Language'

  const templateParams = {
    user_name: 'Warrick',
notes: `${message}\n\nIP Address: ${ipAddress}\nUser Agent: ${userAgent}\nLanguage: ${language}`,
  }

  emailjs
    .send(
      'service_ee860nu',
      'template_y0g26q6',
      templateParams,
      '3HyPrrduysCbj5IZK'
    )
    .then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text)
      },
      function (error) {
        console.log('FAILED...', error)
      }
    )
    return
}
const Cell1 = () => {
  return (
    <Container>
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
    </Container>
  )
}

export default Cell1
