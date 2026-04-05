import {
  forwardRef,
  type ComponentPropsWithoutRef,
} from 'react'
import type { PortfolioProject } from '../../data/portfolioData'
import { cn } from '../../lib/cn'
import ExternalLinkButton from '../common/ExternalLinkButton'
import TechBadge from '../common/TechBadge'

type ProjectCardProps = ComponentPropsWithoutRef<'article'> & {
  project: PortfolioProject
  selected?: boolean
}

const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(
  ({ project, selected = false, className, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={cn(
          'grid gap-5 rounded-radius-lg border border-border-subtle bg-bg-card p-4 outline-none transition-[transform,border-color,background-color,box-shadow] duration-200 pointer-fine:hover:-translate-y-0.5 pointer-fine:hover:border-border-hover pointer-fine:hover:bg-bg-card-hover pointer-fine:hover:shadow-[var(--shadow-ambient)]',
          selected &&
            'border-border-accent bg-accent-primary-veil shadow-[var(--shadow-glow)]',
          className
        )}
        {...props}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          className="aspect-[16/10] w-full rounded-radius-md border border-border-subtle bg-bg-card-deep object-cover"
        />
        <div className="grid gap-5">
          <div className="grid gap-2">
            <h3 className="text-h3 font-semibold text-text-primary">
              {project.title}
            </h3>
            <p className="text-body-sm font-normal text-text-secondary">
              {project.summary}
            </p>
          </div>

          <div className="grid gap-2">
            <p className="font-mono text-caption uppercase tracking-[0.16em] text-text-accent">
              Key Features
            </p>
            <ul className="grid gap-2 pl-5 text-body-sm font-normal leading-relaxed text-text-secondary marker:text-text-accent">
              {project.keyFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((technology) => (
              <TechBadge key={technology} label={technology} />
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <ExternalLinkButton
              href={project.liveDemoUrl}
              label="Live Demo"
              ariaLabel={`Open ${project.title} live demo in a new tab`}
              variant="primary"
            />
            <ExternalLinkButton
              href={project.githubUrl}
              label="GitHub"
              ariaLabel={`Open ${project.title} GitHub repository in a new tab`}
              variant="secondary"
            />
          </div>
        </div>
      </article>
    )
  }
)

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard
