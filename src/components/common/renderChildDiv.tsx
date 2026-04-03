import {
  lazy,
  type ComponentType,
  type LazyExoticComponent,
  type ReactNode,
} from 'react'
import AboutCard from '../about/AboutCard'
import ContactCard from '../contact/ContactCard'
import NameCard from '../namecard/NameCard'
import PortfolioCard from '../portfolio/PortfolioCard'

const AboutContent = lazy(() => import('../about/AboutContent'))
const PortfolioContent = lazy(() => import('../portfolio/PortfolioContent'))
const ContactContent = lazy(() => import('../contact/ContactContent'))

type ExpandedContentComponent = LazyExoticComponent<ComponentType>

export type CardDefinition = {
  id: number
  title: string
  preview: ReactNode
  interactive: boolean
  expandedContent?: ExpandedContentComponent
}

export const cards: CardDefinition[] = [
  { id: 1, title: 'Hero Image', preview: <></>, interactive: false },
  { id: 2, title: 'Name Card', preview: <NameCard />, interactive: false },
  {
    id: 3,
    title: 'About Me',
    preview: <AboutCard />,
    interactive: true,
    expandedContent: AboutContent,
  },
  {
    id: 4,
    title: 'My Portfolio',
    preview: <PortfolioCard />,
    interactive: true,
    expandedContent: PortfolioContent,
  },
  {
    id: 5,
    title: 'Get In Touch',
    preview: <ContactCard />,
    interactive: true,
    expandedContent: ContactContent,
  },
]

export const getCardById = (selectedId: number | null) => {
  if (selectedId === null) return null

  return cards.find((card) => card.id === selectedId) ?? null
}
