import {
  lazy,
  type ComponentType,
  type LazyExoticComponent,
  type ReactElement,
  type ReactNode,
} from 'react'
import {
  ABOUT_CARD_ID,
  APPROACH_CARD_ID,
  CONTACT_CARD_ID,
  IDENTITY_CARD_ID,
  PORTFOLIO_CARD_ID,
} from '../../constants/cardIds'
import type { SkillId } from '../../data/personalData'
import type { PortfolioProjectId } from '../../data/portfolioData'
import AboutCard from '../about/AboutCard'
import type { AboutContentProps } from '../about/AboutContent'
import ApproachCard from '../approach/ApproachCard'
import type { ApproachContentProps } from '../approach/ApproachContent'
import ContactCard from '../contact/ContactCard'
import IdentityCard from '../namecard/IdentityCard'
import PortfolioCard from '../portfolio/PortfolioCard'
import type { PortfolioContentProps } from '../portfolio/PortfolioContent'
import type { ExpandableItemPreset } from './ExpandableItem'

const AboutContent = lazy(
  () => import('../about/AboutContent')
) as LazyExoticComponent<ComponentType<AboutContentProps>>
const PortfolioContent = lazy(
  () => import('../portfolio/PortfolioContent')
) as LazyExoticComponent<ComponentType<PortfolioContentProps>>
const ApproachContent = lazy(
  () => import('../approach/ApproachContent')
) as LazyExoticComponent<ComponentType<ApproachContentProps>>
const ContactContent = lazy(() => import('../contact/ContactContent'))

export type ExpandedCardContentProps = {
  onNavigateToProject?: (projectId: PortfolioProjectId) => void
  onNavigateToSkill?: (skillId: SkillId) => void
  selectedProjectId?: PortfolioProjectId | null
  selectedSkillId?: SkillId | null
}

const aboutExpansionPreset = {
  id: 'about-card-expansion',
  surfaceClassName: 'origin-top',
  layoutTransition: {
    type: 'spring',
    stiffness: 255,
    damping: 28,
    mass: 0.88,
    visualDuration: 0.46,
  },
  overlayMotion: {
    className: 'origin-top',
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -26 },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 31,
      mass: 0.82,
      visualDuration: 0.4,
    },
  },
} satisfies ExpandableItemPreset

const portfolioExpansionPreset = {
  id: 'portfolio-card-expansion',
  surfaceClassName: 'origin-center',
  layoutTransition: {
    type: 'spring',
    stiffness: 180,
    damping: 20,
    mass: 1.08,
    visualDuration: 0.58,
  },
  overlayMotion: {
    className: 'origin-center',
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.975 },
    transition: {
      type: 'spring',
      stiffness: 190,
      damping: 21,
      mass: 1.08,
      visualDuration: 0.56,
    },
  },
} satisfies ExpandableItemPreset

const contactExpansionPreset = {
  id: 'contact-card-expansion',
  surfaceClassName: 'origin-bottom',
  layoutTransition: {
    type: 'spring',
    stiffness: 255,
    damping: 25,
    mass: 0.9,
    visualDuration: 0.48,
  },
  overlayMotion: {
    className: 'origin-bottom',
    initial: { opacity: 0, y: 28, scaleY: 0.9 },
    animate: { opacity: 1, y: 0, scaleY: 1 },
    exit: { opacity: 0, y: 18, scaleY: 0.95 },
    transition: {
      type: 'spring',
      stiffness: 265,
      damping: 25,
      mass: 0.88,
      visualDuration: 0.42,
    },
  },
} satisfies ExpandableItemPreset

const approachExpansionPreset = {
  id: 'approach-card-expansion',
  surfaceClassName: 'origin-bottom',
  layoutTransition: {
    type: 'spring',
    stiffness: 205,
    damping: 24,
    mass: 1.02,
    visualDuration: 0.56,
  },
  overlayMotion: {
    className: 'origin-bottom',
    initial: { opacity: 0, y: 32, scale: 0.975 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 22, scale: 0.99 },
    transition: {
      type: 'spring',
      stiffness: 215,
      damping: 24,
      mass: 1,
      visualDuration: 0.5,
    },
  },
} satisfies ExpandableItemPreset

export type CardDefinition = {
  expansionPreset?: ExpandableItemPreset
  gridClassName?: string
  id: number
  title: string
  preview: ReactNode
  interactive: boolean
}

export const cards: CardDefinition[] = [
  {
    id: IDENTITY_CARD_ID,
    title: 'Identity',
    preview: <IdentityCard />,
    interactive: false,
    gridClassName:
      'tablet:col-span-full desktop:col-span-1 desktop:row-span-2',
  },
  {
    id: ABOUT_CARD_ID,
    title: 'About Me',
    preview: <AboutCard />,
    interactive: true,
    expansionPreset: aboutExpansionPreset,
  },
  {
    id: PORTFOLIO_CARD_ID,
    title: 'My Portfolio',
    preview: <PortfolioCard />,
    interactive: true,
    expansionPreset: portfolioExpansionPreset,
  },
  {
    id: APPROACH_CARD_ID,
    title: 'My Approach',
    preview: <ApproachCard />,
    interactive: true,
    expansionPreset: approachExpansionPreset,
  },
  {
    id: CONTACT_CARD_ID,
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
    case ABOUT_CARD_ID:
      return (
        <AboutContent
          onNavigateToProject={props.onNavigateToProject}
          selectedSkillId={props.selectedSkillId}
        />
      )
    case PORTFOLIO_CARD_ID:
      return (
        <PortfolioContent
          onNavigateToSkill={props.onNavigateToSkill}
          selectedProjectId={props.selectedProjectId}
        />
      )
    case APPROACH_CARD_ID:
      return <ApproachContent />
    case CONTACT_CARD_ID:
      return <ContactContent />
    default:
      return null
  }
}
