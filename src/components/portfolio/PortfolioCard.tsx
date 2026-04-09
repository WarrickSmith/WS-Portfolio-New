import CardPreview from '../common/CardPreview'

const PortfolioCard = () => {
  return (
    <CardPreview
      icon="faBriefcase"
      description="Selected builds with live demos and code."
      title={
        <>
          <span className="text-text-primary">My</span>{'\u00A0'}
          <span className="text-text-accent">Portfolio</span>
        </>
      }
    />
  )
}

export default PortfolioCard
