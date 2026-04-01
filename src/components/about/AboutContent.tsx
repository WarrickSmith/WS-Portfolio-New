import backgroundImage from '../../assets/warrick.jpg'
import consolidatedProfile from '../../data/consolidatedProfile'
import FaIcon from '../common/FaIcon'
import SectionHeading from '../common/SectionHeading'

const personalInfo = [
  ['First Name:', 'Warrick'],
  ['Last Name:', 'Smith'],
  ['Nationality:', 'New Zealand'],
  ['Employment Status:', 'Available'],
  ['Spoken Languages:', 'English'],
] as const

const getYearsExperience = (startYear: number) => {
  const currentYear = new Date().getFullYear()
  return currentYear - startYear
}

const AboutContent = () => {
  const yearsExperience = getYearsExperience(2021)

  return (
    <>
      <SectionHeading>About Me</SectionHeading>
      <div className="grid w-full grid-cols-[1fr_2fr] items-start gap-6 p-6 max-lg:grid-cols-1">
        <div className="col-span-full flex flex-col items-center justify-center">
          <div className="mb-spacing-3 flex items-center">
            <FaIcon
              icon="faUser"
              className="mr-2 mb-spacing-3 text-text-primary"
            />
            <h3
              className="text-body-sm font-medium text-text-accent"
              style={{ fontSize: 'var(--fs-sm)' }}
            >
              PERSONAL INFORMATION
            </h3>
          </div>
          <p
            className="mb-spacing-6 text-center font-normal text-text-primary"
            style={{ fontSize: 'var(--fs-xsm)' }}
          >
            I am a Full Stack Web Developer based in Auckland, New Zealand. My
            passion is for all things technology and I am a continous learner.
          </p>
        </div>

        <div className="grid gap-6 max-md:grid-cols-2 max-[550px]:grid-cols-1">
          <a
            href="https://github.com/WarrickSmith?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="bg-accent-primary p-4 text-left font-medium text-text-primary no-underline max-md:text-center"
            style={{ fontSize: 'var(--fs-xsm)' }}
          >
            {`MY GITHUB REPOS' ${'\u00A0'}`}
            <FaIcon icon="faGithub" />
          </a>

          <div className="grid w-full gap-4 sm:grid-cols-2 max-[550px]:grid-cols-1">
            <div>
              {personalInfo.map(([label, value]) => (
                <div key={label} className="mb-spacing-3">
                  <span
                    className="font-medium text-text-accent"
                    style={{ fontSize: 'var(--fs-xsm)' }}
                  >
                    {label}
                  </span>
                  <span
                    className="ml-4 font-normal text-text-primary"
                    style={{ fontSize: 'var(--fs-xsm)' }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="min-h-56 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 py-4 max-md:hidden">
          <div className="grid w-4/5 justify-items-center gap-2 self-center text-center">
            <span
              className="text-text-primary"
              style={{ fontSize: 'var(--fs-lge)' }}
            >
              <FaIcon icon="faBriefcase" />
            </span>
            <p
              className="m-0 font-extrabold text-text-accent"
              style={{ fontSize: 'var(--fs-lge)' }}
            >
              {yearsExperience}+
            </p>
            <p
              className="font-bold text-text-primary"
              style={{ fontSize: 'var(--fs-xsm)' }}
            >
              YEARS DEVELOPER EXPERIENCE
            </p>
          </div>
        </div>

        <div className="w-full">
          <div
            className="grid w-full rounded-radius-sm bg-bg-card-hover font-light text-text-primary"
            style={{ fontSize: 'var(--fs-xsm)' }}
          >
            <div className="mb-8 flex items-center justify-center gap-8 rounded-radius-sm bg-bg-card p-4 text-center max-md:grid max-md:grid-cols-1">
              <div>
                <div
                  className="font-semibold text-text-accent"
                  style={{ fontSize: 'var(--fs-lge)' }}
                >
                  {consolidatedProfile.totalYearsExperience}
                </div>
                <div className="text-caption uppercase text-text-tertiary">
                  Years Developer Experience
                </div>
              </div>
              <div>
                <div
                  className="font-semibold text-text-accent"
                  style={{ fontSize: 'var(--fs-lge)' }}
                >
                  {consolidatedProfile.skills.length}
                </div>
                <div className="text-caption uppercase text-text-tertiary">
                  Technical Skills
                </div>
              </div>
              <div>
                <div
                  className="font-semibold text-text-accent"
                  style={{ fontSize: 'var(--fs-lge)' }}
                >
                  {consolidatedProfile.education.length}
                </div>
                <div className="text-caption uppercase text-text-tertiary">
                  Qualifications
                </div>
              </div>
            </div>

            <section className="mb-8">
              <div className="mb-spacing-3 flex h-16 w-full items-center justify-center rounded-radius-sm bg-bg-card p-4 font-medium uppercase text-text-accent">
                Experience
              </div>
              {consolidatedProfile.experience.map((item, index) => (
                <div key={`exp-${index}`}>
                  <div className="p-4">
                    <div className="mb-2 uppercase">{item.role}</div>
                    <div className="mb-2 flex items-center text-text-tertiary">
                      <FaIcon icon="faCalendar" className="mr-2" />
                      {item.period}
                    </div>
                    <div className="leading-relaxed">{item.description}</div>
                  </div>
                  {index < consolidatedProfile.experience.length - 1 && (
                    <hr className="mx-auto h-px w-1/2 border-0 bg-accent-primary" />
                  )}
                </div>
              ))}
            </section>

            <section className="mb-8">
              <div className="mb-spacing-3 flex h-16 w-full items-center justify-center rounded-radius-sm bg-bg-card p-4 font-medium uppercase text-text-accent">
                Education
              </div>
              {consolidatedProfile.education.map((item, index) => (
                <div key={`edu-${index}`}>
                  <div className="p-4">
                    <div className="mb-2 uppercase">{item.qualification}</div>
                    <div className="mb-2 uppercase text-text-accent">
                      {item.university}
                    </div>
                    <div className="mb-2 flex items-center text-text-tertiary">
                      <FaIcon icon="faCalendar" className="mr-2" />
                      {item.period}
                    </div>
                    <div className="leading-relaxed">{item.description}</div>
                  </div>
                  {index < consolidatedProfile.education.length - 1 && (
                    <hr className="mx-auto h-px w-1/2 border-0 bg-accent-primary" />
                  )}
                </div>
              ))}
            </section>

            <section className="mb-8">
              <div className="mb-spacing-3 flex h-16 w-full items-center justify-center rounded-radius-sm bg-bg-card p-4 font-medium uppercase text-text-accent">
                Skills
              </div>
              <div className="grid gap-4 p-4 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                {consolidatedProfile.skills.map((item, index) => (
                  <div key={`skill-${index}`} className="flex items-center gap-2">
                    <span className="flex text-text-accent">
                      <FaIcon icon="faCheck" type="solid" />
                    </span>
                    <span className="uppercase">{item.skill}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-spacing-3 flex h-16 w-full items-center justify-center rounded-radius-sm bg-bg-card p-4 font-medium uppercase text-text-accent">
                Learning Adaptability
              </div>
              <div className="mt-4">
                {consolidatedProfile.learningAdaptability.map((item, index) => (
                  <div
                    key={`adapt-${index}`}
                    className="mb-4 rounded-radius-sm bg-bg-card p-4"
                  >
                    <div className="mb-2 font-medium text-text-accent">
                      {item.example}
                    </div>
                    <div className="leading-relaxed">{item.description}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="max-md:block md:hidden">
          <div className="grid w-4/5 justify-items-center gap-2 text-center">
            <span
              className="text-text-primary"
              style={{ fontSize: 'var(--fs-lge)' }}
            >
              <FaIcon icon="faBriefcase" />
            </span>
            <p
              className="m-0 font-extrabold text-text-accent"
              style={{ fontSize: 'var(--fs-lge)' }}
            >
              {yearsExperience}+
            </p>
            <p
              className="font-bold text-text-primary"
              style={{ fontSize: 'var(--fs-xsm)' }}
            >
              YEARS DEVELOPER EXPERIENCE
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutContent
