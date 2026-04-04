import { useEffect, useRef } from 'react'
import portfolioData from '../../data/portfolioData'
import type { PortfolioProjectId } from '../../data/portfolioData'
import { cn } from '../../lib/cn'
import BulletPoints from '../common/BulletPoints'
import FaIcon from '../common/FaIcon'
import OverlayContentGroup from '../common/OverlayContentGroup'
import SectionHeading from '../common/SectionHeading'

export type PortfolioContentProps = {
  selectedProjectId?: PortfolioProjectId | null
}

const PortfolioContent = ({
  selectedProjectId = null,
}: PortfolioContentProps) => {
  const projectRefs = useRef(new Map<PortfolioProjectId, HTMLElement>())

  useEffect(() => {
    if (selectedProjectId === null) return

    const target = projectRefs.current.get(selectedProjectId)

    if (!target) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Portfolio target not found for project ID:', selectedProjectId)
      }
      return
    }

    const frameId = window.requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
      target.focus({ preventScroll: true })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [selectedProjectId])

  return (
    <>
      <OverlayContentGroup slot="heading">
        <SectionHeading>My Portfolio</SectionHeading>
      </OverlayContentGroup>
      <OverlayContentGroup
        slot="body"
        className="grid grid-cols-3 gap-6 p-6 max-lg:grid-cols-2 max-md:grid-cols-1"
      >
        {portfolioData.map((data) => (
          <article
            key={data.id}
            id={`portfolio-project-${data.id}`}
            tabIndex={-1}
            ref={(node) => {
              if (node) {
                projectRefs.current.set(data.id, node)
              } else {
                projectRefs.current.delete(data.id)
              }
            }}
            className={cn(
              'grid gap-4 rounded-radius-lg border border-border-subtle bg-bg-card p-4 outline-none transition-[border-color,background-color,box-shadow] duration-200',
              selectedProjectId === data.id &&
                'border-border-accent bg-accent-primary-soft shadow-[var(--shadow-glow)]'
            )}
          >
            <h3 className="justify-self-center text-center text-caption font-semibold uppercase tracking-[0.16em] text-text-accent">
              {data.title}
            </h3>
            <BulletPoints
              href={data.href}
              title={data.title}
              points={data.points}
              image={data.image}
              target="_blank"
            />
          </article>
        ))}
      </OverlayContentGroup>
      <OverlayContentGroup
        slot="actions"
        className="flex items-center justify-center px-6 pb-6"
      >
        <a
          href="https://github.com/WarrickSmith?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-radius-sm bg-accent-primary px-4 py-2 text-center text-supporting text-text-primary no-underline"
        >
          {`VIEW MY REPOS ON GITHUB' ${'\u00A0'}`}
          <FaIcon icon="faGithub" />
        </a>
      </OverlayContentGroup>
    </>
  )
}

export default PortfolioContent
