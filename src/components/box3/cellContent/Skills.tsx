import styled from 'styled-components'
import Page from '../../common/Page'
import { skills } from '../../../data/personalData'

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--color-alt);
  background-color: var(--bg-color);
  width: 100%;
  height: 4rem;
  padding: 1rem;
  margin: 0;
  border: var(--border-style);
  border-radius: 0.5rem;
  text-transform: uppercase;
`

const Skills = () => {
  return (
    <Page>
      <Category>Skills</Category>
    </Page>
  )
}

export default Skills
