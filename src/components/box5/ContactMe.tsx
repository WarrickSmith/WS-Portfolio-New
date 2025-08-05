import styled from 'styled-components'
import FaIcon from '../common/FaIcon'

const ContactMeContainer = styled.div`
  background-color: var(--bg-color);
  padding: 1rem;

  span {
    display: flex;
    align-items: center;
  }

  h3 {
    font-size: var(--fs-sm);
    color: var(--color-alt);
    font-weight: 500;
  }

  p,
  a {
    font-size: var(--fs-xsm);
    color: var(--color);
    font-weight: 400;
    margin: 0 0 1rem 0;
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
      <h3>CONTACT</h3>
      <span>
        <FaIcon icon={'faEnvelope'} className="fa-icon" />
        <p>Use the contact form to get in touch</p>
      </span>
    </ContactMeContainer>
  )
}
export default ContactMe
