import CardPreview from '../common/CardPreview'

const AboutCard = () => {
  return (
    <CardPreview
      icon="faUser"
      description="Background, experience, and skills."
      title={
        <>
          <span className="text-text-primary">About</span>{'\u00A0'}
          <span className="text-text-accent">Me</span>
        </>
      }
    />
  )
}

export default AboutCard
