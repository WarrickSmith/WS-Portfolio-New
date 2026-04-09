import personalData from '../../data/personalData'
import ContactForm from './ContactForm'
import FaIcon from '../common/FaIcon'
import OverlayContentGroup from '../common/OverlayContentGroup'
import SectionHeading from '../common/SectionHeading'

const ContactContent = () => {
  const { profile, contact } = personalData
  const hasProfileLinks = contact.links.length > 0

  const contactInfoItems = [
    {
      label: 'Location',
      value: profile.location,
      icon: 'faLocationDot',
      href: null,
    },
    {
      label: 'Direct email',
      value: contact.email,
      icon: 'faEnvelope',
      href: `mailto:${contact.email}`,
    },
  ]

  return (
    <>
      <OverlayContentGroup slot="heading">
        <SectionHeading>Get In Touch</SectionHeading>
      </OverlayContentGroup>

      <div className="grid gap-6 p-6 @min-[700px]/overlay:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <OverlayContentGroup
          slot="body"
          className="space-y-6 rounded-radius-lg border border-border-subtle bg-gradient-to-br from-bg-card to-bg-card-deep p-6 shadow-[var(--shadow-ambient)]"
        >
          <div className="space-y-3">
            <p className="text-caption font-semibold uppercase tracking-[0.22em] text-text-accent">
              Contact
            </p>
            <h3 className="text-h2 font-semibold text-text-primary">
              Let&apos;s talk about the next build.
            </h3>
            <p className="max-w-[34ch] text-body text-text-secondary">
              {contact.intro}
            </p>
            <p className="max-w-[34ch] text-body-sm text-text-secondary">
              {contact.availability}
            </p>
          </div>

          <div className="grid gap-3">
            {contactInfoItems.map((item) => {
              const content = (
                <>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-primary-soft text-text-accent">
                    <FaIcon icon={item.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-caption font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                      {item.label}
                    </span>
                    <span className="mt-2 block text-body-sm font-medium text-text-primary [overflow-wrap:anywhere]">
                      {item.value}
                    </span>
                  </span>
                </>
              )

              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 rounded-radius-md border border-border-subtle bg-bg-card-hover p-4 text-left no-underline transition-[border-color,background-color,box-shadow] duration-150 hover:border-border-hover hover:bg-bg-card focus-visible:outline-none focus-visible:shadow-focus-ring motion-reduce:transition-none"
                  >
                    {content}
                  </a>
                )
              }

              return (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-radius-md border border-border-subtle bg-bg-card-hover p-4"
                >
                  {content}
                </div>
              )
            })}
          </div>

          {hasProfileLinks ? (
            <section
              aria-labelledby="contact-profiles-heading"
              className="rounded-radius-md border border-border-subtle bg-bg-card-hover p-4"
            >
              <div className="mb-4 space-y-2">
                <h3
                  id="contact-profiles-heading"
                  className="text-body font-semibold text-text-primary"
                >
                  Profiles
                </h3>
                <p className="text-body-sm text-text-secondary">
                  Browse recent code, shipped portfolio work, and the implementation detail
                  behind it.
                </p>
              </div>

              <div className="grid gap-3">
                {contact.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="flex items-start justify-between gap-4 rounded-radius-md border border-border-subtle bg-bg-card p-4 text-left no-underline transition-[border-color,background-color,box-shadow] duration-150 hover:border-border-hover hover:bg-bg-card-hover focus-visible:outline-none focus-visible:shadow-focus-ring motion-reduce:transition-none"
                  >
                    <span className="flex items-start gap-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-primary-soft text-text-accent">
                        <FaIcon icon={link.icon} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-body-sm font-semibold text-text-primary">
                          {link.label}
                        </span>
                        <span className="mt-1 block text-body-sm text-text-secondary">
                          {link.supportingText}
                        </span>
                      </span>
                    </span>
                    <span className="pt-1 text-text-tertiary">
                      <FaIcon icon="faArrowUpRightFromSquare" className="text-caption" />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </OverlayContentGroup>

        <OverlayContentGroup
          slot="actions"
          className="rounded-radius-lg border border-border-subtle bg-bg-card p-6 shadow-[var(--shadow-ambient)]"
        >
          <ContactForm />
        </OverlayContentGroup>
      </div>
    </>
  )
}

export default ContactContent
