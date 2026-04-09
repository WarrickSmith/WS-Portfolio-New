import {
  forwardRef,
  type ComponentPropsWithoutRef,
} from 'react'
import type { ProjectRelatedSkill } from '../../data/consolidatedProfile'
import type { PortfolioProject } from '../../data/portfolioData'
import { cn } from '../../lib/cn'
import ExternalLinkButton from '../common/ExternalLinkButton'
import SkillBadge from '../common/SkillBadge'
import TechBadge from '../common/TechBadge'

type ProjectCardProps = ComponentPropsWithoutRef<'article'> & {
  onNavigateToSkill?: (skillId: ProjectRelatedSkill['id']) => void
  project: PortfolioProject
  relatedSkills: ProjectRelatedSkill[]
  selected?: boolean
}

const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(
  (
    {
      project,
      relatedSkills,
      selected = false,
      className,
      onNavigateToSkill,
      ...props
    },
    ref
  ) => {
    return (
      <article
        ref={ref}
        className={cn(
          'grid gap-5 rounded-radius-lg border border-border-subtle bg-bg-card p-4 outline-none transition-[transform,border-color,background-color,box-shadow] duration-200 pointer-fine:hover:border-border-hover pointer-fine:hover:bg-bg-card-hover pointer-fine:hover:shadow-[var(--shadow-ambient)] motion-safe:pointer-fine:hover:-translate-y-0.5 motion-reduce:transition-none',
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

          {relatedSkills.length > 0 ? (
            <div className="grid gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-caption uppercase tracking-[0.16em] text-text-accent">
                  Related Skills
                </p>
                <span className="text-caption text-text-tertiary">
                  Jump to About Me
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {relatedSkills.map((skill) => (
                  <SkillBadge
                    key={skill.id}
                    label={skill.label}
                    {...(onNavigateToSkill
                      ? {
                          variant: 'linked' as const,
                          ariaLabel: skill.ariaLabel,
                          onClick: () => onNavigateToSkill(skill.id),
                        }
                      : { variant: 'default' as const })}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid gap-3">
            <p className="font-mono text-caption font-semibold uppercase tracking-[0.16em] text-text-secondary">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((technology) => (
                <TechBadge key={technology} label={technology} />
              ))}
            </div>
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
