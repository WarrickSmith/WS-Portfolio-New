import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Education from './Education'
import Experience from './Experience'
import Skills from './Skills'

const PageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
`

type PageDisplayProps = {
  selectedOption: string
}

const Cell4: React.FC<PageDisplayProps> = ({ selectedOption }) => {
  return (
    <PageContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {selectedOption === 'experience' && <Experience/>}
      {selectedOption === 'education' && <Education/>}
      {selectedOption === 'skills' && <Skills/>}
    </PageContainer>
  )
}

export default Cell4