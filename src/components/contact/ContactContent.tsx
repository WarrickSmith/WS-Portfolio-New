import ContactForm from './ContactForm'
import FaIcon from '../common/FaIcon'
import OverlayContentGroup from '../common/OverlayContentGroup'
import SectionHeading from '../common/SectionHeading'

const ContactContent = () => {
  return (
    <>
      <OverlayContentGroup slot="heading">
        <SectionHeading>Get In Touch</SectionHeading>
      </OverlayContentGroup>
      <div className="grid grid-cols-[1fr_2fr] items-start gap-6 p-6 max-md:grid-cols-1">
        <OverlayContentGroup slot="body" className="bg-bg-card p-4 text-supporting">
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
        </OverlayContentGroup>
        <OverlayContentGroup slot="actions">
          <ContactForm />
        </OverlayContentGroup>
      </div>
    </>
  )
}

export default ContactContent
