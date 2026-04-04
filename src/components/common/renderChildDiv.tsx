import {
  lazy,
  type ComponentType,
  type LazyExoticComponent,
  type ReactElement,
  type ReactNode,
} from 'react'
import type { PortfolioProjectId } from '../../data/portfolioData'
import AboutCard from '../about/AboutCard'
import type { AboutContentProps } from '../about/AboutContent'
import ContactCard from '../contact/ContactCard'
import NameCard from '../namecard/NameCard'
import PortfolioCard from '../portfolio/PortfolioCard'
import type { PortfolioContentProps } from '../portfolio/PortfolioContent'
import type { ExpandableItemPreset } from './ExpandableItem'

const AboutContent = lazy(
  () => import('../about/AboutContent')
) as LazyExoticComponent<ComponentType<AboutContentProps>>
const PortfolioContent = lazy(
  () => import('../portfolio/PortfolioContent')
) as LazyExoticComponent<ComponentType<PortfolioContentProps>>
const ContactContent = lazy(() => import('../contact/ContactContent'))

export type ExpandedCardContentProps = {
  onNavigateToProject?: (projectId: PortfolioProjectId) => void
  selectedProjectId?: PortfolioProjectId | null
}

const aboutExpansionPreset = {
  id: 'about-card-expansion',
  surfaceClassName: 'origin-top',
  layoutTransition: {
    type: 'spring',
    stiffness: 245,
    damping: 29,
    mass: 0.92,
    visualDuration: 0.48,
  },
  overlayMotion: {
    className: 'origin-top',
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -18 },
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 30,
      mass: 0.85,
      visualDuration: 0.44,
    },
  },
} satisfies ExpandableItemPreset

const portfolioExpansionPreset = {
  id: 'portfolio-card-expansion',
  surfaceClassName: 'origin-center',
  layoutTransition: {
    type: 'spring',
    stiffness: 190,
    damping: 22,
    mass: 1.04,
    visualDuration: 0.56,
  },
  overlayMotion: {
    className: 'origin-center',
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.97 },
    transition: {
      type: 'spring',
      stiffness: 205,
      damping: 24,
      mass: 1.02,
      visualDuration: 0.52,
    },
  },
} satisfies ExpandableItemPreset

const contactExpansionPreset = {
  id: 'contact-card-expansion',
  surfaceClassName: 'origin-bottom',
  layoutTransition: {
    type: 'spring',
    stiffness: 230,
    damping: 26,
    mass: 0.96,
    visualDuration: 0.5,
  },
  overlayMotion: {
    className: 'origin-bottom',
    initial: { opacity: 0, y: 20, scaleY: 0.96 },
    animate: { opacity: 1, y: 0, scaleY: 1 },
    exit: { opacity: 0, y: 20, scaleY: 0.96 },
    transition: {
      type: 'spring',
      stiffness: 240,
      damping: 27,
      mass: 0.92,
      visualDuration: 0.46,
    },
  },
} satisfies ExpandableItemPreset

export type CardDefinition = {
  expansionPreset?: ExpandableItemPreset
  id: number
  title: string
  preview: ReactNode
  interactive: boolean
}

export const cards: CardDefinition[] = [
  { id: 1, title: 'Hero Image', preview: <></>, interactive: false },
  { id: 2, title: 'Name Card', preview: <NameCard />, interactive: false },
  {
    id: 3,
    title: 'About Me',
    preview: <AboutCard />,
    interactive: true,
    expansionPreset: aboutExpansionPreset,
  },
  {
    id: 4,
    title: 'My Portfolio',
    preview: <PortfolioCard />,
    interactive: true,
    expansionPreset: portfolioExpansionPreset,
  },
  {
    id: 5,
    title: 'Get In Touch',
    preview: <ContactCard />,
    interactive: true,
    expansionPreset: contactExpansionPreset,
  },
]

export const getCardById = (selectedId: number | null) => {
  if (selectedId === null) return null

  return cards.find((card) => card.id === selectedId) ?? null
}

export const renderExpandedCardContent = (
  cardId: number,
  props: ExpandedCardContentProps
): ReactElement | null => {
  switch (cardId) {
    case 3:
      return <AboutContent onNavigateToProject={props.onNavigateToProject} />
    case 4:
      return <PortfolioContent selectedProjectId={props.selectedProjectId} />
    case 5:
      return <ContactContent />
    default:
      return null
  }
}
