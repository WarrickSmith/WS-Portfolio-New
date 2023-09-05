import styled from 'styled-components'
import FaIcon from '../common/FaIcon'

const ContactMeContainer = styled.div`
  background-color: var(--bg-color);
  padding: 1rem;

  span {
    display: flex;
    align-items: center;
  }

  h1 {
    font-size: var(--fs-sm);
    color: var(--color-alt);
    font-weight: 500;
  }

  p, a {
    font-size: var(--fs-xsm);
    color: var(--color);
    font-weight: 400;
    margin: 0 0 1rem 0 ;
  }

  .fa-icon {
    font-size: var(--fs-xsm);
    margin: 0 1rem 1rem 0;
  }

  a {
      text-decoration: none;
  }
`

const ContactMe = () => {
  return (
    <ContactMeContainer>
      <h1>PHONE</h1>
      <span>
        <FaIcon icon={'faPhone'} className="fa-icon" />
        <p>021 0248 8139</p>
      </span>
      <h1>ADDRESS</h1>
      <span>
        <FaIcon icon={'faSuitcase'} className="fa-icon" />
        <p>Auckland, New Zealand</p>
      </span>
      <h1>SOCIAL PROFILES</h1>
      <a href="https://www.linkedin.com/in/warrick-smith/">
        <span>
          <FaIcon icon={'faLinkedin'} className="fa-icon" />
          <p>Linkedin</p>
        </span>
      </a>
    </ContactMeContainer>
  )
}
export default ContactMe
