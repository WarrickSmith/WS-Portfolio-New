import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const PageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
`

const Page = styled.div`
  width: 100%;
  color: var(--color);
  background-color: var(--color-alt2);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-xsm);
  font-weight: 400;
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
      {selectedOption === 'experience' && <Page>Experience Page</Page>}
      {selectedOption === 'education' && <Page>Education Page</Page>}
      {selectedOption === 'skills' && <Page>Skills Page</Page>}
    </PageContainer>
  )
}

export default Cell4