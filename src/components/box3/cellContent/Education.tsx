import styled from 'styled-components'
import Page from '../../common/Page'
import data from '../../../data/personalData'
import FaIcon from '../../common/FaIcon'

const { education } = data

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
const EduContainer = styled.div`
  padding: 1rem;
`
const Qualification = styled.div`
  text-transform: uppercase;
  font-size: var(--fs-xsm);
  font-weight: 400;
  margin-bottom: 0.5rem;
`

const University = styled.div`
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
`

const ParagraphSeparator = styled.hr`
  width: 50%;
  height: 1px;
  border: 0;
  background-color: var(--color-alt);
  margin: 0 auto;
`

interface Educationprops {
  qualification: string
  university: string
  period: string
  description: string
}

const Education = () => {
  return (
    <Page>
      <Category>Education</Category>
      {education.map((educationItem: Educationprops, index: number) => (
        <div key={educationItem.qualification + index}>
          <EduContainer>
            <Qualification>{educationItem.qualification}</Qualification>
            <University>{educationItem.university}</University>
            <Period>
              <FaIcon icon="faCalendar" className="fa-icon" />
              {educationItem.period}
            </Period>
            <Description>{educationItem.description}</Description>
          </EduContainer>
          <ParagraphSeparator />
        </div>
      ))}
    </Page>
  )
}

export default Education
