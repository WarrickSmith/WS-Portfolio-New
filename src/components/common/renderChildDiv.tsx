import AboutCard from '../about/AboutCard'
import AboutContent from '../about/AboutContent'
import ContactCard from '../contact/ContactCard'
import ContactContent from '../contact/ContactContent'
import NameCard from '../namecard/NameCard'
import PortfolioCard from '../portfolio/PortfolioCard'
import PortfolioContent from '../portfolio/PortfolioContent'

export const cards = [
  { id: 1, component: <></> },
  { id: 2, component: <NameCard /> },
  { id: 3, component: <AboutCard /> },
  { id: 4, component: <PortfolioCard /> },
  { id: 5, component: <ContactCard /> },
]

export const renderChildDiv = (selectedId: number | null) => {
  switch (selectedId) {
    case 3:
      return <AboutContent />
    case 4:
      return <PortfolioContent />
    case 5:
      return <ContactContent />
    default:
      return null
  }
}
