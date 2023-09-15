import React, { useState } from 'react'
import styled from 'styled-components'
import YearsExperience from './YearsExperience'

const SelectorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    
    .years-experience {
      display: none;
    }
  }
`

const OptionButton = styled.button<{ isSelected: boolean }>`
font-size: var(--fs-xsm);
  color: ${({ isSelected }) =>
    isSelected ? 'var(--color)' : 'var(--color-alt2)'};
  background-color: ${({ isSelected }) =>
    isSelected ? 'var(--color-alt)' : 'var(--bg-color-alt)'};
  padding: 10px 20px;
  border: var(--border-style);
  margin-right: 10px;
  cursor: pointer;
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
          EXPERIENCE
        </OptionButton>
        <OptionButton
          isSelected={selectedOption === 'education'}
          onClick={() => handleOptionClick('education')}
        >
          EDUCATION
        </OptionButton>
        <OptionButton
          isSelected={selectedOption === 'skills'}
          onClick={() => handleOptionClick('skills')}
        >
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
