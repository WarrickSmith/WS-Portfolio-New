import styled from 'styled-components'
import Page from '../../common/Page'
import FaIcon from '../../common/FaIcon'
import ParagraphSeparator from '../../common/ParagraphSeparator'
import consolidatedProfile from '../../../data/consolidatedProfile'

const {
  experience,
  education,
  skills,
  totalYearsExperience,
  learningAdaptability,
} = consolidatedProfile

const Section = styled.section`
  margin-bottom: 2rem;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: center;
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--color-alt);
  background-color: var(--bg-color);
  width: 100%;
  height: 4rem;
  padding: 1rem;
  margin: 0 0 1rem 0;
  border-radius: 0.5rem;
  text-transform: uppercase;
`

const ContentContainer = styled.div`
  padding: 1rem;
`

const ItemTitle = styled.div`
  text-transform: uppercase;
  font-size: var(--fs-xsm);
  font-weight: 400;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.div`
  color: var(--color-alt);
  text-transform: uppercase;
  font-size: var(--fs-xsm);
  font-weight: 400;
  margin-bottom: 0.5rem;
`

const Period = styled.div`
  color: var(--color-alt3);
  font-size: var(--fs-xxsm);
  font-weight: 400;
  margin-bottom: 0.5rem;

  .fa-icon {
    margin-right: 0.5rem;
  }
`

const Description = styled.div`
  font-size: var(--fs-xxsm);
  font-weight: 300;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
`

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Skill = styled.div`
  text-transform: uppercase;
  font-size: var(--fs-xsm);
  font-weight: 400;
`

const Checks = styled.div`
  color: var(--color-alt);
  text-transform: uppercase;
  font-size: var(--fs-xsm);
  font-weight: 400;
  display: flex;
`

const CheckIcon = styled.div`
  color: var(--color-alt);
  display: flex;
`

const SummaryStats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--bg-color);
  border-radius: 0.5rem;
`

const StatItem = styled.div`
  text-align: center;
`

const StatValue = styled.div`
  font-size: var(--fs-lg);
  font-weight: 600;
  color: var(--color-alt);
`

const StatLabel = styled.div`
  font-size: var(--fs-xsm);
  color: var(--color-alt3);
  text-transform: uppercase;
`

const AdaptabilitySection = styled.div`
  margin-top: 1rem;
`

const AdaptabilityItem = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: var(--bg-color);
  border-radius: 0.5rem;
`

const AdaptabilityTitle = styled.div`
  font-size: var(--fs-xsm);
  font-weight: 500;
  color: var(--color-alt);
  margin-bottom: 0.5rem;
`

const AdaptabilityDescription = styled.div`
  font-size: var(--fs-xxsm);
  font-weight: 300;
  line-height: 1.4;
`

const ConsolidatedSummary = () => {
  const renderCheck = () => {
    return <FaIcon icon="faCheck" type="solid" />
  }

  return (
    <Page>
      <SummaryStats>
        <StatItem>
          <StatValue>{totalYearsExperience}</StatValue>
          <StatLabel>Years Developer Experience</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{skills.length}</StatValue>
          <StatLabel>Technical Skills</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{education.length}</StatValue>
          <StatLabel>Qualifications</StatLabel>
        </StatItem>
      </SummaryStats>

      <Section>
        <SectionHeader>Experience</SectionHeader>
        {experience.map((item, index) => (
          <div key={`exp-${index}`}>
            <ContentContainer>
              <ItemTitle>{item.role}</ItemTitle>
              <Period>
                <FaIcon icon="faCalendar" className="fa-icon" />
                {item.period}
              </Period>
              <Description>{item.description}</Description>
            </ContentContainer>
            {index < experience.length - 1 && <ParagraphSeparator />}
          </div>
        ))}
      </Section>

      <Section>
        <SectionHeader>Education</SectionHeader>
        {education.map((item, index) => (
          <div key={`edu-${index}`}>
            <ContentContainer>
              <ItemTitle>{item.qualification}</ItemTitle>
              <Subtitle>{item.university}</Subtitle>
              <Period>
                <FaIcon icon="faCalendar" className="fa-icon" />
                {item.period}
              </Period>
              <Description>{item.description}</Description>
            </ContentContainer>
            {index < education.length - 1 && <ParagraphSeparator />}
          </div>
        ))}
      </Section>

      <Section>
        <SectionHeader>Skills</SectionHeader>
        <SkillsGrid>
          {skills.map((item, index) => (
            <SkillItem key={`skill-${index}`}>
              <CheckIcon>{renderCheck()}</CheckIcon>
              <Skill>{item.skill}</Skill>
            </SkillItem>
          ))}
        </SkillsGrid>
      </Section>

      <Section>
        <SectionHeader>Learning Adaptability</SectionHeader>
        <AdaptabilitySection>
          {learningAdaptability.map((item, index) => (
            <AdaptabilityItem key={`adapt-${index}`}>
              <AdaptabilityTitle>{item.example}</AdaptabilityTitle>
              <AdaptabilityDescription>
                {item.description}
              </AdaptabilityDescription>
            </AdaptabilityItem>
          ))}
        </AdaptabilitySection>
      </Section>
    </Page>
  )
}

export default ConsolidatedSummary
