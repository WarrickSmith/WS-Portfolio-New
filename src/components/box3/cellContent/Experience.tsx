import styled from 'styled-components'
import Page from '../../common/Page'
import data from '../../../data/personalData'
import FaIcon from '../../common/FaIcon'

const { experience } = data

const Category = styled.div`
  display: flex;
  justify-content: center;
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--color-alt);
  background-color: var(--bg-color);
  width: 100%;
  height: 4rem;
  padding: 1rem;
  margin: 0;
  border-radius: 0.5rem;
  text-transform: uppercase;
`
const ExpContainer = styled.div`
  padding: 1rem;
`
const Role = styled.div`
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
`

const ParagraphSeparator = styled.hr`
  width: 50%;
  height: 1px;
  border: 0;
  background-color: var(--color-alt);
  margin: 0 auto;
`

interface Experienceprops {
  role: string
  period: string
  description: string
}

const Experience = () => {
  return (
    <Page>
      <Category>Experience</Category>
      {experience.map((experienceItem: Experienceprops, index: number) => (
        <div key={experienceItem.role + index}>
          <ExpContainer>
            <Role>{experienceItem.role}</Role>
            <Period>
              <FaIcon icon="faCalendar" className="fa-icon" />
              {experienceItem.period}
            </Period>
            <Description>{experienceItem.description}</Description>
          </ExpContainer>
          <ParagraphSeparator />
        </div>
      ))}
    </Page>
  )
}

export default Experience
