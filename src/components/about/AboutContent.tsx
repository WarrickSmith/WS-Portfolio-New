import backgroundImage from '../../assets/warrick.jpg'
import consolidatedProfile from '../../data/consolidatedProfile'
import type { PortfolioProjectId } from '../../data/portfolioData'
import personalData from '../../data/personalData'
import FaIcon from '../common/FaIcon'
import OverlayContentGroup from '../common/OverlayContentGroup'
import SectionHeading from '../common/SectionHeading'
import SkillBadge from '../common/SkillBadge'

export type AboutContentProps = {
  onNavigateToProject?: (projectId: PortfolioProjectId) => void
}

const skillCategoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  data: 'Data',
  delivery: 'Delivery',
} as const

const skillCategoryOrder = ['frontend', 'backend', 'data', 'delivery'] as const

const AboutContent = ({ onNavigateToProject }: AboutContentProps) => {
  const overviewStats: Array<{
    icon: string
    label: string
    value: string
  }> = [
    {
      icon: 'faBriefcase',
      label: 'Years in Software Development',
      value: `${consolidatedProfile.totalYearsExperience}+`,
    },
    {
      icon: 'faCode',
      label: 'Core skills',
      value: String(consolidatedProfile.skills.length),
    },
    {
      icon: 'faGraduationCap',
      label: 'Qualifications',
      value: String(consolidatedProfile.education.length),
    },
  ]

  const skillGroups = skillCategoryOrder
    .map((category) => ({
      category,
      label: skillCategoryLabels[category],
      items: consolidatedProfile.skills
        .filter((item) => item.category === category)
        .sort((left, right) => left.order - right.order),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <>
      <OverlayContentGroup slot="heading">
        <SectionHeading>About Me</SectionHeading>
      </OverlayContentGroup>

      <OverlayContentGroup
        slot="body"
        className="flex flex-col gap-6 p-6 text-body text-text-primary"
      >
        <section className="overflow-hidden rounded-radius-lg border border-border-subtle bg-gradient-to-br from-bg-card to-bg-card-deep shadow-[var(--shadow-ambient)]">
          <div className="grid gap-6 p-6 min-[1180px]:grid-cols-[minmax(0,1.35fr)_220px] min-[1180px]:items-start">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-caption font-semibold uppercase tracking-[0.22em] text-text-accent">
                  Professional Profile
                </p>
                <div className="space-y-2">
                  <h2 className="text-h1 font-semibold text-text-primary">
                    {personalData.profile.fullName}
                  </h2>
                  <p className="text-callout font-medium text-text-accent">
                    {personalData.profile.headline}
                  </p>
                  <div className="inline-flex items-center gap-2 text-body-sm text-text-secondary">
                    <FaIcon icon="faLocationDot" className="text-text-accent" />
                    <span>{personalData.profile.location}</span>
                  </div>
                  <p className="max-w-[60ch] text-body text-text-secondary">
                    {personalData.profile.summary}
                  </p>
                </div>
              </div>

              <dl className="grid gap-3 min-[680px]:grid-cols-2">
                {personalData.profile.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-radius-md border border-border-subtle bg-bg-card-hover p-4"
                  >
                    <dt className="min-w-0 text-caption font-semibold uppercase leading-tight tracking-[0.14em] text-text-tertiary [overflow-wrap:anywhere]">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-body-sm font-medium text-text-primary">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="overflow-hidden rounded-radius-md border border-border-subtle bg-bg-card">
              <img
                src={backgroundImage}
                alt="Portrait of Warrick Smith"
                className="h-full min-h-64 w-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-3 min-[760px]:grid-cols-2 min-[1180px]:grid-cols-3">
          {overviewStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`rounded-radius-md border p-5 ${
                index === 0
                  ? 'border-border-accent bg-accent-primary-soft'
                  : 'border-border-subtle bg-bg-card'
              }`}
            >
              <div className="mb-4 flex items-start gap-3 text-text-accent">
                <FaIcon icon={stat.icon} />
                <span className="min-w-0 text-caption font-semibold uppercase leading-tight tracking-[0.14em] text-text-tertiary [overflow-wrap:anywhere]">
                  {stat.label}
                </span>
              </div>
              <div className="text-emphasis font-semibold text-text-primary">
                {stat.value}
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-radius-lg border border-border-subtle bg-bg-card p-6">
          <div className="mb-4 space-y-2">
            <h3 className="text-h3 font-semibold text-text-accent">
              Core Skills
            </h3>
            <p className="max-w-[65ch] text-body-sm text-text-secondary">
              Accent badges jump straight to a portfolio example, while the rest
              stay visible as a complete snapshot of the stack used across
              product, platform, and delivery work.
            </p>
          </div>

          <div className="grid gap-4 min-[760px]:grid-cols-2">
            {skillGroups.map((group) => (
              <section
                key={group.category}
                aria-labelledby={`skills-group-${group.category}`}
                className="rounded-radius-md border border-border-subtle bg-bg-card-hover p-4"
              >
                <h4
                  id={`skills-group-${group.category}`}
                  className="text-caption font-semibold uppercase tracking-[0.16em] text-text-tertiary"
                >
                  {group.label}
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const projectId = item.primaryProjectId
                    const badgeProps =
                      projectId !== null &&
                      item.primaryProjectAriaLabel !== null &&
                      onNavigateToProject
                        ? {
                            variant: 'linked' as const,
                            ariaLabel: item.primaryProjectAriaLabel,
                            onClick: () => onNavigateToProject(projectId),
                          }
                        : { variant: 'default' as const }

                    return (
                      <SkillBadge
                        key={item.id}
                        label={item.label}
                        {...badgeProps}
                      />
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="rounded-radius-lg border border-border-subtle bg-bg-card p-6">
          <div className="mb-6 space-y-2">
            <h3 className="text-h3 font-semibold text-text-accent">
              Experience
            </h3>
            <p className="max-w-[65ch] text-body-sm text-text-secondary">
              Professional roles that combine hands-on delivery with product,
              commercial, and operational context.
            </p>
          </div>

          <ol className="space-y-5">
            {consolidatedProfile.experience.map((item) => (
              <li
                key={`${item.company}-${item.role}-${item.period}`}
                className="relative border-l border-border-subtle pl-6"
              >
                <span className="absolute top-2 left-0 h-3 w-3 -translate-x-1/2 rounded-full bg-accent-primary shadow-[var(--shadow-glow)]" />
                <article className="space-y-3 rounded-radius-md bg-bg-card-hover p-5">
                  <div className="flex flex-col gap-3 desktop:flex-row desktop:items-start desktop:justify-between">
                    <div className="space-y-1">
                      <h4 className="text-body font-semibold text-text-primary">
                        {item.role}
                      </h4>
                      <p className="text-body-sm font-medium text-text-accent">
                        {item.company}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 text-body-sm text-text-secondary">
                      <FaIcon icon="faCalendar" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                  <p className="text-body-sm text-text-secondary">
                    {item.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-radius-lg border border-border-subtle bg-bg-card p-6">
          <div className="mb-6 space-y-2">
            <h3 className="text-h3 font-semibold text-text-accent">
              Education
            </h3>
            <p className="max-w-[65ch] text-body-sm text-text-secondary">
              Formal study that supports current software, cloud, and commercial
              capability.
            </p>
          </div>

          <div className="space-y-4">
            {consolidatedProfile.education.map((item) => (
              <article
                key={`${item.institution}-${item.qualification}`}
                className="rounded-radius-md border border-border-subtle bg-bg-card-hover p-5"
              >
                <div className="flex flex-col gap-3 desktop:flex-row desktop:items-start desktop:justify-between">
                  <div className="space-y-1">
                    <h4 className="text-body font-semibold text-text-primary">
                      {item.qualification}
                    </h4>
                    <p className="text-body-sm font-medium text-text-accent">
                      {item.institution}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-body-sm text-text-secondary">
                    <FaIcon icon="faCalendar" />
                    <span>{item.period}</span>
                  </div>
                </div>
                <p className="mt-3 text-body-sm text-text-secondary">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </OverlayContentGroup>

      <OverlayContentGroup slot="actions" className="px-6 pb-6">
        <a
          href={personalData.profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Warrick Smith GitHub profile in a new tab"
          className="inline-flex items-center gap-3 rounded-radius-sm bg-accent-primary px-4 py-4 text-left text-body-sm font-semibold text-text-primary no-underline transition-opacity duration-150 hover:opacity-90 focus-visible:shadow-focus-ring max-md:w-full max-md:justify-center"
        >
          <span>View GitHub Profile</span>
          <span className="inline-flex items-center gap-3">
            <FaIcon icon="faGithub" />
            <FaIcon icon="faArrowUpRightFromSquare" className="text-body-sm" />
          </span>
        </a>
      </OverlayContentGroup>
    </>
  )
}

export default AboutContent
