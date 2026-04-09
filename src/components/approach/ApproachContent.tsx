import consolidatedProfile from '../../data/consolidatedProfile'
import OverlayContentGroup from '../common/OverlayContentGroup'
import SectionHeading from '../common/SectionHeading'

export type ApproachContentProps = Record<string, never>

const ApproachContent = (_props: ApproachContentProps) => {
  return (
    <>
      <OverlayContentGroup slot="heading">
        <SectionHeading>My Approach</SectionHeading>
      </OverlayContentGroup>

      <OverlayContentGroup
        slot="body"
        className="grid gap-6 p-6 text-body text-text-primary"
      >
        <section className="rounded-radius-lg border border-border-subtle bg-gradient-to-br from-bg-card to-bg-card-deep p-6 shadow-[var(--shadow-ambient)]">
          <p className="max-w-[72ch] text-body text-text-secondary">
            {consolidatedProfile.approach.summary}
          </p>
        </section>

        <section className="rounded-radius-lg border border-border-subtle bg-bg-card p-6">
          <div className="mb-6 space-y-2">
            <h3 className="text-h3 font-semibold text-text-accent">Process</h3>
            <p className="max-w-[65ch] text-body-sm text-text-secondary">
              A practical delivery loop that keeps discovery, implementation,
              and refinement connected.
            </p>
          </div>

          <ol className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
            {consolidatedProfile.approach.process.map((item, index) => (
              <li
                key={item.title}
                className="rounded-radius-md border border-border-subtle bg-bg-card-hover p-5"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-accent bg-accent-primary-veil font-mono text-caption font-semibold tracking-[0.16em] text-text-accent">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h4 className="text-body font-semibold text-text-primary">
                  {item.title}
                </h4>
                <p className="mt-3 text-body-sm text-text-secondary">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-radius-lg border border-border-subtle bg-bg-card p-6">
          <div className="mb-6 space-y-2">
            <h3 className="text-h3 font-semibold text-text-accent">
              Adaptability
            </h3>
            <p className="max-w-[68ch] text-body-sm text-text-secondary">
              {consolidatedProfile.approach.adaptabilityStatement}
            </p>
          </div>

          <div className="grid gap-4 tablet:grid-cols-2">
            {consolidatedProfile.learningAdaptability.map((item) => (
              <article
                key={item.example}
                className="rounded-radius-md border border-border-subtle bg-bg-card-hover p-5"
              >
                <h4 className="text-body font-semibold text-text-primary">
                  {item.example}
                </h4>
                <p className="mt-3 text-body-sm text-text-secondary">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </OverlayContentGroup>
    </>
  )
}

export default ApproachContent
