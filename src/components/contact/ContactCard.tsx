import CardPreview from '../common/CardPreview'

const ContactCard = () => {
  return (
    <CardPreview
      icon="faEnvelope"
      description="Start a conversation or reach out directly."
      title={
        <>
          <span className="text-text-primary">Get</span>{'\u00A0'}
          <span className="text-text-accent">In</span>{'\u00A0'}
          <span className="text-text-accent">Touch</span>
        </>
      }
    />
  )
}

export default ContactCard
