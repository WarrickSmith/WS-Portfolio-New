import styled from 'styled-components'
import Page from '../../common/Page'
import data from '../../../data/personalData'
import FaIcon from '../../common/FaIcon'

const { skills } = data

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
const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
`

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
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

interface Skillprops {
  skill: string
  stars: number
}

const Skills = () => {
  return (
    <Page>
      <Category>Skills</Category>
      <SkillsGrid>
        {skills.map((skillItem: Skillprops, index: number) => (
          <SkillItem key={skillItem.skill + index}>
            <Checks>
              <FaIcon key={1} icon={'faCircleCheck'} type={'solid'} />
            </Checks>
            <Skill>{skillItem.skill}</Skill>
          </SkillItem>
        ))}
      </SkillsGrid>
    </Page>
  )
}

export default Skills
