import styled from 'styled-components'
import CardHeader from '../common/CardHeader'
import ContactMe from './ContactMe'
import ContactForm from './ContactForm'

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Box5Content = () => {
  return (
    <>
      <CardHeader words={['Get', 'In', 'Touch']} icon={'faEnvelopeOpen'} />
      <ContactContainer>
        <ContactMe />
        <ContactForm />
      </ContactContainer>
    </>
  )
}
export default Box5Content
