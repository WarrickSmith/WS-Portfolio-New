import ContactForm from './ContactForm'
import FaIcon from '../common/FaIcon'
import SectionHeading from '../common/SectionHeading'

const ContactContent = () => {
  return (
    <>
      <SectionHeading>Get In Touch</SectionHeading>
      <div className="grid grid-cols-[1fr_2fr] items-start gap-6 p-6 max-md:grid-cols-1">
        <div className="bg-bg-card p-4 text-supporting">
          <h3 className="mb-spacing-3 text-callout font-medium text-text-accent">CONTACT</h3>
          <span className="flex items-center">
            <FaIcon
              icon="faEnvelope"
              className="mr-4 mb-spacing-3 text-text-primary"
            />
            <p className="mb-spacing-3 font-normal text-text-primary">
              Use the contact form to get in touch
            </p>
          </span>
        </div>
        <ContactForm />
      </div>
    </>
  )
}

export default ContactContent
