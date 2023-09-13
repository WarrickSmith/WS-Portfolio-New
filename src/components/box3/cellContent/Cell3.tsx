import React, { useState } from 'react'
import styled from 'styled-components'

const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const OptionButton = styled.button<{ isSelected: boolean }>`
  background-color: ${({ isSelected }) => (isSelected ? '#333' : '#eee')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#333')};
  padding: 10px 20px;
  border: none;
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
    <SelectorContainer>
      <OptionButton
        isSelected={selectedOption === 'experience'}
        onClick={() => handleOptionClick('experience')}
      >
        Experience
      </OptionButton>
      <OptionButton
        isSelected={selectedOption === 'education'}
        onClick={() => handleOptionClick('education')}
      >
        Education
      </OptionButton>
      <OptionButton
        isSelected={selectedOption === 'skills'}
        onClick={() => handleOptionClick('skills')}
      >
        Skills
      </OptionButton>
    </SelectorContainer>
  )
}

export default Cell3