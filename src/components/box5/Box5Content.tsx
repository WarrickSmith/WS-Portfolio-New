import styled from 'styled-components'
import ContactMe from './ContactMe'
import ContactForm from './ContactForm'
import SectionHeading from '../common/SectionHeading'

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
  grid-template-rows: auto;
  justify-content: center;
  align-items: flex-start;
  padding: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Box5Content = () => {
  return (
    <>
      <SectionHeading>Get In Touch</SectionHeading>
      <ContactContainer>
        <ContactMe />
        <ContactForm />
      </ContactContainer>
    </>
  )
}
export default Box5Content
