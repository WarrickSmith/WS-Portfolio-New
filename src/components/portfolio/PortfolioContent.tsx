import portfolioData from '../../data/portfolioData'
import BulletPoints from '../common/BulletPoints'
import FaIcon from '../common/FaIcon'
import SectionHeading from '../common/SectionHeading'

const PortfolioContent = () => {
  return (
    <>
      <SectionHeading>My Portfolio</SectionHeading>
      <div className="flex items-center justify-center">
        <a
          href="https://github.com/WarrickSmith?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block rounded-radius-sm bg-accent-primary px-4 py-2 text-center text-supporting text-text-primary no-underline"
        >
          {`VIEW MY REPOS ON GITHUB' ${'\u00A0'}`}
          <FaIcon icon="faGithub" />
        </a>
      </div>
      <div className="grid grid-cols-3 gap-6 p-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {portfolioData.map((data, index) => (
          <div key={`${data.title}_${index}`} className="grid">
            <h3 className="justify-self-center text-center text-text-accent uppercase">
              {data.title}
            </h3>
            <BulletPoints
              key={data.title}
              href={data.href}
              title={data.title}
              points={data.points}
              image={data.image}
              target="_blank"
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default PortfolioContent
