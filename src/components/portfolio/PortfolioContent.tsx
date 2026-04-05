import { useEffect, useRef } from 'react'
import portfolioData from '../../data/portfolioData'
import type { PortfolioProjectId } from '../../data/portfolioData'
import OverlayContentGroup from '../common/OverlayContentGroup'
import SectionHeading from '../common/SectionHeading'
import ProjectCard from './ProjectCard'

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
      <OverlayContentGroup slot="body" className="grid gap-6">
        {portfolioData.map((data) => (
          <ProjectCard
            key={data.id}
            project={data}
            id={`portfolio-project-${data.id}`}
            tabIndex={-1}
            ref={(node) => {
              if (node) {
                projectRefs.current.set(data.id, node)
              } else {
                projectRefs.current.delete(data.id)
              }
            }}
            selected={selectedProjectId === data.id}
          />
        ))}
      </OverlayContentGroup>
    </>
  )
}

export default PortfolioContent
