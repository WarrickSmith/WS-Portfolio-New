import CardPreview from '../common/CardPreview'

const ApproachCard = () => {
  return (
    <CardPreview
      icon="faCompass"
      description="Process, delivery mindset, and how I adapt across projects."
      title={
        <>
          <span className="text-text-primary">My</span>{'\u00A0'}
          <span className="text-text-accent">Approach</span>
        </>
      }
    />
  )
}

export default ApproachCard
