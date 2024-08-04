import styled from 'styled-components'
import FaIcon from '../../common/FaIcon'

const StyledContainer = styled.div`
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

const getYearsExperience = (startYear: number) => {
  const currentYear = new Date().getFullYear()
  return currentYear - startYear
}

const YearsExperience = () => {
  const yearsExperience = getYearsExperience(2021)

  return (
    <StyledContainer>
      <FaIcon icon={'faBriefcase'} className="fa-icon" />
      <p className="count">{yearsExperience}+</p>
      <p>YEARS EXPERIENCE</p>
    </StyledContainer>
  )
}

export default YearsExperience
