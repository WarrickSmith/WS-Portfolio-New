import React, { useState } from 'react'
import styled from 'styled-components'
import FaIcon from '../../common/FaIcon'
import YearsExperience from './YearsExperience'

const SelectorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;

  .fa-icon{
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;

    .years-experience {
      display: none;
    }

    @media (max-width: 550px) {
      gap: 0.25rem;
      grid-template-columns: 1fr;
    }
  }
`

const OptionButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  font-size: var(--fs-xsm);
  color: ${({ isSelected }) =>
    isSelected ? 'var(--color)' : 'var(--color-alt2)'};
  background-color: ${({ isSelected }) =>
    isSelected ? 'var(--color-alt)' : 'var(--bg-color-alt)'};
  padding: 1rem;
  border: var(--border-style);
  cursor: pointer;

  @media (max-width: 450px) {
    padding: 0.5rem;
  }
`

type SelectorProps = {
  selectedOption: string
  setSelectedOption: (option: string) => void
}

const Cell3: React.FC<SelectorProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
  }

  return (
    <>
      <SelectorContainer>
        <OptionButton
          isSelected={selectedOption === 'experience'}
          onClick={() => handleOptionClick('experience')}
        >
          <FaIcon icon="faBriefcase" className="fa-icon" />
          EXPERIENCE
        </OptionButton>
        <OptionButton
          isSelected={selectedOption === 'education'}
          onClick={() => handleOptionClick('education')}
        >
          <FaIcon icon="faGraduationCap" className="fa-icon" />
          EDUCATION
        </OptionButton>
        <OptionButton
          isSelected={selectedOption === 'skills'}
          onClick={() => handleOptionClick('skills')}
        >
          <FaIcon icon="faStar" className="fa-icon" />
          SKILLS
        </OptionButton>
        <div className="years-experience">
          <YearsExperience />
        </div>
      </SelectorContainer>
    </>
  )
}

export default Cell3
