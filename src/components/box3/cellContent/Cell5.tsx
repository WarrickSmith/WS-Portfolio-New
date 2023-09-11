import styled from 'styled-components'
import FaIcon from '../../common/FaIcon'

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  display: grid;
  gap: 0.5rem;
  justify-items: center;
  justify-content: center;
  width: 80%;
  margin: 0 auto;


  .fa-icon {
    font-size: var(--fs-lge);
  }

  .count {
    font-size: var(--fs-lge);
    font-weight: 800;
    color: var(--color-alt);
    margin: 0;
  }

  p {
    font-size: var(--fs-xsm);
    font-weight: 700;
  }
`

const today = new Date()
const currentYear = today.getFullYear()
const startYear = 2022
const yearsExperience = currentYear - startYear
const Cell5 = () => {
  return (
    <Container>
      <FaIcon icon={'faBriefcase'} className="fa-icon" />
      <p className="count">{yearsExperience}+</p>
      <p>YEARS EXPERIENCE</p>
    </Container>
  )
}

export default Cell5
